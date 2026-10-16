import { ArrowRight } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbButton } from "./button";

export function MbFinalCta() {
  const s = mb.final;
  return (
    <section className="mb-cta">
      <div className="mb-container">
        <Reveal className="mb-cta-inner">
          <h2 className="mb-cta-title">{s.title}</h2>
          <p className="mb-cta-body">{s.body}</p>
          <div className="mb-actions mb-actions--center">
            <MbButton href={s.primaryHref}>
              {s.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </MbButton>
            <MbButton href={s.secondaryHref} variant="line" className="mb-btn--on-dark">
              {s.secondaryLabel}
            </MbButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
