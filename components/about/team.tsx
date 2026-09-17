import Image from "next/image";
import { Reveal } from "@/components/reveal";

const members = [
  {
    name: "Devika Rao",
    role: "Design Lead",
    line: "Brand identity, interfaces and the detail that makes products feel intentional.",
    img: "https://picsum.photos/seed/timewheel-devika/600/750",
    accent: "#fe5100",
  },
  {
    name: "Arjun Mehta",
    role: "Engineering Lead",
    line: "Fast, clean builds and launch-ready platforms on modern web tech.",
    img: "https://picsum.photos/seed/timewheel-arjun/600/750",
    accent: "#2563eb",
  },
  {
    name: "Isha Patil",
    role: "Strategy & SEO",
    line: "Search research and positioning that gets businesses found.",
    img: "https://picsum.photos/seed/timewheel-isha/600/750",
    accent: "#8b5cf6",
  },
];

export function AboutTeam() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            The team
          </p>
          <span className="h-px w-12 bg-brand/40" />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.4rem]">
          A small studio,
          <br className="hidden sm:block" /> deeply invested in your work.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          We&apos;re a compact team of designers, engineers and strategists,
          based in Nagpur, working remote-first with clients across India and
          worldwide.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07} className="h-full">
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: m.accent }}
                >
                  {m.role}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {m.line}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}