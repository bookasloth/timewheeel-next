// Microsoft Clarity adapter. Clarity is QUALITATIVE only — heatmaps + session
// replay, viewed in Clarity's own dashboard. No quantitative event API to fold
// into our KPIs, so track()/page() are thin: we only push custom tags so replays
// stay filterable in Clarity.
import type { Adapter, Props } from "./types";

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

let loaded = false;
const q = (...args: unknown[]) => {
  try {
    window.clarity?.(...args);
  } catch {
    /* clarity not ready — ignore */
  }
};

const clarity: Adapter = {
  name: "clarity",
  needsConsent: true,
  init() {
    if (loaded || !PROJECT_ID || typeof window === "undefined") return;
    loaded = true;
    // Typed re-implementation of Clarity's snippet loader.
    const c = window as unknown as Record<string, unknown>;
    c.clarity =
      c.clarity ||
      function (...args: unknown[]) {
        ((c.clarity as { q?: unknown[] }).q = (c.clarity as { q?: unknown[] }).q || []).push(args);
      };
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(s, first);
  },
  identify(id: string, props: Props = {}) {
    q("identify", String(id), undefined, undefined, props.name);
    if (props.role) q("set", "role", String(props.role));
  },
  track(event: string) {
    q("event", event);
  },
  page() {
    /* Clarity tracks navigation itself */
  },
};

export default clarity;
