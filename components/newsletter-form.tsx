"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  /** "inline": compact email + arrow (default). "stacked": full-width field, optional consent, labelled button. */
  variant?: "inline" | "stacked";
  /** Show a marketing-consent checkbox that gates submission (stacked footer use). */
  consent?: boolean;
  placeholder?: string;
};

export function NewsletterForm({ variant = "inline", consent = false, placeholder }: Props) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const consentId = useId();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (consent && !agreed) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: consent ? agreed : undefined }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "ok")
    return <p className="mt-6 text-sm text-brand-text">Thanks, you&apos;re on the list.</p>;

  if (variant === "stacked") {
    return (
      <form onSubmit={submit} className="mt-5 max-w-sm">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder ?? "Don't miss out on updates"}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {consent && (
          <label htmlFor={consentId} className="mt-3 flex items-start gap-2.5 text-xs text-muted-foreground">
            <input
              id={consentId} type="checkbox" required checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-border accent-brand"
            />
            <span>
              I agree to the{" "}
              <a href="/legal/privacy" className="font-medium text-brand-text hover:underline">Privacy Policy</a>{" "}
              and consent to being contacted about updates.
            </span>
          </label>
        )}
        <button
          type="submit" disabled={state === "loading"}
          className="group btn btn-primary mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
        >
          {state === "loading" ? "Sending…" : "Send"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        {state === "error" && <p className="mt-2 text-xs text-destructive">Something went wrong. Please try again.</p>}
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 flex max-w-sm gap-2">
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder ?? "you@company.com"}
        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <button
        type="submit" disabled={state === "loading"}
        className="btn btn-primary inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {state === "loading" ? "…" : <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
