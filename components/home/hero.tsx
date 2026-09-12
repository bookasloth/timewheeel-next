"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";

// Bold, full-bleed brand hero. Giant display type on the orange field with a
// mouse-trail of product shots: as the cursor moves across the hero, 150x100
// images spawn along the path, fade in, then fade out — cycling the set.
// Pointer devices only; touch / reduced-motion just show the clean headline.

// ponytail: /hero/*.jpg are placeholder shots — swap for real product screenshots.
const IMAGES = [
  { src: "/hero/bookings.jpg", alt: "Bookings" },
  { src: "/hero/payments.jpg", alt: "Payments" },
  { src: "/hero/events.jpg", alt: "Events" },
  { src: "/hero/communities.jpg", alt: "Communities" },
];

const POOL = 10; // reused image slots
const THRESHOLD = 90; // px of cursor travel between spawns

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);

      // Intro for the copy (always runs unless reduced-motion).
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set([q(".hero-line-inner"), q(".hero-fade")], { opacity: 1, yPercent: 0, y: 0 });
      } else {
        gsap
          .timeline()
          .from(q(".hero-line-inner"), { yPercent: 115, duration: 1, ease: "power4.out", stagger: 0.12 })
          .from(q(".hero-fade"), { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.55");
      }

      // Image trail — pointer devices only, and not when reduced-motion.
      if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
      const section = ref.current!;
      const slots = q<HTMLElement>(".trail-img");
      let last = { x: 0, y: 0 };
      let slot = 0;
      let z = 1;

      const onMove = (e: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (Math.hypot(x - last.x, y - last.y) < THRESHOLD) return;
        last = { x, y };

        const el = slots[slot % slots.length];
        slot++;
        z++;
        gsap.killTweensOf(el);
        gsap.set(el, { x: x - 52.5, y: y - 35, rotation: gsap.utils.random(-14, 14), scale: 0.85, opacity: 0, zIndex: z });
        gsap
          .timeline()
          .to(el, { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" })
          .to(el, { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.in" }, "+=0.25");
      };

      section.addEventListener("pointermove", onMove);
      return () => section.removeEventListener("pointermove", onMove);
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88vh] w-full flex-col overflow-hidden bg-brand text-[#141110]"
    >
      {/* trail image pool — hidden until the cursor spawns them */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: POOL }).map((_, i) => {
          const img = IMAGES[i % IMAGES.length];
          return (
            <div
              key={i}
              className="trail-img absolute left-0 top-0 opacity-0 will-change-transform"
              style={{ width: 105 }}
            >
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/25 ring-1 ring-black/10">
                <Image src={img.src} alt="" width={105} height={70} className="h-[70px] w-[105px] object-cover" />
              </div>
            </div>
          );
        })}
      </div>

      {/* top eyebrow */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        <span className="hero-fade text-xs font-bold uppercase tracking-[0.2em]">
          The Timewheel Ecosystem
        </span>
        <span className="hero-fade hidden text-xs font-bold uppercase tracking-[0.2em] sm:block">
          Own, don&apos;t rent
        </span>
      </div>

      {/* center headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-black uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 13vw, 10rem)" }}>
          <span className="block overflow-hidden"><span className="hero-line-inner block">Own Your</span></span>
          <span className="block overflow-hidden"><span className="hero-line-inner block">Systems</span></span>
        </h1>
        <p className="hero-fade mt-7 max-w-xl text-base font-medium text-black/70 md:text-lg">
          Bookings, payments, events and communities — running on one connected
          platform you own outright. No fragmented SaaS, no platform commissions,
          no rented infrastructure.
        </p>
        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#ecosystem"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#141110] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Explore the Ecosystem
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={site.demoUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-black/30 px-7 py-3.5 text-sm font-semibold text-[#141110] transition-colors hover:bg-black/5"
          >
            Book a demo
          </Link>
        </div>
      </div>

      {/* bottom meta row */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-8 text-[11px] font-bold uppercase tracking-[0.16em]">
        <span className="hero-fade">Based in India</span>
        <span className="hero-fade hidden md:block">One platform · many products</span>
        <span className="hero-fade">10+ products shipped</span>
      </div>
    </section>
  );
}
