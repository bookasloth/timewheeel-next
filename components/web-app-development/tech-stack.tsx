import { Cloud, Database, GitBranch, Palette, Server, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

const icons = [Palette, Server, Database, Cloud, Workflow, GitBranch] as const;
const chips = [
  { c: "bg-brand/10 text-brand", n: "bg-brand text-white" },
  { c: "bg-accent-blue/10 text-accent-blue", n: "bg-accent-blue text-white" },
  { c: "bg-accent-pink/10 text-accent-pink", n: "bg-accent-pink text-white" },
  { c: "bg-rating/10 text-rating", n: "bg-rating text-white" },
  { c: "bg-accent-yellow/25 text-navy", n: "bg-accent-yellow text-navy" },
  { c: "bg-wairis/10 text-wairis", n: "bg-wairis text-white" },
] as const;

export function WaTechStack() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{wa.tech.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          {wa.tech.heading} <span className="text-brand">{wa.tech.headingAccent}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wa.tech.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wa.tech.groups.map((g, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={g.name} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-brand/25">
                <div className="flex items-center justify-between">
                  <span className={`grid size-10 place-items-center rounded-xl ${chips[i].c}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className={`grid size-8 place-items-center rounded-lg text-xs font-bold ${chips[i].n}`}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight">{g.name}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}