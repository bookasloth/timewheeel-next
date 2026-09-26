// Lead tracking entry point. One typed call so every form reports the same way.
// Fans out to: GA4 (via GTM's generate_lead trigger) and the analytics bus (Meta
// Pixel 'Lead' + PostHog + Clarity). When the /api/lead response returns an
// eventId, we pass it through so the browser Meta hit de-dupes against the
// server-side Conversions API hit (same event_id).
import { analytics, EVENTS } from "@/lib/analytics";

export function trackLead(
  source: string,
  extra?: { service?: string; value?: string; eventId?: string },
) {
  if (typeof window === "undefined") return;
  const { eventId, ...rest } = extra ?? {};
  const idProp = eventId ? { event_id: eventId } : {};

  // GA4 via GTM: the existing generate_lead trigger + GA4 event tag read this.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", form_source: source, ...rest, ...idProp });

  // Meta Pixel 'Lead' (+ PostHog, Clarity) through the bus, deduped on event_id.
  analytics.track(EVENTS.LEAD_CAPTURED, { form_source: source, ...rest, ...idProp });
}
