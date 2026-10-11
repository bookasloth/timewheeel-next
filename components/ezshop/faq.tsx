import { ChevronDown } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { EzHead } from "./button";

// ponytail: native <details> accordion, no client JS, answers always in the HTML.
export function EzFaq() {
  const f = ez.faq;
  return (
    <section className="ez-sec" id="faq">
      <div className="ez-container ez-faq">
        <EzHead number={f.number} label={f.label} title={f.title} center />
        <div className="ez-faq-list">
          {f.items.map((item, i) => (
            <details key={item.q} className="ez-faq-item" open={i === 0}>
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
