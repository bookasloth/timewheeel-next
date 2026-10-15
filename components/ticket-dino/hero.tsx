import { ArrowRight } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { TdButton } from "./button";
import { TdHeroVisual } from "./hero-visual";

export function TdHero() {
  const h = td.hero;
  return (
    <section className="td-hero">
      <span className="td-glow" aria-hidden="true" />
      <span className="td-hero-grid" aria-hidden="true" />
      <div className="td-container td-hero-inner">
        <div className="td-hero-copy">
          <p className="td-eyebrow">{h.eyebrow}</p>
          <h1 className="td-hero-title">
            {h.title} <span className="td-accent">{h.titleAccent}</span>
          </h1>
          <p className="td-hero-answer">{h.answer}</p>
          <div className="td-actions">
            <TdButton href={h.primaryHref}>
              {h.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </TdButton>
            <TdButton href={h.secondaryHref} variant="line">
              {h.secondaryLabel}
            </TdButton>
          </div>
          <ul className="td-chips">
            {h.chips.map((chip) => (
              <li key={chip}>
                <span className="td-chip-dot" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <TdHeroVisual />
      </div>
    </section>
  );
}
