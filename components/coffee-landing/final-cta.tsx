import { ArrowRight } from "lucide-react";
import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";
import { CfButton } from "./button";

export function CfFinalCta({ data }: { data: CoffeeData }) {
  const { final } = data;

  return (
    <section className="cf-sec cf-final" id="start">
      <div className="cf-container">
        <Reveal className="cf-final-band">
          <span className="cf-kicker cf-kicker--center">{final.kicker}</span>
          <h2 className="cf-final-title">{final.title}</h2>
          <p className="cf-final-body">{final.body}</p>

          <div className="cf-final-actions">
            <CfButton href={final.primaryHref} variant="gold">
              {final.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </CfButton>
            <CfButton href={final.secondaryHref} variant="outline-light">
              {final.secondaryLabel}
            </CfButton>
          </div>

          <p className="cf-final-brand">{final.brand}</p>
        </Reveal>
      </div>
    </section>
  );
}