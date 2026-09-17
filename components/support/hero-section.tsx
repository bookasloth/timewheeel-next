"use client";

import { motion, MotionConfig } from "framer-motion";
import { Coffee, Search } from "lucide-react";
import { CoffeeScene } from "./coffee-scene";
import { FloatingCard } from "./floating-card";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#FAF7F1] [overflow:clip]">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-24 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[48fr_52fr] lg:gap-10">
            {/* ── left copy ── */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="relative z-10"
            >
              <motion.span
                variants={item}
                className="inline-flex items-center gap-2 rounded-full border border-[#E87922]/35 bg-white/70 px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#C25D14]"
              >
                <Coffee size={15} strokeWidth={2.2} aria-hidden="true" />
                Coffee &amp; Toffee support
              </motion.span>

              <motion.h1
                variants={item}
                className="ct-serif mt-6 text-[44px] font-semibold leading-[1.04] text-[#302017] sm:text-[56px] lg:text-[68px]"
              >
                <span className="block">Buy me a coffee</span>
                <span className="block text-[#E87922]">or a toffee.</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-6 max-w-[520px] text-[16.5px] leading-relaxed text-[#6F665F]"
              >
                Pick how many, leave a note, done in under a minute. Coffee and
                Toffee turns scattered clicks into real support — so creators
                can keep building.
              </motion.p>

              <motion.form
                variants={item}
                onSubmit={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("ct-help")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group mt-8 flex w-full max-w-[520px] items-center"
              >
                <label htmlFor="ct-search" className="sr-only">
                  Search for help articles
                </label>
                <div className="relative w-full sm:w-[480px]">
                  <Search
                    size={19}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#C25D14] transition-transform duration-300 group-focus-within:scale-110"
                  />
                  <input
                    id="ct-search"
                    type="search"
                    autoComplete="off"
                    placeholder="Search for help articles, topics, or keywords…"
                    className="h-14 w-full rounded-full border border-[#E8E0D6] bg-white pl-13 pr-5 text-[15px] text-[#302017] shadow-[0_10px_30px_rgba(70,45,25,0.06)] outline-none transition-all duration-300 placeholder:text-[#A79C8F] focus:border-[#E87922]/60 focus:shadow-[0_12px_34px_rgba(232,121,34,0.14),0_0_0_4px_rgba(232,121,34,0.12)] sm:pl-13"
                  />
                </div>
              </motion.form>
            </motion.div>

            {/* ── right visual ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              className="relative"
            >
              <CoffeeScene />
              <FloatingCard />
            </motion.div>
          </div>
        </div>

        {/* organic wave into the next section */}
        <div className="absolute inset-x-0 bottom-0 z-0" aria-hidden="true">
          <svg
            viewBox="0 0 1440 72"
            preserveAspectRatio="none"
            className="block h-10 w-full sm:h-14"
            fill="none"
          >
            <path
              d="M0 52 C140 10 300 6 470 24 C620 40 780 58 930 50 C1080 42 1220 26 1440 36 V72 H0 Z"
              fill="#F5EEE3"
            />
          </svg>
        </div>
      </section>
    </MotionConfig>
  );
}