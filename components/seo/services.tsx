import { MapPin, Wrench, FileText, Building2, ShoppingCart, Bot } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

const icons = [MapPin, Wrench, FileText, Building2, ShoppingCart, Bot] as const;

export function SeoServices() {
  return (
    <section id="services" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">What we do</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            SEO that covers classic search and AI search
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Six disciplines, one connected strategy — so you show up wherever your Nagpur
            customers are looking.
          </p>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seo.services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
