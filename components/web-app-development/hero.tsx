import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

export function WaHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-brand/10" />
        <div className="absolute -right-20 top-10 size-64 rounded-full bg-accent-blue/10" />
        <div className="absolute left-1/3 top-1/2 size-56 rounded-full bg-accent-pink/10" />
        <div className="absolute -bottom-10 right-1/4 size-44 rounded-full bg-accent-yellow/20" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-8 md:pb-20 md:pt-12">
        {/* marketing content */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand backdrop-blur">
            {wa.hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-navy">{wa.hero.headingA}</span>{" "}
            <span className="text-brand">for the way</span>
            <br />
            <span className="text-navy">your business works.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {wa.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={wa.hero.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              {wa.hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={wa.hero.secondaryCta.href}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              {wa.hero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}