import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { prepareBlogHtml, slugify, wordCount } from "@/lib/blog-html";

// Database-backed blog (supabase/migrations/0008_blog.sql). Posts are written in
// the admin console (/admin/blog) and read here with the publishable key, so
// RLS only ever returns published posts whose publish time has passed. Saving
// in the editor revalidates the affected pages, and every blog page also
// revalidates on a short timer so scheduled posts appear on time.

export { slugify, extractHeadings } from "@/lib/blog-html";

export type Comment = { author: string; date: string; body: string; isAuthor?: boolean };

export type Author = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
  photo?: string;
  url?: string;
  sameAs?: string[];
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** Publish time, ISO. */
  date: string;
  /** Last edit, ISO. */
  updated: string;
  author: string;
  category: string;
  tags: string[];
  ogTitle?: string;
  ogDescription?: string;
  /** Optional hero image; the hero shows a branded panel when absent. */
  cover?: string;
  coverAlt?: string;
  /** Optional TL;DR bullets, shown above the article body. */
  takeaways?: string[];
  readingTime: number;
};

export type Post = {
  meta: PostMeta;
  /** Sanitized HTML with heading ids, ready to render. */
  html: string;
  tldr: string;
  faq: { q: string; a: string }[];
  comments: Comment[];
  author: Author;
  seo: {
    metaTitle: string;
    canonical: string;
    robots: string;
    ogImage: string;
    ogImageAlt: string;
    focusKeyword: string;
    keywords: string[];
  };
  wordCount: number;
};

type AuthorRow = { name: string; title: string; bio: string; photo: string; url: string; same_as: string[] } | null;

const LIST_COLUMNS =
  "slug, title, excerpt, category, tags, cover, cover_alt, takeaways, meta_description, og_title, og_description, published_at, updated_at, content_html, author:blog_authors(name)";

const ACCENT = "#fe5100";

function toAuthor(row: AuthorRow): Author {
  const name = row?.name || "Timewheel";
  return {
    name,
    role: row?.title || "Author",
    bio: row?.bio || "",
    // First and last name initials ("Shubham N Datarkar" -> SD).
    initials: (() => {
      const w = name.split(/\s+/).filter(Boolean);
      return ((w[0]?.[0] ?? "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
    })(),
    accent: ACCENT,
    photo: row?.photo || undefined,
    url: row?.url || undefined,
    sameAs: row?.same_as?.length ? row.same_as : undefined,
  };
}

type ListRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover: string;
  cover_alt: string;
  takeaways: string[];
  meta_description: string;
  og_title: string;
  og_description: string;
  published_at: string;
  updated_at: string;
  content_html: string;
  author: { name: string } | { name: string }[] | null;
};

function toMeta(r: ListRow): PostMeta {
  const author = Array.isArray(r.author) ? r.author[0] : r.author;
  return {
    slug: r.slug,
    title: r.title,
    description: r.meta_description || r.excerpt,
    excerpt: r.excerpt || r.meta_description,
    date: r.published_at,
    updated: r.updated_at,
    author: author?.name || "Timewheel",
    category: r.category || "Blog",
    tags: r.tags ?? [],
    ogTitle: r.og_title || undefined,
    ogDescription: r.og_description || undefined,
    cover: r.cover || undefined,
    coverAlt: r.cover_alt || undefined,
    takeaways: r.takeaways?.length ? r.takeaways : undefined,
    readingTime: Math.max(1, Math.round(wordCount(r.content_html) / 200)),
  };
}

/** Every live post, newest first. */
export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const db = createPublicClient();
  if (!db) return [];
  const { data, error } = await db
    .from("blog_posts")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[blog] getAllPosts:", error.message);
    return [];
  }
  return (data as unknown as ListRow[]).map(toMeta);
});

export async function getAllSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const db = createPublicClient();
  if (!db || !/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  const { data, error } = await db
    .from("blog_posts")
    .select(`${LIST_COLUMNS}, tldr, faq, comments, meta_title, canonical, robots, og_image, og_image_alt, focus_keyword, secondary_keywords, author_full:blog_authors(name, title, bio, photo, url, same_as)`)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error) console.error("[blog] getPost:", error.message);
  if (!data) return null;
  const r = data as unknown as ListRow & {
    tldr: string;
    faq: { q: string; a: string }[];
    comments: Comment[];
    meta_title: string;
    canonical: string;
    robots: string;
    og_image: string;
    og_image_alt: string;
    focus_keyword: string;
    secondary_keywords: string[];
    author_full: AuthorRow | AuthorRow[];
  };
  const authorRow = Array.isArray(r.author_full) ? r.author_full[0] : r.author_full;
  return {
    meta: toMeta(r),
    html: prepareBlogHtml(r.content_html),
    tldr: r.tldr,
    faq: Array.isArray(r.faq) ? r.faq.filter((f) => f?.q && f?.a) : [],
    comments: Array.isArray(r.comments) ? r.comments : [],
    author: toAuthor(authorRow ?? null),
    seo: {
      metaTitle: r.meta_title,
      canonical: r.canonical,
      robots: r.robots,
      ogImage: r.og_image,
      ogImageAlt: r.og_image_alt,
      focusKeyword: r.focus_keyword,
      keywords: [r.focus_keyword, ...(r.secondary_keywords ?? [])].filter(Boolean),
    },
    wordCount: wordCount(r.content_html),
  };
});

/** Where a renamed post lives now, if this was one of its old slugs. */
export async function getRenamedSlug(slug: string): Promise<string | null> {
  const db = createPublicClient();
  if (!db || !/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  const { data } = await db.from("blog_redirects").select("post_id").eq("from_slug", slug).maybeSingle();
  if (!data) return null;
  const { data: post } = await db
    .from("blog_posts")
    .select("slug")
    .eq("id", data.post_id)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  return post?.slug && post.slug !== slug ? post.slug : null;
}

/** Same-category posts (excluding this one), then the most recent. */
export async function getRelatedPosts(slug: string, category: string, limit = 3): Promise<PostMeta[]> {
  const all = (await getAllPosts()).filter((p) => p.slug !== slug);
  const same = all.filter((p) => p.category === category);
  return [...same, ...all.filter((p) => p.category !== category)].slice(0, limit);
}

/** Previous (older) and next (newer) post by date. */
export async function getAdjacentPosts(slug: string): Promise<{ prev: PostMeta | null; next: PostMeta | null }> {
  const all = await getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: all[i + 1] ?? null, next: all[i - 1] ?? null };
}

export async function getAllTags(): Promise<string[]> {
  const set = new Set<string>();
  for (const p of await getAllPosts()) p.tags.forEach((t) => set.add(t));
  return [...set].sort();
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  return (await getAllPosts()).filter((p) => p.tags.some((t) => slugify(t) === slugify(tag)));
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}
