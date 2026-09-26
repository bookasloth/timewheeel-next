// Meta (Facebook) Pixel adapter. Browser-side pixel = retargeting audiences +
// ad-side conversion signal. The AUTHORITATIVE conversion signal is server-side
// via the Conversions API (app/api/lead/route.ts); Meta de-dupes browser+server
// on event_id. Browser pixels degrade (ad-blockers, ITP) — never rely on this
// alone for conversion counts, only for audience building.
//
// Meta has a fixed standard-event vocabulary; our internal names map to the
// nearest standard event, unmapped names go as trackCustom.
import type { Adapter, Props } from "./types";

// ponytail: falls back to the known pixel so it still fires without the env var.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1770040267711324";

const STANDARD: Record<string, string> = {
  lead_captured: "Lead",
  seo_audit_started: "InitiateCheckout",
  book_demo_clicked: "Contact",
  contact_whatsapp: "Contact",
  contact_click: "Contact",
};

let loaded = false;

// Typed re-implementation of Meta's fbevents.js stub loader (no minified IIFE so
// it passes strict TS). Queues calls until fbevents.js finishes downloading.
function loadFbevents() {
  if (window.fbq) return;
  const stub = function (...args: unknown[]) {
    if (stub.callMethod) stub.callMethod(...args);
    else stub.queue!.push(args);
  } as NonNullable<Window["fbq"]>;
  stub.queue = [];
  stub.loaded = true;
  stub.version = "2.0";
  stub.push = stub;
  window.fbq = stub;
  window._fbq = window._fbq || stub;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(s, first);
}

const pixel: Adapter = {
  name: "pixel",
  needsConsent: true,
  init() {
    if (loaded || !PIXEL_ID || typeof window === "undefined") return;
    loaded = true;
    loadFbevents();
    window.fbq!("init", PIXEL_ID);
    window.fbq!("track", "PageView");
  },
  identify() {
    /* Meta matches via cookie/_fbp; advanced matching is server-side (CAPI) */
  },
  track(event: string, props: Props = {}) {
    if (!window.fbq) return;
    const std = STANDARD[event];
    // event_id lets Meta de-dupe this browser hit against the server CAPI hit.
    const opts = props.event_id ? { eventID: String(props.event_id) } : undefined;
    if (std) window.fbq("track", std, props, opts);
    else window.fbq("trackCustom", event, props, opts);
  },
  page() {
    if (!window.fbq) return;
    window.fbq("track", "PageView");
  },
};

export default pixel;
