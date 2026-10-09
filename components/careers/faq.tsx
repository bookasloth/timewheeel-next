"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/jobs";

/**
 * FAQ for a role. The same `job.faqs` array feeds the visible list and the
 * FAQPage JSON-LD the role page renders, so the markup and the schema can't drift.
 *
 * Accordion rather than stacked <details>: one row open at a time, and a real
 * expand/collapse on grid-template-rows (animates to any height without
 * measuring the panel). aria-expanded/aria-controls wire the button to its
 * region. Mirrors components/website-design/faq.tsx.
 */
export function JobFaq({ job }: { job: Job }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-24" id="faq">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
          Questions
        </p>
        <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
          Before you apply
        </RevealHeading>
      </Reveal>

      <div className="mt-10 space-y-3">
        {job.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.04}>
              <div
                className={cn(
                  "rounded-2xl border border-border bg-card transition-colors",
                  isOpen && "border-brand/50",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${job.slug}-${i}`}
                    id={`faq-button-${job.slug}-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180 text-brand",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${job.slug}-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${job.slug}-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
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
