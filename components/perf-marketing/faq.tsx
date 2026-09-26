"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

const pmFaq = [
  {
    q: "How much does digital marketing cost in Nagpur?",
    a: "It depends on your goals and the channels you need. We offer flexible monthly packages for SEO, ads, social, and content, and always share a clear scope and pricing upfront, so you know exactly what you are paying for and what it should deliver.",
  },
  {
    q: "Should I invest in SEO or paid ads?",
    a: "Usually both, at different speeds. Paid ads bring enquiries quickly while SEO builds steady, long-term traffic that keeps working after the spend stops. We recommend the right mix for your budget and how fast you need results.",
  },
  {
    q: "How long does it take to see results?",
    a: "Paid ads can start driving enquiries within days of going live. SEO and content typically show meaningful movement in three to six months, with results compounding over time. We set realistic expectations and report progress every month.",
  },
  {
    q: "Which locations do you serve?",
    a: "We are based in Nagpur and serve businesses across Nagpur, Pune, Mumbai, the entire state of Maharashtra, and many cities across India.",
  },
  {
    q: "How do you measure and report results?",
    a: "We track the metrics that matter, keyword rankings, traffic, leads, cost per enquiry, and conversions, and share them in a clear monthly report. You always see what we are doing and the impact it has on your business.",
  },
];

export function PmFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-text">
          FAQ
        </p>
        <RevealHeading as="h2" className="mt-3 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Frequently Asked Questions
        </RevealHeading>
      </Reveal>
      <div className="mt-12 space-y-3">
        {pmFaq.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`pm-faq-panel-${i}`}
                    id={`pm-faq-button-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left text-base font-semibold"
                  >
                    <span className="text-sm font-black tracking-tight text-muted-foreground/35">
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
                  id={`pm-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`pm-faq-button-${i}`}
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
