import { Reveal } from "@/components/reveal";
import { rmIntroSteps } from "@/lib/restaurant-marketing";

const colors = ["#fe5100", "#269cef", "#4ab765", "#ff4d93"];
const widths = ["100%", "86%", "72%", "58%"];

// Premium vertical diner-journey framework connected by an editorial spine.
function JourneyVisual() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          The diner journey we grow
        </p>
        <ol className="mt-7 space-y-3">
          {rmIntroSteps.map((s, i) => (
            <li key={s.step} className="group relative flex gap-4">
              {i < rmIntroSteps.length - 1 && (
                <svg
                  aria-hidden
                  className="absolute left-[21px] top-[52px] h-[calc(100%-2rem)] w-[3px]"
                >
                  <line
                    x1="1.5"
                    y1="0"
                    x2="1.5"
                    y2="100%"
                    stroke="#c9cbd2"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="3 8"
                  />
                  <line
                    x1="1.5"
                    y1="0"
                    x2="1.5"
                    y2="100%"
                    stroke="#fe5100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="24 200"
                    className="dm-flow opacity-40"
                  />
                </svg>
              )}
              <span className="relative z-10 grid size-[42px] shrink-0 place-items-center rounded-full border border-border bg-card transition-all duration-300 group-hover:border-brand/40">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[i] }} />
              </span>
              <div className="flex-1 rounded-xl border border-border bg-secondary/40 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-secondary/70">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-bold">{s.step}</p>
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.note}</p>
                <span className="mt-3 block h-1 w-full overflow-hidden rounded-full bg-border/70">
                  <span
                    className="block h-full rounded-full transition-all duration-500"
                    style={{ width: widths[i], backgroundColor: colors[i] }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function RmIntro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Why restaurant marketing with us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Restaurant Marketing Agency with Top Social Media and Digital
              Marketing Services
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              Suppose you want to attract more customers, increase walk-ins
              through optimized local SEO, or get more table bookings via
              high-performing paid ads. In that case, you&apos;re exactly where
              you need to be because we&apos;re the top digital marketing agency
              for restaurants across India.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <JourneyVisual />
        </Reveal>
      </div>
    </section>
  );
}