import { CalendarDays, FileDown, FolderOpen, LogIn, Mail, MessageCircle } from "lucide-react";
import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

const iconMap = {
  mail: Mail,
  storage: FolderOpen,
  calendar: CalendarDays,
  chat: MessageCircle,
  sso: LogIn,
  export: FileDown,
} as const;

export function AfIntegrations() {
  const s = arch.integrations;
  return (
    <section className="af-sec af-tint">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="af-integrations">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.name} className="af-integration af-integration--grid">
                <span className="af-integration-glow" aria-hidden="true" />
                <span className="af-ic af-ic--on-dark">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="af-integration-info">
                  <span className="af-integration-name">{item.name}</span>
                  <span className="af-integration-hint">Connect in one step</span>
                </div>
                <span className="af-integration-plus" aria-hidden="true">
                  +
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
