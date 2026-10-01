import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Megaphone,
  MousePointerClick,
  PenLine,
  Search,
  Users,
} from "lucide-react";

// Cinematic editorial hero for /digital-marketing-company-in-nagpur.
//
// Artwork is the client-supplied /digital-marketing-hero.png (1672x941, 16:9,
// opaque). Scrims below are tuned against that file's measured luminance, not
// guessed: the frame is high-contrast throughout (luminance 9-246), with dark
// foliage at mid-left behind the headline and a BRIGHT warm base along the
// bottom edge. So the left column gets a heavy cream wash, and the service
// strip sits on cream with dark type rather than the dark band the art does
// not have.

const SERVICES = [
  { icon: Search, title: "SEO", desc: "Rank Higher" },
  { icon: Users, title: "Social Media", desc: "Build Community" },
  { icon: MousePointerClick, title: "Paid Ads", desc: "Drive Sales" },
  { icon: PenLine, title: "Content", desc: "Tell Your Story" },
];

export function DmCinematicHero() {
  return (
    // The hero inherits the page palette from `.pm-page`; the only local
    // token override is the button label, explained below.
    <section
      className="relative isolate overflow-hidden bg-[#F7F2E8]"
      style={
        {
          // The hero now wears the page's own primary instead of a private
          // orange: `--brand`, `--brand-text` and `--ring` all inherit from
          // `.pm-page` (yellow #ffcc1c, AA-on-cream text #8a6d00).
          // Only the button label is set here. `.btn-primary` paints
          // var(--brand-foreground) on the yellow fill, and the inherited
          // near-white #fffdf7 would sit at ~1.3:1 - unreadable.
          "--brand-foreground": "#111111",
        } as React.CSSProperties
      }
    >
      {/* ── artwork: right-hand panel, dissolved into the cream ───── */}
      {/* The photograph is deliberately NOT a full-bleed background. From lg
          up it is a panel claiming only the right side, and its left edge is
          dissolved with a mask so the frame melts into the cream column
          instead of butting against it as a hard rectangle.

          Below lg there is no "right side" to claim and the fold has to stay
          intact, so it goes full width there, behind the wash below.

          NB: the wash/fade divs must be `absolute` with an explicit height.
          They are empty, so unpositioned they collapse to 0px and silently do
          nothing - which is what the previous full-bleed version did. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-[52%] xl:w-[56%]"
      >
        <Image
          src="/digital-marketing-hero.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 52vw, 100vw"
          className="object-cover object-[62%_45%]"
          style={{
            // Left edge dissolves into the cream. The long low-alpha plateau
            // keeps the headline's right end off the opaque part of the
            // frame, where the art has dark foliage.
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 30%, #000 58%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 30%, #000 58%)",
          }}
        />
      </div>

      {/* Phones/tablets: the text column is full width, so veil the whole
          frame evenly and let the type sit on near-solid cream. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(245,240,231,0.94)_0%,rgba(245,240,231,0.9)_45%,rgba(245,240,231,0.82)_80%,rgba(245,240,231,0.9)_100%)] lg:hidden"
      />
      {/* Meets the sticky cream navbar without a hard seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[16%] bg-[linear-gradient(to_bottom,rgba(245,240,231,0.8)_0%,rgba(245,240,231,0)_100%)]"
      />
      {/* The artwork's lower edge is bright (luminance 169-245), so the
          service strip takes a cream bed and dark type instead of a dark
          band — contrast is guaranteed and the warm base stays visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[42%] bg-[linear-gradient(to_top,rgba(245,240,231,0.95)_0%,rgba(245,240,231,0.8)_24%,rgba(245,240,231,0)_100%)]"
      />

      {/* ── content ──────────────────────────────────────────────── */}
      {/* No `Reveal` (scroll-triggered fade) anywhere in this hero, on
          purpose. The hero fills the first screen, so the last element sits
          below ScrollTrigger's `top 85%` start and its `gsap.from` state
          (opacity 0) never resolves — the service strip stayed invisible.
          Above-the-fold content must paint immediately; it is also the LCP
          element, and a delayed reveal only delays it.
          `65px` clears the sticky navbar (64px + its 1px border). `svh` keeps
          mobile browser chrome from clipping it. min-h, not h, so short
          viewports grow the hero instead of squashing the content. */}
      <div className="relative mx-auto flex min-h-[calc(100svh_-_65px)] w-full max-w-[1440px] flex-col justify-between px-6">
        <div className="relative pt-10 sm:pt-12 lg:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#111111]/10 bg-[#F7F2E8]/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]/75">
            <Megaphone className="size-3.5 text-brand-text" />
            Digital Marketing Agency
          </span>

          {/* Size comes from `.dm-hero-h1` in globals.css, not a utility: the
              site-wide `h1 { font-size: 40px !important }` beats utilities,
              so this follows the existing .wd/.aim/.pm hero-h1 pattern.
              Line 1 uses `--brand-text` (#8a6d00), not the primary #ffcc1c:
              on this cream ground the primary is 1.33:1. 4.33:1 clears the
              3:1 large-text rule at 77px. No chip, no background on the type. */}
          <h1 className="dm-hero-h1 mt-6 max-w-[15ch] font-extrabold tracking-[-0.03em] text-[#111111]">
            <span className="text-brand-text">Digital Marketing</span>
            <span className="block">
              Company in Nagpur
            </span>
          </h1>

          <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-[#111111]/70 md:text-[18px]">
            One connected growth system: SEO, paid ads, social and content working togethet to 
            bring your business more enquires and more sales, all managed under one roof in 
            Nagpur.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-8">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              Work With Us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 rounded-lg border border-[#111111]/25 bg-[#F7F2E8]/50 px-7 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:border-[#111111]/45 hover:bg-[#F7F2E8]/80"
            >
              Our Services
            </Link>
          </div>

          {/* ── handwritten annotation ───────────────────────────── */}
          <div className="relative mt-8 inline-block sm:mt-10 lg:absolute lg:right-8 lg:top-4 lg:mt-0 xl:right-16">
            <p
              className="text-[26px] leading-[1.1] text-[#111111]/80 lg:text-[34px]"
              style={{
                fontFamily:
                  '"Segoe Script", "Bradley Hand", "Brush Script MT", "Snell Roundhand", cursive',
              }}
            >
              Real People.
              <br />
              Real Growth.
            </p>
            {/* hand-drawn curved arrow, pointing down toward the figure */}
            <svg
              aria-hidden
              viewBox="0 0 130 80"
              className="mt-1 h-12 w-24 -scale-x-100 text-[#111111]/55 lg:h-16 lg:w-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M124 6 C 104 10, 74 18, 58 34 C 50 42, 44 50, 38 62" />
              <path d="M50 52 C 45 57, 41 61, 37 64 C 41 66, 45 65, 48 62" />
            </svg>
          </div>
        </div>

        {/* ── bottom service strip ────────────────────────────────── */}
        <nav
          aria-label="Digital marketing services"
          className="border-t border-[#111111]/15 py-5 sm:py-6 lg:py-7"
        >
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-0">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <li
                key={title}
                className={`flex items-center gap-3 ${
                  i > 0 ? "sm:border-l sm:border-[#111111]/12 sm:pl-4" : ""
                }`}
              >
                <Icon className="size-5 shrink-0 text-brand-text" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-[#111111]">
                    {title}
                  </span>
                  <span className="block text-xs text-[#111111]/60">
                    {desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
