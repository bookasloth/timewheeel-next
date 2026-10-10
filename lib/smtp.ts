// Team notification over SMTP, the backup channel the lead routes already use.
// Same env as /api/lead: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO,
// optional LEAD_FROM and SMTP_SECURE. Resolves true when sent. Never throws.
import nodemailer from "nodemailer";
import type { Rendered } from "@/lib/email/layout";

export async function sendTeamMail(mail: Rendered, replyTo?: string): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, LEAD_FROM, SMTP_SECURE } = process.env;
  if (!(SMTP_HOST && SMTP_USER && SMTP_PASS && LEAD_TO)) {
    console.error("Team email not configured: missing SMTP_* / LEAD_TO env vars.");
    return false;
  }
  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  try {
    await transporter.sendMail({
      from: LEAD_FROM || SMTP_USER,
      to: LEAD_TO,
      ...(replyTo ? { replyTo } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return true;
  } catch (err) {
    console.error("Team email send failed:", err);
    return false;
  }
}
