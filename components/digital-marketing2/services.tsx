import type { ComponentType, ReactNode } from "react";
import { ArrowUpRight, Heart, Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/digital-marketing/tilt-card";
import { dmServices, type DmService } from "@/lib/digital-marketing2";
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

function AdDashboard({ accent }: { accent: string }) {
  return (
    <Panel label="Ad manager · Google Ads" status="Live" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Targeting", v: "92%" },
          { k: "Spend", v: "₹18K" },
          { k: "Conv.", v: "+24" },
        ]}
      />
      <Meter
        rows={[
          { label: "CTR", value: "4.2%", pct: "82%", color: accent },
          { label: "ROAS", value: "4.2x", pct: "74%", color: accent },
        ]}
      />
      <Trend color={accent} />
    </Panel>
  );
}

function SeoCard({ accent }: { accent: string }) {
  return (
    <Panel label="Search visibility · Google" status="Tracking" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Organic", v: "18.4K" },
          { k: "Keywords", v: "312" },
          { k: "Avg. rank", v: "4.1" },
        ]}
      />
      <div className="mt-2.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span
            className="grid size-5 place-items-center rounded-full"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            <Search className="size-3" />
          </span>
          best marketing agency in nagpur
          <span className="ml-auto rounded-[4px] border border-border px-1.5 font-bold uppercase tracking-wide text-muted-foreground/60">
            Google
          </span>
        </div>
      </div>
      <div className="mt-2 space-y-2 text-xs">
        <div className="rounded-md border p-2.5" style={{ borderColor: `${accent}55` }}>
          <p className="font-bold text-foreground">Top Marketing Agency in Nagpur — Timewheel</p>
          <p className="mt-0.5 font-medium" style={{ color: accent }}>
            timewheel.co.in
          </p>
          <p className="mt-1 line-clamp-1 text-muted-foreground">
            Premium SEO, paid ads, content &amp; social — one connected growth system.
          </p>
        </div>
        <div className="rounded-md border border-border p-2.5 opacity-60">
          <p className="font-bold">Another listing…</p>
          <p className="mt-0.5 text-muted-foreground">other-site.com</p>
        </div>
      </div>
    </Panel>
  );
}

function ContentCard({ accent }: { accent: string }) {
  return (
    <Panel label="Content studio · Publishing" status="Published" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Reach", v: "84K" },
          { k: "Engage", v: "12%" },
          { k: "Pieces", v: "24" },
        ]}
      />
      <Meter
        rows={[
          { label: "Articles", value: "68%", pct: "68%", color: accent },
          { label: "Social posts", value: "52%", pct: "52%", color: accent },
        ]}
      />
      <Trend color={accent} />
    </Panel>
  );
}

function EmailCard({ accent }: { accent: string }) {
  return (
    <Panel label="Newsletter · Automation" status="Active" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Open rate", v: "46%" },
          { k: "Click", v: "12%" },
          { k: "Clicks", v: "615" },
        ]}
      />
      <Meter
        rows={[
          { label: "Deliverability", value: "98%", pct: "98%", color: accent },
          { label: "Click-to-open", value: "26%", pct: "26%", color: accent },
        ]}
      />
      <Trend color={accent} />
    </Panel>
  );
}

function WhatsAppCard({ accent }: { accent: string }) {
  return (
    <Panel label="WhatsApp business · Broadcast" status="Sending" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Delivered", v: "98%" },
          { k: "Replies", v: "+61%" },
          { k: "Conv.", v: "+18%" },
        ]}
      />
      <div className="mt-3 space-y-1.5 rounded-lg border border-border bg-secondary/30 p-2.5 text-[10px]">
        <div className="max-w-[80%] rounded-lg rounded-tl-sm bg-background px-2.5 py-1.5 text-foreground">
          Ready to hear our latest offers? 🎉
        </div>
        <div className="ml-auto max-w-[70%] rounded-lg rounded-br-sm px-2.5 py-1.5 text-white" style={{ backgroundColor: accent }}>
          Yes — tell me more!
        </div>
      </div>
      <Meter
        rows={[
          { label: "Delivery", value: "98%", pct: "98%", color: accent },
          { label: "Reply rate", value: "34%", pct: "34%", color: accent },
        ]}
      />
    </Panel>
  );
}

function SocialCard({ accent }: { accent: string }) {
  return (
    <Panel label="Social media · Instagram + LinkedIn" status="Growing" accent={accent}>
      <Kpis
        accent={accent}
        items={[
          { k: "Followers", v: "12K" },
          { k: "Reach", v: "84K" },
          { k: "Engage", v: "5.2%" },
        ]}
      />
      <Meter
        rows={[
          { label: "Posts", value: "44%", pct: "44%", color: accent },
          { label: "Stories", value: "70%", pct: "70%", color: accent },
        ]}
      />
      <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-border bg-secondary/20 px-3 py-2 text-[11px] text-muted-foreground">
        <Heart className="size-3.5 fill-current" style={{ color: accent }} />
        <span className="font-bold" style={{ color: accent }}>
          2.3K
        </span>
        likes on this week&apos;s top post
      </div>
    </Panel>
  );
}

const servicesVisual: Record<string, ComponentType<{ accent: string }>> = {
  // "Paid Advertising": AdDashboard,
  "Search Engine Optimization (SEO)": SeoCard,
  "Content Marketing": ContentCard,
  "Email Marketing": EmailCard,
  "WhatsApp Marketing": WhatsAppCard,
  "Social Media Marketing": SocialCard,
};

function ServiceVisual({ service }: { service: DmService }) {
  const Visual = servicesVisual[service.title] ?? AdDashboard;
  return (
    <TiltCard max={5}>
      <Visual accent={service.accent} />
    </TiltCard>
  );
}

export function Dm2Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          What we do
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          What are Our Few of The Best Digital Marketing Services
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          From visibility and engagement to acquisition and conversion, our
          digital marketing services work together to create a complete growth
          strategy.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 md:space-y-20">
        {dmServices.map((service, i) => {
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
