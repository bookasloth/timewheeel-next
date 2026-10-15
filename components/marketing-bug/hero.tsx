import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { MbButton } from "./button";
import { MbSubscribeForm } from "./subscribe-form";

export function MbHero() {
  const h = mb.hero;
  return (
    <section className="mb-hero">
      <span className="mb-glow" aria-hidden="true" />
      <div className="mb-container mb-hero-inner">
        <div className="mb-hero-copy">
          <p className="mb-eyebrow">{h.eyebrow}</p>
          <h1 className="mb-hero-title">
            {h.title} <span className="mb-accent">{h.titleAccent}</span>
          </h1>
          <p className="mb-hero-answer">{h.answer}</p>

          <MbSubscribeForm />

          <ul className="mb-trust">
            {h.trust.map((t) => (
              <li key={t}>
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mb-actions">
            <MbButton href={h.primaryHref}>
              {h.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </MbButton>
            <MbButton href={h.secondaryHref} variant="line">
              {h.secondaryLabel}
            </MbButton>
          </div>
        </div>

        <div className="mb-hero-visual">
          <Image
            src={h.image.src}
            alt={h.image.alt}
            width={h.image.width}
            height={h.image.height}
            preload
            sizes="(max-width: 900px) 92vw, 46vw"
            className="mb-hero-shot"
          />
        </div>
      </div>
    </section>
  );
}
