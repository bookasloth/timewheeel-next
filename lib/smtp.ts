// Mail over SMTP (the Google Workspace mailbox), the channel the lead routes
// already use for team notifications. Same env as /api/lead: SMTP_HOST,
// SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, optional LEAD_FROM and SMTP_SECURE.
// Resolves true when sent. Never throws.
//
// One-to-one mail sent this way reads to Gmail like a person writing, so it
// tends to land in Primary, where the same note sent through Resend was filed
// under Promotions. Resend stays the sender for designed and bulk mail.
import nodemailer from "nodemailer";
import type { Rendered } from "@/lib/email/layout";

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!(SMTP_HOST && SMTP_USER && SMTP_PASS)) return null;
  const port = Number(SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/** Send to anyone from the team mailbox. `fromName` sets the display name. */
export async function sendSmtp(
  to: string,
  mail: Rendered,
  opts: { replyTo?: string; fromName?: string } = {},
): Promise<boolean> {
  const t = transport();
  const address = process.env.LEAD_FROM || process.env.SMTP_USER;
  if (!t || !address || !to) {
    console.error("SMTP not configured: missing SMTP_* env vars.");
    return false;
  }
  // LEAD_FROM may already carry a display name ("Name <addr>"); keep it then.
  const from = opts.fromName && !address.includes("<") ? { name: opts.fromName, address } : address;
  try {
    await t.sendMail({
      from,
      to,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return true;
  } catch (err) {
    console.error("SMTP send failed:", mail.subject, err);
    return false;
  }
}

/** Notify the team inbox (LEAD_TO). */
export async function sendTeamMail(mail: Rendered, replyTo?: string): Promise<boolean> {
  const to = process.env.LEAD_TO;
  if (!to) {
    console.error("Team email not configured: missing LEAD_TO.");
    return false;
  }
  return sendSmtp(to, mail, { replyTo });
}
