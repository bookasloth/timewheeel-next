import { NextResponse } from "next/server";
import { sendDeliveredEmail, sendUpsellEmail } from "@/lib/resend-email";

// Lifecycle email trigger. Sends the stage-appropriate lead email (delivered /
// upsell) via Resend when a lead advances through the funnel.
//
// Driven by a Supabase Database Webhook on the `leads` table (configured in the
// Supabase dashboard, no SQL needed): when the team changes a lead's `status` to
// `delivered` or `upsell`, Supabase POSTs the row here and the matching email goes
// out. Can also be called manually with {stage, email, name, site_url}.
//
// Protected by a shared secret header so the public can't trigger emails.
// Env (server-only): LIFECYCLE_SECRET (required — fails closed without it) and
// RESEND_API_KEY for the send.
export const runtime = "nodejs";

type LeadRecord = { status?: string; email?: string; name?: string; delivered_url?: string };
type Body = {
  // manual shape
  stage?: string;
  email?: string;
  name?: string;
  site_url?: string;
  // Supabase Database Webhook shape
  type?: string;
  table?: string;
  record?: LeadRecord;
  old_record?: LeadRecord;
};

function clean(s: unknown): string {
  return typeof s === "string" ? s.trim().slice(0, 500) : "";
}

export async function POST(request: Request) {
  // Fail closed: no secret configured -> route disabled.
  const secret = process.env.LIFECYCLE_SECRET;
  if (!secret) {
    console.error("Lifecycle route called but LIFECYCLE_SECRET is not set.");
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }
  if ((request.headers.get("x-lifecycle-secret") || "") !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Resolve the inputs from whichever shape we got.
  let stage: string;
  let email: string;
  let name: string;
  let siteUrl: string | undefined;

  if (body.record) {
    // Supabase webhook: only act when status actually changed.
    const newStatus = clean(body.record.status).toLowerCase();
    const oldStatus = clean(body.old_record?.status).toLowerCase();
    if (newStatus === oldStatus) return NextResponse.json({ ok: true, skipped: "no-status-change" });
    stage = newStatus;
    email = clean(body.record.email);
    name = clean(body.record.name);
    siteUrl = clean(body.record.delivered_url) || undefined;
  } else {
    stage = clean(body.stage).toLowerCase();
    email = clean(body.email);
    name = clean(body.name);
    siteUrl = clean(body.site_url) || undefined;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  let sent = false;
  switch (stage) {
    case "delivered":
      sent = await sendDeliveredEmail({ to: email, name, siteUrl });
      break;
    case "upsell":
      sent = await sendUpsellEmail({ to: email, name });
      break;
    default:
      // Other statuses (new, contacted, won, lost) have no lifecycle email.
      return NextResponse.json({ ok: true, skipped: stage || "unknown" });
  }

  if (!sent) return NextResponse.json({ error: "Email send failed." }, { status: 502 });
  return NextResponse.json({ ok: true, stage });
}
