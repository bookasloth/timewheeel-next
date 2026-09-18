import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { AiHeroFlow } from "./hero-flow";

export function AiHero() {
  const { hero } = aiAuto;
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-brand/10" />
        <div className="absolute right-1/4 top-1/3 size-56 rounded-full bg-accent-blue/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand/40" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-8 md:grid-cols-2 md:pb-20 md:pt-12">
        {/* Left: copy */}
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-text backdrop-blur">
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-navy">{hero.headingA}</span>
            <br />
            <span className="text-brand">{hero.headingB}</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">{hero.answer}</p>
          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {hero.trustLine.split(" · ").map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle weight="fill" className="size-4 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: automation flow (nodes stagger in sequence) */}
        <div className="w-full">
          <AiHeroFlow />
        </div>
      </div>
    </section>
  );
}
