import { CalendarDays, Crown, MessagesSquare, Newspaper, ShieldCheck, Users } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";
import { TpFlipCard } from "./flip-card";

const iconMap = {
  feed: Newspaper,
  groups: Users,
  events: CalendarDays,
  messages: MessagesSquare,
  membership: Crown,
  admin: ShieldCheck,
} as const;

export function TpFeatures() {
  const s = tp.features;
  return (
    <section className="tp-sec tp-tint">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="tp-grid tp-grid--3">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.name} className="tp-flip-cell">
                <TpFlipCard
                  icon={<Icon size={20} strokeWidth={1.8} aria-hidden="true" />}
                  name={item.name}
                  desc={item.desc}
                  bullets={item.bullets}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="tp-also">
          <h3>{s.alsoLabel}</h3>
          <ul>
            {s.also.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
