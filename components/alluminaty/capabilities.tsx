import { Check, Code2, Compass, PenTool, ShieldCheck } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const iconMap = {
  compass: Compass,
  pen: PenTool,
  code: Code2,
  shield: ShieldCheck,
} as const;

export function AzCapabilities() {
  const s = az.capabilities;
  const [titleLead, titleAccent] = s.title.split("\n");

  return (
    <section className="az-sec az-caps">
      <span className="az-caps-glow az-caps-glow--blue" aria-hidden="true" />
      <span className="az-caps-glow az-caps-glow--teal" aria-hidden="true" />
      <span className="az-caps-ghost" aria-hidden="true">
        {s.number}
      </span>

      <div className="az-container az-caps-inner">
        <Reveal className="az-caps-head">
          <h2 className="az-h az-caps-title">
            {titleLead}
            {titleAccent ? (
              <>
                <br />
                <span className="az-accent-serif">{titleAccent}</span>
              </>
            ) : null}
          </h2>
          <p className="az-lede az-caps-lede">{s.body}</p>
          <span className="az-caps-rule" aria-hidden="true" />
        </Reveal>

        <Reveal className="az-caps-grid" stagger>
          {s.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Compass;
            return (
              <article className="az-cap" key={item.name}>
                <span className="az-cap-top" aria-hidden="true" />
                <div className="az-cap-head">
                  <span className="az-cap-ic">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="az-cap-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="az-cap-name">{item.name}</h3>
                <p className="az-cap-desc">{item.desc}</p>
                <ul className="az-cap-list">
                  {item.points.map((point) => (
                    <li key={point}>
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
