import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbButton } from "./button";

export function MbMomentum() {
  const s = mb.momentum;
  const [before, after] = s.title.split(s.titleAccent);

  return (
    <section className="mb-sec">
      <div className="mb-container mb-momentum-grid">
        <Reveal className="mb-momentum-visual">
          <div className="mb-momentum-frame">
            <Image
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.width}
              height={s.image.height}
              sizes="(max-width: 900px) 92vw, 46vw"
              className="mb-momentum-img"
            />
          </div>

          <div className="mb-momentum-badge">
            <span className="mb-momentum-badge-ic" aria-hidden="true">
              <TrendingUp size={20} strokeWidth={2.2} />
            </span>
            <div>
              <p className="mb-momentum-badge-value">Keeps working</p>
              <p className="mb-momentum-badge-label">long after you stop paying</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mb-momentum-copy" delay={0.1}>
          <p className="mb-kicker">{s.label}</p>
          <h2 className="mb-h">
            {before.trimEnd()}{" "}
            <span className="mb-accent">{s.titleAccent}</span>
            <span className="mb-h-dim">{after}</span>
          </h2>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="mb-actions">
            <MbButton href={s.ctaHref} variant="line">
              {s.ctaLabel}
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </MbButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
