import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

// Six decorative illustration tiles scattered around the centered hero.
// Art (with its own torn-paper colour backing) lives at
// /public/web-dev/hero-1.png … hero-6.png.
const HERO_TILES = [
  { n: 1, pos: "left-[2%] top-[10%] md:left-[5%]" },
  { n: 2, pos: "right-[2%] top-[6%] md:right-[6%]" },
  { n: 3, pos: "left-[1%] top-[42%] md:left-[3%]" },
  { n: 4, pos: "left-[5%] bottom-[6%] md:left-[8%]" },
  { n: 5, pos: "right-[2%] top-[48%] md:right-[5%]" },
  { n: 6, pos: "right-[5%] bottom-[5%] md:right-[9%]" },
] as const;

function Tile({ n, pos }: (typeof HERO_TILES)[number]) {
  return (
    <Image
      aria-hidden
      alt=""
      src={`/web-dev/hero-${n}.png`}
      width={512}
      height={512}
      className={`pointer-events-none absolute hidden size-[116px] object-contain lg:block xl:size-[136px] ${pos}`}
    />
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

      {/* scattered illustration tiles */}
      {HERO_TILES.map((t) => (
        <Tile key={t.n} {...t} />
      ))}

      {/* doodle accents (sparingly) */}
      <svg aria-hidden className="pointer-events-none absolute left-[14%] top-[30%] hidden size-6 text-ink/50 lg:block" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute right-[16%] top-[24%] hidden size-7 text-ink/40 lg:block" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 6.8L21 10l-5 4.2L17.5 21 12 17.3 6.5 21 8 14.2 3 10l6.6-1.2L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>

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
