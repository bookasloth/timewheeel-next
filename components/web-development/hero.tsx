import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";
import { SiteAudit } from "@/components/web-development/site-audit";

export function WdHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
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

      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-8 md:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {wd.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.06] tracking-tight md:text-5xl lg:text-[3.4rem]">
              <span className="text-navy">{wd.hero.h1a}</span>{" "}
              <span
                className="dm-gradient-text"
                style={{ backgroundImage: "linear-gradient(90deg, #fe5100, #ff4d93, #ffcc1c, #fe5100)" }}
              >
                {wd.hero.h1b}
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {wd.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={wd.hero.primaryCta.href}
                className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
              >
                {wd.hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={wd.hero.secondaryCta.href}
                className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              >
                {wd.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-6 text-[13px] font-semibold text-muted-foreground">
              {wd.hero.trustLine}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <SiteAudit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
