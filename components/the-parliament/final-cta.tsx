import { ArrowRight } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpButton } from "./button";

export function TpFinalCta() {
  const s = tp.final;
  return (
    <section className="tp-cta">
      <span className="tp-glow" aria-hidden="true" />
      <div className="tp-container">
        <Reveal className="tp-cta-inner">
          <h2 className="tp-cta-title">{s.title}</h2>
          <p className="tp-cta-body">{s.body}</p>
          <div className="tp-actions tp-actions--center">
            <TpButton href={s.primaryHref}>
              {s.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </TpButton>
            <TpButton href={s.secondaryHref} variant="line" className="tp-btn--on-dark">
              {s.secondaryLabel}
            </TpButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
