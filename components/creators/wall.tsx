import { Crown, Heart } from "lucide-react";
import { creatorUi } from "@/lib/creator";

const tierPill = (tier: string) => `ct-tier-pill ct-tier-pill--${tier.toLowerCase()}`;

export function CtWall() {
  const w = creatorUi.wall;
  return (
    <section className="ct-section">
      <div className="ct-wrap">
        <header className="ct-head">
          <p className="ct-eyebrow">
            <span className="ct-eyebrow-dot" aria-hidden="true" /> {w.eyebrow}
          </p>
          <h2 className="ct-h2">{w.title}</h2>
          <p className="ct-lede">{w.body}</p>
        </header>

        <div className="ct-top">
          {w.top.map((t, i) => (
            <div key={t.name} className={`ct-top-card ct-top-card--${i + 1}`}>
              {i === 0 ? <Crown className="ct-top-crown" size={16} strokeWidth={2.2} aria-hidden="true" /> : null}
              <span className="ct-top-rank">{i + 1}</span>
              <span className="ct-top-av">{t.initials}</span>
              <span className="ct-top-meta">
                <strong>{t.name}</strong>
                <em>
                  {t.amount} · {t.tier}
                </em>
              </span>
            </div>
          ))}
        </div>

        <div className="ct-wall-grid">
          {w.items.map((item) => (
            <figure key={`${item.name}-${item.note}`} className="ct-wall-card">
              <Heart className="ct-wall-heart" size={13} strokeWidth={2.2} aria-hidden="true" />
              <blockquote>“{item.note}”</blockquote>
              <figcaption className="ct-wall-meta">
                <span className="ct-wall-av">{item.initials}</span>
                <span className="ct-wall-name">{item.name}</span>
                <span className={tierPill(item.tier)}>{item.tier}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="ct-badges">
          {w.badges.map((b) => (
            <span key={b} className="ct-badge-chip">
              ✦ {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}