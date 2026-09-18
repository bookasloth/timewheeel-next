import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

export function SdProcess() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SdSectionHeading
        label={sd.process.label}
        heading={sd.process.heading}
        accent={sd.process.headingAccent}
        body={sd.process.body}
      />
      <div className="relative mt-14">
        <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-border lg:block" />
        <Reveal stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {sd.process.steps.map((s, i) => (
            <div key={s.title} className="relative text-center lg:text-left">
              <span className="relative z-10 grid size-11 place-items-center rounded-full bg-brand text-sm font-black text-brand-foreground shadow-sm lg:mx-0 mx-auto">
                {i + 1}
              </span>
              <h3 className="mt-4 text-sm font-bold">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
