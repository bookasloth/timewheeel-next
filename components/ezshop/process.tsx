import { Truck } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

export function EzProcess() {
  const p = ez.process;
  return (
    <section className="ez-sec ez-process">
      <div className="ez-container">
        <Reveal>
          <EzHead number={p.number} label={p.label} title={p.title} body={p.body} />
        </Reveal>
        <Reveal className="ez-track">
          <span className="ez-track-rail" aria-hidden="true" />
          <span className="ez-track-van" aria-hidden="true">
            <Truck size={18} strokeWidth={2.2} />
          </span>
          {p.steps.map((s, i) => (
            <div className={`ez-track-step ez-track-step--${i + 1}`} key={s.name}>
              <span className="ez-track-node" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="ez-track-card">
                <h3 className="ez-card-title">{s.name}</h3>
                <p className="ez-card-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
