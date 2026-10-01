"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function AzFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="az-sec az-faq">
      <div className="az-container">
        <Reveal
          className="az-head az-head--center"
          data-ghost={az.faq.number}
        >
          <p className="az-kicker">
            <span className="az-kicker-num">{az.faq.number}</span>
            {az.faq.label}
          </p>
          <h2 className="az-h">{az.faq.title}</h2>
        </Reveal>

        <div className="az-faq-list">
          {az.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className={cn("az-faq-item", isOpen && "is-open")}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`az-faq-panel-${i}`}
                      id={`az-faq-button-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="az-faq-q"
                    >
                      <span>{item.q}</span>
                      <span className="az-faq-chev" aria-hidden="true">
                        <ChevronDown size={16} strokeWidth={2} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`az-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`az-faq-button-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="az-faq-a">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
