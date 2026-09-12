import { MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

export function SeoLocalities() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <Reveal>
        <h2 className="text-center text-2xl font-extrabold tracking-tight md:text-3xl">
          Serving businesses across Nagpur
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          Local SEO tuned to the neighbourhoods you actually serve.
        </p>
      </Reveal>
      <Reveal stagger className="mt-8 flex flex-wrap justify-center gap-3">
        {seo.localities.map((n) => (
          <span
            key={n}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
          >
            <MapPin className="size-3.5 text-brand" /> {n}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
