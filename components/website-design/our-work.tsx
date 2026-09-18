import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";

export function WdOurWork() {
  return (
    <section className="border-y border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-wblue">{wd.ourWork.label}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
            {wd.ourWork.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">{wd.ourWork.body}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wd.ourWork.cases.map((c, i) => (
            <Reveal key={c.name} className="h-full" delay={i * 0.06}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(17,24,39,0.3)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${c.accent}1a`, color: c.accent }}
                  >
                    {c.category}
                  </span>
                  <ArrowUpRight
                    className="size-3.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: c.accent }}
                  />
                </div>

                <h3 className="mt-3 text-lg font-extrabold tracking-tight">{c.name}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {c.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-wsoft px-2 py-0.5 text-[10px] font-bold text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {c.metric}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-bold"
                    style={{ color: c.accent }}
                  >
                    View case
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}