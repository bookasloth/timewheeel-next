"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { dmTestimonials } from "@/lib/digital-marketing";

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-rating text-rating" />
      ))}
    </div>
  );
}

export function DmTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 360;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Auto-advance one card every 5s, looping back to the start when done.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || paused) return;
    const id = setInterval(() => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 20 : 360;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 20) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: amount, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          One of the best digital marketing agencies in Nagpur
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll testimonials left"
            onClick={() => scrollByCard(-1)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll testimonials right"
            onClick={() => scrollByCard(1)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {dmTestimonials.map((t, i) => (
            <figure
              key={i}
              data-card
              className="flex w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/40 md:w-[360px]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  VC
                </span>
                <span className="text-sm font-semibold">Verified Client</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}