import "server-only";
import { cache } from "react";
import { createAdminClient, createClient } from "@/lib/supabase/server";

// Reads for member pages. Most run as the signed-in member so RLS decides what
// comes back; the few that need private columns (premium status of other
// members, download history, receipts) use the service key and return only
// what the page shows. Failures return empty results and log, so a page
// renders an empty state instead of crashing.

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
  cover_path: string | null;
  /** Short-lived signed URL for an uploaded cover image, if any. */
  cover_url?: string | null;
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

export type Badge = "premium" | "team";

export type NotificationRow = {
  id: string;
  created_at: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
};

const DOWNLOAD_COLS = "id, created_at, title, description, category, tier, file_name, file_size, content_type, cover_path";
const POST_COLS =
  "id, created_at, edited_at, author_id, category, title, body, pinned, locked, reply_count, last_activity_at, author:profiles(full_name, avatar_url)";

export const POSTS_PER_PAGE = 20;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ---------------------------------------------------------------- downloads

async function withCovers(rows: DownloadRow[]): Promise<DownloadRow[]> {
  const paths = rows.map((r) => r.cover_path).filter((p): p is string => Boolean(p));
  if (!paths.length) return rows;
  try {
    const { data } = await createAdminClient().storage.from("member-downloads").createSignedUrls(paths, 3600);
    const byPath = new Map((data ?? []).map((d) => [d.path, d.signedUrl]));
    return rows.map((r) => ({ ...r, cover_url: r.cover_path ? (byPath.get(r.cover_path) ?? null) : null }));
  } catch (e) {
    console.error("cover urls:", e);
    return rows;
  }
}

export async function listDownloads(tier?: "free" | "premium", limit = 200): Promise<DownloadRow[]> {
  const supabase = await createClient();
  let q = supabase
    .from("downloads")
    .select(DOWNLOAD_COLS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (tier) q = q.eq("tier", tier);
  const { data, error } = await q;
  if (error) console.error("listDownloads:", error.message);
  return withCovers((data as DownloadRow[] | null) ?? []);
}

export async function latestDownloads(limit = 3): Promise<DownloadRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("downloads").select(DOWNLOAD_COLS).order("created_at", { ascending: false }).limit(limit);
  if (error) console.error("latestDownloads:", error.message);
  return withCovers((data as DownloadRow[] | null) ?? []);
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

// ---------------------------------------------------------------- community

export async function listPosts(opts: { category?: string; page?: number; limit?: number; authorId?: string } = {}) {
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
  if (opts.authorId) q = q.eq("author_id", opts.authorId);
  const { data, error, count } = await q;
  if (error) console.error("listPosts:", error.message);
  return { posts: (data as unknown as PostRow[] | null) ?? [], total: count ?? 0 };
}

export async function getPost(id: string): Promise<{ post: PostRow; replies: ReplyRow[] } | null> {
  if (!UUID.test(id)) return null;
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

/** "premium" or "team" labels for a set of members (no other private data leaves the server). */
export async function getBadges(ids: string[]): Promise<Record<string, Badge>> {
  const unique = [...new Set(ids)].filter((id) => UUID.test(id));
  if (!unique.length) return {};
  try {
    const { data } = await createAdminClient().from("memberships").select("user_id, role, premium_until").in("user_id", unique);
    const now = Date.now();
    const out: Record<string, Badge> = {};
    for (const m of data ?? []) {
      if (m.role === "admin") out[m.user_id] = "team";
      else if (m.premium_until && new Date(m.premium_until).getTime() > now) out[m.user_id] = "premium";
    }
    return out;
  } catch (e) {
    console.error("getBadges:", e);
    return {};
  }
}

// ------------------------------------------------------------ notifications

export const getNotificationSummary = cache(async (): Promise<{ unread: number; latest: NotificationRow[] }> => {
  const supabase = await createClient();
  const [{ count }, { data, error }] = await Promise.all([
    supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null),
    supabase.from("notifications").select("id, created_at, type, title, body, link, read_at").order("created_at", { ascending: false }).limit(6),
  ]);
  if (error) return { unread: 0, latest: [] };
  return { unread: count ?? 0, latest: (data as NotificationRow[] | null) ?? [] };
});

export async function listNotifications(limit = 100): Promise<NotificationRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("id, created_at, type, title, body, link, read_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) console.error("listNotifications:", error.message);
  return (data as NotificationRow[] | null) ?? [];
}

// ------------------------------------------------------------------- search

export async function searchAll(q: string) {
  const needle = q.replace(/[%,()*]/g, " ").trim().slice(0, 60);
  if (needle.length < 2) return { posts: [], downloads: [] };
  const supabase = await createClient();
  const like = `%${needle}%`;
  const [posts, downloads] = await Promise.all([
    supabase.from("community_posts").select(POST_COLS).or(`title.ilike.${like},body.ilike.${like}`).order("last_activity_at", { ascending: false }).limit(10),
    supabase.from("downloads").select(DOWNLOAD_COLS).or(`title.ilike.${like},description.ilike.${like},category.ilike.${like}`).limit(10),
  ]);
  return {
    posts: (posts.data as unknown as PostRow[] | null) ?? [],
    downloads: await withCovers((downloads.data as DownloadRow[] | null) ?? []),
  };
}

// --------------------------------------------------------------- onboarding

export async function getOnboarding(memberId: string, profile: { headline: string; bio: string; business_name: string }) {
  const supabase = await createClient();
  const [intro, anyPost, anyReply, downloads] = await Promise.all([
    supabase.from("community_posts").select("id", { count: "exact", head: true }).eq("author_id", memberId).eq("category", "introductions"),
    supabase.from("community_posts").select("id", { count: "exact", head: true }).eq("author_id", memberId),
    supabase.from("community_replies").select("id", { count: "exact", head: true }).eq("author_id", memberId),
    createAdminClient()
      .from("download_events")
      .select("id", { count: "exact", head: true })
      .eq("user_id", memberId)
      .then((r) => r, () => ({ count: 0 })),
  ]);
  return [
    { key: "profile", label: "Complete your profile", hint: "Add a headline or a short bio so members know who you are.", href: "/members/account#profile", done: Boolean(profile.headline || profile.bio || profile.business_name) },
    { key: "intro", label: "Introduce yourself", hint: "Say hello in Introductions: who you are and what you're working on.", href: "/members/community/new?topic=introductions", done: (intro.count ?? 0) > 0 },
    { key: "download", label: "Get your first download", hint: "Grab the free Local SEO Checklist or anything else in the library.", href: "/members/free-downloads", done: (downloads.count ?? 0) > 0 },
    { key: "engage", label: "Join a conversation", hint: "Reply to a post or ask a question in the community.", href: "/members/community", done: (anyReply.count ?? 0) > 0 || (anyPost.count ?? 0) > (intro.count ?? 0) },
  ];
}

// ----------------------------------------------------------------- receipts

export async function listReceipts(memberId: string) {
  try {
    const { data } = await createAdminClient()
      .from("payments")
      .select("id, purpose, amount, currency, paid_at, provider_payment_id")
      .eq("user_id", memberId)
      .eq("status", "paid")
      .order("paid_at", { ascending: false })
      .limit(50);
    return (data ?? []).map((r) => ({ ...r, amount: Number(r.amount) })) as {
      id: string;
      purpose: string;
      amount: number;
      currency: string;
      paid_at: string | null;
      provider_payment_id: string | null;
    }[];
  } catch (e) {
    console.error("listReceipts:", e);
    return [];
  }
}

// ---------------------------------------------------------------- bookmarks

export async function listBookmarkIds(): Promise<Set<string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("download_bookmarks").select("download_id").limit(500);
  if (error) return new Set();
  return new Set((data ?? []).map((r) => r.download_id as string));
}

export async function listBookmarks(limit = 5): Promise<DownloadRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("download_bookmarks")
    .select(`created_at, download:downloads(${DOWNLOAD_COLS})`)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return ((data ?? []) as unknown as { download: DownloadRow | null }[]).map((r) => r.download).filter((d): d is DownloadRow => Boolean(d));
}

export async function listCategories(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("downloads").select("category").limit(500);
  return [...new Set((data ?? []).map((r) => r.category as string))].sort();
}
