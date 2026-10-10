// Shape every analytics adapter implements. The bus (index.ts) calls these;
// components never touch gtag/fbq/clarity/posthog directly. Add or drop a tool
// next year by editing one adapter file, with zero call-site churn.
export type Props = Record<string, unknown>;

// One Core Web Vitals reading (components/web-vitals.tsx). Kept off track() so
// performance data only reaches tools that implement vital(), never ad pixels.
export type Vital = {
  name: "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
  value: number; // ms, except CLS (unitless)
  delta: number; // change since this metric last reported on this page load
  id: string; // unique per metric per page load
  rating: "good" | "needs-improvement" | "poor";
  navigationType: string;
  page: string; // path of the page that was loaded (the metric belongs to it)
};

export interface Adapter {
  name: string;
  // true → loads only after marketing consent; false → first-party, always-on.
  needsConsent: boolean;
  init(): void;
  identify?(id: string, props?: Props): void;
  reset?(): void;
  track?(event: string, props?: Props): void;
  page?(props?: Props): void;
  vital?(metric: Vital): void;
}
