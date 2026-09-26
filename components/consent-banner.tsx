"use client";

// Cookie-consent banner (GDPR / India DPDP). Marketing tags (GTM, GA4, Meta Pixel,
// Clarity) stay off until the visitor accepts here; PostHog (first-party) runs
// regardless. Shows only while the decision is undecided.
import { useEffect, useState } from "react";
import { analytics } from "@/lib/analytics";

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Read after mount so SSR and first client render match (no hydration flash).
    if (!analytics.hasDecided()) setShow(true);
  }, []);

  if (!show) return null;

  const decide = (accept: boolean) => {
    analytics.setConsent(accept);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          We use cookies to understand traffic and improve your experience. Analytics
          and ad measurement load only if you accept. See our{" "}
          <a href="/legal/privacy" className="font-semibold text-brand underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
