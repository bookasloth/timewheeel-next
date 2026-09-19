"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

type Scores = { overall: number | null; ai: number | null; seo: number | null };
type Finding = { title: string; severity: string; category: string; recommendation: string };
type Result = { domain: string | null; url: string | null; scores: Scores; findings: Finding[]; findingsTotal: number };
type Status = "idle" | "loading" | "success" | "error";

function band(v: number | null): { color: string; word: string } {
  if (v === null) return { color: "#77736c", word: "—" };
  if (v >= 70) return { color: "#29a66f", word: "Good" };
  if (v >= 45) return { color: "#f59e0b", word: "Needs work" };
  return { color: "#ef4444", word: "Critical" };
}

const sevMeta: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: "High priority", color: "#ef4444", bg: "rgba(239,68,68,0.10)" },
  medium: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  low: { label: "Low", color: "#29a66f", bg: "rgba(41,166,111,0.12)" },
};

function ScoreTile({ label, value }: { label: string; value: number | null }) {
  const { color, word } = band(value);
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="text-5xl font-black tracking-tight" style={{ color }}>{value ?? "–"}</div>
      <div className="mt-2 text-sm font-bold text-foreground">{label}</div>
      <div className="mt-1 text-[13px] font-semibold" style={{ color }}>{word}</div>
    </div>
  );
}

export function SeoReportClient() {
  const params = useSearchParams();
  const site = params.get("site") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const run = useCallback(async (target: string) => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`/api/seo-audit?full=1&url=${encodeURIComponent(target)}`);
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setError(data?.error ?? "We couldn't run this report."); return; }
      setResult(data);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error, please try again.");
    }
  }, []);

  useEffect(() => {
    if (site) run(site);
  }, [site, run]);

  const domain = result?.domain || site || "your site";

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-14 md:pt-20">
      {/* Report header */}
      <div className="flex flex-col gap-2 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">SEO Audit Report</p>
        <h1 className="text-3xl font-black tracking-tight text-navy md:text-4xl">
          {domain}
        </h1>
        <p className="text-sm text-muted-foreground">
          AI + SEO visibility report, prepared by Timewheel · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {!site && (
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
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
        <div className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
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
          {/* Scores */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ScoreTile label="SEO Health" value={result.scores.overall} />
            <ScoreTile label="AI Search" value={result.scores.ai} />
            <ScoreTile label="Technical" value={result.scores.seo} />
          </div>

          {/* Findings */}
          <div className="mt-12">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight">What we found</h2>
              <span className="text-sm font-semibold text-muted-foreground">{result.findingsTotal} issues</span>
            </div>

            {result.findings.length === 0 ? (
              <p className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                <CheckCircle2 className="size-5 text-rating" /> No major issues surfaced in this scan. Nice.
              </p>
            ) : (
              <ol className="mt-6 space-y-4">
                {result.findings.map((f, i) => {
                  const m = sevMeta[f.severity] ?? { label: f.severity, color: "#77736c", bg: "rgba(119,115,108,0.12)" };
                  return (
                    <li key={i} className="rounded-2xl border border-border bg-card p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-black text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ color: m.color, backgroundColor: m.bg }}>
                          {m.label}
                        </span>
                        {f.category && (
                          <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                            {f.category}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">{f.title}</h3>
                      {f.recommendation && (
                        <p className="mt-2 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-brand-text" />
                          <span><strong className="font-semibold text-foreground">Fix:</strong> {f.recommendation}</span>
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-3xl border border-border bg-secondary/50 p-8 text-center md:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Want us to fix these for you?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              We&apos;ll turn this report into a clear, prioritised plan and do the work, honest timelines, no fake ranking promises.
            </p>
            <Link href="/seo-company-in-nagpur#contact" className="btn btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-brand-foreground">
              Get my SEO plan <ArrowRight className="size-4" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
