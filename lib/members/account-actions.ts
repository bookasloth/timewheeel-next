"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";
import { MEMBER_HINT_COOKIE } from "@/lib/members/config";
import { cookies } from "next/headers";

export type ProfileState = { error?: string; saved?: number };
export type DeleteState = { error?: string };

const clip = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().replace(/\s+/g, " ").slice(0, max);

export async function updateProfile(prev: ProfileState, fd: FormData): Promise<ProfileState> {
  const member = await getMember();
  if (!member) redirect("/login?next=/members/account");
  const name = clip(fd, "name", 120);
  if (!name) return { error: "Enter your name." };
  let website = clip(fd, "website", 200);
  if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;
  if (website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(website)) return { error: "That website address doesn't look right." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: name,
      headline: clip(fd, "headline", 120) || null,
      business_name: clip(fd, "business_name", 120) || null,
      website: website || null,
      city: clip(fd, "city", 80) || null,
      bio: String(fd.get("bio") ?? "").trim().slice(0, 1000) || null,
    })
    .eq("id", member.id);
  if (error) {
    console.error("updateProfile:", error.message);
    return { error: "We couldn't save that. Please try again." };
  }
  await supabase.auth.updateUser({ data: { full_name: name } });
  revalidatePath("/members", "layout");
  return { saved: (prev.saved ?? 0) + 1 };
}

export type PrefsState = { error?: string; saved?: number };

export async function updateEmailPrefs(prev: PrefsState, fd: FormData): Promise<PrefsState> {
  const member = await getMember();
  if (!member) redirect("/login?next=/members/account");
  const supabase = await createClient();
  const { error } = await supabase
    .from("memberships")
    .update({ email_prefs: { replies: fd.get("replies") === "on", announcements: fd.get("announcements") === "on" } })
    .eq("user_id", member.id);
  if (error) {
    console.error("updateEmailPrefs:", error.message);
    return { error: "We couldn't save your preferences. Please try again." };
  }
  revalidatePath("/members/account");
  return { saved: (prev.saved ?? 0) + 1 };
}

// Permanently removes the auth user. Profiles, memberships, posts and replies
// cascade with it; payment rows stay (tax records) with user_id set to null.
export async function deleteAccount(_: DeleteState, fd: FormData): Promise<DeleteState> {
  const member = await getMember();
  if (!member) redirect("/login");
  if (String(fd.get("confirm") ?? "").trim().toUpperCase() !== "DELETE") return { error: "Type DELETE to confirm." };

  try {
    const { error } = await createAdminClient().auth.admin.deleteUser(member.id);
    if (error) throw error;
  } catch (e) {
    console.error("deleteAccount:", e);
    return { error: "We couldn't delete your account automatically. Email team@timewheel.co.in and we'll delete it for you." };
  }

  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" }).catch(() => {});
  (await cookies()).delete(MEMBER_HINT_COOKIE);
  redirect("/?account=deleted");
}
