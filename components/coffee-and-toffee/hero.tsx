"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { CfButton } from "./button";

const EASE = [0.22, 1, 0.36, 1] as const;

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
