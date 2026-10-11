import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

export function EzProcess() {
  const p = ez.process;
  return (
    <section className="ez-sec ez-sec--tint">
      <div className="ez-container">
        <Reveal>
          <EzHead number={p.number} label={p.label} title={p.title} body={p.body} />
        </Reveal>
        <Reveal>
          <ol className="ez-steps">
            {p.steps.map((s, i) => (
              <li key={s.name} className="ez-step">
                <span className="ez-step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ez-card-title">{s.name}</h3>
                <p className="ez-card-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
