import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, MessageCircle, Sparkle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

// Decorative sample data inside the social command-centre mock. These are
// illustrative UI mockups only, not claims about actual client performance.
const floating = [
  { label: "4.2% engagement", pos: "-top-3 -left-3", bg: "#2563eb", fg: "#ffffff", delay: "0.2s" },
  { label: "Reels · 2× reach", pos: "top-[38%] -right-4", bg: "linear-gradient(135deg, #ff4d93, #f45b0a)", fg: "#ffffff", delay: "0.5s" },
  { label: "14 posts scheduled", pos: "bottom-10 -left-4", bg: "#29a66f", fg: "#ffffff", delay: "0.8s" },
  { label: "+38% profile visits", pos: "-top-3 -right-3", bg: "#ffcc1c", fg: "#5b4300", delay: "0.4s" },
];

const queue = [
  { platform: "Reels", hook: "The 3 mistakes most Indian brands make", status: "Scheduled", tone: "#fe5100" },
  { platform: "Carousel", hook: "Choosing a name people remember", status: "In review", tone: "#8b5cf6" },
  { platform: "Story", hook: "Behind the studio, this week", status: "Draft", tone: "#14b8a6" },
];

const replies = [
  { from: "@founder.hq", text: "This is exactly what we needed. Thanks!", time: "2m", tone: "#29a66f" },
  { from: "@saha.industries", text: "Can you share the pricing sheet?", time: "1h", tone: "#2563eb" },
];

const reach = [
  { label: "Instagram", value: "58K", pct: "82%", color: "#ff4d93", soft: "#ffe3ef" },
  { label: "LinkedIn", value: "31K", pct: "64%", color: "#2563eb", soft: "#dbe7fe" },
  { label: "YouTube", value: "22K", pct: "46%", color: "#fe5100", soft: "#ffe6d9" },
];

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
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)]">
                {/* gradient trim */}
                <div className="h-1.5 bg-gradient-to-r from-brand via-accent-pink to-accent-yellow" />
                {/* window chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
                  <span className="size-2.5 rounded-full bg-accent-pink" />
                  <span className="size-2.5 rounded-full bg-accent-yellow" />
                  <span className="size-2.5 rounded-full bg-accent-blue" />
                  <span className="ml-2 flex-1 rounded-md bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    timewheel.co.in/social
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-blue/10 px-2 py-0.5 text-[10px] font-bold text-accent-blue">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent-blue" />
                    Live
                  </span>
                </div>

                <div className="p-5">
                  {/* header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Social command centre</p>
                      <p className="text-[11px] text-muted-foreground">This week · all platforms</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold text-brand-text">
                      <Sparkle className="size-3" /> 98% on schedule
                    </span>
                  </div>

                  {/* content queue + engagement */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-card p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">
                          Content queue
                        </span>
                        <span className="rounded-full bg-accent-pink/10 px-2 py-0.5 text-[10px] font-bold text-accent-pink">
                          3 ready
                        </span>
                      </div>
                      <div className="mt-2.5 space-y-2">
                        {queue.map((q) => (
                          <div key={q.platform} className="rounded-lg bg-secondary/40 px-2.5 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: q.tone }}>
                                <span className="size-1.5 rounded-full" style={{ background: q.tone }} />
                                {q.platform}
                              </span>
                              <span className="rounded-full bg-background px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                                {q.status}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-[11px] font-semibold text-foreground">{q.hook}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-border bg-card p-3.5">
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="size-3.5 text-brand" />
                        <span className="text-xs font-semibold text-muted-foreground">Inbox</span>
                      </div>
                      <div className="mt-2.5 space-y-2">
                        {replies.map((r) => (
                          <div key={r.from} className="rounded-lg bg-secondary/40 px-2.5 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex items-center gap-1.5 truncate text-[11px] font-bold text-foreground">
                                <span className="size-1.5 shrink-0 rounded-full" style={{ background: r.tone }} />
                                <span className="truncate">{r.from}</span>
                              </span>
                              <span className="shrink-0 text-[9px] font-semibold text-muted-foreground">{r.time}</span>
                            </div>
                            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{r.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-rating/10 px-2.5 py-2 text-[10px] text-muted-foreground">
                        <Heart className="size-3 fill-current text-rating" />
                        <span className="font-bold text-foreground">2.3K</span> likes on this week&apos;s top post
                      </div>
                    </div>
                  </div>

                  {/* reach */}
                  <div className="mt-3 rounded-lg border border-border bg-card p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">Total reach · 30 days</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating">
                        <ArrowUpRight className="size-3" /> +18% vs prev
                      </span>
                    </div>
                    <div className="mt-2.5 space-y-2">
                      {reach.map((r) => (
                        <div key={r.label}>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                              <span className="size-1.5 rounded-full" style={{ background: r.color }} />
                              {r.label}
                            </span>
                            <span className="font-bold text-foreground">{r.value}</span>
                          </div>
                          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full" style={{ width: r.pct, background: r.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* floating decorative chips */}
              {floating.map((f) => (
                <div
                  key={f.label}
                  className={`hero-float absolute z-10 hidden rounded-lg px-2.5 py-1.5 text-xs font-bold shadow-sm lg:block ${f.pos}`}
                  style={{ background: f.bg, color: f.fg, animationDelay: f.delay }}
                >
                  {f.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}