"use client";

// Reports real visitors' Core Web Vitals to the analytics bus (analytics.vital),
// which forwards them to GA4 via GTM after consent, and to PostHog when it's
// configured. Renders nothing. Mount once in the root layout.
import { useReportWebVitals } from "next/web-vitals";
import { analytics } from "@/lib/analytics";
import type { Vital } from "@/lib/analytics/adapters/types";

const REPORTED = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);

// The page that was actually loaded. Vitals describe the hard load, and CLS/INP
// can report after client-side navigation has moved the URL on, so read the path
// once, when this module first runs in the browser.
const loadedPage = typeof window === "undefined" ? "" : window.location.pathname;

// Module-level so the reference never changes (a new function re-reports
// every metric seen so far).
const report: Parameters<typeof useReportWebVitals>[0] = (m) => {
  if (!REPORTED.has(m.name)) return; // skip FID (retired) and Next.js-* timings
  analytics.vital({
    name: m.name as Vital["name"],
    value: m.value,
    delta: m.delta,
    id: m.id,
    rating: m.rating as Vital["rating"],
    navigationType: m.navigationType,
    page: loadedPage,
  });
};

export function WebVitals() {
  useReportWebVitals(report);
  return null;
}
