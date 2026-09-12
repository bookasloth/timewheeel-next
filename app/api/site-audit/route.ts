import { NextResponse } from "next/server";

// Live site audit — proxies Google PageSpeed Insights server-side so the API
// key stays hidden and there's no CORS. Returns the four Lighthouse category
// scores + a couple of headline metrics for the given URL (mobile strategy).
//
// PAGESPEED_API_KEY is optional; without it PSI still works but is rate-limited.

export const runtime = "nodejs";
export const maxDuration = 60; // PSI can take 20–40s on a cold/slow site.

const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProto);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    // Reject obvious non-public hosts — PSI can't reach them anyway, and a
    // bare word ("test") with no dot isn't a real domain.
    const h = u.hostname.toLowerCase();
    if (h === "localhost" || h === "127.0.0.1" || h.endsWith(".local")) return null;
    if (!h.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

function pct(score: number | undefined): number | null {
  return typeof score === "number" ? Math.round(score * 100) : null;
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

  const psiUrl = new URL(PSI);
  psiUrl.searchParams.set("url", target);
  psiUrl.searchParams.set("strategy", "mobile");
  for (const c of ["performance", "accessibility", "seo", "best-practices"]) {
    psiUrl.searchParams.append("category", c);
  }
  const key = process.env.PAGESPEED_API_KEY;
  if (key) psiUrl.searchParams.set("key", key);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);
  try {
    const res = await fetch(psiUrl, { signal: controller.signal });
    if (!res.ok) {
      const status = res.status === 429 ? 429 : 502;
      const msg =
        res.status === 429
          ? "We're running a lot of audits right now — try again in a minute."
          : "We couldn't reach that site. Check the URL is public and try again.";
      return NextResponse.json({ error: msg }, { status });
    }
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories ?? {};
    const audits = data?.lighthouseResult?.audits ?? {};

    return NextResponse.json({
      url: target,
      finalUrl: data?.lighthouseResult?.finalUrl ?? target,
      scores: {
        performance: pct(cats.performance?.score),
        accessibility: pct(cats.accessibility?.score),
        seo: pct(cats.seo?.score),
        bestPractices: pct(cats["best-practices"]?.score),
      },
      metrics: {
        lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
        cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
        tbt: audits["total-blocking-time"]?.displayValue ?? null,
      },
    });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: aborted
          ? "That site took too long to test. It may be slow — which is exactly what we fix."
          : "Something went wrong running the audit. Please try again.",
      },
      { status: aborted ? 504 : 500 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
