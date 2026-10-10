import { after, NextResponse } from "next/server";
import { getProgram, programPath, STAGES, type Stage } from "@/lib/academy";
import { saveAcademyInterest } from "@/lib/academy-store";
import type { Attribution } from "@/lib/attribution";
import { resolveAttribution, summarizeCampaign } from "@/lib/attribution-server";
import { academyInterest, teamAcademyInterest } from "@/lib/email/templates";
import { checkHoneypot } from "@/lib/honeypot";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/resend-email";
import { site } from "@/lib/site";
import { sendSmtp, sendTeamMail } from "@/lib/smtp";

// Academy interest registration. Deliberately separate from /api/lead: students
// aren't business leads, so they get their own table (one row per email per
// program, enforced by a unique key) and never fire the Meta/GA4 Lead
// conversion that ad campaigns optimise on.
//
// Flow: bot trap -> rate limit -> validate -> save. New row: reply now, emails
// after the response. Duplicate: friendly "already registered", no emails.
// DB unavailable: the team email becomes the only copy, so wait for it.

export const runtime = "nodejs";

const LIMIT = { windowSeconds: 10 * 60, max: 5 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?: unknown;
  email?: unknown;
  institution?: unknown;
  stage?: unknown;
  program?: unknown;
  attribution?: Attribution;
  hp_x?: unknown;
  hp_t?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "");

type Field = "name" | "email" | "institution" | "stage" | "program";
const fail = (error: string, field?: Field, status = 400) => NextResponse.json({ error, field }, { status });

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return fail("Invalid request.");
  }

  // Filled fast: a bot. Pretend success, store nothing, log enough to recover.
  const hp = checkHoneypot(body as Record<string, unknown>);
  if (hp.verdict === "bot") {
    console.warn("[honeypot] dropped /api/academy/interest", JSON.stringify({ ms: hp.ms, program: str(body.program, 80) }));
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request);
  if (await isRateLimited(`academy:${ip}`, LIMIT)) {
    return fail("Too many attempts. Please try again in a few minutes.", undefined, 429);
  }

  // Server-side validation is the real check; the form's is only for speed.
  const name = str(body.name, 200);
  const email = str(body.email, 300).toLowerCase();
  const institution = str(body.institution, 300);
  const stage = str(body.stage, 60);
  const program = getProgram(str(body.program, 80));

  if (!name) return fail("Please enter your name.", "name");
  if (name.length > 120) return fail("Please shorten your name to 120 characters.", "name");
  if (!EMAIL.test(email) || email.length > 200) return fail("Please enter a valid email address.", "email");
  if (institution.length > 160) return fail("Please shorten the institution name to 160 characters.", "institution");
  if (stage && !STAGES.includes(stage as Stage)) return fail("Please pick a stage from the list.", "stage");
  if (!program) return fail("Please choose a program.", "program");

  const attribution = resolveAttribution(body.attribution, request.headers.get("cookie"));
  const row = {
    name,
    email,
    institution: institution || undefined,
    stage: stage || undefined,
    program_slug: program.slug,
  };

  const result = await saveAcademyInterest(row, attribution);

  if (result === "duplicate") {
    return NextResponse.json({ ok: true, duplicate: true, program: program.shortTitle });
  }

  const flag =
    hp.verdict === "suspect"
      ? `Hidden bot-trap field was filled (${hp.ms}ms after the form showed). Probably autofill; sanity-check before replying.`
      : undefined;
  const team = () =>
    sendTeamMail(
      teamAcademyInterest({
        name,
        email,
        institution: row.institution,
        stage: row.stage,
        program: program.title,
        campaign: summarizeCampaign(attribution) || undefined,
        saved: result === "saved",
        flag,
      }),
      `${name} <${email}>`,
    );
  // The confirmation is a personal note, sent from the team mailbox so Gmail
  // files it under Primary (via Resend it landed in Promotions). Resend is
  // the fallback when SMTP is down.
  const student = async () => {
    const mail = academyInterest({
      name,
      program: program.title,
      programUrl: `${site.url}${programPath(program)}`,
      enrolling: program.status === "enrolling",
    });
    return (await sendSmtp(email, mail, { fromName: "Timewheel Academy" })) || sendEmail(email, mail);
  };

  if (result === "saved") {
    after(() => Promise.allSettled([team(), student()]));
    return NextResponse.json({ ok: true, program: program.shortTitle });
  }

  // Not in the database: the team email is the only record, so only confirm
  // to the student once it has gone out.
  if (!(await team())) {
    return fail(
      `Sorry, we couldn't save your registration. Please try again, or email ${site.contact.email}.`,
      undefined,
      502,
    );
  }
  after(() => student());
  return NextResponse.json({ ok: true, program: program.shortTitle });
}
