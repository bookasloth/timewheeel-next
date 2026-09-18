import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";

export function WdStats() {
  return (
    <section className="border-y border-white/10 bg-black py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal stagger className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {wd.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black tracking-tight text-white md:text-4xl">
                {s.v}
              </p>
              <p className="mt-1.5 text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
