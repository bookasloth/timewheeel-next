import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function RmFinalCta() {
  return (
    <section className="w-full">
      <Reveal className="relative overflow-hidden border-t border-white/10 bg-navy text-center text-white">
        <div className="relative px-8 pb-16 pt-20 md:pb-20 md:pt-24">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.06] tracking-tight md:text-6xl">
            Work With a Full-Service Agency for Your Restaurant Marketing
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Whether you&apos;re a local eatery or an established F&amp;B brand,
            we&apos;re the marketing partner that will help you drive traffic and
            maximize your brand&apos;s potential.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Let&apos;s help you get the best results — reach out today!
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
            >
              Reach Out Today
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