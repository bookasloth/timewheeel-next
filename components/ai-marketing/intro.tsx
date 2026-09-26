import { Reveal } from "@/components/reveal";
import { aimIntroSteps } from "@/lib/ai-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";

const colors = ["#8b5cf6", "#269cef", "#4ab765", "#ff4d93", "#ffcc1c", "#fe5100"];
const widths = ["100%", "78%", "58%", "40%"];

function FunnelVisual() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          The automation path we build for your business
        </p>
        <ol className="mt-7 space-y-3">
          {aimIntroSteps.map((s, i) => (
            <li key={s.step} className="group relative flex gap-4">
              {i < aimIntroSteps.length - 1 && (
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
                    stroke="#8b5cf6"
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
              <div className="flex-1 rounded-xl border border-border bg-secondary/40 px-4 py-3.5 transition-all duration-300 hover:border-brand/30 hover:bg-secondary/70">
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

export function AimIntro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
              Why AI marketing with us
            </p>
            <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Best AI Marketing Company in Nagpur
            </RevealHeading>
            <p className="mt-5 text-muted-foreground md:text-lg">
              Based in Nagpur, we help businesses put AI to work across their
              marketing, automating the repetitive, sharpening the targeting,
              and freeing your team to focus on growth, all under one roof and
              fully in your control.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <FunnelVisual />
        </Reveal>
      </div>
    </section>
  );
}
