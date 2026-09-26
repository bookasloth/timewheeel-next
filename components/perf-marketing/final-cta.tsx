import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function PmFinalCta() {
  return (
    <section className="mx-auto max-w-full px-6 py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl text-center text-white pm-panel">
        <div aria-hidden className="pointer-events-none absolute inset-0 pm-dot-grid opacity-50" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full pm-bloom dm-drift opacity-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full pm-bloom dm-drift opacity-40"
        />
        <div className="relative px-8 pb-16 pt-20 md:pb-20 md:pt-24">
          <RevealHeading as="h2" className="mx-auto max-w-3xl text-4xl font-black leading-[1.06] tracking-tight md:text-6xl">
            Ready to{" "}
            <span
              className="dm-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ffcc1c, #f59e0b, #f4b400, #ffcc1c)",
              }}
            >
              Grow
            </span>{" "}
            Online?
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Let&apos;s build a digital marketing plan around your business,
            bringing SEO, ads, social, and content together to capture every
            enquiry and turn it into sales.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
            >
              Book a Meeting
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#services"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
