import type { LucideIcon } from "lucide-react";
import { ArrowRight, Code2, Compass, PenLine, PenTool } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

type Accent = {
  tile: string;
  border: string;
  wash: string;
};

const services: {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  accent: Accent;
}[] = [
  {
    icon: PenTool,
    title: "Website Design",
    body: "Modern, conversion-focused websites designed around your brand, audience, and goals.",
    href: "/website-design-company-in-nagpur",
    accent: {
      tile: "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white",
      border: "hover:border-brand/50",
      wash: "hover:bg-brand/[0.04]",
    },
  },
  {
    icon: Code2,
    title: "Web Development",
    body: "Fast, responsive and scalable websites built with modern technologies like Next.js.",
    href: "/web-development-company-in-nagpur",
    accent: {
      tile: "bg-[#2563eb]/10 text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white",
      border: "hover:border-[#2563eb]/50",
      wash: "hover:bg-[#2563eb]/[0.04]",
    },
  },
  {
    icon: PenLine,
    title: "UI/UX Design",
    body: "Thoughtful user experiences that make digital products simple, intuitive, and engaging.",
    href: "/contact",
    accent: {
      tile: "bg-[#8b5cf6]/10 text-[#8b5cf6] group-hover:bg-[#8b5cf6] group-hover:text-white",
      border: "hover:border-[#8b5cf6]/50",
      wash: "hover:bg-[#8b5cf6]/[0.04]",
    },
  },
  {
    icon: Compass,
    title: "Digital Strategy",
    body: "Clear digital direction that connects your business goals with meaningful customer experiences.",
    href: "/contact",
    accent: {
      tile: "bg-[#10b981]/10 text-[#10b981] group-hover:bg-[#10b981] group-hover:text-white",
      border: "hover:border-[#10b981]/50",
      wash: "hover:bg-[#10b981]/[0.04]",
    },
  },
];

export function AboutCapabilities() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              What we do
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <RevealHeading as="h2" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.4rem]">
            Everything you need to
            <br className="hidden sm:block" /> build a stronger digital presence.
          </RevealHeading>
        </Reveal>

        <Reveal delay={0.05}>
          <Link
            href="/website-design-company-in-nagpur"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand transition-colors hover:text-navy"
          >
            View Our Services
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className="h-full">
            <Link
              href={s.href}
              className={`group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors duration-300 ${s.accent.wash} ${s.accent.border}`}
            >
              <span
                className={`grid size-11 place-items-center rounded-xl transition-colors duration-300 ${s.accent.tile}`}
              >
                <s.icon className="size-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}