import { ArrowRight, MessageCircle } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";
import { CfButton } from "./button";

export function CfFinalCta({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-final">
      <div className="cf-container">
        <Reveal className="cf-card cf-final-band" data-ghost={data.final.number}>
          <div className="cf-final-glow" aria-hidden="true" />
          <div className="cf-final-inner">
            <div>
              <h2 className="cf-h cf-final-title">
                {data.final.title} <em className="cf-accent-em">{data.final.titleAccent}</em>
              </h2>
              <p className="cf-final-body">{data.final.body}</p>
              <p className="cf-final-built">{data.final.builtIn}</p>
            </div>

            <div className="cf-final-actions">
              <CfButton href={data.final.primaryHref} variant="gold">
                {data.final.primaryLabel}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </CfButton>
              <CfButton href={data.final.secondaryHref} variant="line">
                <MessageCircle size={16} strokeWidth={2.2} aria-hidden="true" />
                {data.final.secondaryLabel}
              </CfButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
