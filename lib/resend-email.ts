// Transactional send via Resend: every email that goes from team@timewheel.co.in
// through the verified Resend domain. Separate from resend-contacts.ts (audience
// sync). Templates live in lib/email/templates.ts.
//
// Best-effort and dependency-free (direct REST, like the rest of the integrations).
// Requires RESEND_API_KEY + a verified sending domain (timewheel.co.in). Unset or
// unverified -> the send fails and we log, never throwing.
import type { Rendered } from "@/lib/email/layout";
import {
  academyInterest,
  challengeWelcome,
  enquiryReceived,
  growthUpsell,
  newsletterWelcome,
  seoReport,
  websiteLive,
} from "@/lib/email/templates";

const FROM = process.env.RESEND_FROM || "Timewheel <team@timewheel.co.in>";
const REPLY_TO = "team@timewheel.co.in";

// Low-level send. Returns true on a 2xx. Never throws.
export async function sendEmail(to: string | string[], email: Rendered, replyTo = REPLY_TO): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const list = (Array.isArray(to) ? to : [to]).filter(Boolean);
  if (!key || !list.length) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: list, reply_to: replyTo, subject: email.subject, html: email.html, text: email.text }),
    });
    if (!res.ok) {
      console.error("Resend send failed:", email.subject, res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send error:", email.subject, err);
    return false;
  }
}

// 30 Days, 30 Websites signup (free or paid price).
export const sendChallengeWelcome = (o: { to: string; name: string; business: string; price: number }) =>
  sendEmail(o.to, challengeWelcome(o));

// "We've got your enquiry" for every other lead form (growth blueprint included).
export const sendEnquiryReceived = (o: { to: string; name: string; service: string; business: string; message: string; blueprint?: boolean }) =>
  sendEmail(o.to, enquiryReceived(o));

// SEO audit "email me my fixes".
export const sendSeoReport = (o: Parameters<typeof seoReport>[0] & { to: string }) => sendEmail(o.to, seoReport(o));

// Academy "you're on the list" confirmation.
export const sendAcademyInterest = (o: Parameters<typeof academyInterest>[0] & { to: string }) =>
  sendEmail(o.to, academyInterest(o));

export const sendNewsletterWelcome =(to: string) => sendEmail(to, newsletterWelcome());

// Lifecycle: lead status -> delivered / upsell (see /api/lifecycle).
export const sendDeliveredEmail = (o: { to: string; name: string; siteUrl?: string }) => sendEmail(o.to, websiteLive(o));
export const sendUpsellEmail = (o: { to: string; name: string }) => sendEmail(o.to, growthUpsell(o));
