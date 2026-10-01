"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Quotes } from "@phosphor-icons/react";
import { smm } from "@/lib/social-media-marketing";

const AUTOPLAY_MS = 5000;

export function SmmTestimonialCarousel() {
  const items = smm.testimonials.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduced, go]);

  const t = items[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[0_18px_40px_-30px_rgba(26,29,36,0.35)] md:p-12">
        {/* Static quote mark so it does not cross-fade with the text. */}
        <Quotes className="size-10 text-brand" weight="fill" />

        <div className="relative mt-6 min-h-[13rem] sm:min-h-[11rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col"
            >
              <blockquote className="flex-1 text-xl leading-relaxed tracking-tight text-foreground/90 md:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand/10 text-lg font-black text-brand">
                  {t.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-tight">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.name + i}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${items.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-brand" : "w-1.5 bg-border hover:bg-brand/40",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
