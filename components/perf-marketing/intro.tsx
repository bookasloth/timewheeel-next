import { Reveal } from "@/components/reveal";

const pmIntroSteps = [
  { step: "Business", note: "Your goals, audience & market" },
  { step: "Strategy", note: "Where SEO, ads & content move the needle" },
  { step: "Campaigns", note: "Search, social & paid running together" },
  { step: "Leads", note: "Qualified enquiries, tracked and reported" },
];

const colors = ["#ffcc1c", "#f59e0b", "#eab308", "#fb923c", "#ffcc1c", "#ea580c"];
const widths = ["100%", "78%", "58%", "40%"];

function FunnelVisual() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          The growth path we build for your business
        </p>
        <ol className="mt-7 space-y-3">
          {pmIntroSteps.map((s, i) => (
            <li key={s.step} className="group relative flex gap-4">
              {i < pmIntroSteps.length - 1 && (
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
                    stroke="#ffcc1c"
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

export function PmIntro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
              Why digital marketing with us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Best Digital Marketing Company in Nagpur
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              Based in Nagpur, we help businesses grow online with SEO, paid
              ads, social, and content working together, all managed under one
              roof so your marketing pulls in one direction.
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
