"use client";

import { useSyncExternalStore } from "react";

// Shared guards for scroll/entrance animations (Reveal, RevealHeading).
//
// The problem they solve: on a hard page load the server HTML paints first, and
// only later does hydration run the GSAP "from" tween, which snaps already-seen
// content to opacity 0 and fades it back in. Above the fold that reads as the
// hero blinking out. Content mounted by a client-side navigation was never
// painted, so it can still animate in normally.

const noopSubscribe = () => () => {};

/** False during the hydration render of server HTML, true for client-side mounts. */
export function useIsClientMount() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True when an entrance animation would hide content the visitor has already
 * seen: we're hydrating server HTML, the browser has painted it, and the
 * element sits in the viewport. Browsers without paint timing fall through to
 * animating, which is the old behaviour.
 */
export function alreadyPainted(el: Element, clientMount: boolean) {
  if (clientMount) return false;
  const painted = performance.getEntriesByType("paint").some((e) => e.name === "first-contentful-paint");
  if (!painted) return false;
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

/** Skip the entrance entirely: reduced motion, or it would re-hide painted content. */
export function skipEntrance(el: Element, clientMount: boolean) {
  return prefersReducedMotion() || alreadyPainted(el, clientMount);
}
