"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, MailCheck, ArrowRight } from "lucide-react";

type Scores = { overall: number | null; ai: number | null; seo: number | null };
type Finding = { title: string; severity: string; category: string; recommendation: string };

type Props = {
  onClose: () => void;
  domain: string | null;
  scores: Scores;
  findings: Finding[];
  findingsTotal: number;
};

// Inline lead-capture panel. Renders in the hero's right column, in place of
// the audit result card (not a full-screen modal).
export function AuditLeadPanel({ onClose, domain, scores, findings, findingsTotal }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const site = domain || "your site";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus("error");
      setError("Please fill in your name, email and phone.");
      return;
    }
    setStatus("submitting");
    setError("");
    const message =
      `Requested full SEO fixes by email for ${site}.\n` +
      `Scores — SEO Health: ${scores.overall ?? "–"}, AI Search: ${scores.ai ?? "–"}, Technical: ${scores.seo ?? "–"}.\n` +
      `${findingsTotal} issues found. Top: ${findings.slice(0, 5).map((f) => f.title).join("; ") || "—"}`;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          business: site,
          email: email.trim(),
          phone: phone.trim(),
          website: domain ? `https://${site}` : "",
          service: "SEO",
          message,
          source: "SEO Audit — email my fixes",
          company_website: honeypot,
          sendReport: true,
          domain: site,
          scores,
          findings, // admin-only: full titles + exact fixes for the team email
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error, please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-rating/15 text-rating">
          <MailCheck className="size-7" />
        </span>
        <h2 className="mt-5 text-xl font-extrabold text-foreground">Check your email</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We&apos;ve sent your full SEO report for <strong className="text-foreground">{site}</strong> to{" "}
          <strong className="text-foreground">{email}</strong>. It has every issue we found and the fix.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
        >
          Back to results
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-7">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-3.5" /> Back to results
      </button>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-text">Free full report</p>
      <h2 className="mt-2 text-xl font-extrabold text-foreground">Get all fixes on your email</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We&apos;ll email your complete SEO report for <strong className="text-foreground">{site}</strong> — every
        issue we found and exactly how to fix it.
      </p>

      {/* honeypot */}
      <input
        className="absolute left-[-9999px] h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <div className="mt-5 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand/50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Your email"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand/50"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (+91…)"
          aria-label="Your phone"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand/50"
        />
      </div>

      {status === "error" && <p className="mt-3 text-xs text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-brand-foreground disabled:opacity-60"
      >
        {status === "submitting" ? (
          <><Loader2 className="size-4 animate-spin" /> Sending…</>
        ) : (
          <>Email me my full report <ArrowRight className="size-4" /></>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        No spam. We&apos;ll only use this to send your report and follow up.
      </p>
    </form>
  );
}
