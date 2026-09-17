"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, BadgePercent, LayoutDashboard, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { products } from "@/lib/products";

// Dark, centered hero (Lexend-style): pill badge, headline with a typewriter
// word, big pill CTA, honest trust line, orbital product icons on dashed rings,
// and a 4-card feature row. Orbit uses our REAL products; no fake reviews/logos.

const TYPED = ["website.", "web app.", "online store.", "brand.", "rankings.", "audience."];

// Real product icons placed on two concentric rings (angle in deg, radius in px).
// Angles kept on the left (120–240) and right (300–60) arcs only, nothing near
// the vertical centre (top ~270 / bottom ~90), so no icon sits between the
// headline and the button.
const orbit = [
  { slug: "book-a-sloth", ring: 0, angle: 200 },
  { slug: "alluminaty", ring: 0, angle: 340 },
  { slug: "ticket-dino", ring: 1, angle: 160 },
  { slug: "coffee-for-me", ring: 1, angle: 20 },
  { slug: "the-parliament", ring: 2, angle: 210 },
  { slug: "link-lantern", ring: 2, angle: 350 },
  { slug: "whatsloom", ring: 1, angle: 195 },
  { slug: "serp-sutra", ring: 0, angle: 15 },
  { slug: "2b-navodian", ring: 2, angle: 150 },
].map((o) => ({ ...o, product: products.find((p) => p.slug === o.slug)! }))
  .filter((o) => o.product);

const RINGS = [300, 460, 620]; // radii

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

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.timeline()
        .from(q(".hero-up"), { opacity: 0, y: 22, duration: 0.7, ease: "power3.out", stagger: 0.1 })
        .from(q(".hero-orbit-icon"), { opacity: 0, scale: 0.4, duration: 0.7, ease: "back.out(1.7)", stagger: 0.08 }, "-=0.5");
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative -mt-16 overflow-hidden bg-[#100702] text-white"
      style={{ backgroundImage: "radial-gradient(120% 90% at 50% 0%, #3a1707 0%, #1c0d05 55%, #100702 100%)" }}
    >
      {/* dashed orbit rings + product icons */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[46%] -z-0 -translate-x-1/2 -translate-y-1/2">
        {RINGS.map((r) => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
            style={{ width: r * 2, height: r * 2 }}
          />
        ))}
        {orbit.map(({ product, ring, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const R = RINGS[ring];
          const x = Math.cos(rad) * R;
          const y = Math.sin(rad) * R;
          const Icon = product.icon;
          return (
            <div
              key={product.slug}
              className="hero-orbit-icon absolute left-1/2 top-1/2 hidden md:grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, color: product.accent }}
            >
              <Icon size={24} weight="duotone" />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-24 text-center md:pt-28">
        <h1 className="hero-up text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
          We build and grow your
          <br />
          <Typewriter />
        </h1>
        <p className="hero-up mt-5 max-w-xl text-base text-white/60 md:text-lg">
          Design, development and web apps, then the SEO, ads and social to grow
          them. One team for building your product and marketing it, on systems you own.
        </p>
        <Link
          href="#ecosystem"
          className="hero-up group btn btn-primary mt-9 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-brand-foreground"
        >
          Explore the Ecosystem
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* feature cards */}
        <div className="hero-up mt-16 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
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
