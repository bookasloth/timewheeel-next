"use client";

import { useState } from "react";
import { ArrowRight, Search, Loader2, AlertCircle } from "lucide-react";

type Scores = { performance: number | null; accessibility: number | null; seo: number | null; bestPractices: number | null };
type Result = { url: string; scores: Scores };
type Status = "idle" | "loading" | "success" | "error";

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
          <circle cx="30" cy="30" r="26" fill="none" stroke="#2a2a2a" strokeWidth="5" />
          <circle
            cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
            style={{ transition: "stroke-dashoffset .8s ease, stroke .3s" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-extrabold text-sm" style={{ color }}>
          {score ?? "–"}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-gray-400">{label}</span>
    </div>
  );
}

export function WdAudit() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setStatus("error");
      setError("Enter your website URL to see its scores.");
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
      setError("Network error, please try again.");
    }
  }

  const scores = status === "success" && result ? result.scores : { performance: null, accessibility: null, seo: null, bestPractices: null };
  const isSample = status !== "success";

  return (
    <section className="border-y border-border/60 bg-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-white">Free Instant Site Audit</p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          See how your site scores
        </h2>

        <form onSubmit={run} className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL"
              aria-label="Your website URL"
              disabled={status === "loading"}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-white focus:ring-2 focus:ring-white/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Audit"}
          </button>
        </form>

        {status === "loading" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <Loader2 className="size-3 animate-spin" />
            Crawling and scoring… this takes about 15 seconds.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="size-3.5 shrink-0" /> {error}
          </p>
        )}

        <div className={`mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 ${isSample ? "opacity-60" : ""}`}>
          <ScoreRing score={scores.performance} label="Performance" />
          <ScoreRing score={scores.accessibility} label="Accessibility" />
          <ScoreRing score={scores.seo} label="SEO" />
          <ScoreRing score={scores.bestPractices} label="Best Practices" />
        </div>

        {status !== "success" && (
          <p className="mt-4 text-center text-xs text-gray-500">
            Enter any public URL to get instant Lighthouse scores.
          </p>
        )}
      </div>
    </section>
  );
}
