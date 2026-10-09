"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Horizontal snap-scroller for carousel posts. Frames fill the tile and are
// panned with the mouse wheel / drag or the arrow buttons; an external-link
// button opens the real Instagram post in a new tab.
export function CarouselScroller({
  imgs,
  caption,
  href,
}: {
  imgs: string[];
  caption: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="group/scroller relative h-full w-full">
      <div
        ref={ref}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label={caption}
      >
        {imgs.map((src, i) => (
          <div key={src} className="relative h-full w-full min-w-full shrink-0 snap-start">
            <Image
              src={src}
              alt={`${caption} — frame ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {imgs.length > 1 && (
        <span className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
          <button
            type="button"
            aria-label="Previous frame"
            onClick={() => scroll(-1)}
            className="grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next frame"
            onClick={() => scroll(1)}
            className="grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <ChevronRight className="size-5" />
          </button>
        </span>
      )}

      {imgs.length > 1 && (
        <span className="pointer-events-none absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
          {imgs.map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/90" />
          ))}
        </span>
      )}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pt-16">
        <p className="px-4 pb-11 text-lg font-bold leading-snug text-white drop-shadow-sm">
          {caption}
        </p>
      </span>

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open post on Instagram"
          className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/65 group-hover/scroller:opacity-100"
        >
          <ExternalLink className="size-4" />
        </a>
      )}
    </div>
  );
}