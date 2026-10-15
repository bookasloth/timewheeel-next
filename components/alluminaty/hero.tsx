"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { AzButton } from "./button";

const ALUMNI_PHOTOS = [
  // Indian graduates celebrating, and college students with signed shirts.
  "https://images.pexels.com/photos/13019686/pexels-photo-13019686.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/31968811/pexels-photo-31968811.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/31968829/pexels-photo-31968829.jpeg?auto=compress&cs=tinysrgb&w=600",
  // College students on campus at Santiniketan / Visva Bharati.
  "https://images.pexels.com/photos/39006532/pexels-photo-39006532.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/39006534/pexels-photo-39006534.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Studying in a New Delhi university library, and friends chatting on campus.
  "https://images.pexels.com/photos/16504588/pexels-photo-16504588.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/7972508/pexels-photo-7972508.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Indian school students in uniform.
  "https://images.pexels.com/photos/30889597/pexels-photo-30889597.jpeg?auto=compress&cs=tinysrgb&w=600",
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
          <RevealWords text={az.hero.titleLine1} />{" "}
          <br />
          <span className="az-hero-accent">{az.hero.titleAccent}</span>
        </h1>
        <p className="az-hero-body">{az.hero.body}</p>
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
          <a href={az.hero.secondaryHref} className="az-text-link" target="_blank" rel="noopener noreferrer">
            {az.hero.secondaryLabel}
          </a>
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