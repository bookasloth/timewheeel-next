import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WdOurWork } from "@/components/website-design/our-work";
import { wd, type WdPortfolioProject } from "@/lib/website-design";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

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
        src="/bookasloth.png"
        alt="Book A Sloth, a modern booking platform design shown in a browser"
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
      <Image
        src="/aluminaty.png"
        alt="Alluminaty, an alumni engagement platform for schools and colleges, shown in a browser"
        width={1536}
        height={1024}
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="h-auto w-full"
      />
    </Frame>
  );
}

const visuals: Record<WdPortfolioProject["visual"], () => ReactNode> = {
  "screenshot-book-a-sloth": BasVisual,
  "mockup-alluminaty": AlluminatyVisual,
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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">{wd.portfolio.label}</p>
          <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
            {wd.portfolio.title}
          </RevealHeading>
          <p className="mt-4 text-muted-foreground md:text-lg">{wd.portfolio.body}</p>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {wd.portfolio.projects.map((project, i) => (
            <Project key={project.number} project={project} index={i} />
          ))}
        </div>
        <WdOurWork />
      </div>
    </section>
  );
}