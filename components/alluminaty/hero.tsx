"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { AzButton } from "./button";

const ALUMNI_PHOTOS = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&q=80",
];

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealWords({
  text,
  className,
  start = 0,
}: {
  text: string;
  className?: string;
  start?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${i}-${w}`}
          className="az-hero-word"
          aria-hidden
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: start + i * 0.07 }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function AzHero() {
  const marqueeTrack = [
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
    ...ALUMNI_PHOTOS,
  ];

  return (
    <section className="az-hero">
      <div className="az-hero-center">
        <h1 className="az-hero-title">
          <RevealWords text={az.hero.titleLine1} />
          <br />
          <RevealWords text={az.hero.titleAccent} className="az-hero-accent" start={0.32} />
        </h1>
      </div>

      <div className="az-hero-cta-wrap">
        <motion.div
          className="az-hero-cta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <AzButton href={az.hero.primaryHref} variant="accent">
            {az.hero.primaryLabel}
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </AzButton>
        </motion.div>
      </div>

      <div
        className="az-hero-marquee"
        role="img"
        aria-label="Moments from across the alumni network"
      >
        <div className="az-hero-marquee-track" aria-hidden>
          {marqueeTrack.map((src, i) => (
            <div
              className="az-hero-pcard"
              key={i}
              style={{ rotate: `${i % 2 === 0 ? -2 : 4}deg` }}
            >
              <img src={src} alt="" loading="lazy" className="az-hero-pcard-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}