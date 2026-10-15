"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { arch } from "@/lib/archflow";
import { AfHead } from "./head";
import { cn } from "@/lib/utils";

// Accordion: one answer open at a time, animated via grid-template-rows.
// Answers stay in the DOM so crawlers still read them.
export function AfFaq() {
  const s = arch.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="af-sec af-tint">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} center />
        <div className="af-faq">
          {s.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("af-faq-item", isOpen && "is-open")}>
                <h3>
                  <button
                    type="button"
                    id={`af-faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`af-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="af-faq-q"
                  >
                    <span>{item.q}</span>
                    <span className="af-faq-chev" aria-hidden="true">
                      <ChevronDown size={16} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`af-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`af-faq-button-${i}`}
                  className={cn("af-faq-panel", isOpen && "is-open")}
                >
                  <div className="af-faq-panel-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
