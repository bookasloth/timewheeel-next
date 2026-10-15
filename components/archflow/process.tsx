import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

export function AfProcess() {
  const s = arch.process;
  return (
    <section className="af-sec">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <ol className="af-steps">
          {s.steps.map((step, i) => (
            <Reveal key={step.name} className="af-step">
              <span className="af-step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="af-card-name">{step.name}</h3>
              <p className="af-card-desc">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
