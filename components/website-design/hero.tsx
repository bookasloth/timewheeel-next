"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";
import { cn } from "@/lib/utils";

const rotateTexts = [
  "for Salons",
  "for Tutors",
  "for Clinics",
  "for Restaurants",
  "for Gyms",
];

const rotateColors = [
  "text-wpink",
  "text-wgreen",
  "text-blue-600",
  "text-wred",
  "text-wneon",
];

const panels = [
  { id: 1, label: "Salons", img: "/salon.png", pill: "bg-wpink/15 border-wpink/25" },
  { id: 2, label: "Tutors", img: "/tutors.png", pill: "bg-wgreen/15 border-wgreen/25" },
  { id: 3, label: "Clinics", img: "/clinics.png", pill: "bg-blue-500/15 border-blue-500/25" },
  { id: 4, label: "Restaurants", img: "/restaurant.png", pill: "bg-wred/15 border-wred/25" },
  { id: 5, label: "Gyms", img: "/gym.png", pill: "bg-wneon/15 border-wneon/25" },
];

// Widest string in the rotation. The heading is big enough that the phrase can
// wrap to several lines, so reserving this width keeps the rotating word from
// splitting across a line break and keeps the h1 height fixed as words change.
const widestRotateText = rotateTexts.reduce((a, b) => (b.length > a.length ? b : a));

function LandingHero() {
  const [rotateIndex, setRotateIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setColorIndex(rotateIndex);
    }, 350);
    return () => clearTimeout(timer);
  }, [rotateIndex]);

  const activeColor = rotateColors[colorIndex % rotateColors.length];

  return (
    <section className="relative flex h-[calc(100svh_-_6.75rem)] min-h-[32rem] w-full overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="wd-grid-bg wd-fade-edges absolute inset-0 opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-6 px-6 py-12 md:gap-8 lg:py-0">
        {/* Text Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            className="text-5xl font-black leading-[1.24] tracking-tight md:text-6xl lg:text-7xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
          >
            <span className="text-wdark">Creative Web Design Company in Nagpur</span>{" "}
            <span className="inline-grid">
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 justify-self-start whitespace-nowrap"
              >
                {widestRotateText}
              </span>
              <span className="col-start-1 row-start-1 flex items-center justify-self-start">
                <TextRotate
                  texts={rotateTexts}
                  onNext={setRotateIndex}
                  mainClassName={cn(
                    "flex-nowrap overflow-hidden whitespace-nowrap pr-2 pb-1 md:pb-2 rounded-lg leading-[1.1] tracking-[0.04em] transition-colors duration-500",
                    activeColor
                  )}
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-base leading-relaxed text-wdark/60 lg:text-xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          >
            Premium websites for startups and growing businesses. Clear strategy,
            thoughtful design and clean development.
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
            <motion.button
              className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
            >
              <Link href="/contact">
                Start a Project <span className="ml-1 font-serif">→</span>
              </Link>
            </motion.button>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
            >
              <Link href="#work" className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold">
                Explore Our Work
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Accordion Panels */}
        <div className="hidden h-[28rem] flex-1 items-stretch gap-2 md:flex lg:h-[32rem]">
          {panels.map((panel) => {
            const isHovered = hovered === panel.id;
            return (
              <motion.div
                key={panel.id}
                layout
                animate={{ flex: isHovered ? 2.5 : 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onHoverStart={() => setHovered(panel.id)}
                onHoverEnd={() => setHovered(null)}
                className="relative cursor-pointer overflow-hidden rounded-2xl"
              >
                <Image
                  src={panel.img}
                  alt={panel.label}
                  fill
                  className={cn(
                    "object-cover transition-all duration-500",
                    isHovered ? "grayscale-0 scale-[1.02]" : "grayscale"
                  )}
                  sizes="(max-width: 768px) 0px, 200px"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <motion.span
                    animate={{ y: isHovered ? 0 : 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "inline-block rounded-full border px-4 py-1.5 text-sm font-normal backdrop-blur-md transition-all duration-500",
                      isHovered
                        ? "bg-gray-400/15 border-white/10 text-white/80 grayscale"
                        : `text-white/90 ${panel.pill}`
                    )}
                  >
                    {panel.label}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WdHero() {
  return <LandingHero />;
}