import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

const DOT_GRID = "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 pt-20 md:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: DOT_GRID, backgroundSize: "26px 26px" }}
        />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-[110px]" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/[0.06] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-2xl py-16 text-center md:py-20">
        <RevealHeading as="h2" className="mx-auto text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
          Have an idea? Let&apos;s build
          <br />
          <span className="text-brand">something great.</span>
        </RevealHeading>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Whether you need a new website, a better digital experience, or a
          clear direction for your next project, we&apos;d love to hear what
          you&apos;re working on.
        </p>
        <div className="mt-9 flex flex-col items-center gap-5">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
          >
            Start a Project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Tell us about your project
          </Link>
        </div>
      </div>
    </section>
  );
}