"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function SmmFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-text">
          FAQ
        </p>
        <RevealHeading as="h2" className="mt-3 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Social media marketing, answered
        </RevealHeading>
      </Reveal>
      <div className="mt-12 space-y-3">
        {smm.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.04}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border bg-card transition-colors duration-300",
                  isOpen ? "border-transparent" : "border-border",
                )}
                style={isOpen ? { borderColor: `${item.tone}66` } : undefined}
              >
                <span aria-hidden className={cn("block h-[3px] bg-transparent transition-colors duration-300", isOpen && "bg-gradient-to-r from-brand via-accent-pink to-accent-yellow")} />
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`smm-faq-panel-${i}`}
                    id={`smm-faq-button-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left text-base font-semibold"
                  >
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-lg text-xs font-black tracking-tight"
                      style={{ backgroundColor: `${item.tone}1a`, color: item.tone }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{item.q}</span>
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border border-border text-foreground transition-transform duration-300",
                        isOpen && "rotate-45 border-brand bg-brand text-brand-foreground",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`smm-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`smm-faq-button-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}