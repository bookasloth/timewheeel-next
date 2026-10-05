import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { serviceGroups, type ServicePrice } from "@/lib/pricing";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting prices for every service, website design, development, Shopify, social media, SEO and digital marketing. Limited project slots each month.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing, Timewheel",
    description:
      "Transparent starting prices for every service, website design, development, Shopify, social media, SEO and digital marketing.",
    url: "/pricing",
  },
};

const trust = [
  { icon: ShieldCheck, label: "No lock-in" },
  { icon: CheckCircle2, label: "Pay per milestone" },
  { icon: MapPin, label: "Built in Nagpur" },
];

// Urgency state for the monthly counter: green when open, amber at half,
// red when almost gone. Colour drives the number, the bar and the badge.
function availability(slotsLeft: number, slotsTotal: number) {
  if (slotsLeft <= 0)
    return { color: "#dc2626", label: "Fully booked" };
  if (slotsLeft <= 2)
    return {
      color: "#dc2626",
      label: slotsLeft === 1 ? "Last slot" : `Last ${slotsLeft} slots`,
    };
  if (slotsLeft / slotsTotal <= 0.5)
    return { color: "#d97706", label: "Filling fast" };
  return { color: "#16a34a", label: null as string | null };
}

function ServiceRow({ service }: { service: ServicePrice }) {
  const {
    icon: Icon,
    accent,
    name,
    tagline,
    href,
    price,
    unit,
    points,
    capacity,
    featured,
  } = service;
  const { month, slotsLeft, slotsTotal } = capacity;
  const accentText = service.accentText ?? accent;
  const billing = unit.toLowerCase().includes("month") ? "Monthly" : "One-time";

  const avail = availability(slotsLeft, slotsTotal);
  const booked = Math.max(slotsTotal - Math.max(slotsLeft, 0), 0);
  const bookedPct = Math.round((booked / slotsTotal) * 100);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {/* 66% — pricing / details card */}
      <div
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg md:col-span-2",
          featured ? "border-transparent text-white" : "border-border bg-card",
        )}
        style={featured ? { backgroundColor: accent } : undefined}
      >
        {featured && (
          <div className="bg-white/15 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">
            ★ Most popular
          </div>
        )}

        {/* accent header */}
        <div
          className="flex flex-wrap items-start justify-between gap-4 p-6"
          style={!featured ? { backgroundColor: `${accent}14` } : undefined}
        >
          <div className="flex items-center gap-3">
            <span
              className="grid size-11 place-items-center rounded-xl"
              style={
                featured
                  ? { backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }
                  : { backgroundColor: `${accent}1f`, color: accent }
              }
            >
              <Icon className="size-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{name}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    featured
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {billing}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs",
                  featured ? "text-white/80" : "text-muted-foreground",
                )}
              >
                {tagline}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={cn(
                "text-[10px] font-medium uppercase tracking-wide",
                featured ? "text-white/70" : "text-muted-foreground",
              )}
            >
              Starting
            </p>
            <div className="flex items-baseline justify-end gap-1.5">
              <span
                className="text-3xl font-extrabold leading-none"
                style={featured ? { color: "#fff" } : { color: accentText }}
              >
                {price}
              </span>
              <span
                className={cn(
                  "text-xs",
                  featured ? "text-white/80" : "text-muted-foreground",
                )}
              >
                {unit}
              </span>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-6 pt-5">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-sm">
                <Check
                  className="mt-0.5 size-4 shrink-0"
                  style={featured ? { color: "#fff" } : { color: accentText }}
                />
                <span
                  className={featured ? "text-white/90" : "text-muted-foreground"}
                >
                  {pt}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4 pt-1">
            <Link
              href={site.demoUrl}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold",
                featured
                  ? "bg-white text-foreground hover:bg-white/90"
                  : "btn btn-primary text-brand-foreground",
              )}
            >
              Get started
            </Link>
            <Link
              href={href}
              className={cn(
                "text-sm font-semibold",
                featured ? "text-white hover:underline" : "hover:text-brand",
              )}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* 33% — monthly availability counter */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-border p-6 text-center transition-all duration-200 hover:shadow-lg"
        style={{ backgroundColor: `${accent}0d` }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {month}
        </p>
        {avail.label && (
          <span
            className="mx-auto mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: `${avail.color}1f`, color: avail.color }}
          >
            {avail.label}
          </span>
        )}
        <p
          className="mt-2 text-5xl font-extrabold leading-none"
          style={{ color: avail.color }}
        >
          {Math.max(slotsLeft, 0)}
        </p>
        <p className="mt-1 text-sm font-semibold">
          {slotsLeft === 1 ? "slot left" : "slots left"}
        </p>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full"
            style={{ width: `${bookedPct}%`, backgroundColor: avail.color }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {booked} of {slotsTotal} booked
        </p>

        <Link
          href={site.demoUrl}
          className="mt-5 text-sm font-semibold hover:underline"
          style={{ color: avail.color }}
        >
          {slotsLeft <= 0 ? "Join the waitlist" : "Reserve a slot"}
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      {/* hero */}
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
          Pricing
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">
          Transparent starting prices
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          End-to-end tech and marketing, built in Nagpur. Every service has a
          clear starting price and a limited number of project slots each month,
          so the work stays good.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {trust.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon className="size-4 text-brand" />
              {label}
            </span>
          ))}
        </div>
      </Reveal>

      {/* service groups */}
      {serviceGroups.map((group) => {
        const GroupIcon = group.icon;
        return (
          <div key={group.title} className="mt-16">
            <Reveal className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-secondary text-foreground">
                <GroupIcon className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold leading-tight">{group.title}</h2>
                <p className="text-xs text-muted-foreground">{group.subtitle}</p>
              </div>
            </Reveal>

            <Reveal stagger className="mt-6 space-y-5">
              {group.services.map((s) => (
                <ServiceRow key={s.name} service={s} />
              ))}
            </Reveal>
          </div>
        );
      })}

      {/* closing note + CTA */}
      <Reveal className="mt-20 rounded-3xl border border-border bg-secondary/50 px-8 py-12 text-center">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Not sure where to start?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us your goal and we&apos;ll scope the right mix of services and a
          clear quote, no pressure, no lock-in.
        </p>
        <Link
          href={site.demoUrl}
          className="btn btn-primary mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Book a Demo
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </div>
  );
}
