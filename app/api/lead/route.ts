import { NextResponse } from "next/server";
import crypto from "node:crypto";
import nodemailer from "nodemailer";
import {
  renderLeadEmailHtml,
  renderLeadEmailText,
  renderReportEmailHtml,
  renderReportEmailText,
} from "@/lib/lead-email";
import { site } from "@/lib/site";

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
  budget?: string; // "name your price" from the 30-day challenge; free text

  company_website?: string; // honeypot, humans never see or fill this
  // Optional: also email the lead their SEO report link (audit "get fixes" flow).
  sendReport?: boolean;
  domain?: string;
  scores?: { overall?: number | null; ai?: number | null; seo?: number | null };
  // Admin-only full findings + fixes, forwarded straight into the team email.
  findings?: Array<{ title?: string; severity?: string; category?: string; recommendation?: string }>;
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

// ── Meta Conversions API (server-side 'Lead') ────────────────────────────────
// The authoritative conversion signal: survives ad-blockers/ITP. Meta de-dupes
// this against the browser pixel 'Lead' on the shared event_id. Best-effort only:
// a failure here must never fail the lead submission.
const sha256 = (v?: string) =>
  v ? crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex") : undefined;

// Meta wants E.164 without the +; assume India (91) for bare 10-digit numbers.
function normPhone(raw?: string): string | undefined {
  if (!raw) return undefined;
  let d = raw.replace(/\D/g, "");
  if (d.length === 10) d = "91" + d;
  else if (d.length === 11 && d.startsWith("0")) d = "91" + d.slice(1);
  return d || undefined;
}

async function sendMetaCapiLead(opts: {
  eventId: string;
  email?: string;
  phone?: string;
  ip?: string;
  userAgent?: string;
  cookie?: string;
  sourceUrl?: string;
}) {
  const PIXEL = process.env.META_PIXEL_ID;
  const TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
  if (!PIXEL || !TOKEN) return; // not configured — silently skip
  const ver = process.env.META_GRAPH_VERSION || "v21.0";

  const cookie = opts.cookie || "";
  const fbp = /_fbp=([^;]+)/.exec(cookie)?.[1];
  let fbc = /_fbc=([^;]+)/.exec(cookie)?.[1];
  // Reconstruct fbc from an fbclid on the source URL if the cookie is absent.
  if (!fbc && opts.sourceUrl) {
    const fbclid = /[?&]fbclid=([^&]+)/.exec(opts.sourceUrl)?.[1];
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  const user_data: Record<string, unknown> = {};
  const em = sha256(opts.email);
  const ph = sha256(normPhone(opts.phone));
  if (em) user_data.em = [em];
  if (ph) user_data.ph = [ph];
  if (opts.ip) user_data.client_ip_address = opts.ip;
  if (opts.userAgent) user_data.client_user_agent = opts.userAgent;
  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        action_source: "website",
        event_source_url: opts.sourceUrl,
        user_data,
      },
    ],
  };

  try {
    await fetch(`https://graph.facebook.com/${ver}/${PIXEL}/events?access_token=${TOKEN}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Meta CAPI Lead failed:", err);
  }
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
      { error: "Sorry, we couldn't send your enquiry. Please email us directly." },
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
    budget: clean(body.budget) || undefined,
    source: clean(body.source) || "website",
    when: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short",
    }) + " IST",
  };

  // Admin-only: full findings + exact fixes, capped and cleaned.
  const findings = Array.isArray(body.findings)
    ? body.findings.slice(0, 30).map((f) => ({
        title: clean(f.title),
        severity: clean(f.severity),
        category: clean(f.category),
        recommendation: clean(f.recommendation),
      }))
    : undefined;
  const teamEmail = { ...l, findings };

  try {
    await transporter.sendMail({
      from: LEAD_FROM || SMTP_USER,
      to: LEAD_TO,
      replyTo: `${l.name} <${l.email}>`,
      subject: `New lead: ${l.service}, ${l.business} (${l.source})`,
      text: renderLeadEmailText(teamEmail),
      html: renderLeadEmailHtml(teamEmail),
    });

    // Optional second email TO the lead: their SEO report link. The report URL
    // is built server-side from our own domain so a client can't point it
    // elsewhere. Failure here must not fail the request — the team email is
    // already sent, so we log and carry on.
    if (body.sendReport) {
      const domain = clean(body.domain);
      const site_ = domain ? domain.replace(/^https?:\/\//i, "").replace(/\/.*$/, "") : "";
      if (site_) {
        const reportUrl = `${site.url}/seo-report?site=${encodeURIComponent(site_)}`;
        try {
          await transporter.sendMail({
            from: LEAD_FROM || SMTP_USER,
            to: l.email,
            subject: `Your SEO audit for ${site_} is ready`,
            text: renderReportEmailText({
              name: l.name,
              domain: site_,
              scores: {
                overall: body.scores?.overall ?? null,
                ai: body.scores?.ai ?? null,
                seo: body.scores?.seo ?? null,
              },
              reportUrl,
            }),
            html: renderReportEmailHtml({
              name: l.name,
              domain: site_,
              scores: {
                overall: body.scores?.overall ?? null,
                ai: body.scores?.ai ?? null,
                seo: body.scores?.seo ?? null,
              },
              reportUrl,
            }),
          });
        } catch (err) {
          console.error("Report email to lead failed:", err);
        }
      }
    }

    // Fire the server-side Meta CAPI 'Lead' (deduped with the browser pixel on
    // eventId). Best-effort: never fail the request over ad tracking.
    const eventId = crypto.randomUUID();
    await sendMetaCapiLead({
      eventId,
      email: l.email,
      phone: l.phone,
      ip: ip !== "unknown" ? ip : undefined,
      userAgent: request.headers.get("user-agent") || undefined,
      cookie: request.headers.get("cookie") || undefined,
      sourceUrl: request.headers.get("referer") || site.url,
    });

    return NextResponse.json({ ok: true, eventId });
  } catch (err) {
    console.error("Lead email send failed:", err);
    return NextResponse.json(
      { error: "Sorry, we couldn't send your enquiry. Please try again." },
      { status: 502 },
    );
  }
}
