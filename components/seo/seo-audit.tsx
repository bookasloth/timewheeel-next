"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2, AlertCircle, AlertTriangle } from "lucide-react";

type Scores = { overall: number | null; ai: number | null; seo: number | null; color: string | null };
type Finding = { title: string; severity: string; category: string; recommendation: string };
type Result = { domain: string | null; pageCount: number | null; scores: Scores; findings: Finding[]; findingsTotal: number };
type Status = "idle" | "loading" | "success" | "error";

function band(v: number | null): string {
  if (v === null) return "#c9c9cf";
  if (v >= 80) return "#4ab765";
  if (v >= 50) return "#ffab00";
  return "#ef4444";
}

function ScoreRing({ score, label, big }: { score: number | null; label: string; big?: boolean }) {
  const r = big ? 30 : 26;
  const c = 2 * Math.PI * r;
  const off = c - ((score ?? 0) / 100) * c;
  const color = band(score);
  const size = big ? 84 : 68;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 72 72" className="size-full -rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#e8e8ec" strokeWidth="6" />
          <circle
            cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
            style={{ transition: "stroke-dashoffset .8s ease, stroke .3s" }}
          />
        </svg>
        <span className={`absolute inset-0 grid place-items-center font-extrabold ${big ? "text-xl" : "text-sm"}`} style={{ color }}>
          {score ?? "—"}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
    </div>
  );
}

const sevColor: Record<string, string> = {
  high: "text-destructive",
  medium: "text-accent-yellow",
  low: "text-muted-foreground",
};

const SAMPLE: Scores = { overall: 34, ai: 16, seo: 51, color: "red" };

export function SeoAudit() {
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
      const res = await fetch(`/api/seo-audit?url=${encodeURIComponent(url.trim())}`);
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
  const host =
    status === "success" && result?.domain ? result.domain : "yourbusiness.com";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-accent-pink" />
        <span className="size-2.5 rounded-full bg-accent-yellow" />
        <span className="size-2.5 rounded-full bg-accent-blue" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
          {host}
        </span>
        {status === "success" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating">
            <span className="size-1.5 rounded-full bg-rating" /> Audited
          </span>
        )}
      </div>

      <div className="p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {status === "success" ? "Your AI + SEO visibility" : "Free instant audit · AI + SEO"}
        </p>

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
            Crawling {host} and scoring… this takes about 15 seconds.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-destructive">
            <AlertCircle className="size-3.5 shrink-0" /> {error}
          </p>
        )}

        <div className={`mt-5 grid grid-cols-3 gap-2 ${isSample ? "opacity-60" : ""}`}>
          <ScoreRing score={scores.overall} label="Overall" big />
          <ScoreRing score={scores.ai} label="AI visibility" big />
          <ScoreRing score={scores.seo} label="SEO" big />
        </div>

        {status === "success" && result ? (
          <>
            <p className="mt-5 text-xs font-semibold text-foreground">
              Top issues{result.findingsTotal ? ` · ${result.findingsTotal} found` : ""}
            </p>
            <ul className="mt-2 space-y-2">
              {result.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2">
                  <AlertTriangle className={`mt-0.5 size-3.5 shrink-0 ${sevColor[f.severity] ?? "text-muted-foreground"}`} />
                  <span className="text-xs leading-snug text-foreground">{f.title}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg btn btn-primary px-5 py-3 text-sm font-semibold text-brand-foreground"
            >
              Fix these — get a plan
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </>
        ) : (
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            {status === "loading" ? " " : "Sample scores — run your own site to see where it stands."}
          </p>
        )}
      </div>
    </div>
  );
}
