"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { cn } from "@/lib/utils";
import { TdHead } from "./head";

// Accordion: one answer open at a time, animated via grid-template-rows.
// Answers stay in the DOM so crawlers still read them.
export function TdFaq() {
  const s = td.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="td-sec">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} center />
        <div className="td-faq">
          {s.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("td-faq-item", isOpen && "is-open")}>
                <h3>
                  <button
                    type="button"
                    id={`td-faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`td-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="td-faq-q"
                  >
                    <span>{item.q}</span>
                    <span className="td-faq-chev" aria-hidden="true">
                      <ChevronDown size={16} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`td-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`td-faq-button-${i}`}
                  className={cn("td-faq-panel", isOpen && "is-open")}
                >
                  <div className="td-faq-panel-inner">
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
