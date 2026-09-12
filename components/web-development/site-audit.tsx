"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2, AlertCircle } from "lucide-react";

type Scores = {
  performance: number | null;
  accessibility: number | null;
  seo: number | null;
  bestPractices: number | null;
};
type Metrics = { lcp: string | null; cls: string | null; tbt: string | null };
type Result = { finalUrl: string; scores: Scores; metrics: Metrics };
type Status = "idle" | "loading" | "success" | "error";

// Lighthouse colour bands: red < 50, amber 50–89, green 90+.
function scoreColor(v: number | null): string {
  if (v === null) return "#c9c9cf";
  if (v >= 90) return "#4ab765";
  if (v >= 50) return "#ffab00";
  return "#ef4444";
}

function ScoreRing({ score, label }: { score: number | null; label: string }) {
  const c = 2 * Math.PI * 26;
  const shown = score ?? 0;
  const off = c - (shown / 100) * c;
  const color = scoreColor(score);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-[68px]">
        <svg viewBox="0 0 60 60" className="size-full -rotate-90">
          <circle cx="30" cy="30" r="26" fill="none" stroke="#e8e8ec" strokeWidth="5" />
          <circle
            cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
            style={{ transition: "stroke-dashoffset .8s ease, stroke .3s" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-extrabold" style={{ color }}>
          {score ?? "—"}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
    </div>
  );
}

const SAMPLE: Scores = { performance: 98, accessibility: 100, seo: 100, bestPractices: 96 };

export function SiteAudit() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setStatus("error");
      setError("Enter your website URL to see its real scores.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`/api/site-audit?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data?.error ?? "Couldn't run the audit. Try again.");
        return;
      }
      setResult(data);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  }

  const scores = status === "success" && result ? result.scores : SAMPLE;
  const isSample = status !== "success";
  const shownHost = (() => {
    if (status === "success" && result) {
      try { return new URL(result.finalUrl).hostname; } catch { return result.finalUrl; }
    }
    return "yourbusiness.com";
  })();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-accent-pink" />
        <span className="size-2.5 rounded-full bg-accent-yellow" />
        <span className="size-2.5 rounded-full bg-accent-blue" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
          {shownHost}
        </span>
        {status === "success" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating">
            <span className="size-1.5 rounded-full bg-rating" /> Tested
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {status === "success" ? "Your live Lighthouse scores" : "Free live audit · Lighthouse"}
          </p>
          {status === "success" && (
            <span className="text-[10px] font-medium text-muted-foreground">mobile</span>
          )}
        </div>

        {/* input */}
        <form onSubmit={run} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL"
              aria-label="Your website URL"
              disabled={status === "loading"}
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Audit"}
          </button>
        </form>

        {status === "loading" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            Testing {shownHost}… this takes about 20 seconds.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-destructive">
            <AlertCircle className="size-3.5 shrink-0" />
            {error}
          </p>
        )}

        {/* rings */}
        <div className={`mt-5 grid grid-cols-4 gap-2 ${isSample ? "opacity-60" : ""}`}>
          <ScoreRing score={scores.performance} label="Perf" />
          <ScoreRing score={scores.accessibility} label="A11y" />
          <ScoreRing score={scores.seo} label="SEO" />
          <ScoreRing score={scores.bestPractices} label="Best" />
        </div>

        {status === "success" && result ? (
          <>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { k: "LCP", v: result.metrics.lcp },
                { k: "CLS", v: result.metrics.cls },
                { k: "Blocking", v: result.metrics.tbt },
              ].map((m) => (
                <div key={m.k} className="rounded-lg border border-border bg-secondary/30 px-2 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{m.k}</p>
                  <p className="mt-0.5 text-sm font-bold text-foreground">{m.v ?? "—"}</p>
                </div>
              ))}
            </div>
            <Link
              href="#contact"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg btn btn-primary px-5 py-3 text-sm font-semibold text-brand-foreground"
            >
              Want these all green? Get a fixed quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </>
        ) : (
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            {status === "idle" || status === "error"
              ? "Sample scores — run your own site to see where it stands."
              : " "}
          </p>
        )}
      </div>
    </div>
  );
}
