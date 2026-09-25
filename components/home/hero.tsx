"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, BadgePercent, LayoutDashboard, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";

// Dark, centered hero (Lexend-style): headline with a typewriter word, big CTA,
// and a 4-card feature row.

const TYPED = ["website.", "web app.", "online store.", "brand.", "traffic.", "revenue.", "audience.", "community.", "leads."];

const features = [
  { icon: Database, label: "Own your code & data" },
  { icon: BadgePercent, label: "No platform commissions" },
  { icon: LayoutDashboard, label: "One connected dashboard" },
  { icon: TrendingUp, label: "Scales with your business" },
];

function Typewriter() {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(TYPED[0]);
      return;
    }
    const word = TYPED[wordIdx];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1400 : cleared ? 250 : deleting ? 45 : 85;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % TYPED.length);
      } else {
        setText(word.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return (
    <span className="text-brand">
      {text}
      <span className="ml-0.5 inline-block w-[3px] -translate-y-1 animate-pulse bg-brand align-middle" style={{ height: "0.85em" }} aria-hidden />
    </span>
  );
}

// Flies the hole straight across the frame — in one edge, out the other — over
// 240s, easing in and out. Direction alternates each pass: right-to-left, then
// left-to-right. It never fully leaves — at each edge it rests half-in. Its
// own component so only the canvas re-renders each frame, not the copy.
function DriftingBlackHole() {
  const [focus, setFocus] = useState<[number, number]>([1.0, 0.55]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFocus([0.5, 0.55]);
      return;
    }
    const CY = 0.55, D = 0.5; // vertical centre; reach so the hole rests half-in at each edge
    const DUR = 240000;
    let dir = 1; // 1 = right→left, -1 = left→right
    let t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      let k = (now - t0) / DUR;
      if (k >= 1) { dir = -dir; t0 = now; k = 0; }
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // easeInOutQuad
      const startX = 0.5 + dir * D;
      const endX = 0.5 - dir * D;
      setFocus([startX + (endX - startX) * e, CY]);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <BlackHoleHeroSection focus={focus} distance={29} roll={0} elevation={-5.5} vignette={0.4} />;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.timeline()
        .from(q(".hero-up"), { opacity: 0, y: 22, duration: 0.7, ease: "power3.out", stagger: 0.1 });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative -mt-16 flex min-h-[calc(100svh+4rem)] items-center overflow-hidden bg-black text-white"
    >
      {/* WebGL ray-traced black hole, horizontal disc, centered behind copy */}
      <div aria-hidden className="absolute inset-0">
        <DriftingBlackHole />
      </div>
      {/* legibility vignette over the disc, under the content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_50%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.32)_45%,transparent_78%)]" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-24 text-center md:pt-28">
        <h1 className="hero-up text-[2.07rem] font-black leading-[1.08] tracking-tight md:text-[3.37rem]">
          We turn ambitious ideas into <br />things that grow your <Typewriter />
        </h1>
        <p className="hero-up mt-5 max-w-3xl text-base text-white/60 md:text-lg">
          One team to design, build and grow your business online — websites and apps,
          then the SEO, ads and social to fill them. Built on systems you own, not rent.
        </p>
        <Link
          href="#ecosystem"
          className="hero-up group btn btn-primary mt-9 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-brand-foreground"
        >
          Explore the Ecosystem
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* feature cards */}
        <div className="hero-up mt-16 grid w-full grid-cols-2 gap-[21px] lg:grid-cols-4">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
              <span className="grid size-11 place-items-center rounded-xl bg-brand/15 text-brand">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
