import { siFacebook, siInstagram, siX, siYoutube } from "simple-icons";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

// Simple Icons dropped LinkedIn, so its official glyph is inlined (448x512).
type BrandLogo = { path: string; hex: string; viewBox?: string };

const brandLogos: Record<string, BrandLogo> = {
  Instagram: siInstagram,
  Facebook: siFacebook,
  LinkedIn: {
    hex: "0A66C2",
    viewBox: "0 0 448 512",
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
  },
  YouTube: siYoutube,
  X: siX,
};

export function SmmPlatforms() {
  const rows = smm.platforms.items;
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
              <span className="size-1.5 rounded-full bg-brand" />
              {smm.platforms.label}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              {smm.platforms.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground md:text-lg">{smm.platforms.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {rows.map((p) => {
              const logo = brandLogos[p.name];
              return (
                <div key={p.name} className="group relative flex flex-col overflow-hidden bg-card p-7 transition-colors hover:bg-secondary/40">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: p.tone }}
                  />
                  <span className="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-border">
                    {logo && (
                      <svg viewBox={logo.viewBox ?? "0 0 24 24"} role="img" aria-hidden className="size-6" style={{ fill: `#${logo.hex}` }}>
                        <path d={logo.path} />
                      </svg>
                    )}
                    {!logo && (
                      <span className="text-sm font-black tracking-tight text-foreground">
                        {p.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                  <p className="mt-5 flex items-center gap-2 text-base font-bold">
                    {p.name}
                    <span className="size-1.5 rounded-full" style={{ background: p.tone }} />
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}