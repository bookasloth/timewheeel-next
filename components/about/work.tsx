import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Coffee, Heart } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

const BAS_BLUE = "#269cef";
const BTC_YELLOW = "#ffcc1c";

function Frame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_60px_-38px_rgba(15,17,17,0.5)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/50 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
        </span>
        <span className="mx-auto flex items-center gap-1 rounded-full bg-card px-2.5 py-0.5 text-[9px] font-semibold text-muted-foreground ring-1 ring-border/60">
          <span className="size-1 rounded-full bg-rating" />
          {url}
        </span>
        <span className="w-8" />
      </div>
      {children}
    </div>
  );
}

function BookASlothVisual() {
  return (
    <Frame url="bookasloth.com">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/40">
        <Image
          src="/portfolio/Sloth Booking App Celebration (1).png"
          alt="Book A Sloth"
          width={720}
          height={405}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </Frame>
  );
}

function AlluminatyVisual() {
  return (
    <Frame url="alluminaty.app">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/40">
        <Image
          src="/portfolio/alluminaty-parlia.png"
          alt="Alluminaty"
          width={720}
          height={405}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </Frame>
  );
}

function CoffeeVisual() {
  return (
    <Frame url="coffeeandtoffee.in">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/40">
        <Image
          src="/portfolio/coffee-toffee.png"
          alt="Coffee &amp; Toffee"
          width={720}
          height={405}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </Frame>
  );
}

export const projects: {
  name: string;
  category: string;
  desc: string;
  href: string;
  Visual: () => ReactNode;
}[] = [
  {
    name: "Book A Sloth",
    category: "Website Design",
    desc: "Strategy, design and development for a modern digital presence.",
    href: "/products/book-a-sloth",
    Visual: BookASlothVisual,
  },
  {
    name: "Alluminaty",
    category: "Digital Experience",
    desc: "Creating a clearer and more engaging experience for customers.",
    href: "/products/alluminaty",
    Visual: AlluminatyVisual,
  },
  {
    name: "Coffee & Toffee",
    category: "Brand & Web",
    desc: "Connecting visual identity with a high-quality digital experience.",
    href: "/coffee-and-toffee",
    Visual: CoffeeVisual,
  },
];

export function AboutWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Selected work
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <RevealHeading as="h2" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.4rem]">
            Digital experiences built
            <br className="hidden sm:block" /> for real businesses.
          </RevealHeading>
        </Reveal>

        <Reveal delay={0.05}>
          <Link
            href="/case-studies"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand transition-colors hover:text-navy"
          >
            View All Work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-brand/25">
              <Link
                href={p.href}
                className="relative block overflow-hidden"
                aria-label={`View ${p.name}`}
              >
                <div
                  aria-hidden="true"
                  className="origin-top-left transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                >
                  <p.Visual />
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <span className="self-start rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </span>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <Link
                  href={p.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand transition-colors hover:text-navy"
                >
                  View project
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}