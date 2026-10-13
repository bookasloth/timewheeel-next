import { CalendarDays, Newspaper, ShieldCheck, Users } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

const iconMap = {
  feed: Newspaper,
  groups: Users,
  events: CalendarDays,
  admin: ShieldCheck,
} as const;

export function TpSolution() {
  const s = tp.solution;
  return (
    <section className="tp-sec tp-dark">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} light />
        <div className="tp-solution-grid">
          {s.cards.map((card) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <Reveal key={card.name} className="tp-sol-card">
                <span className="tp-ic tp-ic--dark">
                  <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="tp-sol-name">{card.name}</h3>
                <ul className="tp-sol-list">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
