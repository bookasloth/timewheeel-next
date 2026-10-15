import { ChevronDown } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbHead } from "./head";

// ponytail: native <details>, no client JS; answers stay in the HTML for crawlers.
export function MbFaq() {
  const s = mb.faq;
  return (
    <section className="mb-sec mb-tint">
      <div className="mb-container">
        <MbHead label={s.label} title={s.title} center />
        <Reveal className="mb-faq" stagger>
          {s.items.map((item, i) => (
            <details key={item.q} className="mb-faq-item" open={i === 0}>
              <summary>
                <span className="mb-faq-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{item.q}</h3>
                <span className="mb-faq-plus" aria-hidden="true">
                  <ChevronDown size={18} strokeWidth={2.2} />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
