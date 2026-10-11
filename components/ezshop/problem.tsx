import { IndianRupee, MessagesSquare, Store, UserX } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

const icons = [MessagesSquare, UserX, IndianRupee, Store];

export function EzProblem() {
  const p = ez.problem;
  return (
    <section className="ez-sec">
      <div className="ez-container">
        <Reveal>
          <EzHead number={p.number} label={p.label} title={p.title} body={p.body} />
        </Reveal>
        <Reveal stagger className="ez-grid ez-grid--4">
          {p.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.name} className="ez-card">
                <span className="ez-ic ez-ic--muted">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="ez-card-title">{item.name}</h3>
                <p className="ez-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
