"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Fade + rise on scroll. Wrap any block. `stagger` animates direct children instead.
export function Reveal({
  children,
  className,
  stagger,
  y = 24,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = stagger
        ? (gsap.utils.toArray(ref.current!.children) as HTMLElement[])
        : [ref.current!];
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.7,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
