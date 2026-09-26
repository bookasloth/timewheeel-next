// Marketing/tracking consent state (GTM, GA4, Meta Pixel, Clarity).
//
// India DPDP / GDPR: ad + session-replay tools must not load until the user
// opts in. PostHog (first-party product analytics) is exempt and always-on.
// This module just persists the decision and notifies subscribers; the bus
// (index.ts) reacts by lazy-loading the gated adapters.
//
// States: "granted" | "denied" | null (undecided → banner shows, nothing gated loads).
const KEY = "tw_marketing_consent";

type Consent = "granted" | "denied";
const listeners = new Set<(v: Consent) => void>();

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: boolean): Consent {
  const v: Consent = value ? "granted" : "denied";
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* private mode / storage blocked — decision just won't persist */
  }
  listeners.forEach((fn) => {
    try {
      fn(v);
    } catch {
      /* a broken listener must not break consent */
    }
  });
  return v;
}

export function hasDecided(): boolean {
  return getConsent() !== null;
}

export function isGranted(): boolean {
  return getConsent() === "granted";
}

// Subscribe to consent changes. Returns an unsubscribe fn.
export function onConsentChange(fn: (v: Consent) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
