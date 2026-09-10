import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";
import { SxButton } from "./cta";
import "./pricing.css";

export function BasPricing() {
  return (
    <section className="pr">
      <div className="pr__container">
        <Reveal className="pr__header">
          <h2 className="pr__title">{bas.pricing.title}</h2>
          <p className="pr__desc">{bas.pricing.body}</p>
        </Reveal>

        <div className="pr__grid">
          {bas.pricing.plans.map((plan) => (
            <Reveal
              key={plan.name}
              className={`pr__card${plan.highlight ? " pr__card--pop" : ""}`}
            >
              {plan.highlight ? (
                <span className="pr__pop">
                  <Sparkles size={13} strokeWidth={1.8} aria-hidden="true" />
                  Most popular
                </span>
              ) : null}
              <h3 className="pr__name">{plan.name}</h3>
              <p className="pr__tagline">{plan.tagline}</p>
              <ul className="pr__features">
                {plan.features.map((feature) => (
                  <li key={feature} className="pr__feature">
                    <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <SxButton href={bas.liveUrl} external variant="accent">
                Get started
              </SxButton>
            </Reveal>
          ))}
        </div>

        <p className="pr__foot">{bas.pricing.footnote}</p>
      </div>
    </section>
  );
}