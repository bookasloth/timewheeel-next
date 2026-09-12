import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

export function WdIndustries() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Industries we build for
          </h2>
        </Reveal>
        <Reveal stagger className="mt-8 flex flex-wrap justify-center gap-3">
          {wd.industries.map((it) => (
            <span
              key={it}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
            >
              {it}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
