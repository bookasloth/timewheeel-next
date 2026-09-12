import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

export function SeoDeliverables() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Deliverables</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.deliverables.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{seo.deliverables.body}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {seo.deliverables.items.map((it) => (
            <div key={it.k} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold">{it.k}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.v}</p>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <p className="mt-6 text-sm text-muted-foreground">
            Want to see it now? Run the free audit at the top of this page — that scorecard is
            exactly what every engagement starts with.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
