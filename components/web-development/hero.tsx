import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

const DOT_BG = "radial-gradient(currentColor 1.4px, transparent 1.5px)";

// A single doodle, positioned relative to its parent tile (≤20px from it).
function Doodle({ d, at }: { d: string; at: string }) {
  const base = `pointer-events-none absolute text-ink opacity-80 ${at}`;
  if (d === "plus")
    return <svg className={`${base} size-5`} viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>;
  if (d === "x")
    return <svg className={`${base} size-5`} viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>;
  if (d === "star")
    return <svg className={`${base} size-6`} viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.8L21 10l-5 4.2L17.5 21 12 17.3 6.5 21 8 14.2 3 10l6.6-1.2L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
  if (d === "squiggle")
    return <svg className={`${base} h-5 w-14`} viewBox="0 0 90 24" fill="none"><path d="M2 12c8-14 16 14 24 0s16-14 24 0 16 14 24 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>;
  // dots
  return <span className={`${base} size-10 opacity-30`} style={{ backgroundImage: DOT_BG, backgroundSize: "9px 9px" }} />;
}

// Six illustration tiles that bleed off the hero edges. Each carries its own
// doodles, positioned relative to the tile so they always hug the icon.
// Art lives at /public/web-dev/hero-1.png … hero-6.png.
type TileDef = { n: number; pos: string; doodles: { d: string; at: string }[] };
const HERO_TILES: TileDef[] = [
  { n: 1, pos: "-left-[69px] -top-[44px]", doodles: [ // code, top-left
    { d: "plus", at: "-top-3 right-3" },
    { d: "dots", at: "-bottom-1 -right-4" },
  ] },
  { n: 2, pos: "-right-8 -top-10 md:-right-4", doodles: [ // laptop, top-right
    { d: "x", at: "top-8 -left-3" },
  ] },
  { n: 3, pos: "left-[6px] top-[calc(34%+10px)]", doodles: [ // browser, mid-left
    { d: "squiggle", at: "top-1/2 -right-8" },
  ] },
  { n: 4, pos: "left-[25px] -bottom-[124px]", doodles: [ // chart, bottom-left
    { d: "squiggle", at: "-top-3 right-4" },
    { d: "dots", at: "bottom-6 -right-6" },
  ] },
  { n: 5, pos: "-right-[120px] top-[42%]", doodles: [ // rocket, mid-right (half off-screen)
    { d: "star", at: "top-2 -left-5" },
    { d: "squiggle", at: "-bottom-2 -left-6" },
  ] },
  { n: 6, pos: "right-[210px] -bottom-[114px]", doodles: [ // plant, bottom-right
    { d: "star", at: "top-4 -right-4" },
    { d: "dots", at: "-bottom-2 -left-4" },
  ] },
];

function Tile({ n, pos, doodles }: TileDef) {
  return (
    <div aria-hidden className={`pointer-events-none absolute hidden lg:block ${pos}`}>
      <div className="relative size-[200px] xl:size-[248px]">
        <Image alt="" src={`/web-dev/hero-${n}.png`} fill sizes="248px" className="object-contain" />
        {doodles.map((dd, i) => (
          <Doodle key={i} {...dd} />
        ))}
      </div>
    </div>
  );
}

export function WdHero() {
  return (
    // overflow-x-clip (not overflow-hidden) so the two bottom illustration
    // tiles can bleed downward into the section below instead of being cut off.
    <section className="relative overflow-x-clip">
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

      {/* illustration tiles, each carrying its own hugging doodles */}
      {HERO_TILES.map((t) => (
        <Tile key={t.n} {...t} />
      ))}

      <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-16 text-center md:pb-20 md:pt-24">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-text">
            {wd.hero.eyebrow}
          </p>
          <h1 className="wd-hero-h1 mx-auto mt-5 max-w-2xl font-black tracking-tight text-navy">
            {wd.hero.h1a}{" "}
            <span
              className="dm-gradient-text"
              style={{ backgroundImage: "linear-gradient(90deg, #fe5100, #ff4d93, #ffcc1c, #fe5100)" }}
            >
              {wd.hero.h1b}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[19px] leading-relaxed text-muted-foreground">
            {wd.hero.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={wd.hero.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-brand-foreground"
            >
              {wd.hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={wd.hero.secondaryCta.href}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
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
