import {
  CalendarDays,
  Database,
  HandCoins,
  LayoutList,
  ShieldCheck,
  Users,
} from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const itemIcons = {
  database: Database,
  directory: LayoutList,
  groups: Users,
  events: CalendarDays,
  money: HandCoins,
  admin: ShieldCheck,
} as const;

export function AzSolution() {
  return (
    <section className="az-solution">
      <div className="az-container">
        <Reveal
          className="az-head az-head--light"
          data-ghost={az.solution.number}
        >
          <p className="az-kicker az-kicker--light">
            <span className="az-kicker-num">{az.solution.number}</span>
            {az.solution.label}
          </p>
          <h2 className="az-h">{az.solution.title}</h2>
          <p className="az-lede">{az.solution.body}</p>
        </Reveal>

        <Reveal className="az-strips" stagger>
          {az.solution.items.map((item) => {
            const Icon =
              itemIcons[item.icon as keyof typeof itemIcons] ?? Database;
            return (
              <div className="az-strip" key={item.name}>
                <span className="az-strip-ic">
                  <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="az-strip-copy">
                  <span className="az-strip-name">{item.name}</span>
                  <span className="az-strip-desc">{item.desc}</span>
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}