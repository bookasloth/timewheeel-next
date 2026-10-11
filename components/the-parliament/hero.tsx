import { ArrowRight, Check } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { TpButton } from "./button";

export function TpHero() {
  const h = tp.hero;
  return (
    <section className="tp-hero">
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
        <ul className="tp-chips">
          {h.chips.map((c) => (
            <li key={c}>
              <Check size={13} strokeWidth={2.6} aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
