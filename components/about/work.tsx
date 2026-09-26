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
          src="/products/bas-booking-16x9.png"
          alt="Book A Sloth, a booking platform interface shown in a browser"
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
      <div className="flex aspect-[16/10] bg-white">
        <div className="flex w-[30%] flex-col gap-1 border-r border-border/70 bg-secondary/40 p-2.5">
          <span className="text-[8px] font-black tracking-wide" style={{ color: BAS_BLUE }}>
            Alluminaty
          </span>
          {["Directory", "Events", "Mentors", "Giving"].map((l, i) => (
            <span
              key={l}
              className="rounded-md px-1.5 py-1 text-[8px] font-semibold text-muted-foreground"
              style={i === 0 ? { backgroundColor: BAS_BLUE, color: "#fff" } : undefined}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="flex-1 p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-black tracking-tight text-foreground">
              Class of 2019
            </span>
            <span
              className="rounded-md px-1.5 py-0.5 text-[7px] font-bold text-white"
              style={{ backgroundColor: BAS_BLUE }}
            >
              Add member
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[
              { n: "Ananya M", r: "Product · BLR", c: BAS_BLUE },
              { n: "Kabir R", r: "Eng · PUN", c: "#fe5100" },
              { n: "Sara D", r: "Finance · MUM", c: "#4ab765" },
              { n: "Dev P", r: "Founder · DEL", c: BTC_YELLOW },
            ].map((m) => (
              <div key={m.n} className="rounded-md border border-border/80 p-1.5">
                <div className="flex items-center gap-1">
                  <span
                    className="grid size-4 place-items-center rounded-full text-[6px] font-black text-white"
                    style={{ backgroundColor: m.c }}
                  >
                    {m.n.charAt(0)}
                  </span>
                  <span className="text-[7px] font-bold text-foreground">{m.n}</span>
                </div>
                <span className="text-[6px] font-medium text-muted-foreground">{m.r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function CoffeeVisual() {
  return (
    <Frame url="coffeeandtoffee.in">
      <div className="flex aspect-[16/10] flex-col gap-2 bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Coffee className="size-3" style={{ color: BTC_YELLOW }} />
            <span className="text-[8px] font-black tracking-tight">Coffee &amp; Toffee</span>
          </span>
          <span className="rounded border border-border px-1.5 py-0.5 text-[7px] font-bold text-muted-foreground">
            Menu
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: "#ffcc1c1a" }}>
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full text-[9px] font-black text-white"
            style={{ backgroundColor: BTC_YELLOW }}
          >
            PA
          </span>
          <div>
            <span className="block text-[8px] font-black tracking-tight">
              Pixel &amp; Pin Studio
            </span>
            <span className="text-[7px] font-medium text-muted-foreground">
              128 monthly supporters
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-white p-2">
          <div>
            <span className="block text-[8px] font-black">Buy a coffee, ₹99</span>
            <span className="text-[7px] font-medium text-muted-foreground">
              Funds the next video.
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[7px] font-bold text-white"
            style={{ backgroundColor: BTC_YELLOW }}
          >
            <Heart className="size-2 fill-current" /> Support
          </span>
        </div>
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