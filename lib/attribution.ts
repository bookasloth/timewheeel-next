// First-touch marketing attribution. Captures where a visitor came from on their
// FIRST landing (utm_*, gclid, fbclid, referrer, landing path) and persists it so
// it survives navigation and rides along with every lead submission + analytics
// event. First touch wins: once stored it is never overwritten, so the ad that
// actually earned the visit gets the credit even after they browse the site.
//
// Two stores, on purpose:
//   - localStorage: read by client code (forms, trackLead) for the 90-day window.
//   - cookie "tw_attribution": readable by the server (/api/lead) from the request
//     cookie header, so the lead row + email carry campaign data even if the client
//     forgets to send it.
// Both are first-party, non-advertising identifiers, so they are not consent-gated
// (the same posture as PostHog). No PII is ever stored here.

const KEY = "tw_attribution";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_path?: string;
  first_seen?: string; // ISO timestamp of first touch
};

const PARAM_KEYS: (keyof Attribution)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];

function readStored(): Attribution | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function persist(a: Attribution) {
  try {
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* private mode / storage blocked */
  }
  try {
    // Lax cookie so it is sent on top-level navigations (incl. the form POST's
    // same-site request) but not on cross-site subrequests.
    document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(a))}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

// Run once on first load (and harmlessly on later loads). First touch wins:
// if a record already exists we keep it untouched.
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const existing = readStored();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const a: Attribution = {
    referrer: document.referrer || undefined,
    landing_path: window.location.pathname + window.location.search || undefined,
    first_seen: new Date().toISOString(),
  };
  for (const k of PARAM_KEYS) {
    const v = params.get(k);
    if (v) a[k] = v.slice(0, 200);
  }
  persist(a);
  return a;
}

// Current first-touch attribution for attaching to a lead POST / analytics event.
// Returns {} when nothing is stored (direct traffic before capture ran).
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return readStored() ?? {};
}
