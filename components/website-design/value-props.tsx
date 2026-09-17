import { Code2, Compass, MousePointerClick, Palette } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";

const blockIcons = {
  compass: Compass,
  cursor: MousePointerClick,
  palette: Palette,
  code: Code2,
} as const;

export function WdVp() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-wblue">
            {wd.valueProps.label}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.75rem]">
            {wd.valueProps.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {wd.valueProps.body}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {wd.valueProps.blocks.map((block, i) => {
          const Icon = blockIcons[block.icon as keyof typeof blockIcons];
          return (
            <Reveal key={block.number} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-wsoft md:p-9">
                <div className="flex items-start justify-between">
                  <span
                    className="grid size-11 place-items-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ backgroundColor: `${block.accent}1a`, color: block.accent }}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span className="text-3xl font-black tracking-tight text-foreground/10 transition-colors duration-300 group-hover:text-foreground/20">
                    {block.number}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}