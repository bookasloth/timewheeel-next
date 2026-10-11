"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";
import { removeNewsletterContact } from "@/lib/resend-contacts";

// Admin inbox writes: enquiry status and deletion, newsletter removals.
// Server actions are public endpoints, so each one checks for an admin.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STATUSES = new Set(["new", "contacted", "delivered", "upsell", "won", "lost"]);

async function admin() {
  const member = await getMember();
  if (!member?.isAdmin) throw new Error("Not allowed");
  return createAdminClient();
}

/** Note: moving a lead to "delivered" or "upsell" fires the lifecycle email to
 * the customer (database trigger from migration 0002). */
export async function setLeadStatus(id: string, status: string, deliveredUrl?: string): Promise<{ error?: string }> {
  try {
    const db = await admin();
    if (!UUID.test(id) || !STATUSES.has(status)) return { error: "Unknown enquiry or status." };
    const patch: Record<string, unknown> = { status };
    if (status === "delivered") {
      const url = String(deliveredUrl ?? "").trim();
      if (!/^https?:\/\/\S+\.\S+/i.test(url)) return { error: "Add the live website address (https://...) before marking it delivered." };
      patch.delivered_url = url.slice(0, 300);
    }
    const { error } = await db.from("leads").update(patch).eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/admin/inbox", "layout");
    return {};
  } catch {
    return { error: "Only admins can change enquiries." };
  }
}

export async function deleteLead(id: string): Promise<{ error?: string }> {
  try {
    const db = await admin();
    if (!UUID.test(id)) return { error: "Unknown enquiry." };
    const { error } = await db.from("leads").delete().eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/admin/inbox", "layout");
    return {};
  } catch {
    return { error: "Only admins can delete enquiries." };
  }
}

export async function removeSubscriber(contactId: string): Promise<{ error?: string }> {
  try {
    await admin();
    if (!/^[0-9a-f-]{36}$/i.test(contactId)) return { error: "Unknown subscriber." };
    const ok = await removeNewsletterContact(contactId);
    if (!ok) return { error: "Resend didn't accept the removal. Try again." };
    revalidatePath("/admin/subscribers");
    return {};
  } catch {
    return { error: "Only admins can remove subscribers." };
  }
}
