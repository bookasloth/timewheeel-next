"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Music2,
  Play,
  Send,
} from "lucide-react";

// Instagram-Reel style card. Shows the creatives' vertical poster; clicking the
// play button renders the reel video inline. `src` is the poster, `video` the
// reel asset (swap /coffee.mp4 for a real Timewheel reel).
export function SmmReelCard({
  src,
  alt,
  video = "/coffee.mp4",
  handle = "@timewheel.digital",
}: {
  src: string;
  alt: string;
  video?: string;
  handle?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative aspect-[9/16] h-full w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)] lg:aspect-auto">
      {playing ? (
        <video
          key={video}
          src={video}
          autoPlay
          controls
          playsInline
          muted
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority
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
              <span className="truncate">Original audio · Timewheel</span>
            </p>
          </div>

          {/* center play button */}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play reel"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 size-8" fill="currentColor" />
            </span>
          </button>
        </>
      )}
    </div>
  );
}