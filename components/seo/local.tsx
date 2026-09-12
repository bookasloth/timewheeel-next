import { MapPin, Languages, Locate } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

const icons = [Locate, Languages, MapPin] as const;

export function SeoLocal() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Local expertise</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.local.title}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{seo.local.body}</p>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {seo.local.cards.map((c, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
