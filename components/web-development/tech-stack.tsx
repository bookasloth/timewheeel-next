import { Reveal } from "@/components/reveal";
import { TechStackMount } from "./tech-stack-mount";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function WdTechStack() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Tech stack</p>
          <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            What we build with, and why it matters
          </RevealHeading>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Modern, well-supported tools, chosen for speed, security and the fact that any
            developer can pick them up after us. No obscure lock-in.
          </p>
        </Reveal>

        <TechStackMount />
      </div>
    </section>
  );
}