import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { sd } from "@/lib/shopify-development";

export function SdHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-brand/10" />
        <div className="absolute -right-20 top-10 size-64 rounded-full bg-accent-blue/10" />
        <div className="absolute left-1/3 top-1/2 size-56 rounded-full bg-accent-pink/10" />
        <div className="absolute -bottom-10 right-1/4 size-44 rounded-full bg-accent-yellow/20" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand/40" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 md:grid-cols-2 md:pb-20 md:pt-12">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand backdrop-blur">
            <BadgeCheck className="size-3.5" />
            {sd.hero.eyebrow}
          </span>
          <RevealHeading as="h1" className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-navy">{sd.hero.headingA}</span>{" "}
            <span className="text-brand">{sd.hero.headingAccent}</span>
          </RevealHeading>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {sd.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={sd.hero.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              {sd.hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={sd.hero.secondaryCta.href}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              {sd.hero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <Image
              src="/hero/shopify.png"
              alt="Shopify development by Timewheel"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 right-4 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-md">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-white">
              <ShoppingBag className="size-5" />
            </span>
            <span className="text-sm font-bold leading-tight">{sd.hero.badge}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
