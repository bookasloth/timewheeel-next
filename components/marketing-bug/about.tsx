import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";

export function MbAbout() {
  const s = mb.about;
  const [before, after] = s.title.split(s.titleAccent);

  return (
    <section className="mb-sec mb-tint mb-about">
      <div className="mb-container">
        <div className="mb-about-grid">
          <Reveal className="mb-about-copy">
            <p className="mb-kicker">{s.label}</p>
            <h2 className="mb-h">
              {before.trimEnd()}{" "}
              <span className="mb-accent">{s.titleAccent}</span>
              <span className="mb-h-dim">{after}</span>
            </h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
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
                    <stop offset="0%" stopColor="rgba(240,68,46,0.28)" />
                    <stop offset="100%" stopColor="rgba(240,68,46,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 66 C 28 62, 44 58, 62 50 S 98 38, 118 30 S 158 18, 188 9 L 218 3 L 218 74 L 2 74 Z"
                  fill="url(#mb-spark-fill)"
                />
                <path
                  className="mb-about-reset"
                  d="M4 58 L 30 40 L 32 58 L 58 40 L 60 58 L 86 40 L 88 58 L 114 40 L 116 58 L 142 40 L 144 58 L 170 40 L 172 58 L 198 40 L 200 58 L 218 50"
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
              <div className="mb-about-legend">
                <span className="mb-about-legend-item mb-about-legend-item--up">
                  <i className="mb-about-legend-dot" aria-hidden="true" />
                  Compounds
                </span>
                <span className="mb-about-legend-item">
                  <i className="mb-about-legend-dot" aria-hidden="true" />
                  Resets each quarter
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} stagger>
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
      </div>
    </section>
  );
}
