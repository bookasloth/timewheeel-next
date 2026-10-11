"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Save or unsave a download for the signed-in member (RLS: own rows only). */
export async function toggleBookmark(downloadId: string, save: boolean) {
  if (!UUID.test(downloadId) || !(await getMember())) return;
  const supabase = await createClient();
  const { error } = save
    ? await supabase.from("download_bookmarks").upsert({ download_id: downloadId }, { onConflict: "user_id,download_id", ignoreDuplicates: true })
    : await supabase.from("download_bookmarks").delete().eq("download_id", downloadId);
  if (error) console.error("toggleBookmark:", error.message);
  revalidatePath("/members", "layout");
}
