"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { leader } from "@/lib/leader";
import { LfHead } from "./head";
import { cn } from "@/lib/utils";

// Q-log: answers open one at a time, animated via grid-template-rows.
// Answers stay in the DOM so crawlers still read them.
export function LfFaq() {
  const s = leader.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="lf-qsec">
      <div className="lf-container">
        <LfHead number={s.number} label={s.label} title={s.title} center />
        <div className="lf-qlog">
          <div className="lf-qlog-bar">
            <span className="lf-qlog-title">Leader · answers</span>
            <span className="lf-qlog-count">{s.items.length} entries</span>
          </div>
          {s.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("lf-qlog-item", isOpen && "is-open")}>
                <h3>
                  <button
                    type="button"
                    id={`lf-faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`lf-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="lf-qlog-q"
                  >
                    <span className="lf-qlog-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="lf-qlog-text">{item.q}</span>
                    <span className="lf-qlog-chev" aria-hidden="true">
                      <ChevronDown size={16} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`lf-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`lf-faq-button-${i}`}
                  className={cn("lf-qlog-panel", isOpen && "is-open")}
                >
                  <div className="lf-qlog-panel-inner">
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
