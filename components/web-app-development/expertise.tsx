import { ArrowUpRight, Blocks, Cloud, Database, Palette, Server, Webhook } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

const icons = [Palette, Server, Webhook, Database, Cloud, Blocks] as const;
const chips = [
  { c: "bg-brand/10 text-brand", h: "group-hover:bg-brand group-hover:text-white" },
  { c: "bg-accent-blue/10 text-accent-blue", h: "group-hover:bg-accent-blue group-hover:text-white" },
  { c: "bg-accent-pink/10 text-accent-pink", h: "group-hover:bg-accent-pink group-hover:text-white" },
  { c: "bg-rating/10 text-rating", h: "group-hover:bg-rating group-hover:text-white" },
  { c: "bg-accent-yellow/25 text-navy", h: "group-hover:bg-accent-yellow group-hover:text-navy" },
  { c: "bg-wairis/10 text-wairis", h: "group-hover:bg-wairis group-hover:text-white" },
] as const;

export function WaExpertise() {
  return (
    <section className="border-t border-border/60 bg-walilac">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">{wa.expertise.label}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            {wa.expertise.heading} <span className="text-brand">{wa.expertise.headingAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wa.expertise.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wa.expertise.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={c.title} className="h-full">
                <div className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${chips[i].c} transition-colors ${chips[i].h}`}>
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-tight">{c.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-brand" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}