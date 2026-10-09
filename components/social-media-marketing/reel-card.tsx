"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Bookmark, Heart, MessageCircle, Music2, Play, Send, X } from "lucide-react";

// Instagram-Reel style card. Shows the real reel's cover image; tapping play
// opens a lightbox with the official Instagram embed of the reel. The modal
// closes via the X button, the Esc key, or clicking the backdrop.
export function SmmReelCard({
  src,
  alt,
  href,
  handle = "@coworkingeureka",
  title = "Instagram reel by Eureka CoWorking",
}: {
  src: string;
  alt: string;
  href: string;
  handle?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const shortcode = href.match(/\/reel\/([A-Za-z0-9_-]+)/)?.[1] ?? "";
  const embedSrc = `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;

  return (
    <>
      <div className="group relative aspect-[9/16] h-full w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)] lg:aspect-auto">
        <Image
          src={src}
          alt={alt}
          fill
          preload
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="object-cover"
        />
        {/* top gradient for header legibility */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

        {/* IG-style header */}
        <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-accent-yellow via-accent-pink to-brand text-[10px] font-black text-white ring-2 ring-white/80">
            TW
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{handle}</p>
            <p className="truncate text-[10px] text-white/70">Reel · Original audio</p>
          </div>
        </div>

        {/* right action rail */}
        <div className="absolute bottom-20 right-2.5 flex flex-col items-center gap-4">
          <span className="flex flex-col items-center gap-0.5 text-white">
            <Heart className="size-6 drop-shadow transition-transform group-hover:scale-110" fill="currentColor" />
            <span className="text-[10px] font-semibold">12.4k</span>
          </span>
          <span className="flex flex-col items-center gap-0.5 text-white">
            <MessageCircle className="size-6 drop-shadow transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-semibold">316</span>
          </span>
          <span className="flex flex-col items-center gap-0.5 text-white">
            <Send className="size-6 drop-shadow transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-semibold">Share</span>
          </span>
          <span className="flex flex-col items-center gap-0.5 text-white">
            <Bookmark className="size-6 drop-shadow transition-transform group-hover:scale-110" fill="currentColor" />
            <span className="text-[10px] font-semibold">Save</span>
          </span>
        </div>

        {/* bottom caption + music */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <p className="text-[11px] leading-snug font-semibold drop-shadow">
            Reels that stop the scroll and stay on brand.{" "}
            <span className="text-white/70">Tap the reel to play.</span>
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/80">
            <Music2 className="size-3.5" />
            <span className="truncate">Original audio · Eureka CoWorking</span>
          </p>
        </div>

        {/* the cover opens the reel lightbox */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play reel"
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid size-16 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 size-8" fill="currentColor" />
          </span>
        </button>
      </div>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={close}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[400px]"
            >
              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label="Close reel"
                className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
              <div className="aspect-[9/16] w-full max-h-[80vh] overflow-hidden rounded-2xl bg-black shadow-2xl">
                <iframe
                  src={embedSrc}
                  title={title}
                  className="h-full w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="origin-when-cross-origin"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}