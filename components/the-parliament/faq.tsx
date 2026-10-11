import { ChevronDown } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { TpHead } from "./head";

// ponytail: native <details>, no client JS; answers stay in the HTML for crawlers.
export function TpFaq() {
  const s = tp.faq;
  return (
    <section className="tp-sec">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} center />
        <div className="tp-faq">
          {s.items.map((item, i) => (
            <details key={item.q} className="tp-faq-item" open={i === 0}>
              <summary>
                <h3>{item.q}</h3>
                <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
