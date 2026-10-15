import { ArrowRight, CalendarCheck, ShieldCheck, Trophy } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";
import { IscButton } from "./button";

const POINTS = [
  { icon: Trophy, text: "Fixtures, results and points tables" },
  { icon: CalendarCheck, text: "Ground and slot bookings members can claim" },
  { icon: ShieldCheck, text: "Memberships, fees and moderation in one place" },
];

export function IscFinalCta() {
  const s = isc.final;
  return (
    <section className="isc-cta">
      <div className="isc-container isc-cta-grid">
        <Reveal className="isc-cta-copy">
          <h2 className="isc-cta-title">{s.title}</h2>
          <p className="isc-cta-body">{s.body}</p>
          <div className="isc-actions">
            <IscButton href={s.primaryHref}>
              {s.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </IscButton>
            <IscButton href={s.secondaryHref} variant="ghost">
              {s.secondaryLabel}
            </IscButton>
          </div>
        </Reveal>

        <Reveal className="isc-cta-card" delay={0.05}>
          <p className="isc-cta-card-label">What you get</p>
          <ul className="isc-cta-points">
            {POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.text}>
                  <span className="isc-cta-point-ic">
                    <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  {p.text}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
