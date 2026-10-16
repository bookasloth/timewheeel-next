"use client";

import { useEffect } from "react";

// In-page anchor links (`href="#contact"`) break under the App Router: Next's
// Link intercepts the click, hash-only navigation doesn't reliably re-scroll
// (and never re-scrolls when the hash is already set), and its preventDefault
// kills the browser's native jump too. This handler listens in the CAPTURE
// phase so it runs before Link's own handler, stops the event from reaching
// it, and scrolls the target into view itself. Mounted once in the root
// layout so it covers every page. Target `scroll-margin-top` still applies.
export function SmoothAnchor() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const rawHref = link.getAttribute("href");
      if (!rawHref || !rawHref.startsWith("#") || rawHref === "#") return;
      const id = decodeURIComponent(rawHref.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      // Capture phase: stop Next Link / React from ever handling this click.
      e.preventDefault();
      e.stopPropagation();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (window.location.hash !== rawHref) {
        window.history.pushState(null, "", rawHref);
      }
    };
    // Capture, so this runs before React/Next Link's delegated handlers.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
