import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

export function AfStats() {
  const s = arch.stats;
  return (
    <section className="af-sec af-dark">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} body={s.body} light center />
        <div className="af-stats">
          {s.items.map((item) => (
            <Reveal key={item.label} className="af-stat">
              <span className="af-stat-value">{item.value}</span>
              <span className="af-stat-label">{item.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
