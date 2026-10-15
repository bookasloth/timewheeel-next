import { ArrowRight, CalendarCheck, CreditCard, Trophy } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { IscButton } from "./button";

const KIND_ICON = {
  result: Trophy,
  fixture: CalendarCheck,
  fees: CreditCard,
} as const;

function PhoneMock() {
  const p = isc.hero.panel;
  return (
    <div className="isc-phone">
      <div className="isc-phone-screen">
        <div className="isc-phone-top">
          <span className="isc-phone-brand">
            <span className="isc-phone-mark" aria-hidden="true" />
            {p.app}
          </span>
          <span className="isc-phone-season">{p.season}</span>
        </div>

        <ul className="isc-phone-feed">
          {p.items.map((item) => {
            const Icon = KIND_ICON[item.kind as keyof typeof KIND_ICON] ?? Trophy;
            return (
              <li className="isc-phone-card" key={item.title}>
                <span className={`isc-phone-ic isc-phone-ic--${item.kind}`}>
                  <Icon size={15} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="isc-phone-text">
                  <span className="isc-phone-label">{item.label}</span>
                  <span className="isc-phone-title">{item.title}</span>
                  <span className="isc-phone-meta">{item.meta}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="isc-phone-stats">
          <span className="isc-phone-stats-label">{p.statLabel}</span>
          <div className="isc-phone-stats-row">
            {p.stats.map((s) => (
              <span className="isc-phone-stat" key={s.label}>
                <b>{s.value}</b>
                <i>{s.label}</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IscHero() {
  const h = isc.hero;
  return (
    <section className="isc-hero">
      <span className="isc-hero-pitch" aria-hidden="true">
        <i className="isc-hero-circle" />
        <i className="isc-hero-halfway" />
        <i className="isc-hero-box isc-hero-box--l" />
        <i className="isc-hero-box isc-hero-box--r" />
      </span>

      <div className="isc-container isc-hero-grid">
        <div className="isc-hero-copy">
          <p className="isc-eyebrow">
            <span className="isc-eyebrow-dot" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 className="isc-hero-title">
            {h.title} <span className="isc-accent">{h.titleAccent}</span>
          </h1>
          <p className="isc-hero-answer">{h.answer}</p>
          <div className="isc-actions">
            <IscButton href={h.primaryHref}>
              {h.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </IscButton>
            <IscButton href={h.secondaryHref} variant="ghost">
              {h.secondaryLabel}
            </IscButton>
          </div>
        </div>

        <div className="isc-hero-figure">
          <span className="isc-hero-figure-glow" aria-hidden="true" />
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}
