import { Reveal } from "@/components/reveal";
import { Heart, ChatCircle, BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import { smm } from "@/lib/social-media-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";

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
              {/* content tile — gradient stand-in for the creative */}
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${p.tone} 0%, ${p.tone}b3 55%, ${p.tone}66 100%)`,
                }}
              >
                <div className="absolute inset-0 opacity-25 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,#fff_0,transparent_45%)]" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                  {p.kind}
                </span>
                <p className="absolute inset-x-4 bottom-4 text-lg font-bold leading-snug text-white drop-shadow-sm">
                  {p.caption}
                </p>
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
