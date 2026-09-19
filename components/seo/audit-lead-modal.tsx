"use client";

import { useEffect, useState } from "react";
import { X, Loader2, MailCheck, ArrowRight } from "lucide-react";

type Scores = { overall: number | null; ai: number | null; seo: number | null };
type Finding = { title: string; severity: string; category: string; recommendation: string };

type Props = {
  open: boolean;
  onClose: () => void;
  domain: string | null;
  scores: Scores;
  findings: Finding[];
  findingsTotal: number;
};

export function AuditLeadModal({ open, onClose, domain, scores, findings, findingsTotal }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // Esc closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Get all fixes on your email"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
        >
          <X className="size-4" />
        </button>

        {status === "success" ? (
          <div className="p-8 text-center">
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
              className="btn btn-primary mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-brand-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">Free full report</p>
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

            {status === "error" && (
              <p className="mt-3 text-xs text-destructive">{error}</p>
            )}

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
        )}
      </div>
    </div>
  );
}
