import { MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { dmFaq } from "@/lib/digital-marketing";

const cities = ["Nagpur", "Pune", "Mumbai", "Maharashtra", "India"];

export function DmLocal() {
  const locations = dmFaq.find((f) => f.q.toLowerCase().includes("locations"));
  return (
    <section className="bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                Local-first marketing
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Strong Presence Where Your Customers Actually Search
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {locations
                  ? locations.a
                  : "We help local businesses appear, engage, and convert in the searches that matter most to them."}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Where we work
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {cities.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    <MapPin className="size-4 text-brand" />
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Headquartered in Nagpur, supporting businesses across the state
                and throughout India.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}