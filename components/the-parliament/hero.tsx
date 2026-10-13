import { ArrowRight } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { TpButton } from "./button";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

export function TpHero() {
  const h = tp.hero;
  return (
    <section className="tp-hero tp-hero--crowd">
      <span className="tp-glow" aria-hidden="true" />
      <div className="tp-container tp-hero-inner">
        <p className="tp-eyebrow">{h.eyebrow}</p>
        <h1 className="tp-hero-title">
          {h.title} <span className="tp-accent">{h.titleAccent}</span>
        </h1>
        <p className="tp-hero-answer">{h.answer}</p>
        <div className="tp-actions">
          <TpButton href={h.primaryHref}>
            {h.primaryLabel}
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </TpButton>
          <TpButton href={h.secondaryHref} variant="line">
            {h.secondaryLabel}
          </TpButton>
        </div>
      </div>
      <div className="tp-hero-crowd" aria-hidden="true">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} safeTopRatio={0.36} />
      </div>
    </section>
  );
}
