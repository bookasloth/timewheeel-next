"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";
import { cn } from "@/lib/utils";

export function BasFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sx-sec sx-faq-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            className="sx-h2"
            style={{ whiteSpace: "pre-line" }}
          >
            {bas.faq.title}
          </h2>
        </Reveal>

        <div className="sx-faq-list mt-10">
          {bas.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className={cn("sx-faq", isOpen && "is-open")}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`bas-faq-panel-${i}`}
                      id={`bas-faq-button-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="sx-faq-btn"
                    >
                      <span className="sx-faq-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="sx-faq-q">{item.q}</span>
                      <span
                        className={cn("sx-faq-ic", isOpen && "is-open")}
                        aria-hidden="true"
                      >
                        <Plus size={15} strokeWidth={1.8} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`bas-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`bas-faq-button-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="sx-faq-a">{item.a}</p>
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