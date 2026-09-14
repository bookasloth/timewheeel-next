import {
  CalendarDays,
  Check,
  HeartHandshake,
  MessagesSquare,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const iconMap = {
  users: Users,
  message: MessagesSquare,
  calendar: CalendarDays,
  store: Store,
  heart: HeartHandshake,
  shield: ShieldCheck,
} as const;

export function AzFeatures() {
  return (
    <section className="az-sec az-features">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={az.features.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{az.features.number}</span>
            {az.features.label}
          </p>
          <h2 className="az-h">{az.features.title}</h2>
          <p className="az-lede">{az.features.body}</p>
        </Reveal>

        <div className="az-feat-grid">
          {az.features.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isLead = i === 0;
            const isPanel = i === az.features.items.length - 1;
            return (
              <Reveal
                key={item.name}
                className={`az-feat${isLead ? " az-feat--lead" : ""}${
                  isPanel ? " az-feat--panel" : ""
                }`}
              >
                <span className="az-feat-ic">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="az-feat-name">{item.name}</h3>
                <p className="az-feat-desc">{item.desc}</p>
                <ul className="az-feat-bullets">
                  {item.bullets.map((b) => (
                    <li key={b}>
                      <span className="az-feat-check" aria-hidden="true">
                        <Check size={12} strokeWidth={2.4} />
                      </span>
                      {b}
                    </li>
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