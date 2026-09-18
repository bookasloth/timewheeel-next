import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

function monogram(name: string) {
  // Two-letter mark: X stays "X", the rest take the first two significant letters.
  const map: Record<string, string> = {
    Instagram: "Ig",
    Facebook: "Fb",
    LinkedIn: "In",
    YouTube: "Yt",
    X: "X",
  };
  return map[name] ?? name.slice(0, 2);
}

export function SmmPlatforms() {
  const rows = smm.platforms.items;
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
              <span className="size-1.5 rounded-full bg-brand" />
              {smm.platforms.label}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              {smm.platforms.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground md:text-lg">{smm.platforms.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {rows.map((p) => (
              <div key={p.name} className="group relative flex flex-col overflow-hidden bg-card p-7 transition-colors hover:bg-secondary/40">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: p.tone }}
                />
                <span
                  className="grid size-11 place-items-center rounded-xl text-sm font-black tracking-tight text-white shadow-sm"
                  style={{ background: p.chip }}
                >
                  {monogram(p.name)}
                </span>
                <p className="mt-5 flex items-center gap-2 text-base font-bold">
                  {p.name}
                  <span className="size-1.5 rounded-full" style={{ background: p.tone }} />
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}