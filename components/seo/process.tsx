import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";
import { RevealHeading } from "@/components/anim/reveal-heading";

// One accent per step, from the same palette as the rest of the page.
const ACCENTS = ["#269CEF", "#4AB765", "#FF4D93", "#8B5CF6", "#FE5100"] as const;

export function SeoProcess() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">How we work</p>
        <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.process.title}</RevealHeading>
      </Reveal>
      <Reveal stagger className="mt-12">
        {/* Five steps will not fit legibly on a phone, so below md the strip
            scrolls sideways; from md up it is a plain five-column row. */}
        <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0">
          <ol className="relative grid min-w-[42rem] grid-cols-5 gap-5">
            {/* Spine on the node row, inset by half a node at each end so it
                never overhangs the first or last marker. */}
            <span
              aria-hidden
              className="absolute left-[1.125rem] right-[1.125rem] top-[1.125rem] h-0.5 rounded-full bg-border"
            />
            {seo.process.steps.map((s, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <li key={s.title} className="relative">
                  <span
                    className="relative z-10 grid size-9 place-items-center rounded-full text-xs font-black ring-4 ring-background"
                    style={{ backgroundColor: `${accent}1a`, color: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
