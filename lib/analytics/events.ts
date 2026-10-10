// Canonical analytics event names. One source of truth so a stray "BookDemo"
// vs "book_demo" never splits a funnel. Mirrors the bookasloth analytics bus.
//
// Money/acquisition-significant events also fire server-side (Meta CAPI in
// app/api/lead/route.ts) with a shared event_id so Meta de-dupes browser+server.
export const EVENTS = {
  PAGE_VIEWED: "page_viewed",
  // submitted any lead form (challenge, estimate, audit, blueprint, contact)
  LEAD_CAPTURED: "lead_captured", // → Meta 'Lead', GA4 'generate_lead'
  // form lifecycle (retargeting: started-but-not-submitted, abandonment funnels)
  FORM_STARTED: "form_started", // first real interaction with a lead form
  FORM_ABANDONED: "form_abandoned", // left with a partially filled, unsubmitted form
  FORM_FIELD_ERROR: "form_field_error", // a field failed validation on submit
  // engagement (retargeting: "visited + actually read" vs bounced)
  SCROLL_50: "scroll_50", // scrolled at least halfway down a page
  ENGAGED_30S: "engaged_30s", // 30s of active (visible) time on a page
  // high-intent clicks (GTM also catches these via click triggers)
  BOOK_DEMO_CLICKED: "book_demo_clicked",
  CONTACT_WHATSAPP: "contact_whatsapp",
  CONTACT_CLICK: "contact_click",
  SEO_AUDIT_STARTED: "seo_audit_started",
  // Academy interest registration (/academy). A student, not a business lead,
  // so it never fires lead_captured / Meta 'Lead' / GA4 generate_lead.
  ACADEMY_INTEREST: "academy_interest",
  // review-generator funnel (/review): turn real customer feedback into a
  // copy-paste Google review. One event per meaningful step.
  REVIEW_PAGE_VIEWED: "review_page_viewed",
  REVIEW_QUESTIONS_COMPLETED: "review_questions_completed",
  REVIEW_GENERATED: "review_generated",
  REVIEW_COPIED: "review_copied",
  REVIEW_GOOGLE_CLICKED: "review_google_clicked",
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
