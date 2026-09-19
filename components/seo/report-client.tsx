"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Loader2, AlertCircle, ArrowRight, Lock, ShieldCheck } from "lucide-react";

type Scores = { overall: number | null; ai: number | null; seo: number | null };
type Finding = { title: string; severity: string; category: string };
type Result = { domain: string | null; url: string | null; pageCount: number | null; scores: Scores; findings: Finding[]; findingsTotal: number };
type Status = "idle" | "loading" | "success" | "error";

function band(v: number | null): { color: string; word: string } {
  if (v === null) return { color: "#77736c", word: "—" };
  if (v >= 70) return { color: "#29a66f", word: "Good" };
  if (v >= 45) return { color: "#f59e0b", word: "Needs work" };
  return { color: "#ef4444", word: "Critical" };
}

function grade(v: number | null): string {
  if (v === null) return "–";
  if (v >= 85) return "A";
  if (v >= 70) return "B";
  if (v >= 55) return "C";
  if (v >= 40) return "D";
  return "F";
}

const sevMeta: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: "High impact", color: "#ef4444", bg: "rgba(239,68,68,0.10)" },
  medium: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  low: { label: "Low", color: "#29a66f", bg: "rgba(41,166,111,0.12)" },
};

// Deliberately vague, category-level "why it hurts". The exact fix is never
// sent to the browser, so this report can't be reverse-engineered.
function whyItHurts(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("ai") || c.includes("aeo")) return "AI engines like ChatGPT and Gemini can't confidently read or cite this page, so you're invisible in AI answers.";
  if (c.includes("perf") || c.includes("speed") || c.includes("tech")) return "A technical problem is quietly slowing this page or getting in the way of search engines.";
  if (c.includes("content")) return "Your content isn't structured to win the searches your customers actually make.";
  if (c.includes("local")) return "You're losing visibility for the nearby customers searching right now.";
  if (c.includes("link") || c.includes("author")) return "Weak trust signals are capping how high you can rank.";
  return "This is holding back how you show up across Google and AI search.";
}

function Gauge({ value }: { value: number | null }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const off = c - ((value ?? 0) / 100) * c;
  const { color } = band(value);
  return (
    <div className="relative size-[150px]">
      <svg viewBox="0 0 130 130" className="size-full -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#e7e1d5" strokeWidth="10" />
        <circle
          cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black leading-none" style={{ color }}>{value ?? "–"}</span>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

function SubScore({ label, value }: { label: string; value: number | null }) {
  const { color, word } = band(value);
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-0">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="flex items-center gap-3">
        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
          <span className="block h-full rounded-full" style={{ width: `${value ?? 0}%`, backgroundColor: color }} />
        </span>
        <span className="w-8 text-right text-sm font-black" style={{ color }}>{value ?? "–"}</span>
        <span className="hidden w-20 text-right text-[11px] font-semibold sm:inline" style={{ color }}>{word}</span>
      </span>
    </div>
  );
}

// The gated "fix" block. No real recommendation text exists here — just a
// locked shell that drives the lead to book.
function LockedFix() {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40">
      <div className="relative p-4">
        <div aria-hidden className="space-y-2 blur-[3px] select-none">
          <div className="h-2.5 w-full rounded bg-border" />
          <div className="h-2.5 w-11/12 rounded bg-border" />
          <div className="h-2.5 w-8/12 rounded bg-border" />
        </div>
        <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-foreground">
          <Lock className="size-4 text-brand-text" />
          The exact fix is in your action plan
        </div>
      </div>
    </div>
  );
}

export function SeoReportClient() {
  const [site, setSite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const run = useCallback(async (target: string) => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`/api/seo-audit?full=1&redacted=1&url=${encodeURIComponent(target)}`);
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setError(data?.error ?? "We couldn't run this report."); return; }
      setResult(data);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error, please try again.");
    }
  }, []);

  // Read ?site= from the URL on the client and run once. Reading window here
  // (instead of useSearchParams) keeps this a plain client component and avoids
  // the Suspense/prerender edge cases that were leaving the audit unstarted.
  // The ref guard stops StrictMode's double mount firing two concurrent audits.
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const s = new URLSearchParams(window.location.search).get("site") ?? "";
    setSite(s);
    if (s) run(s);
  }, [run]);

  const domain = result?.domain || site || "your site";
  const shown = result?.findings.length ?? 0;
  const locked = Math.max((result?.findingsTotal ?? 0) - shown, 0);

  return (
    <div className="seo-nagpur-page">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-10 md:pt-14">
        {/* Report cover header */}
        <div className="overflow-hidden rounded-3xl border border-border bg-navy text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
            <span className="text-sm font-black tracking-wide">TIME<span className="text-brand">WHEEL</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/60">
              <ShieldCheck className="size-3.5" /> Confidential audit
            </span>
          </div>
          <div className="px-6 py-8 md:px-8 md:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">AI + SEO Audit Report</p>
            <div className="mt-3 flex items-center gap-3">
              {domain && domain !== "your site" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-lg bg-white p-1"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              )}
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">{domain}</h1>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Prepared by Timewheel · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              {result?.pageCount ? ` · ${result.pageCount} pages scanned` : ""}
            </p>
          </div>
        </div>

        {!site && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-base font-bold text-foreground">No site to report on</p>
            <p className="mt-2 text-sm text-muted-foreground">Run a free audit to generate your report.</p>
            <Link href="/seo-company-in-nagpur" className="btn btn-primary mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-brand-foreground">
              Run a free audit <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        {status === "loading" && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-brand-text" />
            <p className="text-sm">Building your full report for {domain}… about 15 seconds.</p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <AlertCircle className="size-4" /> {error}
            </p>
            <button onClick={() => site && run(site)} className="btn btn-primary mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-brand-foreground">
              Try again
            </button>
          </div>
        )}

        {status === "success" && result && (
          <>
            {/* Score summary */}
            <div className="mt-8 grid items-center gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[auto_1fr]">
              <div className="flex flex-col items-center gap-3">
                <Gauge value={result.scores.overall} />
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground">
                  Grade {grade(result.scores.overall)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Overall visibility</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  How {domain} performs across classic search and AI search today.
                </p>
                <div className="mt-4">
                  <SubScore label="SEO Health" value={result.scores.overall} />
                  <SubScore label="AI Search visibility" value={result.scores.ai} />
                  <SubScore label="Technical" value={result.scores.seo} />
                </div>
              </div>
            </div>

            {/* Issues intro */}
            <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight">What&apos;s holding you back</h2>
              <span className="text-sm font-semibold text-muted-foreground">
                {result.findingsTotal} issues found
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Here&apos;s a preview of what we found. Each issue below is real, the exact fix and the
              highest-impact issues are in your full action plan.
            </p>

            {/* Findings, fixes locked */}
            <ol className="mt-6 space-y-4">
              {result.findings.map((f, i) => {
                const m = sevMeta[f.severity] ?? { label: f.severity, color: "#77736c", bg: "rgba(119,115,108,0.12)" };
                return (
                  <li key={i} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-black text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ color: m.color, backgroundColor: m.bg }}>{m.label}</span>
                      {f.category && (
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">{f.category}</span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{whyItHurts(f.category)}</p>
                    <LockedFix />
                  </li>
                );
              })}
            </ol>

            {/* Locked remainder */}
            {locked > 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-center">
                <Lock className="mx-auto size-6 text-brand-text" />
                <p className="mt-3 text-base font-extrabold text-foreground">
                  {locked} more issue{locked === 1 ? "" : "s"} locked, including high-impact ones
                </p>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  The issues most likely to be costing you traffic and calls are reserved for your
                  full action plan, so nobody else can copy your fixes.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 rounded-3xl border border-border bg-navy p-8 text-center text-white md:p-10">
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">Get every fix, done for you</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/70">
                We&apos;ll unlock the full report, hand you a prioritised plan, and do the work, honest
                timelines and no fake ranking promises.
              </p>
              <Link href="/seo-company-in-nagpur#contact" className="btn btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-brand-foreground">
                Unlock my full plan <ArrowRight className="size-4" />
              </Link>
              <p className="mt-4 text-[12px] text-white/45">Free 20-minute call · no obligation</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
