import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

// The difference between posting and presence, as a scannable pillar list.
export function SmmIntro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
              <span className="size-1.5 rounded-full bg-brand" />
              {smm.intro.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              {smm.intro.heading}
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">{smm.intro.body}</p>
            <p className="mt-5 text-sm text-muted-foreground">
              That&apos;s the gap Timewheel closes, with a working system, not a
              content calendar full of guesses.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <p className="flex items-center gap-2 border-b border-border bg-secondary/50 px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="h-2 w-2 rounded-full bg-accent-pink" />
              <span className="h-2 w-2 rounded-full bg-accent-yellow" />
              <span className="ml-1">What changes when social becomes a system</span>
            </p>
            <ul className="divide-y divide-border/60 px-6">
              {smm.intro.pillars.map((p) => (
                <li key={p.title} className="group flex items-center gap-4 py-3.5">
                  <span
                    className="grid size-7 shrink-0 place-items-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${p.tone}1a`, color: p.tone }}
                  >
                    <Check className="size-4" strokeWidth={2.4} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}