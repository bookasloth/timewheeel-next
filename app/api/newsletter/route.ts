import { NextResponse } from "next/server";
import { Resend } from "resend";

// ponytail: no key => accept + log, so footer works before Resend is wired.
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.NEWSLETTER_TO;
  const from = process.env.RESEND_FROM;

  if (!key || !to || !from) {
    console.log("[newsletter] signup (no Resend configured):", email);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from,
      to,
      subject: "New newsletter signup",
      text: `New signup: ${email}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
