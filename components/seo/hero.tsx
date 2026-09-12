import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";
import { SeoAudit } from "@/components/seo/seo-audit";

export function SeoHero() {
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
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">{seo.hero.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.06] tracking-tight md:text-5xl lg:text-[3.4rem]">
              <span className="text-navy">{seo.hero.h1a}</span>{" "}
              <span
                className="dm-gradient-text"
                style={{ backgroundImage: "linear-gradient(90deg, #fe5100, #ff4d93, #ffcc1c, #fe5100)" }}
              >
                {seo.hero.h1b}
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {seo.hero.sub}
            </p>
            <p className="mt-6 text-[13px] font-semibold text-muted-foreground">{seo.hero.trustLine}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <SeoAudit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
