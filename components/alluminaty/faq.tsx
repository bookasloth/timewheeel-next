import { ChevronDown } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

export function AzFaq() {
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
          {az.faq.items.map((item) => (
            <details className="az-faq-item" key={item.q}>
              <summary className="az-faq-q">
                <span>{item.q}</span>
                <span className="az-faq-chev" aria-hidden="true">
                  <ChevronDown size={16} strokeWidth={2} />
                </span>
              </summary>
              <p className="az-faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}