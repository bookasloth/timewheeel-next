"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";
import { cn } from "@/lib/utils";

const rotateTexts = [
  "for salons",
  "for tutors",
  "for clinics",
  "for restaurants",
  "for lawyers",
  "for doctors",
  "for coaches",
  "for gyms",
  "for real estate",
  "for startups",
  "for businesses",
];

const rotateColors = [
  "text-wblue",
  "text-wpurple",
  "text-worange",
  "text-wgreen",
  "text-wblue",
  "text-wpurple",
  "text-worange",
  "text-wgreen",
  "text-wblue",
  "text-wpurple",
  "text-worange",
];

const stats = [
  { value: "50+", label: "Professions" },
  { value: "4.9", label: "Avg. rating" },
  { value: "7+", label: "Years" },
];

function LandingHero() {
  const [rotateIndex, setRotateIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setColorIndex(rotateIndex);
    }, 350);
    return () => clearTimeout(timer);
  }, [rotateIndex]);

  const activeColor = rotateColors[colorIndex % rotateColors.length];

  return (
    <section className="relative flex h-[calc(100svh_-_6.75rem)] min-h-[32rem] w-full flex-col items-center justify-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="wd-grid-bg wd-fade-edges absolute inset-0 opacity-70" />
        <div className="wd-blob absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-wblue/25 blur-3xl" />
        <div className="wd-blob [--blob-delay:-6s] absolute -bottom-32 -right-20 h-[30rem] w-[30rem] rounded-full bg-wpurple/25 blur-3xl" />
        <div className="wd-blob [--blob-delay:-12s] absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-worange/20 blur-3xl" />
        <div className="wd-blob [--blob-delay:-3s] absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-wgreen/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,#f8f9fc_0%,transparent_75%)] opacity-70" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center w-[300px] sm:w-[380px] md:w-[500px] lg:w-[680px] pointer-events-auto">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center w-full justify-center items-center flex-col flex leading-tight font-heading tracking-tight space-y-1 md:space-y-2"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
        >
          <span className="whitespace-nowrap">Top Web Design Company</span>
          <span className="relative inline-flex">
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-2 inset-y-0 -z-10 rounded-full bg-current opacity-15 blur-2xl transition-colors duration-500",
                activeColor,
              )}
            />
            <TextRotate
              texts={rotateTexts}
              onNext={setRotateIndex}
              mainClassName={cn(
                "overflow-hidden whitespace-nowrap justify-center pr-2 pb-1 md:pb-2 rounded-lg transition-colors duration-500",
                activeColor,
              )}
              staggerDuration={0.03}
              staggerFrom="last"
              rotationInterval={3000}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-center pt-2 sm:pt-3 md:pt-4 lg:pt-5 text-wdark/70"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          Premium websites for startups and growing businesses. Clear strategy,
          thoughtful design and clean development.
        </motion.p>

        <div className="flex flex-row justify-center space-x-3 items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-xs">
          <motion.button
            className="text-sm sm:text-sm md:text-base lg:text-lg font-semibold tracking-tight text-background bg-foreground px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full z-20 shadow-lg font-heading"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="/contact">
              Start a Project <span className="font-serif ml-1">→</span>
            </Link>
          </motion.button>
          <motion.button
            className="text-sm sm:text-sm md:text-base lg:text-lg font-semibold tracking-tight text-white bg-wblue px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full z-20 shadow-lg font-heading"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="#work">Explore Our Work</Link>
          </motion.button>
        </div>

        <motion.ul
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] text-wdark/60 sm:gap-5 sm:text-xs md:text-sm"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.85 }}
        >
          {stats.map((stat, i) => (
            <li key={stat.label} className="flex items-center gap-3 sm:gap-5">
              {i > 0 && (
                <span aria-hidden className="h-4 w-px bg-wdark/15 sm:h-5" />
              )}
              <span className="whitespace-nowrap">
                <span className="font-heading text-base font-semibold text-wdark sm:text-lg">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function WdHero() {
  return <LandingHero />;
}