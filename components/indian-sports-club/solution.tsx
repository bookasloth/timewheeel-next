import { CalendarDays, ShieldCheck, Trophy, Users } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";
import { IscHead } from "./head";

const iconMap = {
  play: Trophy,
  teams: Users,
  events: CalendarDays,
  admin: ShieldCheck,
} as const;

export function IscSolution() {
  const s = isc.solution;
  const Lead = iconMap[s.lead.icon as keyof typeof iconMap] ?? Trophy;

  return (
    <section className="isc-sec isc-tint isc-solution">
      <div className="isc-container">
        <IscHead title={s.title} body={s.body} />

        <div className="isc-bento">
          {/* lead cell, larger, with a live points table */}
          <Reveal className="isc-bento-cell isc-bento-cell--lead">
            <span className="isc-bento-ic">
              <Lead size={20} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <h3 className="isc-bento-name">{s.lead.name}</h3>
            <ul className="isc-bento-list">
              {s.lead.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="isc-mini">
              <span className="isc-mini-label">{s.lead.tableLabel}</span>
              {s.lead.table.map((row) => (
                <span className="isc-mini-row" key={row.team}>
                  <span className="isc-mini-pos">{row.pos}</span>
                  <span className="isc-mini-team">{row.team}</span>
                  <span className="isc-mini-pts">{row.pts}</span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* three supporting cells */}
          {s.cards.map((card) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Trophy;
            return (
              <Reveal key={card.name} className="isc-bento-cell">
                <span className="isc-bento-ic">
                  <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="isc-bento-name">{card.name}</h3>
                <ul className="isc-bento-list">
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
