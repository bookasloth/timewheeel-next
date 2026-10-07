import { NextResponse } from "next/server";
import { syncNewsletterContact } from "@/lib/resend-contacts";
import { sendEmail, sendNewsletterWelcome } from "@/lib/resend-email";

// Footer / blog newsletter signup: welcome email to the subscriber, upsert into
// the Resend newsletter audience (RESEND_NEWSLETTER_AUDIENCE_ID) for broadcasts,
// and a heads-up to NEWSLETTER_TO. All best-effort: Resend not configured ->
// accept + log, so the form never breaks.
export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { email: raw } = await req.json().catch(() => ({ email: "" }));
  const email = typeof raw === "string" ? raw.trim().slice(0, 200) : "";
  if (!EMAIL.test(email)) return NextResponse.json({ error: "invalid email" }, { status: 400 });

  if (!process.env.RESEND_API_KEY) {
    console.log("[newsletter] signup (no Resend configured):", email);
    return NextResponse.json({ ok: true });
  }

  const team = process.env.NEWSLETTER_TO;
  await Promise.all([
    sendNewsletterWelcome(email),
    syncNewsletterContact(email),
    team
      ? sendEmail(team, { subject: "New newsletter signup", html: `<p>New signup: ${email.replace(/</g, "&lt;")}</p>`, text: `New signup: ${email}` }, email)
      : Promise.resolve(false),
  ]);
  return NextResponse.json({ ok: true });
}
