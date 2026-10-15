"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

// Accordion: one answer open at a time, animated via grid-template-rows.
// Answers stay in the DOM so crawlers still read them.
export function EzFaq() {
  const f = ez.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="ez-sec ez-faq" id="faq">
      <div className="ez-container ez-faq-grid">
        <Reveal className="ez-faq-aside">
          <EzHead number={f.number} label={f.label} title={f.title} />
          <p className="ez-faq-help">
            Still deciding? <Link href="/book-a-demo">Book a demo</Link> or{" "}
            <Link href="/contact">talk to us</Link>.
          </p>
        </Reveal>
        <div className="ez-faq-list">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q}>
                <div className={cn("ez-faq-item", isOpen && "is-open")}>
                  <h3>
                    <button
                      type="button"
                      id={`ez-faq-button-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`ez-faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="ez-faq-q"
                    >
                      <span className="ez-faq-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="ez-faq-q-text">{item.q}</span>
                      <span className="ez-faq-chev" aria-hidden="true">
                        <ChevronDown size={16} strokeWidth={2} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`ez-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`ez-faq-button-${i}`}
                    className={cn("ez-faq-panel", isOpen && "is-open")}
                  >
                    <div className="ez-faq-panel-inner">
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
