import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

export function AfAudiences() {
  const s = arch.audiences;
  return (
    <section className="af-sec">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} />
        <div className="af-grid af-grid--4">
          {s.items.map((item) => (
            <Reveal key={item.name} className="af-card">
              <h3 className="af-card-name">{item.name}</h3>
              <p className="af-card-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
