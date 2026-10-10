// Academy interest persistence (Supabase PostgREST, secret key, server only).
// Table: public.academy_interest, supabase/migrations/0005_academy_interest.sql.
// Mirrors lib/supabase-leads.ts: a direct fetch, no SDK, never throws.
import type { Attribution } from "@/lib/attribution";

export type AcademyInterestRow = {
  name: string;
  email: string; // lower-cased
  institution?: string;
  stage?: string;
  program_slug: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_path?: string;
};

/**
 * saved: new row written.
 * duplicate: this email already registered for this program (unique key).
 * unavailable: Supabase unset, table not migrated yet, or any other failure;
 *   the caller falls back to the team email.
 */
export type SaveResult = "saved" | "duplicate" | "unavailable";

export async function saveAcademyInterest(
  row: Omit<AcademyInterestRow, "utm_source" | "utm_medium" | "utm_campaign" | "referrer" | "landing_path">,
  a: Attribution = {},
): Promise<SaveResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return "unavailable";

  // Only the columns the table has; anything else in the attribution is dropped.
  const body: AcademyInterestRow = {
    ...row,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    referrer: a.referrer,
    landing_path: a.landing_path,
  };

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/academy_interest`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) return "saved";
    const text = await res.text().catch(() => "");
    // PostgREST maps a unique violation (Postgres 23505) to 409.
    if (res.status === 409 && (text.includes("23505") || text.includes("academy_interest_email_program_key"))) {
      return "duplicate";
    }
    console.error("Academy interest insert failed:", res.status, text);
    return "unavailable";
  } catch (err) {
    console.error("Academy interest insert error:", err);
    return "unavailable";
  }
}
