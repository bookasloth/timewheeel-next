// Server-side lead persistence to Supabase (PostgREST). The authoritative lead
// store: survives even if the notification email fails, and is what later lets us
// segment, dedupe and drive the Lead -> Contacted -> Delivered -> Upsell flow.
//
// Dependency-free on purpose: a direct fetch with the secret (service-role) key,
// mirroring how app/api/lead/route.ts talks to the Meta CAPI. The secret key
// bypasses RLS, so the browser never sees it and the table stays locked down.
//
// Required env (server-only, NOT NEXT_PUBLIC): SUPABASE_URL, SUPABASE_SECRET_KEY.
// Unset -> this silently no-ops so the site keeps working without a database.
import type { Attribution } from "@/lib/attribution";

export type LeadRow = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website?: string;
  service: string;
  message: string;
  budget?: string;
  category?: string;
  location?: string;
  marketing_consent?: boolean;
  source: string;
  event_id?: string;
  // attribution
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_path?: string;
  // request context
  ip?: string;
  user_agent?: string;
};

// Best-effort insert. Returns true on a 2xx, false otherwise. Never throws: a
// database hiccup must not fail the lead submission (the email is the backup).
export async function saveLead(
  lead: Omit<LeadRow, keyof Attribution>,
  attribution: Attribution = {},
): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return false; // not configured -> skip

  const { first_seen, ...attr } = attribution;
  void first_seen; // stored implicitly as created_at; not a column

  const row: LeadRow = { ...lead, ...attr };

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("Supabase lead insert failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Supabase lead insert error:", err);
    return false;
  }
}

// Live count of leads for a given source, for the public "spots filled" counter.
// Cached via ISR (revalidate) so it stays near-live without a DB hit per request.
// Counts from the response BODY (ids, capped at `cap`) rather than the
// Content-Range header, because Next's cached fetch does not preserve that header.
// `cap` bounds the rows fetched: the counter only ever shows up to TOTAL, so a
// small cap is all we need. Returns 0 when unconfigured or on any error.
export async function countLeadsBySource(
  source: string,
  cap = 1000,
  revalidateSeconds = 60,
): Promise<number> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return 0;
  try {
    const res = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/leads?source=eq.${encodeURIComponent(source)}&select=id&limit=${cap}`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: revalidateSeconds },
      },
    );
    if (!res.ok) return 0;
    const rows = (await res.json()) as unknown[];
    return Array.isArray(rows) ? rows.length : 0;
  } catch {
    return 0;
  }
}
