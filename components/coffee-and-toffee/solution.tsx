import { Check } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

export function CfSolution({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-solution">
      <div className="cf-container">
        <Reveal className="cf-head cf-head--light cf-head--center" data-ghost={data.solution.number}>
          <h2 className="cf-h">{data.solution.title}</h2>
          <p className="cf-lede">{data.solution.body}</p>
        </Reveal>

        <div className="cf-solution-list">
          {data.solution.items.map((item, i) => (
            <Reveal key={item} className="cf-solution-row" delay={i * 0.05}>
              <span className="cf-solution-check">
                <Check size={13} strokeWidth={2.6} aria-hidden="true" />
              </span>
              <span className="cf-solution-text">{item}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
