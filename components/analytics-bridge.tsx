"use client";

// Boots the analytics bus once (on first idle, so SDK downloads never fight first
// paint) and emits a page view on every route change. Renders nothing. Mount once
// in the root layout, below {children}.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, initAnalytics, EVENTS } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

let booted = false;

export function AnalyticsBridge() {
  const pathname = usePathname();

  useEffect(() => {
    if (booted) return;
    booted = true;
    // First-touch attribution: capture utm_*/gclid/fbclid/referrer before the
    // first ad param is lost to navigation. First-party, so it runs pre-consent.
    captureAttribution();
    const boot = () => initAnalytics();
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => void })
      .requestIdleCallback;
    if (ric) ric(boot);
    else setTimeout(boot, 1);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    analytics.page({ path: pathname });
    analytics.track(EVENTS.PAGE_VIEWED, { path: pathname });
  }, [pathname]);

  return null;
}
