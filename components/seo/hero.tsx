"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, ArrowRight, Loader2, Check, ChevronRight, AlertCircle, TrendingUp, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

type Scores = { overall: number | null; ai: number | null; seo: number | null };
type Finding = { title: string; severity: string; category: string; recommendation: string };
type Result = { domain: string | null; scores: Scores; findings: Finding[]; findingsTotal: number };
type Status = "idle" | "loading" | "success" | "error";

// Illustrative preview shown before a real audit runs. Not real data.
const SAMPLE_RESULT: Result = {
  domain: "yoursite.com",
  scores: { overall: 62, ai: 48, seo: 74 },
  findings: [
    { title: "Meta titles missing on 8 pages", severity: "high", category: "", recommendation: "" },
    { title: "No local-business schema markup", severity: "medium", category: "", recommendation: "" },
    { title: "Slow mobile load on key pages", severity: "medium", category: "", recommendation: "" },
  ],
  findingsTotal: 12,
};

function band(v: number | null): { color: string; word: string } {
  if (v === null) return { color: "#c9c9cf", word: "" };
  if (v >= 70) return { color: "#29a66f", word: "Good" };
  if (v >= 45) return { color: "#f59e0b", word: "Needs Work" };
  return { color: "#ef4444", word: "Needs Work" };
}

const toneDot: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-brand",
  low: "bg-accent-yellow",
};

function Ring({ score, label }: { score: number | null; label: string }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const off = c - ((score ?? 0) / 100) * c;
  const { color, word } = band(score);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative size-[76px]">
        <svg viewBox="0 0 72 72" className="size-full -rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#ececed" strokeWidth="6" />
          <circle
            cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
            style={{ transition: "stroke-dashoffset .9s ease, stroke .3s" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xl font-extrabold" style={{ color }}>
          {score ?? "–"}
        </span>
      </div>
      <span className="text-xs font-bold text-foreground">{label}</span>
      <span className="text-[11px] font-semibold" style={{ color }}>{word}</span>
    </div>
  );
}

function AuditCard({ data, sample }: { data: Result; sample: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive" />
        <span className="size-2.5 rounded-full bg-accent-yellow" />
        <span className="size-2.5 rounded-full bg-rating" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
          {data.domain ?? "your site"}
        </span>
        {sample && (
          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Sample
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-extrabold text-foreground">
            {sample ? "Example SEO Audit" : "Your SEO Audit Result"}
          </p>
          <span className="text-[11px] font-medium text-muted-foreground">
            {sample ? "Illustrative" : "Scanned just now"}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Ring score={data.scores.overall} label="SEO Health" />
          <Ring score={data.scores.ai} label="AI Search" />
          <Ring score={data.scores.seo} label="Technical" />
        </div>

        <div className="mt-6 rounded-xl border border-border p-4">
          <p className="text-sm font-extrabold text-foreground">
            {data.findingsTotal} opportunit{data.findingsTotal === 1 ? "y" : "ies"} found
          </p>
          <ul className="mt-3 space-y-3">
            {data.findings.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={`size-2.5 shrink-0 rounded-full ${toneDot[f.severity] ?? "bg-muted-foreground"}`} />
                <span className="flex-1 text-[13px] font-medium leading-snug text-foreground">{f.title}</span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="#contact"
          className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl btn btn-primary px-5 py-3 text-sm font-bold text-brand-foreground"
        >
          {sample ? "Get my real audit + plan" : "Fix these, get a plan"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <TrendingUp className="size-3.5 text-rating" /> More traffic, calls and customers from Google.
        </p>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive" />
        <span className="size-2.5 rounded-full bg-accent-yellow" />
        <span className="size-2.5 rounded-full bg-rating" />
        <span className="ml-2 flex-1 rounded-md bg-background px-3 py-1 text-[11px] text-muted-foreground">
          Auditing…
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Crawling your site and scoring…
        </div>
      </div>
    </div>
  );
}

export function SeoHero() {
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
      setError("Network error, please try again.");
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Soft focus glow behind the panel; keeps the ground calm. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 h-72 w-[42rem] max-w-[90vw] translate-x-1/4 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(41,166,111,0.12), transparent)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 md:pt-16 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy + audit form */}
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <ChevronRight className="size-3" aria-hidden />
              <li aria-current="page" className="font-medium text-foreground">SEO Company in Nagpur</li>
            </ol>
          </nav>

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-[1.03] tracking-tight text-navy sm:text-5xl md:text-6xl">
            {seo.hero.h1a}{" "}
            <span className="text-brand-text">{seo.hero.h1b}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {seo.hero.sub}
          </p>

          <form
            onSubmit={run}
            className="mt-9 flex max-w-xl flex-col gap-2 rounded-2xl border border-border bg-card p-2 sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL"
                aria-label="Your website URL"
                disabled={status === "loading"}
                className="w-full rounded-full bg-transparent py-3.5 pl-11 pr-3 text-sm outline-none disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-brand-foreground disabled:opacity-60"
            >
              {status === "loading" ? (
                <><Loader2 className="size-4 animate-spin" /> Auditing…</>
              ) : (
                <>{seo.hero.cta} <ArrowRight className="size-4" /></>
              )}
            </button>
          </form>

          {status === "error" && (
            <p className="mt-4 flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="size-3.5 shrink-0" /> {error}
            </p>
          )}

          {/* Trust row */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-rating text-rating" />
                ))}
              </span>
              <span className="text-sm font-semibold text-foreground">{seo.stats[0].v}</span>
              <span className="text-sm text-muted-foreground">{seo.stats[0].label}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {seo.hero.checks.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground">
                  <Check className="size-4 text-rating" /> {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: live audit card (sample until a real audit runs) */}
        <Reveal delay={0.12} className="w-full">
          {status === "loading" ? (
            <CardSkeleton />
          ) : status === "success" && result ? (
            <AuditCard data={result} sample={false} />
          ) : (
            <AuditCard data={SAMPLE_RESULT} sample />
          )}
        </Reveal>
      </div>
    </section>
  );
}
