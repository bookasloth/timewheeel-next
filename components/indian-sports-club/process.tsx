import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";
import { IscHead } from "./head";

export function IscProcess() {
  const s = isc.process;
  return (
    <section className="isc-sec isc-tint isc-process">
      <div className="isc-container">
        <IscHead title={s.title} body={s.body} />
        <Reveal className="isc-timeline" stagger>
          {s.steps.map((step, i) => (
            <div key={step.name} className="isc-tl-step">
              <span className="isc-tl-node" aria-hidden="true">
                <span className="isc-tl-num">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="isc-tl-name">
                <span className="sr-only">Step {i + 1}: </span>
                {step.name}
              </h3>
              <p className="isc-tl-desc">{step.desc}</p>
            </div>
          ))}
        </Reveal>
        <ul className="isc-notes">
          {s.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
