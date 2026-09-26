// Unified analytics bus — the ONLY analytics surface components import.
//
// Rule that prevents rebuilds: never call gtag/fbq/clarity/posthog directly in a
// component. Call analytics.track(EVENTS.X, props). Adding/removing a tool = edit
// one adapter file, zero call-site churn. Mirrors the bookasloth analytics bus.
//
// Consent model:
//   - PostHog (needsConsent:false) is always-on (first-party product analytics).
//   - GTM / Meta Pixel / Clarity (needsConsent:true) load ONLY after the user
//     grants marketing consent. Events fired before consent are dropped for those
//     tools (never backfilled into ad networks).
import { assertKnownEvent } from "./events";
import { getConsent, onConsentChange, setConsent, isGranted, hasDecided } from "./consent";
import type { Adapter, Props } from "./adapters/types";
import posthog from "./adapters/posthog";
import pixel from "./adapters/pixel";
import clarity from "./adapters/clarity";
import gtm from "./adapters/gtm";

// gtm carries GA4 (config + generate_lead → GA4 event + click conversions), so we
// deliberately do not add a separate GA4 adapter here (would double-count).
const ADAPTERS: Adapter[] = [posthog, pixel, clarity, gtm];

const ready = new Set<Adapter>();

function initAdapter(a: Adapter) {
  if (ready.has(a)) return;
  try {
    a.init();
    ready.add(a);
  } catch {
    /* never break the app for analytics */
  }
}

function activeAdapters(): Adapter[] {
  return ADAPTERS.filter((a) => !a.needsConsent || isGranted());
}

// Boot (call on first idle): always-on adapters now; gated adapters if/when consent
// is granted.
export function initAnalytics() {
  ADAPTERS.filter((a) => !a.needsConsent).forEach(initAdapter);
  if (isGranted()) ADAPTERS.filter((a) => a.needsConsent).forEach(initAdapter);
  onConsentChange((v) => {
    if (v === "granted") ADAPTERS.filter((a) => a.needsConsent).forEach(initAdapter);
    // "denied" after a prior "granted" would need a reload to fully unload SDKs;
    // we just stop routing new events to them (activeAdapters drops them).
  });
}

export const analytics = {
  track(event: string, props: Props = {}) {
    const name = assertKnownEvent(event);
    activeAdapters().forEach((a) => {
      try {
        a.track?.(name, props);
      } catch {
        /* ignore */
      }
    });
  },
  page(props: Props = {}) {
    activeAdapters().forEach((a) => {
      try {
        a.page?.(props);
      } catch {
        /* ignore */
      }
    });
  },
  identify(id: string, props: Props = {}) {
    if (!id) return;
    activeAdapters().forEach((a) => {
      try {
        a.identify?.(id, props);
      } catch {
        /* ignore */
      }
    });
  },
  // re-exported so the consent banner drives consent without a second import.
  setConsent,
  getConsent,
  isGranted,
  hasDecided,
};

export { EVENTS } from "./events";
