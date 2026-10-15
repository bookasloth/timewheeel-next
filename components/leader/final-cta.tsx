import { ArrowRight } from "lucide-react";
import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";
import { LfButton } from "./button";

export function LfFinalCta() {
  const s = leader.final;
  return (
    <section className="lf-cta">
      <span className="lf-glow" aria-hidden="true" />
      <span className="lf-cta-dots" aria-hidden="true" />
      <div className="lf-container">
        <Reveal className="lf-cta-panel">
          <div className="lf-cta-copy">
            <h2 className="lf-cta-title">{s.title}</h2>
            <p className="lf-cta-body">{s.body}</p>
          </div>
          <div className="lf-cta-actions">
            <LfButton href={s.primaryHref}>
              {s.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </LfButton>
            <LfButton href={s.secondaryHref} variant="line" className="lf-btn--on-dark">
              {s.secondaryLabel}
            </LfButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
