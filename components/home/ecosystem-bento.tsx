import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Homepage "ecosystem" bento: the five services we sell, as mixed-size tiles.
// Cream/ink (Tactile Editorial) tokens; per-service accent only as an icon dab.
// Shopify Development is deliberately not listed here yet.

type Service = {
  name: string;
  tagline: string;
  href: string;
  icon: Icon;
  accent: string;
  /** Rendered as the large 2x2 anchor tile, with `points` as its mini rows. */
  points?: string[];
  /** Filled accent background with reversed text, so one service reads as the
      flagship without changing the grid. */
  featured?: boolean;
};

const services: Service[] = [
  {
    name: "Website Development",
    tagline: "Fast, clean builds that ship on time.",
    href: "/web-development-company-in-nagpur",
    icon: Code,
    accent: "#269cef",
    points: ["Websites & landing pages", "Web apps & dashboards", "API & integrations"],
  },
  {
    name: "Website Design",
    tagline: "Interfaces built to convert, not just impress.",
    href: "/website-design-company-in-nagpur",
    icon: PenNib,
    accent: "#47143D",
    featured: true,
  },
  {
    name: "Social Media Marketing",
    tagline: "Content that stops the scroll.",
    href: "/social-media-marketing-company-in-nagpur",
    icon: ShareNetwork,
    accent: "#be123c",
  },
  {
    name: "Search Engine Optimization",
    tagline: "Rank higher. Get found. Get leads.",
    href: "/seo-company-in-nagpur",
    icon: MagnifyingGlass,
    accent: "#4ab765",
  },
  {
    name: "Digital Marketing",
    tagline: "Ad spend that pays back.",
    href: "/digital-marketing-company-in-nagpur",
    icon: FileText,
    accent: "#ffcc1c",
  },
];

const anchor = services[0];
const rest = services.slice(1);

// Proof tiles: picked by slug, not by index, so re-ordering lib/case-studies.ts
// can never shuffle the homepage. Deliberately skips the placeholder entries
// flagged at the top of that file.
const PROOF_SLUGS = ["book-a-sloth", "alluminaty", "eureka-coworking"];
const proof = PROOF_SLUGS.map((slug) => caseStudies.find((cs) => cs.slug === slug)).filter(
  (cs): cs is CaseStudy => Boolean(cs),
);

function ServiceTile({ service }: { service: Service }) {
  const { icon: Icon, accent, name, tagline, href, featured } = service;
  return (
    <Link
      href={href}
      style={featured ? { backgroundColor: accent } : undefined}
      className={cn(
        "group flex flex-col justify-between rounded-2xl border p-5 transition-[background-color,border-color,filter]",
        featured
          ? "border-transparent text-white hover:border-white/40 hover:brightness-110"
          : "border-border bg-card hover:border-ink/40",
      )}
    >
      <span
        className="grid size-11 place-items-center rounded-xl"
        style={
          featured
            ? { backgroundColor: "rgba(255,255,255,0.14)", color: "#fff" }
            : { backgroundColor: `${accent}1f`, color: accent }
        }
      >
        <Icon className="size-5" />
      </span>
      <div className="mt-6">
        <p
          className={cn(
            "flex items-center gap-1 font-bold",
            featured ? "text-white" : "text-foreground",
          )}
        >
          {name}
          <ArrowUpRight
            className={cn(
              "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              featured ? "text-white/70" : "text-muted-foreground",
            )}
          />
        </p>
        <p
          className={cn(
            "mt-0.5 text-sm",
            featured ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {tagline}
        </p>
      </div>
    </Link>
  );
}

export function EcosystemBento() {
  const { icon: Icon, accent, href, name, tagline, points } = anchor;

  return (
    <section id="ecosystem" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">The ecosystem</p>
        <RevealHeading as="h2" className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          One connected system. Every service, one team.
        </RevealHeading>
      </Reveal>

      <Reveal stagger className="mt-12 grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 md:grid-cols-4">
        {/* anchor service, 2x2 */}
        <Link
          href={href}
          className="group col-span-2 row-span-2 flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-ink/40"
        >
          <span className="grid size-12 place-items-center rounded-2xl" style={{ backgroundColor: `${accent}1f`, color: accent }}>
            <Icon className="size-6" />
          </span>
          {/* what the service covers, as mini rows */}
          <div className="mt-6 space-y-2.5">
            {points?.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-3 py-2.5">
                <span className="size-5 shrink-0 rounded-md" style={{ backgroundColor: `${accent}26` }} />
                <span className="text-sm font-medium text-foreground/80">{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="flex items-center gap-1 text-xl font-extrabold text-foreground">
              {name}
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{tagline}</p>
          </div>
        </Link>

        {rest.slice(0, 4).map((s) => (
          <ServiceTile key={s.name} service={s} />
        ))}

        {/* stat, bold orange tile */}
        <div className="flex flex-col justify-between rounded-2xl bg-brand p-5 text-brand-foreground">
          <p className="text-4xl font-black tracking-tight">10+</p>
          <p className="text-sm font-semibold">Products designed, built &amp; shipped</p>
        </div>

        {/* ownership, ink tile, wide */}
        <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-navy p-7 text-white md:col-span-3">
          <ShieldCheck className="size-6 text-white/80" />
          <div className="mt-6">
            <p className="text-xl font-extrabold">You own the whole stack.</p>
            <p className="mt-1.5 max-w-md text-sm text-white/70">
              Your code, your data, your infrastructure, no platform commissions, no SaaS rent, no lock-in.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Case studies — same cards and grid as /case-studies, three of them. */}
      <Reveal className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
              Case Studies
            </p>
            <RevealHeading
              as="h3"
              className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl"
            >
              Work we designed, built and shipped
            </RevealHeading>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              The challenges, decisions and results behind real builds by Timewheel.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-foreground"
          >
            All case studies
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {proof.map((cs) => (
          <Reveal key={cs.slug} className="h-full">
            <CaseStudyCard cs={cs} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}