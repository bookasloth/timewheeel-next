import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbButton } from "./button";

export function MbMomentum() {
  const s = mb.momentum;
  return (
    <section className="mb-sec">
      <div className="mb-container mb-momentum-grid">
        <Reveal className="mb-momentum-visual">
          <Image
            src={s.image.src}
            alt={s.image.alt}
            width={s.image.width}
            height={s.image.height}
            sizes="(max-width: 900px) 92vw, 46vw"
            className="mb-figure"
          />
        </Reveal>

        <Reveal className="mb-momentum-copy" delay={0.1}>
          <p className="mb-kicker">{s.label}</p>
          <h2 className="mb-h">{s.title}</h2>
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
