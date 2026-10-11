import { ArrowRight, Check } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";
import { CfButton } from "./button";

// Upsell band: the hosted page is free, this is the paid "own your own site" path.
export function CfLicence({ data }: { data: CfData }) {
  const { licence } = data;
  return (
    <section className="cf-sec cf-licence" id="licence">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={licence.number}>
          <h2 className="cf-h">{licence.title}</h2>
          <p className="cf-lede">{licence.body}</p>
        </Reveal>

        <div className="cf-licence-grid">
          <Reveal className="cf-card cf-licence-card">
            <h3 className="cf-card-title">{licence.includesTitle}</h3>
            <ul className="cf-licence-list">
              {licence.includes.map((item) => (
                <li key={item}>
                  <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="cf-card cf-licence-price" delay={0.06}>
            <span className="cf-licence-tag">{licence.priceLabel}</span>
            <p className="cf-licence-amount">{licence.price}</p>
            <p className="cf-card-desc">{licence.priceNote}</p>
            <CfButton href={licence.ctaHref} variant="gold">
              {licence.ctaLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </CfButton>
            <p className="cf-licence-fit">{licence.fit}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
