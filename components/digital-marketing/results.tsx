import { Reveal } from "@/components/reveal";
import {
  GaugeIllo,
  RadarIllo,
  SignalBars,
} from "@/components/digital-marketing/dm-illustrations";
import { dmMetrics } from "@/lib/digital-marketing";

export function DmResults() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-navy text-white">
      {/* subtle dot grid + drifting glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <RadarIllo className="pointer-events-none absolute -right-6 -top-4 hidden h-48 w-48 text-rating/25 lg:block" />
      <GaugeIllo className="pointer-events-none absolute -left-6 bottom-6 hidden h-28 w-40 text-brand/35 lg:block" />
      <SignalBars className="dm-drift pointer-events-none absolute right-1/4 top-14 hidden size-10 text-white/15 lg:block" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Measurement
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            The Metrics That Make Marketing Meaningful
          </h2>
          <p className="mt-4 text-white/70 md:text-lg">
            Every campaign is measured against the numbers that actually move
            your business forward.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {dmMetrics.map((m) => (
            <article
              key={m.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <span
                aria-hidden
                className="block h-1 w-8 rounded-full transition-all duration-300 group-hover:w-12"
                style={{ backgroundColor: m.accent }}
              />
              <h3 className="mt-5 text-lg font-bold text-white">{m.label}</h3>
              <p className="mt-1.5 text-sm text-white/55">{m.value}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}