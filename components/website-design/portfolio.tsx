import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap, Heart, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { palette, wd, type WdPortfolioProject } from "@/lib/website-design";
import { cn } from "@/lib/utils";

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
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-background shadow-[0_40px_80px_-48px_rgba(17,24,39,0.5)]", className)}>
      <div className="flex items-center gap-3 border-b border-border/70 bg-soft px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-[10px] font-semibold text-muted-foreground">
          <span className="size-1 rounded-full bg-wgreen" />
          {url}
        </span>
        <span className="w-10" />
      </div>
      {children}
    </div>
  );
}

function BasVisual() {
  return (
    <Frame url="bookasloth.com">
      <Image
        src="/products/bas-booking-16x9.png"
        alt="Book A Sloth — a modern booking platform design shown in a browser"
        width={1440}
        height={810}
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="h-auto w-full"
      />
    </Frame>
  );
}

function AlluminatyVisual() {
  return (
    <Frame url="alluminaty.app">
      <div className="relative flex aspect-[16/10] bg-white">
        <div className="flex w-1/5 border-r border-border/70 bg-wsoft p-3">
          <div className="w-full space-y-2">
            <span className="block text-[9px] font-black tracking-wide" style={{ color: palette.purple }}>
              Alluminaty
            </span>
            {["Directory", "Events", "Mentors", "Giving", "Settings"].map((l, i) => (
              <span
                key={l}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-[8px] font-semibold text-muted-foreground",
                  i === 0 && "text-white",
                )}
                style={i === 0 ? { backgroundColor: palette.purple } : { backgroundColor: "transparent" }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-tight text-foreground">Class of 2019</span>
            <span className="rounded-md px-2 py-1 text-[8px] font-bold text-white" style={{ backgroundColor: palette.purple }}>
              Add member
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { n: "Ananya Mehta", r: "Product · Bengaluru", c: palette.purple },
              { n: "Kabir Rao", r: "Engineering · Pune", c: palette.blue },
              { n: "Sara D'Souza", r: "Finance · Mumbai", c: palette.orange },
              { n: "Dev Patel", r: "Founder · Delhi", c: palette.green },
            ].map((m) => (
              <div key={m.n} className="rounded-lg border border-border/80 p-2">
                <div className="flex items-center gap-1.5">
                  <span className="grid size-6 place-items-center rounded-full text-[8px] font-black text-white" style={{ backgroundColor: m.c }}>
                    {m.n.charAt(0)}
                  </span>
                  <span className="text-[9px] font-bold text-foreground">{m.n}</span>
                </div>
                <span className="mt-1.5 block text-[8px] font-medium text-muted-foreground">{m.r}</span>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7px] font-semibold" style={{ backgroundColor: `${m.c}1a`, color: m.c }}>
                  <Users className="size-2" /> Connected
                </span>
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
      <div className="relative flex aspect-[16/10] flex-col bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-4" style={{ color: palette.green }} />
            <span className="text-[10px] font-black tracking-tight text-foreground">Coffee &amp; Toffee</span>
          </span>
          <span className="rounded-md border border-border px-2 py-1 text-[8px] font-bold text-muted-foreground">
            Menu
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: `${palette.green}12` }}>
          <span className="grid size-14 shrink-0 place-items-center rounded-full text-lg font-black text-white" style={{ backgroundColor: palette.green }}>
            PA
          </span>
          <div>
            <span className="block text-[11px] font-black tracking-tight text-foreground">Pixel &amp; Pin Studio</span>
            <span className="mt-0.5 block text-[8px] font-medium text-muted-foreground">
              128 monthly supporters · YouTube + Instagram
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-white p-3">
          <div>
            <span className="block text-[10px] font-black text-foreground">Buy a coffee — ₹99</span>
            <span className="mt-0.5 block text-[8px] font-medium text-muted-foreground">
              A tiny thank-you that funds the next video.
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[8px] font-bold text-white" style={{ backgroundColor: palette.green }}>
            <Heart className="size-2.5 fill-current" /> Support
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-[8px] font-semibold text-muted-foreground">
          <span className="uppercase tracking-wider">Recent supporters</span>
          <span className="uppercase tracking-wider">1,240 cups funded</span>
        </div>
        <div className="mt-2 flex -space-x-1.5">
          {[palette.blue, palette.purple, palette.orange, palette.green].map((c, i) => (
            <span key={c + i} className="grid size-6 place-items-center rounded-full border-2 border-white text-[7px] font-black text-white" style={{ backgroundColor: c }}>
              {["R", "S", "K", "M"][i]}
            </span>
          ))}
          <span className="grid size-6 place-items-center rounded-full border-2 border-white bg-foreground/10 text-[7px] font-black text-foreground/60">
            +27
          </span>
        </div>
      </div>
    </Frame>
  );
}

const visuals: Record<WdPortfolioProject["visual"], () => ReactNode> = {
  "screenshot-book-a-sloth": BasVisual,
  "mockup-alluminaty": AlluminatyVisual,
  "mockup-coffee": CoffeeVisual,
};

function Project({ project, index }: { project: WdPortfolioProject; index: number }) {
  const flip = index % 2 === 1;
  const Visual = visuals[project.visual];
  const href = project.href;

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[1.5rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: `linear-gradient(135deg, ${project.accent}55, transparent 70%)` }}
          />
          <Link
            href={href}
            {...(project.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="relative block"
            aria-label={`View ${project.name}`}
          >
            <div className="overflow-hidden rounded-2xl">
              <div className="origin-top-left transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                <Visual />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black leading-none tracking-tight text-foreground/10 transition-colors duration-300 group-hover:text-foreground/25 md:text-5xl">
              {project.number}
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              {project.category}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{project.name}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-wsoft px-3 py-1 text-[11px] font-bold text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-8 border-t border-border/70 pt-5">
            {project.meta.map((m) => (
              <div key={m.key}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{m.key}</p>
                <p className="mt-1 text-sm font-bold">{m.value}</p>
              </div>
            ))}
          </div>

          <Link
            href={href}
            {...(project.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
            style={{ color: project.accent }}
          >
            View {project.name}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

export function WdPortfolio() {
  return (
    <section id="work" className="border-y border-border/60 bg-soft/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-wpurple">{wd.portfolio.label}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
            {wd.portfolio.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">{wd.portfolio.body}</p>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {wd.portfolio.projects.map((project, i) => (
            <Project key={project.number} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-base font-bold tracking-tight">Want to see your business here?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every project above started with a conversation about a goal.
              </p>
            </div>
            <Link
              href={wd.hero.primaryCta.href}
              className="group btn btn-blue inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Start a Project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}