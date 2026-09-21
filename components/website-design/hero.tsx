"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";
import { cn } from "@/lib/utils";

const rotateTexts = [
  "for Modern Businesses",
  "for Bold Startups",
  "for Local Brands",
  "for Growing Stores",
];

const rotateColors = [
  "text-wblue",
  "text-wpurple",
  "text-worange",
  "text-wgreen",
];

const panels = [
  { id: 1, label: "Salons", img: "https://picsum.photos/id/26/400/600" },
  { id: 2, label: "Tutors", img: "https://picsum.photos/id/24/400/600" },
  { id: 3, label: "Clinics", img: "https://picsum.photos/id/20/400/600" },
  { id: 4, label: "Restaurants", img: "https://picsum.photos/id/10/400/600" },
  { id: 5, label: "Gyms", img: "https://picsum.photos/id/64/400/600" },
];

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
            className="text-4xl font-black leading-[1.06] tracking-tight md:text-5xl lg:text-6xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
          >
            <span className="text-wdark">Creative Web Design Company in Nagpur</span>
            <br />
            <span className="relative inline-flex">
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-2 inset-y-0 -z-10 rounded-full bg-current opacity-15 blur-2xl transition-colors duration-500",
                  activeColor
                )}
              />
              <TextRotate
                texts={rotateTexts}
                onNext={setRotateIndex}
                mainClassName={cn(
                  "overflow-hidden whitespace-nowrap pr-2 pb-1 md:pb-2 rounded-lg transition-colors duration-500",
                  activeColor
                )}
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
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
                  className="object-cover"
                  sizes="(max-width: 768px) 0px, 200px"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block rounded-full bg-black/40 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
                      >
                        {panel.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="absolute inset-x-0 top-0 p-4">
                  <AnimatePresence>
                    {!isHovered && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs font-bold uppercase tracking-wider text-white/70"
                      >
                        {panel.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
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