import { ArrowUpRight, MessageCircle } from "lucide-react";
import { creatorUi } from "@/lib/creator";

export function CtFinal() {
  const f = creatorUi.final;
  return (
    <section className="ct-final" id="start">
      <div className="ct-final-glow" aria-hidden="true" />
      <div className="ct-wrap ct-final-inner">
        <p className="ct-eyebrow">
          <span className="ct-eyebrow-dot" aria-hidden="true" /> {f.eyebrow}
        </p>
        <h2 className="ct-final-title">
          {f.title} <em className="ct-em">{f.titleEm}</em>
        </h2>
        <p className="ct-final-body">{f.body}</p>
        <div className="ct-hero-actions ct-final-actions">
          <a href={f.primaryHref} className="ct-btn ct-btn--primary ct-btn--lg">
            {f.primary}
            <ArrowUpRight size={17} strokeWidth={2.2} aria-hidden="true" />
          </a>
          <a href={f.secondaryHref} className="ct-btn ct-btn--ghost ct-btn--lg">
            <MessageCircle size={16} strokeWidth={2.2} aria-hidden="true" />
            {f.secondary}
          </a>
        </div>
        <p className="ct-final-built">{f.builtIn}</p>
      </div>
    </section>
  );
}