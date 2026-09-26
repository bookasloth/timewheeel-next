// PostHog adapter — first-party product analytics (funnels, retention). Always-on
// (needsConsent:false): it is our own first-party tool, not an ad network. Loaded
// dependency-free via PostHog's array.js so it stays out of the initial bundle.
//
// ponytail: no posthog-js dependency; the hosted array.js gives us init/capture/
// identify/reset. Events fired before array.js finishes loading are dropped (not
// queued) — acceptable, boot happens on first idle so real events land after.
import type { Adapter, Props } from "./types";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");

let loaded = false;
let ready = false;

const posthog: Adapter = {
  name: "posthog",
  needsConsent: false,
  init() {
    if (loaded || !KEY || typeof document === "undefined") return;
    loaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = `${HOST}/static/array.js`;
    s.onload = () => {
      try {
        window.posthog?.init(KEY, { api_host: HOST, capture_pageview: false });
        ready = true;
      } catch {
        /* never break the app for analytics */
      }
    };
    document.head.appendChild(s);
  },
  identify(id: string, props: Props = {}) {
    if (!ready || !window.posthog) return;
    window.posthog.identify(String(id), props as Record<string, unknown>);
  },
  reset() {
    if (!ready || !window.posthog) return;
    window.posthog.reset();
  },
  track(event: string, props: Props = {}) {
    if (!ready || !window.posthog) return;
    window.posthog.capture(event, props as Record<string, unknown>);
  },
  page(props: Props = {}) {
    if (!ready || !window.posthog) return;
    window.posthog.capture("$pageview", props as Record<string, unknown>);
  },
};

export default posthog;
