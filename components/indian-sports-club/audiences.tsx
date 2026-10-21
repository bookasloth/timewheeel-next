import { Flag, Heart, Trophy, Tv, Users } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";

const modeIcons = {
  stands: Users,
  home: Tv,
  team: Heart,
} as const;

export function IscAudiences() {
  const a = isc.audiences;
  return (
    <section className="isc-sec isc-audiences">
      <span className="isc-aud-glow" aria-hidden="true" />
      <div className="isc-container">
        <Reveal className="isc-aud-head">
          <p className="isc-eyebrow isc-aud-eyebrow">
            <span className="isc-eyebrow-dot" aria-hidden="true" />
            {a.label}
          </p>
          <h2 className="isc-h isc-aud-title">
            {a.titleLead} <span className="isc-aud-title-accent">{a.titleAccent}</span>
          </h2>
          <p className="isc-lede isc-aud-lede">{a.body}</p>
        </Reveal>

        <Reveal stagger className="isc-aud-sports" y={14}>
          {a.sports.map((sport) => (
            <span className="isc-aud-sport" key={sport}>
              <Trophy size={15} strokeWidth={2} aria-hidden="true" />
              {sport}
            </span>
          ))}
          <span className="isc-aud-sport isc-aud-sport--more">
            <Flag size={15} strokeWidth={2} aria-hidden="true" />
            And beyond
          </span>
        </Reveal>

        <Reveal stagger className="isc-aud-grid" y={18}>
          {a.modes.map((mode) => {
            const Icon = modeIcons[mode.icon as keyof typeof modeIcons] ?? Users;
            return (
              <article className="isc-aud-card" key={mode.name}>
                <span className="isc-aud-ic" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="isc-aud-name">{mode.name}</h3>
                <p className="isc-aud-desc">{mode.desc}</p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
