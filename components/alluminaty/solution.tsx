import { Check } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

export function AzSolution() {
  return (
    <section className="az-solution">
      <div className="az-container">
        <Reveal
          className="az-head az-head--light"
          data-ghost={az.solution.number}
        >
          <p className="az-kicker az-kicker--light">
            <span className="az-kicker-num">{az.solution.number}</span>
            {az.solution.label}
          </p>
          <h2 className="az-h">{az.solution.title}</h2>
          <p className="az-lede">{az.solution.body}</p>
        </Reveal>

        <Reveal className="az-strips" stagger>
          {az.solution.items.map((item, i) => (
            <div className="az-strip" key={item}>
              <span className="az-strip-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="az-strip-ic">
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
              </span>
              <span className="az-strip-name">{item}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}