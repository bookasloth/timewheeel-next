import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

// About hero — full-bleed section on a clean white background. Copy on the
// left, the team/about photo on the right in a softly framed card.

const DOT_GRID = "radial-gradient(circle, rgba(15,17,17,0.06) 1px, transparent 1px)";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col justify-center overflow-hidden bg-background">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: DOT_GRID, backgroundSize: "26px 26px" }}
        />
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand/10 blur-[110px]" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-foreground/[0.04] blur-[100px]" />
      </div>

      <Reveal className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* copy */}
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand">
            <span className="size-1.5 rounded-full bg-brand" />
            About Timewheel
          </p>

          <h1 className="mt-6 text-[2.35rem] font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            <span className="block">We build digital</span>
            <span className="block">experiences that</span>
            <span className="block text-brand">move businesses forward.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            TIMEWHEEL is a digital design and development partner helping
            ambitious businesses build websites and digital experiences that
            are clear, modern, and built to grow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="btn btn-primary group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              Start a Project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#work"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              Explore Our Work
            </Link>
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-brand" />
              Established in 2019
            </span>
          </div>
        </div>

        {/* team photo */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            aria-hidden
            className="absolute -right-4 -top-4 h-full w-full rounded-[1.5rem] bg-brand/10"
          />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_50px_100px_-40px_rgba(15,17,17,0.3)] h-[380px] lg:h-[440px]">
            <Image
              src="/about.jpeg"
              alt="About Timewheel — our team and workspace"
              width={735}
              height={1102}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}