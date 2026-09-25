// Analytics event push to GTM's dataLayer. One typed entry point so the
// dataLayer shape stays consistent across every lead form.
// ponytail: no analytics SDK, GTM reads window.dataLayer directly.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Fires GA4's standard `generate_lead` event. `source` labels which form
// (challenge, estimate, audit...), `value` is optional revenue context.
export function trackLead(source: string, extra?: { service?: string; value?: string }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", form_source: source, ...extra });
}
