// Transactional send via Resend (lead-facing emails). Separate from
// resend-contacts.ts (audience sync): this actually sends an email from
// team@timewheel.co.in through the verified Resend domain.
//
// Best-effort and dependency-free (direct REST, like the rest of the integrations).
// Requires RESEND_API_KEY + a verified sending domain (timewheel.co.in). Unset or
// unverified -> the send fails and we log, never throwing.
import {
  renderWelcomeEmailHtml,
  renderWelcomeEmailText,
  renderDeliveredEmailHtml,
  renderDeliveredEmailText,
  renderUpsellEmailHtml,
  renderUpsellEmailText,
} from "@/lib/lead-email";

const FROM = process.env.RESEND_FROM || "Timewheel <team@timewheel.co.in>";
const REPLY_TO = "team@timewheel.co.in";

function firstNameOf(full: string): string {
  return (full || "").trim().split(/\s+/)[0] || "";
}

// Low-level send. Returns true on a 2xx. Never throws.
async function send(opts: { to: string; subject: string; html: string; text: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !opts.to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [opts.to],
        reply_to: REPLY_TO,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    });
    if (!res.ok) {
      console.error("Resend send failed:", opts.subject, res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send error:", opts.subject, err);
    return false;
  }
}

// Welcome / confirmation email to a new free-website lead.
export async function sendWelcomeEmail(opts: { to: string; name: string }): Promise<boolean> {
  const first = firstNameOf(opts.name);
  return send({
    to: opts.to,
    subject: "We've got your free website request 🎉",
    html: renderWelcomeEmailHtml(first),
    text: renderWelcomeEmailText(first),
  });
}

// "Your website is live" — lead status -> delivered.
export async function sendDeliveredEmail(opts: { to: string; name: string; siteUrl?: string }): Promise<boolean> {
  const first = firstNameOf(opts.name);
  return send({
    to: opts.to,
    subject: "Your website is live 🚀",
    html: renderDeliveredEmailHtml(first, opts.siteUrl),
    text: renderDeliveredEmailText(first, opts.siteUrl),
  });
}

// "Let's get you more customers" — lead status -> upsell.
export async function sendUpsellEmail(opts: { to: string; name: string }): Promise<boolean> {
  const first = firstNameOf(opts.name);
  return send({
    to: opts.to,
    subject: "Your site looks great, now let's get you found",
    html: renderUpsellEmailHtml(first),
    text: renderUpsellEmailText(first),
  });
}
