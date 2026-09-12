import {
  Globe, ShoppingCart, LayoutDashboard, FileText, RefreshCw, Wrench,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

const icons = [Globe, ShoppingCart, LayoutDashboard, FileText, RefreshCw, Wrench] as const;

export function WdServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">What we build</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Websites and web apps for every stage
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
          From a first business website to a custom platform — one team, one standard,
          one point of contact.
        </p>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wd.services.map((s, i) => {
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
    </section>
  );
}
