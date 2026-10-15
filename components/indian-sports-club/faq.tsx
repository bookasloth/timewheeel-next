"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Accordion: one answer open at a time, animated via grid-template-rows.
// Answers stay in the DOM so crawlers still read them.
export function IscFaq() {
  const s = isc.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="isc-sec isc-faqsec">
      <div className="isc-container isc-faq-grid">
        <aside className="isc-faq-aside">
          <Reveal>
            <h2 className="isc-h">{s.title}</h2>
          </Reveal>
        </aside>

        <div className="isc-faq">
          {s.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("isc-faq-item", isOpen && "is-open")}>
                <h3 className="isc-faq-q">
                  <button
                    type="button"
                    id={`isc-faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`isc-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="isc-faq-trigger"
                  >
                    <span className="isc-faq-idx" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="isc-faq-text">{item.q}</span>
                    <Plus className="isc-faq-mark" size={18} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`isc-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`isc-faq-button-${i}`}
                  className={cn("isc-faq-panel", isOpen && "is-open")}
                >
                  <div className="isc-faq-panel-inner">
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
