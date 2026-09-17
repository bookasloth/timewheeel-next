import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

export function CfMoreThanTip({ data }: { data: CoffeeData }) {
  const { moreThanTip } = data;

  return (
    <section className="cf-sec cf-tip">
      <div className="cf-container">
        <div className="cf-tip-grid">
          <div className="cf-tip-main">
            <div>
              <Reveal>
                <span className="cf-kicker">{moreThanTip.kicker}</span>
                <h2 className="cf-h">{moreThanTip.title}</h2>
                <p className="cf-lede">{moreThanTip.body}</p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="cf-tip-quote">
                <p className="cf-tip-quote-text">{moreThanTip.quote.text}</p>
                <p className="cf-tip-quote-attr">{moreThanTip.quote.attr}</p>
              </div>
            </Reveal>
          </div>

          <div className="cf-tip-pillars">
            {moreThanTip.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} className="cf-pillar" delay={i * 0.1}>
                <div className="cf-pillar-number">{pillar.number}</div>
                <h3 className="cf-pillar-title">{pillar.title}</h3>
                <p className="cf-pillar-desc">{pillar.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}