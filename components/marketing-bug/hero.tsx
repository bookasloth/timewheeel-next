import Image from "next/image";
import { mb } from "@/lib/marketing-bug";
import { MbSubscribeForm } from "./subscribe-form";

export function MbHero() {
  const h = mb.hero;
  return (
    <section className="mb-hero">
      <div className="mb-container mb-hero-inner">
        <div className="mb-hero-copy">
          <p className="mb-eyebrow">
            <span className="mb-logo" aria-hidden="true">
              <Image
                src={h.logo.src}
                alt=""
                width={h.logo.width}
                height={h.logo.height}
                className="mb-logo-img"
              />
            </span>
            {h.eyebrow}
          </p>
          <h1 className="mb-hero-title">
            {h.title} <span className="mb-accent">{h.titleAccent}</span>
          </h1>
          <p className="mb-hero-answer">{h.answer}</p>

          <MbSubscribeForm />
        </div>

        <div className="mb-hero-visual">
          <span className="mb-hero-stage" aria-hidden="true" />
          <span className="mb-hero-orb" aria-hidden="true" />

          <Image
            src={h.image.src}
            alt={h.image.alt}
            width={h.image.width}
            height={h.image.height}
            preload
            sizes="(max-width: 900px) 92vw, 46vw"
            className="mb-hero-shot"
          />

          {h.poses.map((pose, i) => (
            <span
              key={pose.src}
              className={`mb-hero-pose mb-hero-pose--${i === 0 ? "a" : "b"}`}
              aria-hidden="true"
            >
              <Image
                src={pose.src}
                alt=""
                width={pose.width}
                height={pose.height}
                sizes="160px"
                className="mb-hero-pose-img"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
