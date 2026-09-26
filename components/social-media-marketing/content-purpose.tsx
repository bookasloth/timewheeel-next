import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Editorial content-purpose index. Big display labels replace generic cards,
// each row is an outcome the content must earn, with a full-width hairline.
export function SmmContentPurpose() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
          <span className="size-1.5 rounded-full bg-brand" />
          {smm.contentPurpose.label}
        </p>
        <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.contentPurpose.heading}
        </RevealHeading>
        <p className="mt-4 text-muted-foreground md:text-lg">{smm.contentPurpose.body}</p>
      </Reveal>

      <div className="mt-14">
        {smm.contentPurpose.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="group grid gap-3 border-t border-border/70 py-8 last:border-b md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-8">
              <div className="flex items-baseline gap-5 lg:gap-8">
                <p className="shrink-0 text-sm font-black tracking-tight text-muted-foreground/40 lg:w-10">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-black uppercase leading-none tracking-tighter text-brand transition-colors duration-300 group-hover:text-brand-text md:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
              </div>
              <p className="flex items-center gap-3 pl-10 text-sm leading-relaxed text-muted-foreground md:pl-0 md:text-base lg:pl-0">
                <ArrowUpRight className="size-4 shrink-0 text-brand/60 transition-colors duration-300" />
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}