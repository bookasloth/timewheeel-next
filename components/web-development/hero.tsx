import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

// Six decorative illustration tiles that bleed off the hero edges.
// Art (with its own torn-paper colour backing) lives at
// /public/web-dev/hero-1.png … hero-6.png.
const HERO_TILES = [
  { n: 1, pos: "-left-[69px] -top-[44px]" }, // code, top-left
  { n: 2, pos: "-right-8 -top-10 md:-right-4" }, // laptop, top-right
  { n: 3, pos: "left-[6px] top-[calc(34%+10px)]" }, // browser, mid-left
  { n: 4, pos: "left-[25px] -bottom-[124px]" }, // chart, bottom-left
  { n: 5, pos: "-right-[120px] top-[42%]" }, // rocket, mid-right (half off-screen)
  { n: 6, pos: "right-[110px] -bottom-[14px]" }, // plant, bottom-right (pulled in near buttons)
] as const;

function Tile({ n, pos }: (typeof HERO_TILES)[number]) {
  return (
    <Image
      aria-hidden
      alt=""
      src={`/web-dev/hero-${n}.png`}
      width={512}
      height={512}
      className={`pointer-events-none absolute hidden size-[200px] object-contain lg:block xl:size-[248px] ${pos}`}
    />
  );
}

// Hand-drawn doodle accents, sprinkled between the tiles (reference match).
function Doodles() {
  const dots = "radial-gradient(currentColor 1.4px, transparent 1.5px)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden text-ink lg:block">
      {/* near code (top-left) */}
      <svg className="absolute left-[15%] top-[9%] size-6 opacity-80" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      <span className="absolute left-[17%] top-[22%] size-12 opacity-30" style={{ backgroundImage: dots, backgroundSize: "9px 9px" }} />
      {/* near laptop (top-right) */}
      <svg className="absolute right-[17%] top-[7%] size-6 opacity-80" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      {/* near browser (mid-left) */}
      <svg className="absolute left-[15%] top-[46%] h-6 w-16 opacity-80" viewBox="0 0 90 24" fill="none"><path d="M2 12c8-14 16 14 24 0s16-14 24 0 16 14 24 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
      {/* near rocket (mid-right) */}
      <svg className="absolute right-[15%] top-[40%] size-7 opacity-80" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.8L21 10l-5 4.2L17.5 21 12 17.3 6.5 21 8 14.2 3 10l6.6-1.2L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
      <svg className="absolute right-[16%] top-[56%] h-6 w-16 opacity-80" viewBox="0 0 90 24" fill="none"><path d="M2 12c8-14 16 14 24 0s16-14 24 0 16 14 24 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
      {/* near chart (bottom-left) */}
      <svg className="absolute left-[16%] bottom-[16%] h-6 w-16 opacity-80" viewBox="0 0 90 24" fill="none"><path d="M2 12c8-14 16 14 24 0s16-14 24 0 16 14 24 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
      <span className="absolute left-[19%] bottom-[8%] size-12 opacity-30" style={{ backgroundImage: dots, backgroundSize: "9px 9px" }} />
      {/* near plant (bottom-right) */}
      <svg className="absolute right-[15%] bottom-[22%] size-6 opacity-80" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.8L21 10l-5 4.2L17.5 21 12 17.3 6.5 21 8 14.2 3 10l6.6-1.2L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
      <span className="absolute right-[17%] bottom-[9%] h-14 w-16 opacity-30" style={{ backgroundImage: dots, backgroundSize: "9px 9px" }} />
    </div>
  );
}

export function WdHero() {
  return (
    <section className="relative overflow-hidden">
      {/* dot-grid + top hairline */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(rgba(15,17,17,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black, transparent 78%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      </div>

      {/* doodle accents — sit behind the icon tiles */}
      <Doodles />

      {/* scattered illustration tiles (paint over the doodles) */}
      {HERO_TILES.map((t) => (
        <Tile key={t.n} {...t} />
      ))}

      <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-16 text-center md:pb-20 md:pt-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-text">
            {wd.hero.eyebrow}
          </p>
          <h1 className="mx-auto mt-5 max-w-2xl font-black leading-[1.08] tracking-tight text-navy">
            {wd.hero.h1a}{" "}
            <span
              className="dm-gradient-text"
              style={{ backgroundImage: "linear-gradient(90deg, #fe5100, #ff4d93, #ffcc1c, #fe5100)" }}
            >
              {wd.hero.h1b}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {wd.hero.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={wd.hero.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              {wd.hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={wd.hero.secondaryCta.href}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
            >
              {wd.hero.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-7 text-[13px] font-semibold text-muted-foreground">
            {wd.hero.trustLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
