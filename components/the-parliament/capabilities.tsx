import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
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

const bars = [44, 68, 52, 86, 60, 74];

export function TpCapabilities() {
  const s = tp.capabilities;
  const [lead] = s.title.split("Timewheel");

  return (
    <section className="tp-sec tp-built">
      <div className="tp-container tp-built-inner">
        <div className="tp-built-main">
          <Reveal className="tp-built-head">
            <p className="tp-built-kicker">
              <span className="tp-built-num">{s.number}</span>
              {s.label}
            </p>
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

        <Reveal className="tp-built-visual" aria-hidden="true">
          <span className="tp-built-glow" />

          <div className="tp-browser">
            <div className="tp-browser-bar">
              <span className="tp-browser-dot" />
              <span className="tp-browser-dot" />
              <span className="tp-browser-dot" />
              <span className="tp-browser-url">theparliament.in</span>
            </div>
            <div className="tp-browser-body">
              <div className="tp-browser-side">
                <span className="tp-side-logo">
                  <Building2 size={14} strokeWidth={2} />
                </span>
                <span className="tp-side-item is-on" />
                <span className="tp-side-item" />
                <span className="tp-side-item" />
                <span className="tp-side-item" />
              </div>
              <div className="tp-browser-main">
                <div className="tp-browser-head">
                  <span className="tp-browser-title">THE PARLIAMENT</span>
                  <span className="tp-browser-pill">Live</span>
                </div>
                <div className="tp-browser-stats">
                  <div className="tp-stat">
                    <span className="tp-stat-k">Members</span>
                    <span className="tp-stat-v">1,248</span>
                  </div>
                  <div className="tp-stat">
                    <span className="tp-stat-k">Collected</span>
                    <span className="tp-stat-v">₹4.2L</span>
                  </div>
                </div>
                <div className="tp-browser-photo">
                  <Building2 size={20} strokeWidth={1.5} />
                </div>
                <div className="tp-browser-chart">
                  {bars.map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tp-phone">
            <span className="tp-phone-notch" />
            <div className="tp-phone-head">
              <span className="tp-phone-av" />
              <span className="tp-phone-lines">
                <span />
                <span />
              </span>
            </div>
            <div className="tp-phone-card" />
            <div className="tp-phone-card tp-phone-card--sm" />
            <div className="tp-phone-nav">
              <span className="is-on" />
              <span />
              <span />
            </div>
          </div>

          <span className="tp-live-badge">
            <span className="tp-live-check">
              <Check size={11} strokeWidth={3.4} />
            </span>
            Live in production
          </span>
        </Reveal>
      </div>
    </section>
  );
}
