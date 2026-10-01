// Transactional send via Resend (lead-facing emails). Separate from
// resend-contacts.ts (audience sync): this actually sends an email from
// team@timewheel.co.in through the verified Resend domain.
//
// Best-effort and dependency-free (direct REST, like the rest of the integrations).
// Requires RESEND_API_KEY + a verified sending domain (timewheel.co.in). Unset or
// unverified -> the send fails and we log, never throwing.
import { renderWelcomeEmailHtml, renderWelcomeEmailText } from "@/lib/lead-email";

const FROM = process.env.RESEND_FROM || "Timewheel <team@timewheel.co.in>";
const REPLY_TO = "team@timewheel.co.in";

function firstNameOf(full: string): string {
  return (full || "").trim().split(/\s+/)[0] || "";
}

// Welcome / confirmation email to a new free-website lead. Never throws.
export async function sendWelcomeEmail(opts: { to: string; name: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !opts.to) return false;

  const first = firstNameOf(opts.name);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [opts.to],
        reply_to: REPLY_TO,
        subject: "We've got your free website request 🎉",
        html: renderWelcomeEmailHtml(first),
        text: renderWelcomeEmailText(first),
      }),
    });
    if (!res.ok) {
      console.error("Resend welcome email failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend welcome email error:", err);
    return false;
  }
}
