import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdHead } from "./head";

export function TdProcess() {
  const s = td.process;
  return (
    <section className="td-sec">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <Reveal className="td-rail" stagger>
          {s.steps.map((step, i) => (
            <div key={step.name} className="td-rail-item">
              <span className="td-rail-node" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="td-rail-body">
                <h3 className="td-rail-name">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.name}
                </h3>
                <p className="td-rail-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <ul className="td-notes">
          {s.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
