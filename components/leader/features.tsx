import { Layers, MailCheck, Search, Target } from "lucide-react";
import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";
import { LfHead } from "./head";
import { cn } from "@/lib/utils";

const iconMap = {
  sweep: Search,
  dedup: Layers,
  flags: MailCheck,
  score: Target,
} as const;

const kickerMap = {
  sweep: "Mapping",
  dedup: "Dedup",
  flags: "Signals",
  score: "Scoring",
} as const;

const bars = [36, 58, 48, 82, 70];

export function LfFeatures() {
  const s = leader.features;
  const ticker = [...s.also, ...s.also];

  return (
    <section className="lf-bento">
      <div className="lf-container">
        <LfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="lf-tiles">
          {s.items.map((item, i) => {
            const key = item.icon as keyof typeof iconMap;
            const Icon = iconMap[key];
            const wide = i === 0 || i === 3;
            return (
              <Reveal key={item.name} className={cn("lf-tile", wide && "lf-tile--wide")}>
                <p className="lf-tile-kicker">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {kickerMap[key]}
                  <Icon className="lf-tile-glyph" size={16} strokeWidth={1.8} aria-hidden="true" />
                </p>
                <h3 className="lf-tile-name">{item.name}</h3>
                <p className="lf-tile-desc">{item.desc}</p>
                {key === "sweep" && (
                  <div className="lf-mini" aria-hidden="true">
                    {Array.from({ length: 18 }, (_, n) => (
                      <i key={n} className={n % 3 !== 2 ? "on" : undefined} />
                    ))}
                  </div>
                )}
                {key === "score" && (
                  <div className="lf-bars" aria-hidden="true">
                    {bars.map((h, n) => (
                      <i key={n} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
        <p className="lf-ticker-label">{s.alsoLabel}</p>
        <div className="lf-ticker">
          <ul className="lf-ticker-track">
            {ticker.map((a, i) => (
              <li key={`${a}-${i}`} aria-hidden={i >= s.also.length || undefined}>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
