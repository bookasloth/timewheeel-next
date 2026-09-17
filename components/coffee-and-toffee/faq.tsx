import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

export function CfFaq({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-faq">
      <div className="cf-container">
        <Reveal className="cf-head cf-head--center" data-ghost={data.faq.number}>
          <h2 className="cf-h">{data.faq.title}</h2>
        </Reveal>

        <div className="cf-faq-list">
          {data.faq.items.map((item, i) => (
            <Reveal key={item.q} className="cf-faq-item" delay={i * 0.04}>
              <details className="cf-faq-details">
                <summary className="cf-faq-q">
                  <span>{item.q}</span>
                  <span className="cf-faq-plus" aria-hidden="true" />
                </summary>
                <div className="cf-faq-a">
                  <p>{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
