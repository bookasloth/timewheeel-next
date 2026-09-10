import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { dmAudience } from "@/lib/digital-marketing2";

export function Dm2Audience() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Who it&apos;s for
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Tailored Digital Marketing for Every Business
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          No two businesses are the same — so neither are our strategies. Here
          are the teams we help most.
        </p>
      </Reveal>

      <Reveal stagger className="mt-12 divide-y divide-border border-y border-border">
        {dmAudience.map((a) => (
          <article
            key={a.number}
            className="group grid gap-2 py-7 transition-colors duration-300 hover:bg-secondary/30 md:grid-cols-12 md:items-center md:gap-8 md:rounded-xl md:px-5 md:py-8"
          >
            <span className="text-sm font-black tracking-tight text-muted-foreground/30 transition-colors duration-300 group-hover:text-brand md:text-lg">
              ({a.number})
            </span>
            <h3 className="text-xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-brand md:col-span-4 md:text-2xl">
              {a.title}
            </h3>
            <p className="text-muted-foreground md:col-span-6">{a.body}</p>
            <ArrowUpRight className="hidden size-5 justify-self-end text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100 md:col-span-1 md:block" />
          </article>
        ))}
      </Reveal>
    </section>
  );
}
