import { Building2, FileWarning, MapPin, TrendingUp } from "lucide-react";
import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

const icons = [FileWarning, MapPin, Building2, TrendingUp];

export function AfProblem() {
  const s = arch.problem;
  return (
    <section className="af-sec">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="af-grid af-grid--4">
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} className="af-card">
                <span className="af-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="af-card-name">{item.name}</h3>
                <p className="af-card-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
