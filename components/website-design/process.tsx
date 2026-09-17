"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/reveal";
import { palette, wd } from "@/lib/website-design";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WdProcess() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".wd-process-line", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-wgreen">{wd.process.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">{wd.process.title}</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">{wd.process.body}</p>
      </Reveal>

      {/* desktop — horizontal timeline */}
      <div className="relative mt-16 hidden md:block">
        <div className="absolute inset-x-[8%] top-5 h-px bg-border" aria-hidden />
        <div
          className="wd-process-line absolute inset-x-[8%] top-5 h-0.5"
          style={{ backgroundImage: `linear-gradient(90deg, ${palette.blue}, ${palette.purple}, ${palette.green})` }}
          aria-hidden
        />
        <div className="grid grid-cols-5 gap-6">
          {wd.process.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="group">
                <span className="relative grid size-10 place-items-center rounded-full text-xs font-black text-white shadow-[0_6px_16px_-6px_rgba(17,24,39,0.45)]">
                  <span
                    className="grid size-full place-items-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: step.accent }}
                  >
                    {step.number}
                  </span>
                </span>
                <h3 className="mt-5 text-base font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 pr-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* mobile — vertical sequence */}
      <div className="mt-12 md:hidden">
        <div className="relative space-y-8 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-border">
          {wd.process.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <div className="relative flex gap-5 pl-0">
                <span
                  className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full text-xs font-black text-white shadow-[0_6px_16px_-6px_rgba(17,24,39,0.45)]"
                  style={{ backgroundColor: step.accent }}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}