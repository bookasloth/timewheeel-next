import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

// Addresses the #1 unspoken fear of Indian SMB web buyers: lock-in / being stranded.
export function WdOwnership() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            No lock-in
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            {wd.ownership.title}
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">{wd.ownership.body}</p>
          <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6">
            <h3 className="font-bold">{wd.ownership.amc.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {wd.ownership.amc.body}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-7 md:p-9">
          <ul className="space-y-4">
            {wd.ownership.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm font-medium md:text-base">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-rating/10 text-rating">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
