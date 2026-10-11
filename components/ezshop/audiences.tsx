import { Check, Rocket, Store } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

const icons = [Rocket, Store];

export function EzAudiences() {
  const a = ez.audiences;
  return (
    <section className="ez-sec ez-sec--tint">
      <div className="ez-container">
        <Reveal>
          <EzHead number={a.number} label={a.label} title={a.title} />
        </Reveal>
        <Reveal stagger className="ez-grid ez-grid--2">
          {a.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.name} className="ez-card ez-card--big">
                <span className="ez-ic">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="ez-card-title">{item.name}</h3>
                <p className="ez-card-desc">{item.lede}</p>
                <ul className="ez-ticks">
                  {item.points.map((pt) => (
                    <li key={pt}>
                      <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
