// Google Tag Manager adapter. GTM carries our GA4 config + the click-conversion
// tags (Book Demo / WhatsApp / Phone / Email) and the generate_lead → GA4 event,
// all managed in the GTM dashboard. Loading GTM here (after consent) is what turns
// GA4 + those conversions on. track() pushes to dataLayer so GTM triggers fire.
import type { Adapter, Props, Vital } from "./types";

// ponytail: falls back to the known container so it still works without the env var.
const CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-W8T4XS6B";

let loaded = false;

const gtm: Adapter = {
  name: "gtm",
  needsConsent: true,
  init() {
    if (loaded || !CONTAINER_ID || typeof document === "undefined") return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${CONTAINER_ID}`;
    document.head.appendChild(s);
  },
  track(event: string, props: Props = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
  },
  page(props: Props = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page_view", ...props });
  },
  // GTM: Custom Event trigger "web_vitals" -> GA4 Event tag named {{metric_name}}
  // with these as parameters (setup steps in docs/web-vitals.md).
  vital(m: Vital) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "web_vitals",
      metric_name: m.name,
      metric_value: m.value,
      metric_delta: m.delta,
      metric_id: m.id,
      metric_rating: m.rating,
      metric_page: m.page,
      navigation_type: m.navigationType,
      // GA4 sums `value`, so send the delta; CLS x1000 so it survives rounding.
      value: Math.round(m.name === "CLS" ? m.delta * 1000 : m.delta),
    });
  },
};

export default gtm;
