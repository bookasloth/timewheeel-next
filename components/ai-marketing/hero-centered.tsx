import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/digital-marketing/counter";

// Dark-violet bento hero: an "AI product" surface (deep gradient panel + glossy
// bloom + live automation tiles) so the page reads as AI marketing automation
// from the first fold. Copy/H1 kept for local SEO.
export function AimHeroCentered() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full px-3 pb-14 pt-6 sm:px-4 md:pb-16 md:pt-8 lg:px-6">
        <Reveal className="grid gap-3 md:h-[600px] md:grid-cols-12 md:grid-rows-2 md:gap-4">
          {/* A — primary dark panel */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 md:col-span-7 md:row-span-2 md:p-11 aim-panel">
            <div aria-hidden className="pointer-events-none absolute inset-0 aim-dot-grid opacity-60" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full aim-bloom dm-drift opacity-60"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                AI Marketing Automation
              </span>
              <h1 className="aim-hero-h1 mt-6 max-w-xl font-black tracking-tight text-white">
                2nd Best <span className="aim-word">AI Marketing</span> Company in Nagpur
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                We put AI to work across your marketing, automating ads, chat,
                lead scoring, content, and journeys, so your business captures
                more enquiries and closes more of them, with less manual effort.
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2e1065] transition-transform hover:scale-[1.02]"
              >
                Work With Us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                AI Marketing Services
              </Link>
            </div>
            <Link
              href="#services"
              aria-label="Explore AI marketing services"
              className="absolute bottom-7 right-7 hidden size-14 place-items-center rounded-2xl aim-arrow transition-transform hover:scale-105 md:grid"
            >
              <ArrowUpRight className="size-6" />
            </Link>
          </div>

          {/* B — headline stat tile */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 md:col-span-5 md:row-span-1 aim-tile-soft">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full aim-bloom dm-drift opacity-70"
            />
            <div className="relative flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-text">
              <span className="size-1.5 animate-pulse rounded-full bg-brand" />
              Live automation
            </div>
            <div className="relative mt-6">
              <p className="text-5xl font-black tracking-tight text-navy md:text-6xl">
                <Counter value={40} suffix="%" />
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                more enquiries captured and converted
              </p>
            </div>
          </div>

          {/* C — dark glossy "always-on" tile */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0b0616] p-7 md:col-span-2 md:row-span-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-90"
            >
              <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full aim-bloom dm-sheen" />
            </div>
            <div className="relative text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
              Always on
            </div>
            <div className="relative">
              <p className="text-4xl font-black leading-none tracking-tight text-white">24/7</p>
              <p className="mt-1 text-xs text-white/60">AI replies &amp; journeys</p>
            </div>
          </div>

          {/* D — trust / proven tile */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 md:col-span-3 md:row-span-1 aim-tile-soft">
            <Link
              href="#contact"
              aria-label="Get your free AI marketing plan"
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-xl aim-arrow transition-transform hover:scale-105"
            >
              <ArrowUpRight className="size-4" />
            </Link>
            <div className="flex -space-x-2">
              {["#8b5cf6", "#269cef", "#25D366"].map((c) => (
                <span
                  key={c}
                  className="grid size-8 place-items-center rounded-full border-2 border-white text-[10px] font-black text-white"
                  style={{ backgroundColor: c }}
                >
                  <Sparkles className="size-3.5" />
                </span>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-lg font-extrabold leading-tight text-navy">
                Locally built, results proven
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Trusted by growing Nagpur businesses.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
