"use client";

import { motion } from "framer-motion";
import { ArrowRight, Coffee, Heart, Sparkles } from "lucide-react";
import { type CoffeeData } from "@/lib/coffee";
import { CfButton } from "./button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CfHero({ data }: { data: CoffeeData }) {
  const hero = data.hero;

  return (
    <section className="cf-hero">
      <div className="cf-container">
        <div className="cf-hero-grid">
          <motion.div
            className="cf-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="cf-kicker">{hero.kicker}</span>

            <h1 className="cf-hero-title">
              {hero.titleLine1}
              <em className="cf-accent">{hero.titleAccent}</em>
            </h1>

            <motion.p
              className="cf-hero-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              {hero.body}
            </motion.p>

            <motion.div
              className="cf-hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            >
              <CfButton href={hero.primaryHref} variant="dark">
                {hero.primaryLabel}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </CfButton>
              <CfButton href={hero.secondaryHref} variant="outline">
                {hero.secondaryLabel}
              </CfButton>
            </motion.div>

            <motion.p
              className="cf-hero-proof"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Sparkles size={14} aria-hidden="true" />
              {hero.proof}
              <span className="cf-hero-proof-dot" aria-hidden="true" />
              No monthly fees
              <span className="cf-hero-proof-dot" aria-hidden="true" />
              100% audience ownership
            </motion.p>
          </motion.div>

          <motion.div
            className="cf-hero-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          >
            <div className="cf-creator-card">
              <div className="cf-cc-header">
                <span className="cf-cc-avatar">MC</span>
                <div>
                  <div className="cf-cc-name">Maya Chen</div>
                  <div className="cf-cc-role">Illustrator & visual storyteller</div>
                </div>
              </div>

              <p className="cf-cc-bio">
                “Making little worlds one illustration at a time.”
              </p>

              <div className="cf-cc-stats">
                <span className="cf-cc-stat">
                  <strong>1,284</strong> supporters
                </span>
                <span className="cf-cc-stat">
                  <strong>89</strong> updates
                </span>
              </div>

              <div className="cf-cc-divider" aria-hidden="true" />

              <div className="cf-cc-support-options">
                <div className="cf-cc-option">
                  <span className="cf-cc-option-left">
                    <span className="cf-cc-option-icon">
                      <Coffee size={15} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="cf-cc-option-name">A Little Something</span>
                  </span>
                  <span className="cf-cc-option-price">$5</span>
                </div>
                <div className="cf-cc-option">
                  <span className="cf-cc-option-left">
                    <span className="cf-cc-option-icon">
                      <Coffee size={15} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="cf-cc-option-name">Keep Me Creating</span>
                  </span>
                  <span className="cf-cc-option-price">$15</span>
                </div>
                <div className="cf-cc-option">
                  <span className="cf-cc-option-left">
                    <span className="cf-cc-option-icon">
                      <Heart size={15} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="cf-cc-option-name">Big Thank You</span>
                  </span>
                  <span className="cf-cc-option-price">$30</span>
                </div>
              </div>

              <div className="cf-cc-message">
                <p className="cf-cc-message-text">
                  “Your work keeps inspiring me. Keep going.”
                </p>
                <p className="cf-cc-message-author">— A supporter</p>
              </div>

              <div className="cf-cc-cta">
                <CfButton href="#experience" variant="gold" className="cf-btn-block">
                  Support Maya
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </CfButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}