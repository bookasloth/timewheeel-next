import "server-only";
import { createClient } from "@/lib/supabase/server";

// Reads for member pages, made as the signed-in member so RLS decides what
// comes back. Failures (e.g. migration not run yet) return empty results and
// log, so a page renders an empty state instead of crashing.

export type DownloadRow = {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  category: string;
  tier: "free" | "premium";
  file_name: string;
  file_size: number | null;
  content_type: string | null;
};

export type Author = { full_name: string | null; avatar_url: string | null } | null;

export type PostRow = {
  id: string;
  created_at: string;
  edited_at: string | null;
  author_id: string;
  category: string;
  title: string;
  body: string;
  pinned: boolean;
  locked: boolean;
  reply_count: number;
  last_activity_at: string;
  author: Author;
};

export type ReplyRow = {
  id: string;
  created_at: string;
  edited_at: string | null;
  author_id: string;
  body: string;
  author: Author;
};

const DOWNLOAD_COLS = "id, created_at, title, description, category, tier, file_name, file_size, content_type";
const POST_COLS = "id, created_at, edited_at, author_id, category, title, body, pinned, locked, reply_count, last_activity_at, author:profiles(full_name, avatar_url)";

export const POSTS_PER_PAGE = 20;

export async function listDownloads(tier?: "free" | "premium", limit = 200): Promise<DownloadRow[]> {
  const supabase = await createClient();
  let q = supabase.from("downloads").select(DOWNLOAD_COLS).order("created_at", { ascending: false }).limit(limit);
  if (tier) q = q.eq("tier", tier);
  const { data, error } = await q;
  if (error) console.error("listDownloads:", error.message);
  return (data as DownloadRow[] | null) ?? [];
}

export async function countDownloads(): Promise<{ free: number; premium: number }> {
  const supabase = await createClient();
  const count = async (tier: string) => {
    const { count, error } = await supabase.from("downloads").select("id", { count: "exact", head: true }).eq("tier", tier);
    if (error) console.error("countDownloads:", error.message);
    return count ?? 0;
  };
  const [free, premium] = await Promise.all([count("free"), count("premium")]);
  return { free, premium };
}

export async function listPosts(opts: { category?: string; page?: number; limit?: number } = {}) {
  const supabase = await createClient();
  const limit = opts.limit ?? POSTS_PER_PAGE;
  const from = Math.max(0, (opts.page ?? 1) - 1) * limit;
  let q = supabase
    .from("community_posts")
    .select(POST_COLS, { count: "exact" })
    .order("pinned", { ascending: false })
    .order("last_activity_at", { ascending: false })
    .range(from, from + limit - 1);
  if (opts.category) q = q.eq("category", opts.category);
  const { data, error, count } = await q;
  if (error) console.error("listPosts:", error.message);
  return { posts: (data as unknown as PostRow[] | null) ?? [], total: count ?? 0 };
}

export async function getPost(id: string): Promise<{ post: PostRow; replies: ReplyRow[] } | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createClient();
  const [{ data: post, error }, { data: replies }] = await Promise.all([
    supabase.from("community_posts").select(POST_COLS).eq("id", id).maybeSingle(),
    supabase
      .from("community_replies")
      .select("id, created_at, edited_at, author_id, body, author:profiles(full_name, avatar_url)")
      .eq("post_id", id)
      .order("created_at", { ascending: true })
      .limit(500),
  ]);
  if (error) console.error("getPost:", error.message);
  if (!post) return null;
  return { post: post as unknown as PostRow, replies: (replies as unknown as ReplyRow[] | null) ?? [] };
}

export async function countMemberPosts(userId: string) {
  const supabase = await createClient();
  const { count } = await supabase.from("community_posts").select("id", { count: "exact", head: true }).eq("author_id", userId);
  return count ?? 0;
}
