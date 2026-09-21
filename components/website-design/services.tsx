import { Check, Plus } from "lucide-react";
import { palette, wd } from "@/lib/website-design";
import { cn } from "@/lib/utils";

const accents = [palette.blue, palette.purple, palette.orange, palette.green];

export function WdServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-wblue">{wd.services.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">{wd.services.title}</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">{wd.services.body}</p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {wd.services.included.map((s, i) => (
              <div key={s.name} className="h-full">
                <div className="group flex h-full items-start gap-4 bg-white p-5 transition-colors duration-300 hover:bg-wsoft">
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: accents[i % accents.length] }}
                  >
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">{s.name}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="flex h-full flex-col rounded-2xl border border-wpurple/25 bg-gradient-to-b from-wpurple/[0.06] to-transparent p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-wpurple">Also available</p>
            <ul className="mt-4 space-y-3.5">
              {wd.services.optional.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm font-semibold text-foreground/85">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: palette.purple }}>
                    <Plus className="size-4" strokeWidth={2.5} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <div className={cn("mt-auto border-t border-border/70 pt-5")}>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Tell us what your business needs, we&apos;ll scope the right add-ons, and only the ones worth paying for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}