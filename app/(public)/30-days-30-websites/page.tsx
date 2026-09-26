import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ChallengeForm } from "@/components/challenge/challenge-form";
import { WebsitesShowcase } from "@/components/challenge/websites-showcase";
import { CraftScroll } from "@/components/challenge/craft-scroll";
import { site } from "@/lib/site";
import { Sparkles, PencilRuler, Rocket, Check } from "lucide-react";

const TITLE = "30 Days, 30 Websites Challenge";
const DESC =
  "I'm building 30 websites in 30 days. Pay what you want, even ₹0. Fill the form, name your price, and get a real website of your own.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE}, Timewheel` },
  description: DESC,
  openGraph: { type: "website", title: TITLE, description: DESC, siteName: "Timewheel" },
  alternates: { canonical: "/30-days-30-websites" },
};

// Public "spots filled" counter. No DB. Bump FILLED by hand as signups land.
// ponytail: manual count; wire to a real store only if you want it live/auto.
const TOTAL = 30;
const FILLED = 12;

// Social-proof avatars for the "already joined" row (initials + accent tint).
const avatars = [
  { i: "AK", c: "bg-brand" },
  { i: "PS", c: "bg-accent-blue" },
  { i: "RV", c: "bg-accent-pink" },
  { i: "MN", c: "bg-rating" },
];

const trust = [
  { v: "48h", k: "First draft" },
  { v: "100%", k: "You own it" },
  { v: "₹0", k: "Minimum" },
];

const perks = [
  "A real, live website you fully own: code, domain, everything.",
  "Pay what you want. Free is genuinely welcome.",
  "First come, first built. Only 30 spots.",
];

const steps = [
  {
    icon: PencilRuler,
    title: "Fill the form",
    body: "Your name, contact, what the site is for, and what you want it to do. Takes two minutes.",
  },
  {
    icon: Sparkles,
    title: "Name your price",
    body: "Pay what you want, ₹0 to anything. The goal is a website for everyone, not the money.",
  },
  {
    icon: Rocket,
    title: "Get your website",
    body: "You get added to the challenge. I build it, you review, and it goes live. One of the 30.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: TITLE,
  description: DESC,
  url: `${site.url}/30-days-30-websites`,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  organizer: { "@type": "Organization", name: site.name, url: site.url },
};

export default function ChallengePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-x-clip border-b border-border/60 bg-secondary/40">
        {/* Floating doodle tiles: playful "we build for the web" cue. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="wd-float absolute left-[4%] top-[18%] size-[130px] opacity-90 xl:size-[160px]" style={{ ["--float-delay" as string]: "0s" }}>
            <Image alt="" src="/web-dev/hero-1.png" fill sizes="160px" className="object-contain" />
          </div>
          <div className="wd-float absolute right-[3%] top-[12%] size-[140px] opacity-90 xl:size-[180px]" style={{ ["--float-delay" as string]: "1.2s" }}>
            <Image alt="" src="/web-dev/hero-3.png" fill sizes="180px" className="object-contain" />
          </div>
          <div className="wd-float absolute bottom-[8%] left-[9%] size-[120px] opacity-90 xl:size-[150px]" style={{ ["--float-delay" as string]: "0.6s" }}>
            <Image alt="" src="/web-dev/hero-5.png" fill sizes="150px" className="object-contain" />
          </div>
          <div className="wd-float absolute bottom-[6%] right-[8%] size-[120px] opacity-90 xl:size-[150px]" style={{ ["--float-delay" as string]: "1.8s" }}>
            <Image alt="" src="/web-dev/hero-4.png" fill sizes="150px" className="object-contain" />
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              30 days · 30 websites
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
              Everyone deserves a website. <span className="text-brand">Yours is next.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              I&apos;m building 30 websites in 30 days. List yourself, name your price (even ₹0), and
              get a real website you own. That&apos;s the whole idea.
            </p>
            <div className="mx-auto mt-9 max-w-md">
              <div className="flex items-baseline justify-between text-sm font-semibold">
                <span><span className="text-brand">{FILLED}</span> / {TOTAL} spots filled</span>
                <span className="text-muted-foreground">{TOTAL - FILLED} left</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-brand/15">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${Math.round((FILLED / TOTAL) * 100)}%` }}
                />
              </div>
            </div>
            <a
              href="#join"
              className="btn btn-primary mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Claim your spot
            </a>
          </Reveal>
        </div>
      </section>

      <WebsitesShowcase />

      {/* How it works */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <s.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{i + 1}. {s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CraftScroll />

      {/* Join */}
      <section id="join" className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-5">
            <Reveal className="lg:sticky lg:top-24 lg:col-span-2 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                Join the challenge
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                List yourself for a website
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
                Founders, freelancers, students, small shops, anyone. Fill this out and you&apos;re in
                line for one of the 30. Pay what feels right.
              </p>

              {/* Live spots card */}
              <div className="mt-8 max-w-md rounded-2xl border border-border bg-card p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold">Spots filled</span>
                  <span className="text-sm font-bold">
                    <span className="text-brand">{FILLED}</span>
                    <span className="text-muted-foreground"> / {TOTAL}</span>
                  </span>
                </div>
                <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-brand/15">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${Math.round((FILLED / TOTAL) * 100)}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {avatars.map((a) => (
                      <span
                        key={a.i}
                        className={`grid size-8 place-items-center rounded-full border-2 border-card text-[11px] font-bold text-white ${a.c}`}
                      >
                        {a.i}
                      </span>
                    ))}
                    <span className="grid size-8 place-items-center rounded-full border-2 border-card bg-secondary text-[11px] font-bold text-foreground">
                      +{FILLED - avatars.length}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    already claimed their spot. <span className="font-semibold text-brand-text">{TOTAL - FILLED} left</span>
                  </span>
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
                {trust.map((t) => (
                  <div key={t.k} className="rounded-xl border border-border bg-card px-3 py-3.5 text-center">
                    <div className="text-lg font-extrabold text-brand">{t.v}</div>
                    <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{t.k}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 max-w-md space-y-2.5 text-sm text-muted-foreground">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-rating" strokeWidth={2.4} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-3">
              <ChallengeForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
