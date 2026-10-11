"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";
import { communityCategories } from "@/lib/members/config";
import { isRateLimited } from "@/lib/rate-limit";

// Community writes. Members write as themselves (RLS checks authorship and
// locked threads); moderation by admins uses the service key after an explicit
// admin check.

export type PostState = { error?: string; field?: "title" | "body" | "category"; title?: string; body?: string; category?: string };
export type ReplyState = { error?: string; ok?: number; body?: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const clean = (s: unknown, max: number) =>
  String(s ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, max);

export async function createPost(_: PostState, fd: FormData): Promise<PostState> {
  const member = await getMember();
  if (!member) redirect("/login?next=/members/community/new");

  const title = clean(fd.get("title"), 160).replace(/\s+/g, " ");
  const body = clean(fd.get("body"), 10000);
  const category = String(fd.get("category") ?? "");
  const keep = { title, body, category };

  if (!communityCategories.some((c) => c.slug === category)) return { ...keep, error: "Choose a topic.", field: "category" };
  if (title.length < 3) return { ...keep, error: "Give your post a title (3 characters or more).", field: "title" };
  if (!body) return { ...keep, error: "Write something in your post.", field: "body" };
  if (await isRateLimited(`post:${member.id}`, { windowSeconds: 600, max: 5 })) {
    return { ...keep, error: "You've posted a lot in the last few minutes. Take a short break and try again." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("community_posts").insert({ title, body, category }).select("id").single();
  if (error || !data) {
    console.error("createPost:", error?.message);
    return { ...keep, error: "We couldn't publish your post. Please try again." };
  }
  revalidatePath("/members/community");
  redirect(`/members/community/${data.id}`);
}

export async function createReply(prev: ReplyState, fd: FormData): Promise<ReplyState> {
  const member = await getMember();
  const postId = String(fd.get("post_id") ?? "");
  if (!member) redirect(`/login?next=/members/community/${postId}`);
  if (!UUID.test(postId)) return { error: "This thread no longer exists." };

  const body = clean(fd.get("body"), 5000);
  if (!body) return { error: "Write a reply first." };
  if (await isRateLimited(`reply:${member.id}`, { windowSeconds: 600, max: 20 })) {
    return { body, error: "You've replied a lot in the last few minutes. Take a short break and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("community_replies").insert({ post_id: postId, body });
  if (error) {
    console.error("createReply:", error.message);
    // RLS refuses replies to locked threads.
    return { body, error: error.code === "42501" ? "This thread is locked, so it can't take new replies." : "We couldn't post your reply. Please try again." };
  }
  revalidatePath(`/members/community/${postId}`);
  return { ok: (prev.ok ?? 0) + 1 };
}

async function ownerOrAdmin(table: "community_posts" | "community_replies", id: string) {
  const member = await getMember();
  if (!member || !UUID.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase.from(table).select("author_id").eq("id", id).maybeSingle();
  if (!data) return null;
  if (data.author_id === member.id) return { client: supabase, member };
  if (member.isAdmin) return { client: createAdminClient(), member };
  return null;
}

export async function deletePost(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const who = await ownerOrAdmin("community_posts", id);
  if (!who) redirect("/members/community");
  const { error } = await who.client.from("community_posts").delete().eq("id", id);
  if (error) console.error("deletePost:", error.message);
  revalidatePath("/members/community");
  redirect("/members/community?deleted=1");
}

export async function deleteReply(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const postId = String(fd.get("post_id") ?? "");
  const who = await ownerOrAdmin("community_replies", id);
  if (who) {
    const { error } = await who.client.from("community_replies").delete().eq("id", id);
    if (error) console.error("deleteReply:", error.message);
  }
  revalidatePath(`/members/community/${postId}`);
}

export async function moderatePost(fd: FormData) {
  const member = await getMember();
  const id = String(fd.get("id") ?? "");
  const op = String(fd.get("op") ?? "");
  if (!member?.isAdmin || !UUID.test(id)) return;
  const patch =
    op === "pin" ? { pinned: true } : op === "unpin" ? { pinned: false } : op === "lock" ? { locked: true } : op === "unlock" ? { locked: false } : null;
  if (!patch) return;
  const { error } = await createAdminClient().from("community_posts").update(patch).eq("id", id);
  if (error) console.error("moderatePost:", error.message);
  revalidatePath(`/members/community/${id}`);
  revalidatePath("/members/community");
}
