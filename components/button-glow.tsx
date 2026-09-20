"use client";

import { useEffect } from "react";

// One delegated pointermove listener that feeds the cursor position into the
// hovered .btn-primary as --gx/--gy, driving the CSS radial glow. Rendered once
// in the public layout; renders no DOM itself.
export function ButtonGlow() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.(".btn-primary") as HTMLElement | null;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--gx", `${e.clientX - r.left}px`);
      btn.style.setProperty("--gy", `${e.clientY - r.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
