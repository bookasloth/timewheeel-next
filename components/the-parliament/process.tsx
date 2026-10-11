import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

export function TpProcess() {
  const s = tp.process;
  return (
    <section className="tp-sec">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <Reveal className="tp-steps" stagger>
          {s.steps.map((step, i) => (
            <div key={step.name} className="tp-step">
              <span className="tp-step-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="tp-card-name">
                <span className="sr-only">Step {i + 1}: </span>
                {step.name}
              </h3>
              <p className="tp-card-desc">{step.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
