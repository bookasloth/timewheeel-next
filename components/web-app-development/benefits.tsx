import { Layers, Share2, Sparkles, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

const icons = [Workflow, Sparkles, Share2, Layers] as const;
const tints = [
  { wrap: "border-brand/20 bg-brand/10", chip: "bg-brand text-white" },
  { wrap: "border-accent-blue/20 bg-accent-blue/10", chip: "bg-accent-blue text-white" },
  { wrap: "border-accent-pink/20 bg-accent-pink/10", chip: "bg-accent-pink text-white" },
  { wrap: "border-rating/20 bg-rating/10", chip: "bg-rating text-white" },
] as const;

export function WaBenefits() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{wa.benefits.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          {wa.benefits.heading} <span className="text-brand">{wa.benefits.headingAccent}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wa.benefits.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {wa.benefits.cards.map((c, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={c.title} className="h-full">
              <div className={`group relative flex h-full flex-col rounded-2xl border p-7 transition-colors duration-300 md:p-9 ${tints[i].wrap}`}>
                <div className="relative flex-1">
                  <span className={`grid size-12 place-items-center rounded-2xl transition-colors group-hover:brightness-110 ${tints[i].chip}`}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight md:text-2xl">{c.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {c.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}