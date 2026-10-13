"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { getConsoleMember } from "@/lib/members/session";
import { cleanBlogHtml } from "@/lib/blog-html";

// Blog editor writes (admin console, /admin/blog), ported from the adetc blog
// admin. Server actions are public POST endpoints, so each one re-checks that
// the caller is an admin or writer before using the service key.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_REVISIONS = 30;
/** /blog/<x> paths that already belong to other routes. */
const RESERVED = new Set(["tag", "feed", "page", "new", "admin", "rss"]);
const ROBOTS = new Set(["index,follow", "noindex,follow", "index,nofollow", "noindex,nofollow"]);

async function editor() {
  const member = await getConsoleMember();
  if (!member?.canWriteBlog) throw new Error("Not allowed");
  return { member, db: createAdminClient() };
}

const str = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").replace(/<[^>]+>/g, "").trim().slice(0, max);
const url = (fd: FormData, k: string) => {
  const v = String(fd.get(k) ?? "").trim().slice(0, 600);
  return /^(https?:\/\/|\/)[^\s"'<>]*$/i.test(v) ? v : "";
};
function list(v: unknown, max = 20, len = 80) {
  return [...new Set(String(v ?? "").split(/[,\n]/).map((x) => x.replace(/<[^>]+>/g, "").trim().slice(0, len)).filter(Boolean))].slice(0, max);
}
function lines(v: unknown, max = 8, len = 300) {
  return String(v ?? "").split("\n").map((x) => x.replace(/<[^>]+>/g, "").trim().slice(0, len)).filter(Boolean).slice(0, max);
}
function json<T>(v: unknown, fallback: T): T {
  try {
    return JSON.parse(String(v ?? "")) as T;
  } catch {
    return fallback;
  }
}
const plain = (s: unknown, max: number) => String(s ?? "").replace(/<[^>]+>/g, "").trim().slice(0, max);

function slugifyTitle(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120).replace(/-+$/, "");
}

function revalidateBlog(...slugs: (string | null | undefined)[]) {
  revalidatePath("/blog");
  revalidatePath("/blog/tag/[tag]", "page");
  for (const s of slugs) if (s) revalidatePath(`/blog/${s}`);
  revalidatePath("/blog/feed.xml");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog", "layout");
}

async function snapshot(db: ReturnType<typeof createAdminClient>, row: Record<string, unknown>, by: string | null, note?: string) {
  await db.from("blog_post_revisions").insert({ post_id: row.id, snapshot: row, note: note ?? null, created_by: by });
  // Keep the newest MAX_REVISIONS per post.
  const { data: old } = await db
    .from("blog_post_revisions")
    .select("id")
    .eq("post_id", row.id as string)
    .order("created_at", { ascending: false })
    .range(MAX_REVISIONS, MAX_REVISIONS + 50);
  if (old?.length) await db.from("blog_post_revisions").delete().in("id", old.map((r) => r.id));
}

export type SavePostState = { ok?: boolean; error?: string; id?: string; slug?: string; status?: string; publishedAt?: string | null; at?: number };

export async function savePost(_prev: SavePostState, fd: FormData): Promise<SavePostState> {
  let ctx;
  try {
    ctx = await editor();
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
  const { member, db } = ctx;

  const id = String(fd.get("id") ?? "");
  if (id && !UUID.test(id)) return { error: "Unknown post." };
  const title = plain(fd.get("title"), 200);
  const slug = slugifyTitle(String(fd.get("slug") || title));
  const status = fd.get("status") === "published" ? "published" : "draft";
  if (!title) return { error: "Add a title." };
  if (!slug) return { error: "Add a URL slug." };
  if (RESERVED.has(slug)) return { error: `"/blog/${slug}" is reserved. Pick another slug.` };

  const authorId = String(fd.get("author_id") ?? "");
  const robots = String(fd.get("robots") ?? "index,follow");
  const faq = json<{ q?: unknown; a?: unknown }[]>(fd.get("faq"), [])
    .map((f) => ({ q: plain(f?.q, 300), a: plain(f?.a, 2000) }))
    .filter((f) => f.q && f.a)
    .slice(0, 30);
  const comments = json<{ author?: unknown; date?: unknown; body?: unknown; isAuthor?: unknown }[]>(fd.get("comments"), [])
    .map((c) => ({ author: plain(c?.author, 80), date: plain(c?.date, 30), body: plain(c?.body, 3000), isAuthor: c?.isAuthor === true }))
    .filter((c) => c.author && c.body)
    .slice(0, 200);

  const row: Record<string, unknown> = {
    title,
    slug,
    status,
    excerpt: str(fd, "excerpt", 600),
    category: str(fd, "category", 60),
    tags: list(fd.get("tags")),
    author_id: UUID.test(authorId) ? authorId : null,
    cover: url(fd, "cover"),
    cover_alt: str(fd, "cover_alt", 300),
    content_html: cleanBlogHtml(String(fd.get("content_html") ?? "")).slice(0, 500_000),
    tldr: str(fd, "tldr", 1200),
    takeaways: lines(fd.get("takeaways")),
    faq,
    comments,
    meta_title: str(fd, "meta_title", 120),
    meta_description: str(fd, "meta_description", 320),
    og_title: str(fd, "og_title", 120),
    og_description: str(fd, "og_description", 320),
    og_image: url(fd, "og_image"),
    og_image_alt: str(fd, "og_image_alt", 300),
    canonical: url(fd, "canonical"),
    robots: ROBOTS.has(robots) ? robots : "index,follow",
    focus_keyword: str(fd, "focus_keyword", 120),
    secondary_keywords: list(fd.get("secondary_keywords"), 12, 120),
    updated_by: member.id || null,
  };

  // Optional publish time (UTC ISO from the browser). Published + future = scheduled.
  // A draft with no date clears it; a published post always ends up with one.
  const pub = String(fd.get("published_at") ?? "").trim();
  if (pub) {
    const d = new Date(pub);
    if (Number.isNaN(d.getTime())) return { error: "That publish date isn't valid." };
    row.published_at = d.toISOString();
  } else if (status === "draft") {
    row.published_at = null;
  }

  let saved: { id: string; slug: string; published_at: string | null } | null = null;
  let oldSlug: string | null = null;

  if (id) {
    const { data: existing } = await db.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (!existing) return { error: "This post no longer exists." };
    oldSlug = existing.slug;
    // Snapshot the version being replaced whenever a published post is involved.
    if (existing.status === "published" || status === "published") await snapshot(db, existing, member.id || null);
    if (status === "published" && !row.published_at) row.published_at = existing.published_at ?? new Date().toISOString();
    const { data, error } = await db.from("blog_posts").update(row).eq("id", id).select("id, slug, published_at").maybeSingle();
    if (error) return { error: error.code === "23505" ? "Another post already uses that slug." : error.message };
    saved = data;
    // Renamed after it had been live: keep the old URL working.
    if (saved && oldSlug && oldSlug !== saved.slug && existing.published_at) {
      await db.from("blog_redirects").upsert({ from_slug: oldSlug, post_id: saved.id });
    }
  } else {
    if (status === "published" && !row.published_at) row.published_at = new Date().toISOString();
    const { data, error } = await db
      .from("blog_posts")
      .insert({ ...row, created_by: member.id || null })
      .select("id, slug, published_at")
      .maybeSingle();
    if (error) return { error: error.code === "23505" ? "Another post already uses that slug." : error.message };
    saved = data;
  }
  if (!saved) return { error: "Couldn't save. Try again." };
  // A live post now owns this slug, so it can't also redirect elsewhere.
  await db.from("blog_redirects").delete().eq("from_slug", saved.slug);

  revalidateBlog(saved.slug, oldSlug);
  return { ok: true, id: saved.id, slug: saved.slug, status, publishedAt: saved.published_at, at: Date.now() };
}

export async function setPostStatus(id: string, status: "draft" | "published"): Promise<{ error?: string }> {
  try {
    const { member, db } = await editor();
    if (!UUID.test(id)) return { error: "Unknown post." };
    const { data: existing } = await db.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (!existing) return { error: "This post no longer exists." };
    await snapshot(db, existing, member.id || null, status === "published" ? "before publish" : "before unpublish");
    const patch: Record<string, unknown> = { status, updated_by: member.id || null };
    if (status === "published" && !existing.published_at) patch.published_at = new Date().toISOString();
    const { error } = await db.from("blog_posts").update(patch).eq("id", id);
    if (error) return { error: error.message };
    revalidateBlog(existing.slug);
    return {};
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
}

export async function deletePost(id: string): Promise<{ error?: string }> {
  try {
    const { db } = await editor();
    if (!UUID.test(id)) return { error: "Unknown post." };
    const { data, error } = await db.from("blog_posts").delete().eq("id", id).select("slug").maybeSingle();
    if (error) return { error: error.message };
    revalidateBlog(data?.slug);
    return {};
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
}

/** Copy a post into a new draft. */
export async function duplicatePost(id: string): Promise<{ error?: string; id?: string }> {
  try {
    const { member, db } = await editor();
    if (!UUID.test(id)) return { error: "Unknown post." };
    const { data: src } = await db.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (!src) return { error: "This post no longer exists." };
    const { id: _id, created_at: _c, updated_at: _u, published_at: _p, slug, title, ...rest } = src;
    void _id;
    void _c;
    void _u;
    void _p;
    const base = `${slug}-copy`.slice(0, 110);
    let next = base;
    for (let n = 2; n < 50; n++) {
      const { data: clash } = await db.from("blog_posts").select("id").eq("slug", next).maybeSingle();
      if (!clash) break;
      next = `${base}-${n}`;
    }
    const { data, error } = await db
      .from("blog_posts")
      .insert({ ...rest, slug: next, title: `${title} (copy)`.slice(0, 200), status: "draft", published_at: null, created_by: member.id || null, updated_by: member.id || null })
      .select("id")
      .maybeSingle();
    if (error || !data) return { error: error?.message ?? "Couldn't duplicate." };
    revalidatePath("/admin/blog");
    return { id: data.id };
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
}

/** Put an older version back. Snapshots the current one first, so it's reversible. Keeps the current status. */
export async function restoreRevision(revisionId: string): Promise<{ error?: string }> {
  try {
    const { member, db } = await editor();
    if (!UUID.test(revisionId)) return { error: "Unknown version." };
    const { data: rev } = await db.from("blog_post_revisions").select("post_id, snapshot").eq("id", revisionId).maybeSingle();
    if (!rev) return { error: "That version no longer exists." };
    const { data: current } = await db.from("blog_posts").select("*").eq("id", rev.post_id).maybeSingle();
    if (!current) return { error: "This post no longer exists." };
    await snapshot(db, current, member.id || null, "before restore");

    const s = rev.snapshot as Record<string, unknown>;
    const fields = [
      "title", "excerpt", "category", "tags", "author_id", "cover", "cover_alt", "content_html", "tldr", "takeaways", "faq", "comments",
      "meta_title", "meta_description", "og_title", "og_description", "og_image", "og_image_alt", "canonical", "robots", "focus_keyword", "secondary_keywords",
    ];
    const patch: Record<string, unknown> = { updated_by: member.id || null };
    for (const f of fields) if (f in s) patch[f] = s[f];
    const { error } = await db.from("blog_posts").update(patch).eq("id", rev.post_id);
    if (error) return { error: error.message };
    revalidateBlog(current.slug);
    return {};
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
}

/** A one-time URL the browser PUTs an image to, plus where it will be served from. */
export async function startImageUpload(input: { name: string; size: number; type: string }): Promise<{ url: string; publicUrl: string } | { error: string }> {
  try {
    const { db } = await editor();
    if (!IMAGE_TYPES.has(input.type)) return { error: "Use a JPG, PNG, WebP, GIF or AVIF image." };
    if (!input.size || input.size > MAX_IMAGE) return { error: "Images must be under 5 MB." };
    const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" }[input.type];
    const base = input.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
    const now = new Date();
    const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${base}-${randomUUID().slice(0, 8)}.${ext}`;
    const { data, error } = await db.storage.from("blog-images").createSignedUploadUrl(path);
    if (error || !data) throw error ?? new Error("No upload URL");
    return { url: data.signedUrl, publicUrl: db.storage.from("blog-images").getPublicUrl(path).data.publicUrl };
  } catch (e) {
    console.error("startImageUpload:", e);
    if (e instanceof Error && e.message === "Not allowed") return { error: "You don't have access to the blog editor. Sign in again at /admin/login." };
    return { error: "Couldn't start the upload. Check the blog-images bucket exists (migration 0008)." };
  }
}

// ------------------------------------------------------------ authors

export type AuthorState = { ok?: boolean; error?: string; at?: number };

export async function saveAuthor(_prev: AuthorState, fd: FormData): Promise<AuthorState> {
  let ctx;
  try {
    ctx = await editor();
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
  const id = String(fd.get("id") ?? "");
  const row = {
    name: plain(fd.get("name"), 120),
    title: plain(fd.get("title"), 160),
    bio: plain(fd.get("bio"), 1500),
    photo: url(fd, "photo"),
    url: url(fd, "url"),
    same_as: list(fd.get("same_as"), 10, 300).filter((u) => /^https?:\/\//i.test(u)),
  };
  if (!row.name) return { error: "Add the author's name." };
  const q = id && UUID.test(id) ? ctx.db.from("blog_authors").update(row).eq("id", id) : ctx.db.from("blog_authors").insert(row);
  const { error } = await q;
  if (error) return { error: error.code === "23505" ? "An author with that name already exists." : error.message };
  revalidateBlog();
  revalidatePath("/blog/[slug]", "page");
  return { ok: true, at: Date.now() };
}

export async function deleteAuthor(id: string): Promise<{ error?: string }> {
  try {
    const { db } = await editor();
    if (!UUID.test(id)) return { error: "Unknown author." };
    const { count } = await db.from("blog_posts").select("id", { count: "exact", head: true }).eq("author_id", id);
    if (count) return { error: `This author has ${count} post${count === 1 ? "" : "s"}. Give them another author first.` };
    const { error } = await db.from("blog_authors").delete().eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/admin/blog/authors");
    return {};
  } catch {
    return { error: "You don't have access to the blog editor." };
  }
}
