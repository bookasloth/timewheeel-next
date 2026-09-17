import { MessageSquare, BadgeCheck, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us what you're building",
    desc: "A message, a call, or a booking — however it's easiest for you.",
  },
  {
    icon: BadgeCheck,
    title: "Get a scoped reply",
    desc: "Within one business day: direction, timeline, and a budget range.",
  },
  {
    icon: Rocket,
    title: "Build on systems you control",
    desc: "Kick off, ship, and keep full ownership of your product and code.",
  },
];

export function ContactSteps() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} className="h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-black text-[5.5rem] leading-none text-foreground/[0.05]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                    <s.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Step 0{i + 1}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}