import { Layers, MapPin, Target, UserX } from "lucide-react";
import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";
import { LfHead } from "./head";

const icons = [MapPin, Layers, UserX, Target];

export function LfProblem() {
  const s = leader.problem;
  return (
    <section className="lf-sec">
      <div className="lf-container">
        <LfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="lf-grid lf-grid--4">
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} className="lf-card">
                <span className="lf-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="lf-card-name">{item.name}</h3>
                <p className="lf-card-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
