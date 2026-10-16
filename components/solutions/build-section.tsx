"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  GraduationCap,
  ShoppingBagOpen,
  Storefront,
  Ticket,
  Trophy,
  UsersThree,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

// The "build" section: pick who you serve, see the product stack for them.
// Products are referenced by slug so re-ordering lib/products.ts can never
// shuffle or break these groups.

type Segment = {
  slug: string;
  name: string;
  /** one-line framing shown on the rail under the name */
  railNote: string;
  icon: Icon;
  accent: string;
  /** panel intro */
  blurb: string;
  productSlugs: string[];
};

const SEGMENTS: Segment[] = [
  {
    slug: "creators",
    name: "Creators & Personal Brands",
    railNote: "Tips, communities, ticketed shows",
    icon: VideoCamera,
    accent: "#ffcc1c",
    blurb:
      "Get paid by the people who value your work — tips, memberships and ticketed shows, with no platform taking a cut between you and your audience.",
    productSlugs: ["coffee-for-me", "the-parliament", "ticket-dino"],
  },
  {
    slug: "schools",
    name: "Schools, Colleges & Institutes",
    railNote: "Alumni, campus groups, fests",
    icon: GraduationCap,
    accent: "#269cef",
    blurb:
      "Keep every batch reachable, verified and giving back — one branded portal for the alumni office, campus communities and paid events, owned by the institution.",
    productSlugs: ["alluminaty", "the-parliament", "ticket-dino"],
  },
  {
    slug: "small-business",
    name: "Small Businesses & Shops",
    railNote: "Bookings, storefront, leads",
    icon: Storefront,
    accent: "#fe5100",
    blurb:
      "Bookings, a storefront and a steady stream of leads — the operational stack a small team actually needs, without juggling five subscriptions that never talk to each other.",
    productSlugs: ["book-a-sloth", "ezshop", "leader", "archflow"],
  },
  {
    slug: "events",
    name: "Event Organizers",
    railNote: "On-sale rush to the door queue",
    icon: Ticket,
    accent: "#00b67a",
    blurb:
      "From the on-sale rush to the check-in queue: ticketing that holds at scale, registrations paid up front, and an attendee community that lasts past the event.",
    productSlugs: ["ticket-dino", "book-a-sloth", "the-parliament"],
  },
  {
    slug: "communities",
    name: "Communities & Associations",
    railNote: "Members, billing, access",
    icon: UsersThree,
    accent: "#ff4d93",
    blurb:
      "Members, recurring billing, events and access control in one place you own — not five tools and a spreadsheet that drift apart every month.",
    productSlugs: ["the-parliament", "alluminaty", "indian-sports-club"],
  },
  {
    slug: "sports",
    name: "Sports Clubs & Academies",
    railNote: "Fixtures, fees, ground slots",
    icon: Trophy,
    accent: "#008c45",
    blurb:
      "Fixtures, rosters, tournaments, season fees and ground slots — the whole club run online and on the ground, from selection to the points table.",
    productSlugs: ["indian-sports-club", "book-a-sloth", "ticket-dino"],
  },
  {
    slug: "d2c",
    name: "D2C Brands & Sellers",
    railNote: "Storefront without commission",
    icon: ShoppingBagOpen,
    accent: "#10b981",
    blurb:
      "Your own catalogue with UPI, COD and GST invoices — plus the search demand and fresh leads to keep it filled, on a store that charges no commission on orders.",
    productSlugs: ["ezshop", "marketing-bug", "leader"],
  },
];

const bySlug = new Map(products.map((p) => [p.slug, p]));

function resolve(slug: string): Product | undefined {
  return bySlug.get(slug);
}

function ProductCard({ product }: { product: Product }) {
  const { name, tagline, icon: Icon, logo, accent, href, features } = product;
  const [logoError, setLogoError] = useState(false);
  const showLogo = Boolean(logo) && !logoError;
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-secondary/40 p-5 transition-colors duration-300 hover:border-ink/25"
    >
      <div className="flex items-start justify-between">
        <span
          className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl"
          style={
            showLogo
              ? {
                  backgroundColor: "#ffffff",
                  boxShadow: "inset 0 0 0 1px rgba(23,23,23,0.08)",
                }
              : {
                  backgroundColor: `${accent}1f`,
                  color: accent,
                  boxShadow: `inset 0 0 0 1px ${accent}33`,
                }
          }
        >
          {logo && !logoError ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              width={44}
              height={44}
              className="size-8 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <Icon className="size-5" weight="bold" />
          )}
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <h4 className="mt-4 text-base font-extrabold tracking-tight text-foreground">
        {name}
      </h4>
      <p className="mt-1 text-sm leading-snug text-muted-foreground">
        {tagline}
      </p>
      {features?.length ? (
        <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
          {features.slice(0, 3).map((f) => {
            const FIcon = f.icon;
            return (
              <li
                key={f.title}
                className="flex items-center gap-2.5 text-sm text-foreground/75"
              >
                <FIcon
                  className="size-4 shrink-0"
                  weight="bold"
                  style={{ color: accent }}
                  aria-hidden
                />
                {f.title}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-4 border-t border-border/70 pt-4" />
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
        View product
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function BuildSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const segment = SEGMENTS[active];

  const onRailKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = SEGMENTS.length - 1;
    let next: number | undefined;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== undefined) {
      e.preventDefault();
      setActive(next);
    }
  };

  return (
    <section id="build" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
          Build with our products
        </p>
        <RevealHeading
          as="h2"
          className="mx-auto mt-3 max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          Pick who you serve. Get the stack for it.
        </RevealHeading>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Seven kinds of businesses, one ecosystem. Every product below is live,
          built and run by the same team.
        </p>
      </Reveal>

      <div className="mt-12 md:mt-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-5">
        {/* audience rail — horizontal chips on mobile, vertical list on desktop */}
        <div
          role="tablist"
          aria-label="Audiences"
          aria-orientation="vertical"
          onKeyDown={onRailKeyDown}
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-3 lg:col-span-4 lg:mx-0 lg:sticky lg:top-24 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {SEGMENTS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={s.slug}
                role="tab"
                id={`seg-tab-${s.slug}`}
                aria-selected={isActive}
                aria-controls="seg-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "flex w-full shrink-0 items-center gap-3 rounded-2xl border p-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:w-auto",
                  isActive
                    ? "border-ink/20 bg-card shadow-[0_18px_40px_-32px_rgba(23,23,23,0.45)]"
                    : "border-transparent bg-card/50 hover:bg-card",
                )}
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-300"
                  style={
                    isActive
                      ? { backgroundColor: `${s.accent}1f`, color: s.accent }
                      : {
                          backgroundColor: "var(--secondary)",
                          color: "var(--muted-foreground)",
                        }
                  }
                >
                  <Icon className="size-5" weight="bold" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block whitespace-nowrap text-sm font-bold lg:whitespace-normal",
                      isActive ? "text-foreground" : "text-foreground/70",
                    )}
                  >
                    {s.name}
                  </span>
                  <span className="hidden text-xs text-muted-foreground lg:block">
                    {s.railNote}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: s.accent }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div className="mt-5 lg:mt-0 lg:col-span-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={segment.slug}
              role="tabpanel"
              id="seg-panel"
              aria-labelledby={`seg-tab-${segment.slug}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8"
            >
              {/* accent bloom + ghost glyph */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full blur-3xl"
                style={{ backgroundColor: `${segment.accent}14` }}
              />
              <segment.icon
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-8 size-44 -rotate-6"
                style={{ color: `${segment.accent}10` }}
                weight="bold"
              />

              <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-2xl"
                    style={{
                      backgroundColor: `${segment.accent}1f`,
                      color: segment.accent,
                      boxShadow: `inset 0 0 0 1px ${segment.accent}33`,
                    }}
                  >
                    <segment.icon className="size-6" weight="bold" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="mt-1 text-xl font-black tracking-tight text-foreground md:text-2xl">
                      {segment.name}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="relative mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {segment.blurb}
              </p>

              <div className="relative mt-7 grid gap-4 sm:grid-cols-2">
                {segment.productSlugs.map((slug) => {
                  const p = resolve(slug);
                  return p ? <ProductCard key={slug} product={p} /> : null;
                })}
              </div>

              <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-5 py-4">
                <p className="text-sm font-medium text-foreground/80">
                  Want this stack tailored to your brand and data?
                </p>
                <Link
                  href="/book-a-demo"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-foreground"
                >
                  Book a demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
