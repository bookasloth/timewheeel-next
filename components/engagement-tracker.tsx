"use client";

// Site-wide engagement signals for retargeting: distinguishes "landed and bounced"
// from "landed and actually engaged". Fires once per page view:
//   - scroll_50:   scrolled at least halfway down the page
//   - engaged_30s: 30s of active (tab-visible) time on the page
// Both carry first-touch attribution so audiences can be scoped by campaign. Routed
// through the analytics bus (PostHog always-on; Meta/GTM/Clarity after consent).
// Mounted once in the root layout; resets on every route change.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, EVENTS } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

export function EngagementTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    let scrolled = false;
    let engaged = false;

    const onScroll = () => {
      if (scrolled) return;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const top = window.scrollY || el.scrollTop;
      if (max > 240 && top / max >= 0.5) {
        scrolled = true;
        analytics.track(EVENTS.SCROLL_50, { path: pathname, ...getAttribution() });
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Count only active (visible) seconds so a backgrounded tab doesn't inflate it.
    let seconds = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    const tick = () => {
      seconds += 1;
      if (seconds >= 30 && !engaged) {
        engaged = true;
        analytics.track(EVENTS.ENGAGED_30S, { path: pathname, ...getAttribution() });
        stop();
      }
    };
    const start = () => {
      if (timer == null) timer = setInterval(tick, 1000);
    };
    function stop() {
      if (timer != null) {
        clearInterval(timer);
        timer = null;
      }
    }
    const onVis = () => (document.visibilityState === "visible" ? start() : stop());
    document.addEventListener("visibilitychange", onVis);
    if (document.visibilityState === "visible") start();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [pathname]);

  return null;
}
