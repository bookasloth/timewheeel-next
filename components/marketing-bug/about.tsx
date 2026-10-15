import Image from "next/image";
import { ArrowUpRight, Check, TrendingUp } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";

export function MbAbout() {
  const s = mb.about;
  const [before, after] = s.title.split(s.titleAccent);

  return (
    <section className="mb-sec mb-tint mb-about">
      <span className="mb-about-glow" aria-hidden="true" />
      <div className="mb-container mb-about-grid">
        <Reveal className="mb-about-copy">
          <p className="mb-kicker">{s.label}</p>
          <h2 className="mb-h">
            {before}
            <span className="mb-accent">{s.titleAccent}</span>
            {after}
          </h2>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <ul className="mb-about-points">
            {s.points.map((point) => (
              <li key={point}>
                <span className="mb-check" aria-hidden="true">
                  <Check size={15} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="mb-about-visual">
          <div className="mb-about-frame">
            <Image
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.width}
              height={s.image.height}
              sizes="(max-width: 900px) 92vw, 48vw"
              className="mb-about-img"
            />
          </div>

          <div className="mb-about-badge">
            <span className="mb-about-badge-ic" aria-hidden="true">
              <TrendingUp size={20} strokeWidth={2.2} />
            </span>
            <div>
              <p className="mb-about-badge-value">Page one</p>
              <p className="mb-about-badge-label">terms that keep ranking</p>
            </div>
          </div>

          <div className="mb-about-chart" aria-hidden="true">
            <div className="mb-about-chart-head">
              <p className="mb-about-chart-title">Organic growth</p>
              <span className="mb-about-chart-trend">
                <ArrowUpRight size={13} strokeWidth={2.6} />
                Up and to the right
              </span>
            </div>
            <svg className="mb-about-spark" viewBox="0 0 220 74" role="presentation">
              <defs>
                <linearGradient id="mb-spark-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(254,81,0,0.34)" />
                  <stop offset="100%" stopColor="rgba(254,81,0,0)" />
                </linearGradient>
              </defs>
              <path
                d="M2 66 C 28 62, 44 58, 62 50 S 98 38, 118 30 S 158 18, 188 9 L 218 3 L 218 74 L 2 74 Z"
                fill="url(#mb-spark-fill)"
              />
              <path
                className="mb-about-spark-line"
                d="M2 66 C 28 62, 44 58, 62 50 S 98 38, 118 30 S 158 18, 188 9 L 218 3"
                fill="none"
                stroke="var(--mb-red)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
