import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

export function SmmHero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient color field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="smm-blob absolute -left-40 -top-32 size-[30rem] rounded-full bg-brand/15 blur-3xl" />
        <div
          className="smm-blob absolute -right-32 top-24 size-[26rem] rounded-full bg-accent-pink/10 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="smm-blob absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-accent-yellow/15 blur-3xl"
          style={{ animationDelay: "8s" }}
        />
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

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
              <Sparkle className="size-3.5" />
              {smm.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.06] tracking-tight md:text-5xl lg:text-[3.4rem]">
              <span className="text-navy">{smm.hero.h1a}</span>{" "}
              <span className="smm-rainbow-text">{smm.hero.h1b}</span>{" "}
              <span className="text-navy">{smm.hero.h1c}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {smm.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={smm.hero.primaryCta.href}
                className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
              >
                {smm.hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={smm.hero.secondaryCta.href}
                className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              >
                {smm.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold text-muted-foreground">
              <span className="size-1.5 rounded-full bg-brand" />
              {smm.hero.trustLine.split("·")[0]}
              <span className="size-1.5 rounded-full bg-accent-pink" />
              {smm.hero.trustLine.split("·")[1]}
              <span className="size-1.5 rounded-full bg-rating" />
              {smm.hero.trustLine.split("·")[2]}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {/* ponytail: staggered grid, left = 3 landscape 16:9, right = 9:16 tall; swap srcs for real creatives */}
            <div className="grid grid-cols-2 gap-4 lg:h-[32rem]">
              {/* left column: 3 small 16:9 cards, offset down */}
              <div className="mt-10 flex flex-col gap-4">
                {smm.hero.gallery.slice(0, 3).map((img, i) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={1280}
                    height={720}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="aspect-[16/9] h-auto w-full min-h-0 flex-1 rounded-2xl border border-border object-cover shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)] lg:aspect-auto"
                  />
                ))}
              </div>
              {/* right column: single 9:16 vertical */}
              <Image
                src={smm.hero.gallery[3].src}
                alt={smm.hero.gallery[3].alt}
                width={720}
                height={1280}
                priority
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="aspect-[9/16] h-full w-full rounded-2xl border border-border object-cover shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)] lg:aspect-auto"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
