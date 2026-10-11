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

export type NewsletterContact = { id: string; email: string; first_name?: string | null; last_name?: string | null; created_at: string; unsubscribed: boolean };

/** Everyone in the newsletter audience (admin Subscribers page). null = Resend not configured or unreachable. */
export async function listNewsletterContacts(): Promise<NewsletterContact[] | null> {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
  if (!key || !audienceId) return null;
  const out: NewsletterContact[] = [];
  let after = "";
  try {
    // Paged (100 at a time); stop at 5,000 as a safety cap.
    for (let page = 0; page < 50; page++) {
      const qs = new URLSearchParams({ limit: "100", ...(after ? { after } : {}) });
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts?${qs}`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("Resend list contacts failed:", res.status, await res.text().catch(() => ""));
        return out.length ? out : null;
      }
      const body = (await res.json()) as { data?: NewsletterContact[]; has_more?: boolean };
      const batch = body.data ?? [];
      out.push(...batch);
      if (!body.has_more || !batch.length) break;
      after = batch[batch.length - 1].id;
    }
    return out.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  } catch (err) {
    console.error("Resend list contacts error:", err);
    return out.length ? out : null;
  }
}

/** Remove one contact from the newsletter audience. */
export async function removeNewsletterContact(contactId: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
  if (!key || !audienceId) return false;
  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(contactId)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) console.error("Resend remove contact failed:", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (err) {
    console.error("Resend remove contact error:", err);
    return false;
  }
}
