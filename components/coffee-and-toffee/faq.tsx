"use client";

import { useState } from "react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

export function CfFaq({ data }: { data: CfData }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="cf-sec cf-faq">
      <div className="cf-container">
        <Reveal className="cf-head cf-head--center" data-ghost={data.faq.number}>
          <h2 className="cf-h">{data.faq.title}</h2>
        </Reveal>

        <div className="cf-faq-list">
          {data.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} className="cf-faq-item" delay={i * 0.04}>
                <div className="cf-faq-card">
                  <h3>
                    <button
                      type="button"
                      id={`cf-faq-button-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`cf-faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="cf-faq-q"
                    >
                      <span>{item.q}</span>
                      <span className="cf-faq-plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`cf-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`cf-faq-button-${i}`}
                    className={`cf-faq-panel ${isOpen ? "cf-faq-panel--open" : ""}`}
                  >
                    <div className="cf-faq-a">
                      <p>{item.a}</p>
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