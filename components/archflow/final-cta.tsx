import { ArrowRight } from "lucide-react";
import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfButton } from "./button";

export function AfFinalCta() {
  const s = arch.final;
  return (
    <section className="af-cta">
      <span className="af-glow" aria-hidden="true" />
      <div className="af-container">
        <Reveal className="af-cta-inner">
          <h2 className="af-cta-title">{s.title}</h2>
          <p className="af-cta-body">{s.body}</p>
          <div className="af-actions af-actions--center">
            <AfButton href={s.primaryHref}>
              {s.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </AfButton>
            <AfButton href={s.secondaryHref} variant="line" className="af-btn--on-dark">
              {s.secondaryLabel}
            </AfButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
