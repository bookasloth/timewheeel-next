"use client";

// One source of truth for lead-form funnel tracking. Every lead form calls this
// so form_started / form_field_error / form_abandoned fire identically across the
// site, which is what makes the "started but didn't submit" retargeting audience
// trustworthy. Each event carries first-touch attribution (utm_*, fbclid, ...) so
// the funnel can be broken down by campaign.
//
// Wire-up per form:
//   const ft = useFormTracking("my-source");
//   - call ft.onInteract() on the first field change (or just in your `set`)
//   - call ft.onErrors(Object.keys(errors)) when submit validation fails
//   - call ft.onSubmitted() on a successful submit (before/with trackLead)
import { useEffect, useRef } from "react";
import { analytics, EVENTS } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

export function useFormTracking(source: string) {
  const started = useRef(false);
  const submitted = useRef(false);
  const touched = useRef(false);

  // First real interaction. Fires once.
  function onInteract() {
    touched.current = true;
    if (started.current) return;
    started.current = true;
    analytics.track(EVENTS.FORM_STARTED, { form_source: source, ...getAttribution() });
  }

  function onErrors(fields: string[]) {
    if (!fields.length) return;
    analytics.track(EVENTS.FORM_FIELD_ERROR, { form_source: source, fields: fields.join(",") });
  }

  function onSubmitted() {
    submitted.current = true;
  }

  // form_abandoned: started + touched but never submitted, fired once when the
  // page is hidden or unloaded. visibilitychange catches tab-switch/app-close on
  // mobile where pagehide is unreliable.
  useEffect(() => {
    const leave = () => {
      if (started.current && touched.current && !submitted.current) {
        submitted.current = true; // guard against a double fire
        analytics.track(EVENTS.FORM_ABANDONED, { form_source: source, ...getAttribution() });
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") leave();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", leave);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", leave);
    };
  }, [source]);

  return { onInteract, onErrors, onSubmitted };
}
