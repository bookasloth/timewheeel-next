import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";
import { LfHead } from "./head";

export function LfProcess() {
  const s = leader.process;
  return (
    <section className="lf-sec lf-deep">
      <div className="lf-container">
        <LfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <ol className="lf-steps">
          {s.steps.map((step, i) => (
            <Reveal key={step.name} className="lf-step">
              <span className="lf-step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="lf-card-name">{step.name}</h3>
              <p className="lf-card-desc">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
