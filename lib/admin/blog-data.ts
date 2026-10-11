import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import { segScores, type SegRow } from "@/lib/blog-seo";

// Reads for the admin blog editor. Callers check requireBlogEditor() first;
// the service key sees drafts, scheduled posts and revisions.

export type BlogStatusFilter = "all" | "published" | "scheduled" | "draft";

export type AdminPostRow = SegRow & {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
  cover: string;
  category: string;
  author: string | null;
};

export type AdminPost = AdminPostRow & {
  excerpt: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_image_alt: string;
  canonical: string;
  robots: string;
  comments: { author: string; date: string; body: string; isAuthor?: boolean }[];
  faq: { q: string; a: string }[];
};

export type BlogAuthor = { id: string; name: string; title: string; bio: string; photo: string; url: string; same_as: string[]; posts?: number };

export type Revision = { id: string; created_at: string; note: string | null; by: string | null; title: string; status: string };

const ROW = "id, slug, title, status, published_at, updated_at, cover, category, author_id, content_html, meta_title, meta_description, focus_keyword, cover_alt, tags, tldr, takeaways, secondary_keywords, faq, author:blog_authors(name)";

export const isScheduled = (p: { status: string; published_at: string | null }) =>
  p.status === "published" && !!p.published_at && new Date(p.published_at) > new Date();

export async function listAdminPosts({ q = "", status = "all" as BlogStatusFilter } = {}) {
  const db = createAdminClient();
  let query = db.from("blog_posts").select(ROW).order("updated_at", { ascending: false }).limit(500);
  if (status === "draft") query = query.eq("status", "draft");
  if (status === "published") query = query.eq("status", "published").lte("published_at", new Date().toISOString());
  if (status === "scheduled") query = query.eq("status", "published").gt("published_at", new Date().toISOString());
  const term = q.trim().replace(/[%,()]/g, " ").slice(0, 80);
  if (term) query = query.or(`title.ilike.%${term}%,slug.ilike.%${term}%,category.ilike.%${term}%`);
  const { data, error } = await query;
  if (error) {
    console.error("listAdminPosts:", error.message);
    return [];
  }
  return (data ?? []).map((r) => {
    const a = r.author as unknown as { name: string } | { name: string }[] | null;
    const row = { ...(r as unknown as AdminPostRow), author: (Array.isArray(a) ? a[0]?.name : a?.name) ?? null };
    return { ...row, scores: segScores(row) };
  });
}

export async function blogCounts() {
  const db = createAdminClient();
  const now = new Date().toISOString();
  const [all, live, scheduled] = await Promise.all([
    db.from("blog_posts").select("id", { count: "exact", head: true }),
    db.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "published").lte("published_at", now),
    db.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "published").gt("published_at", now),
  ]);
  const total = all.count ?? 0;
  const published = live.count ?? 0;
  const sched = scheduled.count ?? 0;
  return { total, published, scheduled: sched, drafts: Math.max(0, total - published - sched) };
}

export async function getAdminPost(id: string): Promise<AdminPost | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await createAdminClient().from("blog_posts").select("*").eq("id", id).maybeSingle();
  return (data as AdminPost | null) ?? null;
}

export async function listRevisions(postId: string): Promise<Revision[]> {
  const db = createAdminClient();
  const { data } = await db
    .from("blog_post_revisions")
    .select("id, created_at, note, created_by, snapshot->>title, snapshot->>status")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .limit(30);
  const rows = (data ?? []) as unknown as { id: string; created_at: string; note: string | null; created_by: string | null; title: string; status: string }[];
  const ids = [...new Set(rows.map((r) => r.created_by).filter(Boolean))] as string[];
  const names = new Map<string, string>();
  if (ids.length) {
    const { data: profiles } = await db.from("profiles").select("id, full_name").in("id", ids);
    for (const p of profiles ?? []) names.set(p.id, p.full_name || "");
  }
  return rows.map((r) => ({ id: r.id, created_at: r.created_at, note: r.note, by: r.created_by ? names.get(r.created_by) || null : null, title: r.title, status: r.status }));
}

export async function listAuthors(): Promise<BlogAuthor[]> {
  const db = createAdminClient();
  const [{ data: authors }, { data: posts }] = await Promise.all([
    db.from("blog_authors").select("id, name, title, bio, photo, url, same_as").order("created_at"),
    db.from("blog_posts").select("author_id"),
  ]);
  const count = new Map<string, number>();
  for (const p of posts ?? []) if (p.author_id) count.set(p.author_id, (count.get(p.author_id) ?? 0) + 1);
  return (authors ?? []).map((a) => ({ ...(a as BlogAuthor), posts: count.get(a.id) ?? 0 }));
}

export async function listCategories(): Promise<string[]> {
  const { data } = await createAdminClient().from("blog_posts").select("category");
  return [...new Set((data ?? []).map((r) => r.category).filter(Boolean))].sort();
}
