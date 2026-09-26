// Google Tag Manager adapter. GTM carries our GA4 config + the click-conversion
// tags (Book Demo / WhatsApp / Phone / Email) and the generate_lead → GA4 event,
// all managed in the GTM dashboard. Loading GTM here (after consent) is what turns
// GA4 + those conversions on. track() pushes to dataLayer so GTM triggers fire.
import type { Adapter, Props } from "./types";

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
};

export default gtm;
