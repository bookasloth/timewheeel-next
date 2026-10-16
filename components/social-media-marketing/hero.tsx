import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { SmmReelCard } from "@/components/social-media-marketing/reel-card";

export function SmmHero() {
  // Staggered posts: each card keeps its own ratio (4:5, 1:1).
  const postRatios = ["aspect-[4/5]", "aspect-square"];
  // Real client posts already featured in the feed section — reused in the hero.
  const heroPosts = [
    smm.feed.posts[1], // Dhawade Vadewale carousel
    smm.feed.posts[5], // Everything Powerlifting carousel
  ];
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center">
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

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-12 md:pb-20 md:pt-16 lg:py-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h1 className="text-4xl font-black leading-[1.06] tracking-tight md:text-5xl lg:text-[3.4rem]">
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
            {/* staggered grid: left = 2 real Instagram posts, right = 9:16 reel */}
            <div className="-mt-6 grid grid-cols-2 gap-4 lg:h-[min(76vh,32rem)] lg:grid-cols-[1fr_1.1fr]">
              {/* left column: real client posts with mixed IG ratios (4:5, 1:1) */}
              <div className="flex flex-col gap-4">
                {heroPosts.map((p, i) => (
                  <a
                    key={p.caption}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative block min-h-0 w-full flex-1 overflow-hidden rounded-2xl border border-border shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)] lg:aspect-auto ${postRatios[i % postRatios.length]}`}
                  >
                    <Image
                      src={p.img as string}
                      alt={p.caption}
                      width={1080}
                      height={1350}
                      preload={i === 0}
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
              {/* right column: single 9:16 reel, top aligned with the first post row */}
              <div className="h-full">
                <SmmReelCard
                  src={smm.hero.gallery[3].src}
                  alt={smm.hero.gallery[3].alt}
                  href="https://www.instagram.com/reel/DXegKe7CHSK/"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
