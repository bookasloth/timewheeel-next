"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";

// Members mark their own notifications read; RLS limits every update to rows
// where user_id = auth.uid().

export async function markAllRead() {
  if (!(await getMember())) return;
  const supabase = await createClient();
  const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).is("read_at", null);
  if (error) console.error("markAllRead:", error.message);
  revalidatePath("/members", "layout");
}

export async function clearRead() {
  if (!(await getMember())) return;
  const supabase = await createClient();
  const { error } = await supabase.from("notifications").delete().not("read_at", "is", null);
  if (error) console.error("clearRead:", error.message);
  revalidatePath("/members/notifications");
}
