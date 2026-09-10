import type { ComponentType, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/digital-marketing/tilt-card";
import { rmServices, type RmService } from "@/lib/restaurant-marketing";
import { cn } from "@/lib/utils";

// ---- Shared "restaurant system" shells used by every service mock ----

function StatusPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold"
      style={{ color: accent }}
    >
      <span className="size-1.5 animate-pulse rounded-full" style={{ backgroundColor: accent }} />
      {label}
    </span>
  );
}

function Panel({
  label,
  status,
  accent,
  children,
}: {
  label: string;
  status: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-muted-foreground">{label}</span>
          <StatusPill label={status} accent={accent} />
        </div>
        {children}
      </div>
    </div>
  );
}

function Kpis({ items }: { items: Array<{ k: string; v: string; up?: string }> }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {items.map((s) => (
        <div key={s.k} className="rounded-lg bg-secondary/50 px-2 py-2">
          <p className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">{s.k}</p>
          <p className="flex items-baseline gap-1 text-sm font-extrabold text-foreground">
            {s.v}
            {s.up && <span className="text-[9px] font-bold text-rating">↑ {s.up}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}

function Meter({ rows }: { rows: Array<{ label: string; value: string; pct: string; color: string }> }) {
  return (
    <div className="mt-2.5 space-y-2">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">{r.label}</span>
            <span className="font-bold text-foreground">{r.value}</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full" style={{ width: r.pct, backgroundColor: r.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Trend({ color }: { color: string }) {
  return (
    <div className="mt-3 rounded-lg border border-border bg-secondary/20 p-2">
      <svg viewBox="0 0 120 34" className="h-8 w-full" fill="none" aria-hidden>
        <path
          d="M2 30 L28 26 L46 20 L64 22 L84 10 L118 6"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M2 30 L28 26 L46 20 L64 22 L84 10 L118 6"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.25"
          strokeDasharray="6 120"
          className="dm-meter"
        />
      </svg>
    </div>
  );
}

// ---- Per-service restaurant mock content ----

function SocialPanel({ accent }: { accent: string }) {
  return (
    <Panel label="Social media · Instagram feed" status="Posting" accent={accent}>
      <Kpis
        items={[
          { k: "Followers", v: "42K" },
          { k: "Reach", v: "96K" },
          { k: "Engage", v: "6.4%" },
        ]}
      />
      {/* mini food feed row */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["🍜", "🍕", "🍰"].map((d, i) => (
          <span
            key={i}
            className="grid aspect-square place-items-center rounded-lg text-3xl"
            style={{ backgroundColor: `${accent}16` }}
            aria-hidden
          >
            {d}
          </span>
        ))}
      </div>
      <Meter
        rows={[
          { label: "Reels", value: "78%", pct: "78%", color: accent },
          { label: "Stories", value: "52%", pct: "52%", color: "#ff4d93" },
        ]}
      />
    </Panel>
  );
}

function StrategyPanel({ accent }: { accent: string }) {
  return (
    <Panel label="Marketing strategy · Roadmap" status="On track" accent={accent}>
      <Kpis
        items={[
          { k: "Channels", v: "5" },
          { k: "KPI target", v: "92%" },
          { k: "Budget", v: "₹40K" },
        ]}
      />
      <div className="mt-3 space-y-1.5">
        {[
          { label: "Local discovery", pct: "84%", w: "84%" },
          { label: "Paid visibility", pct: "62%", w: "62%" },
          { label: "Bookings pipeline", pct: "73%", w: "73%" },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2.5">
            <span className="w-32 shrink-0 text-[11px] text-muted-foreground">{r.label}</span>
            <span className="flex-1 h-1.5 overflow-hidden rounded-full bg-secondary">
              <span
                className="block h-full rounded-full"
                style={{ width: r.w, backgroundColor: accent }}
              />
            </span>
            <span className="text-[10px] font-bold text-foreground">{r.pct}</span>
          </div>
        ))}
      </div>
      <Trend color={accent} />
    </Panel>
  );
}

function ContentPanel({ accent }: { accent: string }) {
  return (
    <Panel label="Content studio · Publishing" status="Published" accent={accent}>
      <Kpis
        items={[
          { k: "Pieces", v: "32" },
          { k: "Reach", v: "84K" },
          { k: "Save rate", v: "14%" },
        ]}
      />
      <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-2.5">
        <div className="flex items-center gap-2 text-[11px] font-bold text-foreground">
          <span className="text-lg" aria-hidden>🍲</span>
          The story behind our 8-hour bone broth
          <span className="ml-auto rounded-[4px] border border-border px-1.5 text-[9px] font-bold uppercase text-muted-foreground/60">
            Draft
          </span>
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          Showcasing craft, origin, and craving — content that builds trust.
        </p>
      </div>
      <Meter
        rows={[
          { label: "Photography", value: "80%", pct: "80%", color: accent },
          { label: "Storytelling", value: "66%", pct: "66%", color: "#269cef" },
        ]}
      />
    </Panel>
  );
}

function CreativePanel({ accent }: { accent: string }) {
  return (
    <Panel label="Creative · Campaign concepts" status="In production" accent={accent}>
      <Kpis
        items={[
          { k: "Concepts", v: "8" },
          { k: "CTR", v: "4.9%" },
          { k: "CPC", v: "₹9" },
        ]}
      />
      {/* moodboard tiles */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { emoji: "🍷", tint: `${accent}30` },
          { emoji: "✨", tint: "#ffcc1c30" },
          { emoji: "🎨", tint: "#269cef30" },
        ].map((t, i) => (
          <span
            key={i}
            className="grid aspect-[4/3] place-items-center rounded-lg text-2xl"
            style={{ backgroundColor: t.tint }}
            aria-hidden
          >
            {t.emoji}
          </span>
        ))}
      </div>
      <Meter
        rows={[
          { label: "Brand consistency", value: "92%", pct: "92%", color: accent },
          { label: "Ad recall", value: "71%", pct: "71%", color: "#ffcc1c" },
        ]}
      />
    </Panel>
  );
}

function VideoPanel({ accent }: { accent: string }) {
  return (
    <Panel label="Video · Editing timeline" status="Rendering" accent={accent}>
      <Kpis
        items={[
          { k: "Clips", v: "56" },
          { k: "Views", v: "210K" },
          { k: "Watch time", v: "68%" },
        ]}
      />
      {/* filmstrip + timeline */}
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {["🥗", "🍜", "🍰", "🍹"].map((d, i) => (
          <span
            key={i}
            className="grid aspect-video place-items-center rounded-md text-lg"
            style={{ backgroundColor: `${accent}16` }}
            aria-hidden
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex h-1.5 w-full items-center gap-0.5 overflow-hidden rounded-full bg-secondary">
        {[40, 60, 45, 75, 90, 55, 80].map((h, i) => (
          <span
            key={i}
            className="h-full flex-1 rounded-sm"
            style={{ backgroundColor: i % 2 === 0 ? accent : "#269cef" }}
          />
        ))}
      </div>
    </Panel>
  );
}

function WebPanel({ accent }: { accent: string }) {
  return (
    <Panel label="Web design · Restaurant site" status="Optimized" accent={accent}>
      <Kpis
        items={[
          { k: "Load", v: "0.9s" },
          { k: "Bookings", v: "+38%" },
          { k: "SEO", v: "92" },
        ]}
      />
      {/* browser mockup */}
      <div className="mt-3 overflow-hidden rounded-lg border border-border bg-secondary/30">
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-2.5 py-1.5">
          <span className="size-1.5 rounded-full bg-accent-pink" />
          <span className="size-1.5 rounded-full bg-accent-yellow" />
          <span className="size-1.5 rounded-full bg-accent-blue" />
          <span className="ml-1.5 flex-1 truncate rounded-md bg-background px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
            spicehaven.in/reserve
          </span>
        </div>
        <div className="flex items-center gap-3 p-3">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-lg text-3xl"
            style={{ backgroundColor: `${accent}1a` }}
            aria-hidden
          >
            🍽️
          </span>
          <div className="flex-1 space-y-1.5">
            <span className="block h-2 w-3/4 rounded-full bg-foreground/20" />
            <span className="block h-2 w-1/2 rounded-full bg-foreground/10" />
          </div>
          <span
            className="rounded-md px-2.5 py-1 text-[10px] font-bold text-brand-foreground"
            style={{ backgroundColor: accent }}
          >
            Reserve
          </span>
        </div>
      </div>
      <Meter
        rows={[
          { label: "Mobile experience", value: "96%", pct: "96%", color: accent },
          { label: "Load speed", value: "88%", pct: "88%", color: "#4ab765" },
        ]}
      />
    </Panel>
  );
}

function ResearchPanel({ accent }: { accent: string }) {
  return (
    <Panel label="Market research · Insights" status="Live" accent={accent}>
      <Kpis
        items={[
          { k: "Signals", v: "1.2K" },
          { k: "Accuracy", v: "94%" },
          { k: "Cost", v: "-28%" },
        ]}
      />
      <div className="mt-3 space-y-1.5 text-[11px]">
        {[
          { k: "Trending cuisine", v: "Coastal Thali", pct: "86p" },
          { k: "Local demand", v: "High density", pct: "74p" },
          { k: "Price sweet spot", v: "₹350–₹550", pct: "69p" },
        ].map((r) => (
          <div key={r.k} className="flex items-center justify-between rounded-md border border-border bg-secondary/30 px-2.5 py-1.5">
            <span className="text-muted-foreground">{r.k}</span>
            <span className="font-bold text-foreground">{r.v}</span>
          </div>
        ))}
      </div>
      <Trend color={accent} />
    </Panel>
  );
}

const servicesVisual: Record<string, ComponentType<{ accent: string }>> = {
  "Social Media Marketing": SocialPanel,
  "Digital Marketing Strategy": StrategyPanel,
  "Engaging Content Creation": ContentPanel,
  "Creative Solutions": CreativePanel,
  "Video Recording & Editing": VideoPanel,
  "Web Design & Development": WebPanel,
  "Digital Market Research": ResearchPanel,
};

function ServiceVisual({ service }: { service: RmService }) {
  const Visual = servicesVisual[service.title] ?? SocialPanel;
  return (
    <TiltCard max={5}>
      <Visual accent={service.accent} />
    </TiltCard>
  );
}

export function RmServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          What we do
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Top Restaurant Marketing Services and Solutions
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Running a successful restaurant brand requires more than great food;
          it demands a strong digital marketing strategy to attract new
          customers. As a full-service restaurant marketing agency, we offer
          tailored solutions to maximize your brand&apos;s potential and drive
          actual results.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:space-y-20">
        {rmServices.map((service, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={service.title}>
              <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-12">
                <div className={cn("relative", flip && "md:order-2")}>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black leading-none tracking-tight text-muted-foreground/20 transition-colors duration-300 group-hover:text-brand/30 md:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p
                    className="mt-4 text-xs font-bold uppercase tracking-widest"
                    style={{ color: service.accent }}
                  >
                    {service.tag}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-muted-foreground">{service.body}</p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: service.accent }}
                  >
                    Discuss this service
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                <div className={cn(flip && "md:order-1")}>
                  <ServiceVisual service={service} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
