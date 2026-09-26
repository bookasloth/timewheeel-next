import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function AboutIntro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Who we are
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <RevealHeading as="h2" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.6rem]">
            We turn ideas into
            <br className="hidden sm:block" /> digital experiences people
            remember.
          </RevealHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              At TIMEWHEEL, we combine strategy, design, and technology to
              create digital experiences that help businesses communicate
              better, look better, and grow with confidence.
            </p>
            <p>
              We believe great digital products should not only look good. They
              should be purposeful, easy to use, technically sound, and
              designed around the people who use them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}