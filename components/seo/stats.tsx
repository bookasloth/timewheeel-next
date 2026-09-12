import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

export function SeoStats() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Reveal stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {seo.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black tracking-tight text-foreground md:text-4xl">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
