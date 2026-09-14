import {
  ArrowRight,
  CalendarOff,
  Check,
  HeartHandshake,
  SearchX,
  X,
  Users,
} from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const beforeIcons = [Users, SearchX, CalendarOff, HeartHandshake];
const afterIcons = [Check, Check, Check, Check];

export function AzBeforeAfter() {
  const titleParts = az.beforeAfter.title.split(az.beforeAfter.titleAccent);

  return (
    <section className="az-sec az-ba">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={az.beforeAfter.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{az.beforeAfter.number}</span>
            {az.beforeAfter.label}
          </p>
          <h2 className="az-h">
            {titleParts[0]}
            <span className="az-accent-serif">{az.beforeAfter.titleAccent}</span>
          </h2>
          <p className="az-lede">{az.beforeAfter.body}</p>
        </Reveal>

        <div className="az-ba-cards">
          <Reveal className="az-ba-card az-ba-card--bad">
            <div className="az-ba-cardhead">
              <span className="az-ba-cardic az-ba-cardic--bad">
                <X size={15} strokeWidth={2.4} aria-hidden="true" />
              </span>
              <h3 className="az-ba-cardtitle">{az.beforeAfter.beforeTitle}</h3>
            </div>
            <ul className="az-ba-list">
              {az.beforeAfter.before.map((item, i) => {
                const Icon = beforeIcons[i % beforeIcons.length];
                return (
                  <li key={item} className="az-ba-item">
                    <span className="az-ba-itemic">
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div className="az-ba-mid" aria-hidden="true">
            <span className="az-ba-arrow">
              <ArrowRight size={18} strokeWidth={2.2} />
            </span>
          </div>

          <Reveal className="az-ba-card az-ba-card--good">
            <div className="az-ba-cardhead">
              <span className="az-ba-cardic az-ba-cardic--good">
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
              </span>
              <h3 className="az-ba-cardtitle">{az.beforeAfter.afterTitle}</h3>
            </div>
            <ul className="az-ba-list">
              {az.beforeAfter.after.map((item, i) => {
                const Icon = afterIcons[i % afterIcons.length];
                return (
                  <li key={item} className="az-ba-item">
                    <span className="az-ba-itemic az-ba-itemic--good">
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
            <div className="az-ba-stats">
              {az.beforeAfter.stats.map((stat) => (
                <span key={stat.label} className="az-ba-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}