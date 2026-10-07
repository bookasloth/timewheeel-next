import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { Heart, ChatCircle, BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import { smm } from "@/lib/social-media-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { CarouselScroller } from "./carousel-scroller";

// Illustrative creative gallery — sample post concepts styled as social cards.
// Not real client work; shows the format range (reel / carousel / story / post).
export function SmmFeed() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
          <span className="size-1.5 rounded-full bg-brand" />
          {smm.feed.eyebrow}
        </p>
        <RevealHeading as="h2" className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.feed.heading}
        </RevealHeading>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{smm.feed.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {smm.feed.posts.map((p, i) => (
          <Reveal key={p.caption} delay={i * 0.05}>
            <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_44px_-30px_rgba(26,29,36,0.4)]">
              {/* content tile — real posts link out; reels embed; rest are creative stand-ins */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                {p.img && p.href && (!p.imgs || p.imgs.length <= 1) ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className="absolute inset-0 flex h-full w-full" />
                ) : null}
                {p.kind === "Reel" ? (
                  <iframe
                    src={p.embedUrl ?? "https://www.instagram.com/reel/DLURV6ezU02/embed"}
                    className="absolute inset-0 h-full w-full border-0"
                    title={p.caption}
                    loading="lazy"
                    scrolling="no"
                    allow="encrypted-media"
                  />
                ) : p.imgs ? (
                  <CarouselScroller imgs={p.imgs} caption={p.caption} href={p.href} />
                ) : p.img ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={p.img}
                      alt={p.caption}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <p className="absolute inset-x-4 bottom-4 text-lg font-bold leading-snug text-white drop-shadow-sm">
                      {p.caption}
                    </p>
                  </div>
                ) : (
                  <div
                    className="relative h-full w-full"
                    style={{
                      backgroundImage: `linear-gradient(150deg, ${p.tone} 0%, ${p.tone}b3 55%, ${p.tone}66 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 opacity-25 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,#fff_0,transparent_45%)]" />
                    <p className="absolute inset-x-4 bottom-4 text-lg font-bold leading-snug text-white drop-shadow-sm">
                      {p.caption}
                    </p>
                  </div>
                )}
              </div>
              {/* engagement bar — decorative, no counts */}
              <figcaption className="flex items-center gap-4 px-4 py-3 text-muted-foreground">
                <Heart className="size-5 transition-transform group-hover:scale-110" weight="fill" style={{ color: p.tone }} />
                <ChatCircle className="size-5" />
                <BookmarkSimple className="ml-auto size-5" />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
