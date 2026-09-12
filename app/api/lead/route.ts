import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderLeadEmailHtml, renderLeadEmailText } from "@/lib/lead-email";

// Lead capture -> email over SMTP. Credentials come from env so nothing secret
// lives in the repo. Required env:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO
// Optional: LEAD_FROM (defaults to SMTP_USER), SMTP_SECURE ("true" for port 465).

export const runtime = "nodejs";

type Lead = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  website?: string;
  service?: string;
  message?: string;
  source?: string;
  company_website?: string; // honeypot — humans never see or fill this
};

// Best-effort in-memory rate limit. ponytail: per-instance only; move to a
// shared store (Redis/Upstash) if this ever runs on multiple instances.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX;
}

function clean(s: unknown): string {
  return typeof s === "string" ? s.trim().slice(0, 2000) : "";
}

function validate(l: Lead): string | null {
  if (!clean(l.name)) return "Name is required.";
  if (!clean(l.business)) return "Business name is required.";
  const email = clean(l.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "A valid email is required.";
  if (!clean(l.phone)) return "Phone is required.";
  if (!clean(l.service)) return "Please select a service.";
  if (clean(l.message).length < 10) return "Message is too short.";
  return null;
}

export async function POST(request: Request) {
  let body: Lead;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a bot filled the hidden field. Pretend success, send nothing.
  if (clean(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const problem = validate(body);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, LEAD_FROM, SMTP_SECURE } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_TO) {
    console.error("Lead email not configured: missing SMTP_* / LEAD_TO env vars.");
    return NextResponse.json(
      { error: "Sorry — we couldn't send your enquiry. Please email us directly." },
      { status: 500 },
    );
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const l = {
    name: clean(body.name),
    business: clean(body.business),
    email: clean(body.email),
    phone: clean(body.phone),
    website: clean(body.website),
    service: clean(body.service),
    message: clean(body.message),
    source: clean(body.source) || "website",
    when: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short",
    }) + " IST",
  };

  try {
    await transporter.sendMail({
      from: LEAD_FROM || SMTP_USER,
      to: LEAD_TO,
      replyTo: `${l.name} <${l.email}>`,
      subject: `New lead: ${l.service} — ${l.business} (${l.source})`,
      text: renderLeadEmailText(l),
      html: renderLeadEmailHtml(l),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead email send failed:", err);
    return NextResponse.json(
      { error: "Sorry — we couldn't send your enquiry. Please try again." },
      { status: 502 },
    );
  }
}
