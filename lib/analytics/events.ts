// Canonical analytics event names. One source of truth so a stray "BookDemo"
// vs "book_demo" never splits a funnel. Mirrors the bookasloth analytics bus.
//
// Money/acquisition-significant events also fire server-side (Meta CAPI in
// app/api/lead/route.ts) with a shared event_id so Meta de-dupes browser+server.
export const EVENTS = {
  PAGE_VIEWED: "page_viewed",
  // submitted any lead form (challenge, estimate, audit, blueprint, contact)
  LEAD_CAPTURED: "lead_captured", // → Meta 'Lead', GA4 'generate_lead'
  // high-intent clicks (GTM also catches these via click triggers)
  BOOK_DEMO_CLICKED: "book_demo_clicked",
  CONTACT_WHATSAPP: "contact_whatsapp",
  CONTACT_CLICK: "contact_click",
  SEO_AUDIT_STARTED: "seo_audit_started",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

const KNOWN = new Set<string>(Object.values(EVENTS));

// Returns the name unchanged. Warns in dev on an unknown name (typo guard) but
// never throws — analytics must never break the page.
export function assertKnownEvent(event: string): string {
  if (process.env.NODE_ENV !== "production" && !KNOWN.has(event)) {
    console.warn(`[analytics] unknown event "${event}" — add it to lib/analytics/events.ts`);
  }
  return event;
}
