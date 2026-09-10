import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/digital-marketing/counter";
import { rmStats } from "@/lib/restaurant-marketing";

const statColors = ["#fe5100", "#269cef", "#4ab765"];

// Dark "in numbers" band — stroke counts with a subtle ring decoration.
export function RmTrust() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy text-white">
      {/* flat tonal washes instead of blurred orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 12% 0%, rgba(254,81,0,0.14), transparent 60%), radial-gradient(50% 70% at 88% 100%, rgba(255,204,28,0.10), transparent 60%)",
        }}
      />
      {/* faint concentric-ring decoration, top-right */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        fill="none"
        className="pointer-events-none absolute -right-16 -top-16 size-64 text-white/[0.06]"
      >
        <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="100"
          cy="100"
          r="56"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <circle cx="100" cy="36" r="4" fill="currentColor" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <Reveal className="mt-8 grid grid-cols-2 md:grid-cols-3">
          {rmStats.map((s, i) => (
            <div
              key={s.label}
              className={
                i % 2 === 1
                  ? "group flex flex-col items-center border-l border-white/10 pl-6 text-center md:border-l md:pl-8"
                  : "group flex flex-col items-center pr-6 text-center md:pr-8"
              }
            >
              <p className="flex -translate-y-0 items-baseline gap-1 text-4xl font-black leading-none tracking-tight transition-transform duration-300 group-hover:-translate-y-1 md:text-6xl">
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: `2.5px ${statColors[i % statColors.length]}` }}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-2 h-px w-12 bg-white/15 transition-colors duration-300 group-hover:bg-brand/60" />
              <p className="mt-3 pb-1 text-sm font-medium text-white/55 transition-colors duration-300 group-hover:text-white">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}