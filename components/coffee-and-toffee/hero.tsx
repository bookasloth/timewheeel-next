"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { CfButton } from "./button";

const EASE = [0.22, 1, 0.36, 1] as const;

type Chip = {
  initials: string;
  text: React.ReactNode;
  pos: React.CSSProperties;
  float: string;
  tilt: string;
  delay: number;
};

// Floating supporter proof, the Ko-fi / BMAC signature. Positioned around the
// copy with CSS vars for drift speed + tilt; hidden on small screens.
const CHIPS: Chip[] = [
  {
    initials: "AK",
    text: <>Aisha bought 3 coffees ☕</>,
    pos: { top: "18%", ["--chiplr" as string]: "6%" },
    float: "7.5s",
    tilt: "-4deg",
    delay: 0.5,
  },
  {
    initials: "RM",
    text: <>New member · ₹499/mo 🎉</>,
    pos: { top: "30%", ["--chippr" as string]: "5%" },
    float: "8.5s",
    tilt: "5deg",
    delay: 0.7,
  },
  {
    initials: "SP",
    text: <>“Love your work!” — ₹500 tip</>,
    pos: { bottom: "20%", ["--chiplr" as string]: "9%" },
    float: "9s",
    tilt: "3deg",
    delay: 0.9,
  },
  {
    initials: "JD",
    text: <>Paid out instantly ⚡</>,
    pos: { bottom: "26%", ["--chippr" as string]: "8%" },
    float: "7s",
    tilt: "-5deg",
    delay: 1.1,
  },
];

function Words({
  text,
  className = "",
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
          className="cf-hero-word"
          initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: EASE, delay: start + i * 0.07 }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function CfHero({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-hero">
      <video
        className="cf-hero-video"
        src="/coffee.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="cf-hero-overlay" aria-hidden="true" />

      {/* floating supporter proof */}
      {CHIPS.map((c, i) => (
        <motion.div
          key={i}
          className="cf-chip hidden md:inline-flex"
          style={{ ...c.pos, ["--cf-float" as string]: c.float, ["--cf-tilt" as string]: c.tilt }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: c.delay }}
          aria-hidden="true"
        >
          <span className="cf-chip-av">{c.initials}</span>
          <span className="cf-chip-txt">{c.text}</span>
        </motion.div>
      ))}

      {/* Placeholder illustrations + doodles — swap the files in
          /public/coffee/*.svg with better art (same names = no code change). */}
      <img src="/coffee/illus-cup.svg" alt="" aria-hidden className="cf-deco cf-deco-cup hidden md:block" />
      <img src="/coffee/illus-toffee.svg" alt="" aria-hidden className="cf-deco cf-deco-toffee hidden md:block" />
      <img src="/coffee/doodle-sparkle.svg" alt="" aria-hidden className="cf-deco cf-deco-sparkle" />
      <img src="/coffee/doodle-arrow.svg" alt="" aria-hidden className="cf-deco cf-deco-arrow hidden md:block" />

      <div className="cf-container cf-hero-centered">
        <div className="cf-hero-copy">
  

          <h1 className="cf-hero-title">
            <Words text={data.hero.titleLine1} />
            <br />
            <Words text={data.hero.titleAccent} className="cf-hero-accent" start={0.24} />
          </h1>

          <motion.p
            className="cf-hero-body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
          >
            {data.hero.body}
          </motion.p>

          <motion.div
            className="cf-hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
          >
            <CfButton href={data.hero.primaryHref} variant="gold">
              {data.hero.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </CfButton>
            <CfButton href={data.hero.secondaryHref} variant="line">
              {data.hero.secondaryLabel}
            </CfButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
