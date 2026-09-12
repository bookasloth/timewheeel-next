import { NextResponse } from "next/server";

// Proxy for the SEO / AI-visibility audit tool (owned by us, deployed at
// shubhamdatarkar.com). The tool is a 3-step, id-based job:
//   POST /start {url}      -> { id }
//   POST /step  {id}       -> { status, progress }   (repeat until "ready")
//   GET  /{id}             -> full result
// We orchestrate all of that server-side so the browser makes ONE request and
// never hits CORS. Base URL is overridable via SEO_AUDIT_BASE.

export const runtime = "nodejs";
export const maxDuration = 60;

const BASE =
  process.env.SEO_AUDIT_BASE ?? "https://shubhamdatarkar.com/api/tools/seo-audit";

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProto);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const h = u.hostname.toLowerCase();
    if (h === "localhost" || h === "127.0.0.1" || h.endsWith(".local")) return null;
    if (!h.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function postJson(path: string, body: unknown, signal: AbortSignal) {
  return fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = normalizeUrl(searchParams.get("url") ?? "");
  if (!target) {
    return NextResponse.json(
      { error: "Please enter a valid website URL (e.g. yourbusiness.com)." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);
  try {
    // 1. start
    const startRes = await postJson("/start", { url: target }, controller.signal);
    if (!startRes.ok) throw new Error("start-failed");
    const { id } = await startRes.json();
    if (!id) throw new Error("no-id");

    // 2. poll step until ready (or failure). Cap iterations as a backstop.
    let status = "crawling";
    for (let i = 0; i < 30 && status !== "ready"; i++) {
      const stepRes = await postJson("/step", { id }, controller.signal);
      if (!stepRes.ok) throw new Error("step-failed");
      const step = await stepRes.json();
      status = step?.status ?? status;
      if (status === "error" || status === "failed") throw new Error("audit-failed");
      if (status !== "ready") await sleep(800);
    }
    if (status !== "ready") throw new Error("timeout");

    // 3. fetch result
    const resultRes = await fetch(`${BASE}/${id}`, { signal: controller.signal });
    if (!resultRes.ok) throw new Error("result-failed");
    const data = await resultRes.json();

    // Trim to what the widget needs: headline scores + top findings.
    return NextResponse.json({
      url: data.url ?? target,
      domain: data.domain ?? null,
      pageCount: data.pageCount ?? null,
      scores: {
        overall: data.scores?.overall ?? null,
        ai: data.scores?.ai ?? null,
        seo: data.scores?.seo ?? null,
        color: data.scores?.color ?? null,
      },
      findings: Array.isArray(data.findings)
        ? data.findings.slice(0, 4).map((f: Record<string, unknown>) => ({
            title: f.title,
            severity: f.severity,
            category: f.category,
            recommendation: f.recommendation,
          }))
        : [],
      findingsTotal: data.findingsTotal ?? (data.findings?.length ?? 0),
    });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: aborted
          ? "That audit took too long. Please try again."
          : "We couldn't complete the audit. Check the URL is public and try again.",
      },
      { status: aborted ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
