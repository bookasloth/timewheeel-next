// Server-side sync of CONSENTED leads into a Resend audience (the nurture list).
// This is the email-marketing side of the funnel: Supabase stays the CRM / source
// of truth (status, campaign, category), Resend just holds the email list that
// broadcasts and sequences send to.
//
// Only ever called for leads with marketing_consent === true, so we never add
// someone to a marketing list without opt-in. Dependency-free (direct REST, like
// the Supabase + Meta CAPI calls) and best-effort: a failure here must never cost
// us the lead, which is already stored and emailed.
//
// Required env (server-only): RESEND_API_KEY, RESEND_LEADS_AUDIENCE_ID.
// Unset -> no-op, so the site runs without Resend configured.

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  const first = parts.shift() ?? "";
  return { first, last: parts.join(" ") };
}

// Upsert a contact into the leads audience. Returns true on a 2xx. Never throws.
export function syncLeadContact(opts: { email: string; name: string; source: string }): Promise<boolean> {
  return syncContact(process.env.RESEND_LEADS_AUDIENCE_ID, opts);
}

// Newsletter subscribers get their own audience (RESEND_NEWSLETTER_AUDIENCE_ID),
// so marketing broadcasts and lead nurture stay separate lists.
export function syncNewsletterContact(email: string): Promise<boolean> {
  return syncContact(process.env.RESEND_NEWSLETTER_AUDIENCE_ID, { email, name: "" });
}

async function syncContact(audienceId: string | undefined, opts: { email: string; name: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !audienceId || !opts.email) return false; // not configured -> skip

  const { first, last } = splitName(opts.name);
  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      // Resend upserts by email within an audience; re-submitting is safe.
      body: JSON.stringify({
        email: opts.email,
        first_name: first || undefined,
        last_name: last || undefined,
        unsubscribed: false,
      }),
    });
    if (!res.ok) {
      console.error("Resend contact sync failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend contact sync error:", err);
    return false;
  }
}
