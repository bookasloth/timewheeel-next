import {
  Archive,
  ArrowRight,
  BellRing,
  CalendarOff,
  Check,
  Database,
  LayoutDashboard,
  LayoutGrid,
  Link2,
  MessageSquareX,
  X,
} from "lucide-react";
import { bas } from "@/lib/book-a-sloth";
import "./before-after.css";

const beforeIcons = [CalendarOff, LayoutGrid, MessageSquareX, Archive];
const afterIcons = [Link2, LayoutDashboard, BellRing, Database];

export function BasBeforeAfter() {
  const titleParts = bas.beforeAfter.title.split(bas.beforeAfter.titleAccent);

  return (
    <section className="ba">
      <div className="ba__container">
        <h2 className="ba__title">
          {titleParts[0]}
          <span className="ba__accent">{bas.beforeAfter.titleAccent}</span>
        </h2>

        <p className="ba__desc">{bas.beforeAfter.body}</p>

        <div className="ba__cards">
          <div className="ba__card ba__card--bad">
            <div className="ba__cardHead">
              <span className="ba__cardIcon ba__cardIcon--bad">
                <X size={15} strokeWidth={2.4} aria-hidden="true" />
              </span>
              <h3 className="ba__cardTitle">{bas.beforeAfter.beforeTitle}</h3>
            </div>
            <ul className="ba__list">
              {bas.beforeAfter.before.map((item, i) => {
                const Icon = beforeIcons[i % beforeIcons.length];
                return (
                  <li key={item} className="ba__item">
                    <span className="ba__itemIc">
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="ba__itemText">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ba__mid" aria-hidden="true">
            <span className="ba__arrow">
              <ArrowRight size={18} strokeWidth={2.2} />
            </span>
          </div>

          <div className="ba__card ba__card--good">
            <div className="ba__cardHead">
              <span className="ba__cardIcon ba__cardIcon--good">
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
              </span>
              <h3 className="ba__cardTitle">{bas.beforeAfter.afterTitle}</h3>
            </div>
            <ul className="ba__list">
              {bas.beforeAfter.after.map((item, i) => {
                const Icon = afterIcons[i % afterIcons.length];
                return (
                  <li key={item} className="ba__item">
                    <span className="ba__itemIc ba__itemIc--good">
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="ba__itemText">{item}</span>
                  </li>
                );
              })}
            </ul>
            <div className="ba__stats">
              {bas.beforeAfter.stats.map((stat) => (
                <span key={stat.label} className="ba__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}