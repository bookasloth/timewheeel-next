import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

export function WdTechStack() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Tech stack</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            What we build with, and why it matters
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Modern, well-supported tools — chosen for speed, security and the fact that any
            developer can pick them up after us. No obscure lock-in.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wd.techStack.map((g) => (
            <div key={g.group} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {g.group}
              </p>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm font-medium">
                    <span className="size-1.5 rounded-full bg-brand" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
