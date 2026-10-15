import { ArrowRight } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdButton } from "./button";

export function TdFinalCta() {
  const s = td.final;
  return (
    <section className="td-cta">
      <span className="td-glow" aria-hidden="true" />
      <div className="td-container">
        <Reveal className="td-cta-inner">
          <h2 className="td-cta-title">{s.title}</h2>
          <p className="td-cta-body">{s.body}</p>
          <div className="td-actions td-actions--center">
            <TdButton href={s.primaryHref}>
              {s.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </TdButton>
            <TdButton href={s.secondaryHref} variant="line" className="td-btn--on-dark">
              {s.secondaryLabel}
            </TdButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
