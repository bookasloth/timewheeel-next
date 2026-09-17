import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Blog comment -> email for moderation (no public DB). Same SMTP env as leads.
// Comments are emailed to LEAD_TO; approve and add them to the post's
// frontmatter `comments:` array to publish. Persisting live user comments would
// need a datastore, this keeps it spam-safe and human-moderated for now.

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 5;
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX;
}
const clean = (s: unknown) => (typeof s === "string" ? s.trim().slice(0, 3000) : "");

export async function POST(request: Request) {
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(b.company_website)) return NextResponse.json({ ok: true }); // honeypot

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many comments. Try again shortly." }, { status: 429 });
  }

  const name = clean(b.name);
  const email = clean(b.email);
  const comment = clean(b.comment);
  const postTitle = clean(b.postTitle);
  const postSlug = clean(b.postSlug);
  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (comment.length < 5) return NextResponse.json({ error: "Comment is too short." }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, LEAD_FROM, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_TO) {
    console.error("Comment email not configured: missing SMTP_* / LEAD_TO.");
    return NextResponse.json({ error: "Couldn't submit your comment. Please try again later." }, { status: 500 });
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
      replyTo: `${name} <${email}>`,
      subject: `New blog comment on "${postTitle}"`,
      text: [
        `New comment (pending moderation)`,
        `Post: ${postTitle} (/blog/${postSlug})`,
        `From: ${name} <${email}>`,
        "",
        comment,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Comment email failed:", err);
    return NextResponse.json({ error: "Couldn't submit your comment. Please try again." }, { status: 502 });
  }
}
