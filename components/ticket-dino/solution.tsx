import { CreditCard, Mail, ScanLine, Ticket } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdHead } from "./head";

const iconMap = {
  inventory: Ticket,
  checkout: CreditCard,
  delivery: Mail,
  gate: ScanLine,
} as const;

export function TdSolution() {
  const s = td.solution;
  return (
    <section className="td-sec td-dark">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} body={s.body} light />
        <Reveal className="td-flow" stagger>
          {s.cards.map((card) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <div key={card.name} className="td-flow-node">
                <span className="td-flow-dot">
                  <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div className="td-flow-body">
                  <h3 className="td-flow-name">{card.name}</h3>
                  <ul className="td-flow-list">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
