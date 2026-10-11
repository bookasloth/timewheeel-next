"use client";

import { useEffect } from "react";
import { analytics, EVENTS } from "@/lib/analytics";

// Fires sign_up once when a new member first lands on the dashboard
// (?welcome=1), then drops the flag from the URL so a reload doesn't re-fire.
export function WelcomeTracker({ method }: { method: string }) {
  useEffect(() => {
    analytics.track(EVENTS.SIGN_UP, { method });
    const url = new URL(window.location.href);
    url.searchParams.delete("welcome");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [method]);
  return null;
}
