"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Code2, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pillar = {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
  accent: string;
  dots?: { x: number; y: number }[];
  bars?: number[];
  growth?: number[];
};

const pillars: Pillar[] = [
  {
    n: "01",
    icon: Sparkles,
    title: "Thoughtful Design",
    body: "We create clean, intentional interfaces that make brands easier to understand and experiences easier to use.",
    accent: "brand",
    dots: [
      { x: 28, y: 30 },
      { x: 58, y: 22 },
      { x: 42, y: 55 },
      { x: 74, y: 48 },
      { x: 60, y: 70 },
    ],
  },
  {
    n: "02",
    icon: Code2,
    title: "Built to Perform",
    body: "We turn designs into fast, responsive, scalable digital experiences using modern development practices.",
    accent: "wpurple",
    bars: [0.55, 0.8, 0.45, 1],
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Business Focused",
    body: "We design with real business goals in mind, from stronger positioning to better engagement and conversion.",
    accent: "wgreen",
    growth: [0.6, 0.85, 1, 0.7],
  },
];

export function AboutPrinciples() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".principle-card");
      gsap.from(cards, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 84%" },
      });
      gsap.from(".motif-dot", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 84%" },
      });
      gsap.from(".bar-grow", {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 84%" },
      });
      gsap.from(".bar-x", {
        scaleX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 84%" },
      });
      gsap.from(".accent-bar", {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, { scope: cardsRef, revertOnUpdate: true });

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="wd-blob absolute -left-28 -top-28 h-80 w-80 rounded-full bg-brand/15 blur-[120px]" />
        <div className="wd-blob [--blob-delay:-7s] absolute -bottom-40 -right-32 h-[24rem] w-[24rem] rounded-full bg-purple-500/12 blur-[120px]" />
        <div className="wd-blob [--blob-delay:-14s] absolute right-[18%] top-[22%] h-64 w-64 rounded-full bg-orange-300/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              What guides us
            </span>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <h2 className="mt-5 text-[3rem] font-black leading-[1.08] tracking-tight md:text-4xl">
            <span className="relative inline-block">
              <span className="absolute -top-10 -left-4 text-[8rem] font-black text-brand/[0.05] leading-none select-none">
                03
              </span>
              Principles that move every project forward.
            </span>
          </h2>
          <div className="mt-5 h-1 w-20 overflow-hidden rounded-full bg-border">
            <span className="accent-bar block h-full origin-left bg-brand/60" />
          </div>
        </Reveal>

        <div ref={cardsRef} className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <motion.article
              key={p.title}
              className="principle-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-500 hover:border-[var(--accent)]/40"
              style={{ "--accent": `var(--color-${p.accent})` } as React.CSSProperties}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
            >
              <div className="relative flex flex-col p-5">
                <div className="relative mb-2">
                  <span className="absolute right-2 top-0 text-[4rem] font-black text-[var(--accent)]/[0.06] leading-none select-none">
                    {p.n}
                  </span>
                  <span className="absolute bottom-0 left-0 grid size-8 place-items-center rounded-lg bg-[var(--accent)]/10 ring-1 ring-border">
                    <p.icon className="size-4 text-[var(--accent)]" strokeWidth={1.9} />
                  </span>
                </div>

                {p.dots && (
                  <div className="relative mb-3 h-16">
                    {p.dots.map((d, j) => (
                      <span
                        key={j}
                        className="motif-dot absolute size-2.5 rounded-full bg-[var(--accent)]/30"
                        style={{ left: d.x, top: d.y }}
                      />
                    ))}
                  </div>
                )}
                {p.bars && (
                  <div className="mb-3 flex items-end justify-center gap-1.5">
                    {p.bars.map((h, j) => (
                      <span
                        key={j}
                        className="bar-grow w-2.5 rounded-t-sm bg-[var(--accent)]/75 origin-bottom scale-y-0"
                        style={{ height: `${h * 80}%` }}
                      />
                    ))}
                  </div>
                )}
                {p.growth && (
                  <div className="mb-3 flex items-end justify-center gap-2.5">
                    {p.growth.map((w, j) => (
                      <span
                        key={j}
                        className="bar-x h-2.5 rounded-t-sm bg-[var(--accent)]/75 origin-left scale-x-0"
                        style={{ width: `${w * 80}%` }}
                      />
                    ))}
                  </div>
                )}

                <h3 className="text-base font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
