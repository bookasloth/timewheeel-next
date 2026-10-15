"use client";

import { useEffect, useRef, useState } from "react";
import { TdDino } from "./dino";
import { TdTicket } from "./ticket";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Interactive hero visual: the dino's eye follows the cursor, the ticket tilts
// in 3D toward the pointer, and clicking the dino makes it hop and roar.
// All motion is driven by CSS variables written from a rAF-throttled handler,
// and is skipped entirely under prefers-reduced-motion or on touch pointers.
export function TdHeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLButtonElement>(null);
  const raf = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const [roar, setRoar] = useState(false);
  const [hop, setHop] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = ref.current;
      if (!el) return;
      if (raf.current !== null) return;

      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const r = el.getBoundingClientRect();

        const within =
          e.clientX >= r.left - 160 &&
          e.clientX <= r.right + 160 &&
          e.clientY >= r.top - 160 &&
          e.clientY <= r.bottom + 160;

        const px = within ? clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1) : 0;
        const py = within ? clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1) : 0;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));

        const dino = dinoRef.current;
        if (dino) {
          const dr = dino.getBoundingClientRect();
          const ex = clamp((e.clientX - (dr.left + dr.width / 2)) / dr.width, -1, 1);
          const ey = clamp((e.clientY - (dr.top + dr.height / 2)) / dr.height, -1, 1);
          el.style.setProperty("--ex", ex.toFixed(3));
          el.style.setProperty("--ey", ey.toFixed(3));
        }
      });
    };

    const reset = () => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", reset);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => clearTimeout(t));
    };
  }, []);

  function react() {
    if (prefersReducedMotion()) return;
    setHop(true);
    setRoar(true);
    timers.current.push(window.setTimeout(() => setHop(false), 650));
    timers.current.push(window.setTimeout(() => setRoar(false), 1400));
  }

  return (
    <div ref={ref} className="td-hero-visual">
      <button
        ref={dinoRef}
        type="button"
        className={`td-dino${hop ? " is-hop" : ""}`}
        onClick={react}
        aria-label="Roar with the dinosaur"
      >
        {roar && (
          <span className="td-dino-bubble" aria-hidden="true">
            Rawr!
          </span>
        )}
        <TdDino />
      </button>

      <div className="td-ticket-wrap" aria-hidden="true">
        <TdTicket />
      </div>
    </div>
  );
}
