import type { ComponentType, ReactNode } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/digital-marketing/tilt-card";
import { aimServices, type AimService } from "@/lib/ai-marketing";
import { cn } from "@/lib/utils";

// ---- Shared "product system" shells used by every service mock ----

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
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-300">
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

function Kpis({
  items,
  accent,
}: {
  items: Array<{ k: string; v: string; up?: string }>;
  accent: string;
}) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {items.map((s) => (
        <div key={s.k} className="rounded-lg bg-secondary/50 px-2 py-2">
          <p className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">{s.k}</p>
          <p className="flex items-baseline gap-1 text-sm font-extrabold text-foreground">
            {s.v}
            {s.up && (
              <span className="text-[9px] font-bold" style={{ color: accent }}>
                ↑ {s.up}
              </span>
            )}
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

function AdCard({ accent }: { accent: string }) {
  return (
    <Panel label="AI ad optimizer · Meta + Google" status="Optimizing" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Targeting", v: "94%" },
          { k: "Spend", v: "₹18K" },
          { k: "Conv.", v: "+27" },
        ]}
      />
      <Meter
        rows={[
          { label: "CTR", value: "4.6%", pct: "84%", color: accent },
          { label: "ROAS", value: "4.4x", pct: "76%", color: accent },
        ]}
      />
      <Trend color={accent} />
    </Panel>
  );
}

function ChatbotCard({ accent }: { accent: string }) {
  return (
    <Panel label="AI assistant · WhatsApp" status="Replying" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Answered", v: "100%" },
          { k: "Avg. reply", v: "2s" },
          { k: "Booked", v: "+38%" },
        ]}
      />
      <div className="mt-3 space-y-1.5 rounded-lg border border-border bg-secondary/30 p-2.5 text-[10px]">
        <div className="max-w-[80%] rounded-lg rounded-tl-sm bg-background px-2.5 py-1.5 text-foreground">
          Hi! Do you have this in stock? 👀
        </div>
        <div
          className="ml-auto max-w-[78%] rounded-lg rounded-br-sm px-2.5 py-1.5 text-white"
          style={{ backgroundColor: accent }}
        >
          Yes! Want me to reserve one and book a call?
        </div>
      </div>
      <Meter
        rows={[
          { label: "Resolved by AI", value: "82%", pct: "82%", color: accent },
          { label: "Handed to team", value: "18%", pct: "18%", color: accent },
        ]}
      />
    </Panel>
  );
}

function LeadScoreCard({ accent }: { accent: string }) {
  return (
    <Panel label="Predictive lead scoring · CRM" status="Scoring" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Scored", v: "1,240" },
          { k: "Hot", v: "128" },
          { k: "Close rate", v: "+22%" },
        ]}
      />
      <div className="mt-2.5 space-y-1.5">
        {[
          { name: "Enquiry · Priya S.", score: "92", pct: "92%" },
          { name: "Enquiry · Rahul M.", score: "74", pct: "74%" },
          { name: "Enquiry · cold lead", score: "31", pct: "31%" },
        ].map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-2.5 py-1.5 text-[11px]"
          >
            <span className="flex-1 truncate text-muted-foreground">{r.name}</span>
            <span className="h-1 w-14 overflow-hidden rounded-full bg-secondary">
              <span className="block h-full rounded-full" style={{ width: r.pct, backgroundColor: accent }} />
            </span>
            <span className="w-6 text-right font-bold text-foreground">{r.score}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ContentCard({ accent }: { accent: string }) {
  return (
    <Panel label="AI content studio · Drafting" status="Generating" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Drafts", v: "36" },
          { k: "Time saved", v: "18h" },
          { k: "Approved", v: "89%" },
        ]}
      />
      <div className="mt-2.5 space-y-1.5 rounded-lg border border-border bg-secondary/30 p-2.5 text-[11px]">
        <p className="flex items-center gap-1.5 font-semibold text-foreground">
          <Sparkles className="size-3" style={{ color: accent }} />
          Generating captions…
        </p>
        <span className="block h-1.5 w-full rounded-full bg-secondary">
          <span className="block h-full rounded-full" style={{ width: "72%", backgroundColor: accent }} />
        </span>
        <p className="text-muted-foreground">Post · Email · Ad copy · Blog intro</p>
      </div>
      <Meter
        rows={[
          { label: "Brand-voice match", value: "94%", pct: "94%", color: accent },
        ]}
      />
    </Panel>
  );
}

function JourneyCard({ accent }: { accent: string }) {
  return (
    <Panel label="Journey automation · Email + WhatsApp" status="Running" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Open rate", v: "48%" },
          { k: "Click", v: "13%" },
          { k: "Re-engaged", v: "+31%" },
        ]}
      />
      <Meter
        rows={[
          { label: "Welcome flow", value: "98%", pct: "98%", color: accent },
          { label: "Cart recovery", value: "64%", pct: "64%", color: accent },
        ]}
      />
      <Trend color={accent} />
    </Panel>
  );
}

function AnalyticsCard({ accent }: { accent: string }) {
  return (
    <Panel label="AI insights · All channels" status="Live" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Channels", v: "6" },
          { k: "Best ROAS", v: "WhatsApp" },
          { k: "Alerts", v: "3" },
        ]}
      />
      <div className="mt-2.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-[11px]">
        <p className="flex items-center gap-1.5 font-semibold text-foreground">
          <Sparkles className="size-3" style={{ color: accent }} />
          Insight
        </p>
        <p className="mt-0.5 text-muted-foreground">
          Shift 15% of ad spend to WhatsApp, it is converting 1.8x cheaper this week.
        </p>
      </div>
      <Trend color={accent} />
    </Panel>
  );
}

const servicesVisual: Record<string, ComponentType<{ accent: string }>> = {
  "AI Ad Optimization": AdCard,
  "AI Chatbots & WhatsApp Automation": ChatbotCard,
  "Predictive Lead Scoring": LeadScoreCard,
  "AI Content Generation": ContentCard,
  "Email & Journey Automation": JourneyCard,
  "Marketing Analytics & Insights": AnalyticsCard,
};

function ServiceVisual({ service }: { service: AimService }) {
  const Visual = servicesVisual[service.title] ?? AdCard;
  return (
    <TiltCard max={5}>
      <div className="aim-dark relative overflow-hidden rounded-2xl bg-[#0b0616] p-2.5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-40 blur-2xl"
          style={{ background: service.accent }}
        />
        <div className="relative">
          <Visual accent={service.accent} />
        </div>
      </div>
    </TiltCard>
  );
}

export function AimServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
          What we do
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          A Few of Our Best AI Marketing Services
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          From smarter ads and always-on chat to lead scoring, content, and
          journeys, our AI marketing services work together to capture more
          enquiries and convert more of them.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:space-y-20">
        {aimServices.map((service, i) => {
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
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:opacity-80"
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
