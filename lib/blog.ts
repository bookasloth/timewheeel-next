import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Filesystem-backed markdown blog. Posts live in content/blog/*.md with
// frontmatter; parsed at build time (server components / SSG).

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type Comment = { author: string; date: string; body: string; isAuthor?: boolean };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  ogTitle?: string;
  ogDescription?: string;
  readingTime: number;
};

export type Post = { meta: PostMeta; content: string; comments: Comment[] };

export type Author = { name: string; role: string; bio: string; initials: string; accent: string };

// Author registry. Add people here; posts reference by their `author` string.
const AUTHORS: Record<string, Author> = {
  Timewheel: {
    name: "Timewheel",
    role: "Product studio + growth team",
    bio: "Timewheel builds and runs its own software products, and brings that engineering muscle to marketing, SEO and AI-search for businesses across India.",
    initials: "TW",
    accent: "#fe5100",
  },
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      excerpt: data.excerpt ?? data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "Timewheel",
      category: data.category ?? "Blog",
      tags: Array.isArray(data.tags) ? data.tags : [],
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      readingTime: readingTime(content),
    },
    content,
    comments: Array.isArray(data.comments) ? data.comments : [],
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => readPost(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  try {
    return readPost(slug);
  } catch {
    return null;
  }
}

export function getAuthor(name: string): Author {
  return AUTHORS[name] ?? { name, role: "Author", bio: "", initials: name.slice(0, 2).toUpperCase(), accent: "#fe5100" };
}

/** Same-category posts (excl. current); falls back to most recent. */
export function getRelatedPosts(slug: string, category: string, limit = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const same = all.filter((p) => p.category === category);
  return [...same, ...all.filter((p) => p.category !== category)].slice(0, limit);
}

/** Previous (older) and next (newer) post by date. */
export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const all = getAllPosts(); // newest first
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: all[i + 1] ?? null, next: all[i - 1] ?? null };
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) p.tags.forEach((t) => set.add(t));
  return [...set].sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.some((t) => slugify(t) === slugify(tag)));
}

/** Top-level (H2) headings for a table of contents. */
export function extractHeadings(content: string): { text: string; id: string }[] {
  const out: { text: string; id: string }[] = [];
  const re = /^##\s+(.+?)\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    const text = m[1].trim();
    out.push({ text, id: slugify(text) });
  }
  return out;
}

// Pull Q/A pairs from a "## Frequently asked questions" section for FAQPage schema.
export function extractFaq(content: string): { q: string; a: string }[] {
  const idx = content.search(/^##\s+Frequently asked questions/im);
  if (idx === -1) return [];
  const section = content.slice(idx);
  const out: { q: string; a: string }[] = [];
  const re = /^###\s+(.+?)\s*\n+([\s\S]*?)(?=\n###\s|\n##\s|$)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section))) {
    out.push({ q: m[1].trim(), a: m[2].replace(/\s+/g, " ").trim() });
  }
  return out;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
