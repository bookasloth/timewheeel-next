"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Heading whose lines slide up from a clip mask when scrolled into view (once).
// Mirrors the Norio "line-mask reveal": SplitText into lines + mask, staggered.
// On-brand: motion only, no shadow/lift. Respects prefers-reduced-motion (shows
// the text immediately, no split). autoSplit re-splits on resize/font load.
export function RevealHeading({
  children,
  as = "h2",
  className,
  stagger = 0.1,
  start = "top 85%",
}: {
  children: ReactNode;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      let split: SplitText | undefined;
      // Split only after fonts load so line breaks are measured correctly.
      document.fonts.ready.then(() => {
        if (!ref.current) return;
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "rh-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: "power3.out",
              stagger,
              scrollTrigger: { trigger: el, start, once: true },
            }),
        });
      });

      return () => split?.revert();
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, children);
}
