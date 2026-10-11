"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";
import { LIFETIME_YEAR } from "@/lib/members/config";

// Admin-only writes, using the service key. Every action re-checks the caller
// is an admin first: server actions are public POST endpoints.

const BUCKET = "member-downloads";
const MAX_BYTES = 50 * 1024 * 1024;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function admin() {
  const member = await getMember();
  if (!member?.isAdmin) throw new Error("Not allowed");
  return { member, db: createAdminClient() };
}

function safeFileName(name: string) {
  const base = name.normalize("NFKD").replace(/[^\w.\- ]+/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(-120);
  return base.replace(/^[.-]+/, "") || "file";
}

/** Step 1 of an upload: a one-time URL the browser PUTs the file to directly,
 * so big files never pass through a Vercel function (4.5 MB body cap). */
export async function startUpload(input: { name: string; size: number }): Promise<{ path: string; url: string } | { error: string }> {
  try {
    const { db } = await admin();
    if (!input.size || input.size > MAX_BYTES) return { error: "Files must be under 50 MB." };
    const path = `${randomUUID()}/${safeFileName(input.name)}`;
    const { data, error } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error || !data) throw error ?? new Error("No upload URL");
    return { path, url: data.signedUrl };
  } catch (e) {
    console.error("startUpload:", e);
    return { error: "Couldn't start the upload. Check the storage bucket exists (migration 0006)." };
  }
}

export type DownloadFormState = { error?: string; saved?: number };

/** Step 2: record the uploaded file in the catalog. */
export async function saveDownload(prev: DownloadFormState, fd: FormData): Promise<DownloadFormState> {
  let ctx;
  try {
    ctx = await admin();
  } catch {
    return { error: "Only admins can add downloads." };
  }
  const title = String(fd.get("title") ?? "").trim().slice(0, 160);
  const description = String(fd.get("description") ?? "").trim().slice(0, 2000) || null;
  const category = String(fd.get("category") ?? "").trim().slice(0, 60) || "General";
  const tier = fd.get("tier") === "premium" ? "premium" : "free";
  const path = String(fd.get("file_path") ?? "");
  const fileName = String(fd.get("file_name") ?? "").slice(0, 200);
  const size = Number(fd.get("file_size")) || null;
  const type = String(fd.get("content_type") ?? "").slice(0, 120) || null;

  if (title.length < 2) return { error: "Add a title." };
  if (!/^[0-9a-f-]{36}\/[\w.\- ]+$/i.test(path) || !fileName) return { error: "Upload a file first." };

  // The file must really be in the bucket before it's listed.
  const folder = path.split("/")[0];
  const { data: objects } = await ctx.db.storage.from(BUCKET).list(folder, { limit: 5 });
  if (!objects?.some((o) => `${folder}/${o.name}` === path)) return { error: "The upload didn't finish. Try the file again." };

  const { error } = await ctx.db.from("downloads").insert({
    title,
    description,
    category,
    tier,
    file_path: path,
    file_name: fileName,
    file_size: size,
    content_type: type,
  });
  if (error) {
    console.error("saveDownload:", error.message);
    return { error: "Couldn't save the download. Please try again." };
  }
  revalidatePath("/members", "layout");
  return { saved: (prev.saved ?? 0) + 1 };
}

export async function updateDownload(fd: FormData) {
  const { db } = await admin();
  const id = String(fd.get("id") ?? "");
  const op = String(fd.get("op") ?? "");
  if (!UUID.test(id)) return;

  if (op === "delete") {
    const { data } = await db.from("downloads").select("file_path").eq("id", id).maybeSingle();
    await db.from("downloads").delete().eq("id", id);
    if (data?.file_path) await db.storage.from(BUCKET).remove([data.file_path]);
  } else {
    const patch =
      op === "publish" ? { published: true } : op === "unpublish" ? { published: false } : op === "free" ? { tier: "free" } : op === "premium" ? { tier: "premium" } : null;
    if (patch) await db.from("downloads").update(patch).eq("id", id);
  }
  revalidatePath("/members", "layout");
}

export async function setPremium(fd: FormData) {
  const { db } = await admin();
  const userId = String(fd.get("user_id") ?? "");
  const op = String(fd.get("op") ?? "");
  if (!UUID.test(userId)) return;

  if (op === "revoke") {
    await db.from("memberships").upsert({ user_id: userId, premium_until: null, premium_source: null, updated_at: new Date().toISOString() });
  } else if (op === "lifetime") {
    await db
      .from("memberships")
      .upsert({ user_id: userId, premium_until: `${LIFETIME_YEAR}-12-31T00:00:00Z`, premium_source: "admin", updated_at: new Date().toISOString() });
  } else {
    const days = op === "30" ? 30 : op === "365" ? 365 : 0;
    if (!days) return;
    const { error } = await db.rpc("grant_premium", { p_user: userId, p_days: days, p_source: "admin" });
    if (error) console.error("grant_premium:", error.message);
  }
  revalidatePath("/members/admin/members");
}

export async function setRole(fd: FormData) {
  const { db, member } = await admin();
  const userId = String(fd.get("user_id") ?? "");
  const role = fd.get("role") === "admin" ? "admin" : "member";
  // Never let an admin lock themselves out by accident.
  if (!UUID.test(userId) || (userId === member.id && role === "member")) return;
  await db.from("memberships").upsert({ user_id: userId, role, updated_at: new Date().toISOString() });
  revalidatePath("/members/admin/members");
}
