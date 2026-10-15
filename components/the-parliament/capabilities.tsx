import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bell,
  Check,
  Code2,
  Compass,
  Database,
  MessagesSquare,
  PenTool,
  ShieldCheck,
  Video,
  Wallet,
} from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";

const iconMap = {
  compass: Compass,
  pen: PenTool,
  code: Code2,
  database: Database,
  shield: ShieldCheck,
  wallet: Wallet,
  video: Video,
  bell: Bell,
  message: MessagesSquare,
} as const;

export function TpCapabilities() {
  const s = tp.capabilities;
  const [lead] = s.title.split("Timewheel");

  return (
    <section className="tp-sec tp-built">
      <div className="tp-container tp-built-inner">
        <div className="tp-built-main">
          <Reveal className="tp-built-head">
            <h2 className="tp-built-title">
              {lead}
              <span className="tp-built-accent">Timewheel</span>.
            </h2>
            <p className="tp-built-lede">{s.body}</p>
          </Reveal>

          <Reveal className="tp-built-grid" stagger>
            {s.items.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Code2;
              return (
                <div className="tp-built-card" key={item.label}>
                  <span className="tp-built-ic">
                    <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="tp-built-name">{item.label}</span>
                  <ArrowRight
                    className="tp-built-arrow"
                    size={14}
                    strokeWidth={2.1}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </Reveal>

          <Link href={s.linkHref} className="tp-built-link">
            {s.linkLabel}
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>

        <Reveal className="tp-built-visual">
          <span className="tp-built-glow" aria-hidden="true" />

          <div className="tp-built-shot">
            <Image
              src="/parliament1.png"
              alt="The Parliament member portal running in production"
              width={1711}
              height={919}
              sizes="(max-width: 980px) 100vw, 44vw"
              className="tp-built-shot-img"
            />
          </div>

            
        </Reveal>
      </div>
    </section>
  );
}
