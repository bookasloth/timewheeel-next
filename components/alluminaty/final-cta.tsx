import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { az } from "@/lib/alluminaty";
import { AzButton } from "./button";

export function AzFinalCta() {
  return (
    <section className="az-cta" data-ghost="LET'S BUILD">
      <span className="az-blob az-blob--blue" aria-hidden="true" />
      <div className="az-container">
        <Reveal className="az-cta-inner">
          <h2 className="az-cta-title">{az.final.title}</h2>
          <p className="az-cta-body">{az.final.body}</p>
          <div className="az-cta-actions">
            <AzButton href={az.final.primaryHref} variant="accent">
              {az.final.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </AzButton>
            <AzButton href={az.final.secondaryHref} variant="ghost">
              {az.final.secondaryLabel}
            </AzButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}