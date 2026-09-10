"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { rmTestimonials } from "@/lib/restaurant-marketing";

const accents = ["#fe5100", "#269cef", "#4ab765"];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-rating text-rating" />
      ))}
    </div>
  );
}

export function RmTestimonials() {
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
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            What did Mumbai say about our digital marketing services?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;ve partnered with global and national brands, helping them
            scale their business goals through proven strategies.
          </p>
        </div>
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
          {rmTestimonials.map((t, i) => {
            const accent = accents[i % accents.length];
            return (
              <figure
                key={i}
                data-card
                className="group flex w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40 md:w-[360px]"
              >
                {/* brand banner */}
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{ backgroundColor: `${accent}12` }}
                >
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-xl bg-card text-xl shadow-sm"
                  >
                    {t.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-extrabold leading-none text-foreground">
                      {t.brand}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="size-3" style={{ color: accent }} />
                      {t.city}
                    </p>
                  </div>
                  <span
                    className="rounded-full bg-card px-2.5 py-1 text-[11px] font-black"
                    style={{ color: accent }}
                  >
                    4.8★
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <Stars />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: `${accent}1c`, color: accent }}
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span className="text-sm">
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
