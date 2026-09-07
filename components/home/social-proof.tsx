"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import {
  siStripe,
  siNotion,
  siFigma,
  siVercel,
  siGithub,
  siLinear,
  siFramer,
  siSupabase,
  siZapier,
  siAirbnb,
  siSpotify,
  siDiscord,
  siShopify,
  siDropbox,
  siCloudflare,
  siNetflix,
  siAirbus,
  type SimpleIcon,
} from "simple-icons";

type Logo = {
  icon: SimpleIcon;
  real: boolean;
  short: boolean;
  yell: boolean;
  big: boolean;
  plane: boolean;
};

// Tags spread ~50/50 and differ per neighbour so each shuffle sends ~half
// the logos gliding across the divider.
const logos: Logo[] = [
  { icon: siStripe, real: true, short: true, yell: false, big: true, plane: false },
  { icon: siNotion, real: true, short: false, yell: true, big: false, plane: false },
  { icon: siFigma, real: false, short: true, yell: true, big: true, plane: false },
  { icon: siVercel, real: false, short: false, yell: false, big: true, plane: false },
  { icon: siGithub, real: false, short: true, yell: false, big: false, plane: false },
  { icon: siLinear, real: true, short: false, yell: true, big: true, plane: false },
  { icon: siFramer, real: false, short: true, yell: false, big: true, plane: false },
  { icon: siSupabase, real: true, short: false, yell: false, big: false, plane: false },
  { icon: siZapier, real: false, short: true, yell: true, big: false, plane: false },
  { icon: siAirbnb, real: true, short: false, yell: false, big: true, plane: false },
  { icon: siSpotify, real: false, short: true, yell: true, big: true, plane: false },
  { icon: siDiscord, real: true, short: false, yell: true, big: false, plane: false },
  { icon: siShopify, real: false, short: true, yell: false, big: true, plane: false },
  { icon: siDropbox, real: true, short: false, yell: true, big: false, plane: false },
  { icon: siCloudflare, real: false, short: false, yell: false, big: true, plane: false },
  { icon: siNetflix, real: true, short: true, yell: false, big: false, plane: false },
  { icon: siAirbus, real: false, short: true, yell: true, big: true, plane: true },
];

const pairs: { left: string; right: string; test: (l: Logo) => boolean }[] = [
  { left: "Real words", right: "Not real words", test: (l) => l.real },
  { left: "Names with 7 letters or less", right: "Names you can easily mistype", test: (l) => l.short },
  { left: "Names you can yell easily", right: "Names that require breath control", test: (l) => l.yell },
  { left: "Companies with >1 $B in their valuations", right: "Everyone else (for now)", test: (l) => l.big },
  { left: "Builds planes", right: "Doesn't build planes (yet)", test: (l) => l.plane },
];

const CELL_H = 64;
const PAD_Y = 30;

export function SocialProof() {
  const [idx, setIdx] = useState(0);
  const [cols, setCols] = useState(3);
  const [animate, setAnimate] = useState(false);
  const spinRef = useRef<SVGSVGElement>(null);

  // responsive column count (no pixel math — positions are percentages)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setCols(mq.matches ? 2 : 3);
    apply();
    mq.addEventListener("change", apply);
    // enable transitions just after first paint so there's no initial slide-in
    const id = setTimeout(() => setAnimate(true), 60);
    return () => {
      mq.removeEventListener("change", apply);
      clearTimeout(id);
    };
  }, []);

  const pair = pairs[idx];

  // each logo's target: left as a % of the field, top in px
  const pos: Record<string, { left: number; top: number; order: number }> = {};
  let maxRows = 1;
  [logos.filter(pair.test), logos.filter((l) => !pair.test(l))].forEach(
    (list, side) => {
      maxRows = Math.max(maxRows, Math.ceil(list.length / cols));
      list.forEach((l, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        pos[l.icon.slug] = {
          left: side * 50 + ((col + 0.5) / cols) * 50,
          top: PAD_Y + row * CELL_H + CELL_H / 2,
          order: i,
        };
      });
    },
  );
  const areaHeight = PAD_Y * 2 + maxRows * CELL_H;

  function shuffle() {
    if (spinRef.current) {
      gsap.fromTo(
        spinRef.current,
        { rotate: 0 },
        { rotate: 360, duration: 0.6, ease: "power2.inOut" },
      );
    }
    setIdx((i) => (i + 1) % pairs.length);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="text-3xl font-extrabold md:text-4xl">Social proof</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Yes they actually use us, no it&apos;s not just some random engineer who
        tried us out 2+ years ago.
      </p>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card">
        {/* header labels */}
        <div className="grid grid-cols-2 border-b border-border bg-secondary/50 text-center text-sm font-semibold">
          <div className="px-4 py-3.5">{pair.left}</div>
          <div className="border-l border-border px-4 py-3.5">{pair.right}</div>
        </div>

        {/* shuffle button straddling divider */}
        <button
          onClick={shuffle}
          aria-label="Shuffle categories"
          className="absolute left-1/2 top-[52px] z-20 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-brand transition-colors hover:bg-secondary"
        >
          <RefreshCw ref={spinRef} className="size-4" />
        </button>

        {/* one animated field — logos never reparent, only their left/top changes */}
        <div
          className="relative transition-[height] duration-700 ease-out"
          style={{ height: areaHeight }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-border" />
          {logos.map((l) => {
            const p = pos[l.icon.slug];
            return (
              <div
                key={l.icon.slug}
                className="absolute flex items-center gap-2 whitespace-nowrap will-change-transform motion-reduce:transition-none"
                style={{
                  color: `#${l.icon.hex}`,
                  left: `${p.left}%`,
                  top: `${p.top}px`,
                  transform: "translate(-50%, -50%)",
                  transition: animate
                    ? `left 0.8s cubic-bezier(0.65,0,0.35,1) ${p.order * 25}ms, top 0.8s cubic-bezier(0.65,0,0.35,1) ${p.order * 25}ms`
                    : "none",
                }}
              >
                <svg role="img" viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden>
                  <path d={l.icon.path} />
                </svg>
                <span className="text-lg font-extrabold tracking-tight text-foreground">
                  {l.icon.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="#"
          className="btn btn-outline inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold"
        >
          Open Customers
        </Link>
      </div>
    </section>
  );
}
