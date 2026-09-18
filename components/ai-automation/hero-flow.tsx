import { UserPlus, Robot, PaperPlaneTilt, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const nodes = [
  { icon: UserPlus, tint: "text-accent-blue bg-accent-blue/10", title: "New Lead", caption: "From ads, site or WhatsApp", featured: false },
  { icon: Robot, tint: "text-brand bg-brand/10", title: "AI Assistant qualifies lead", caption: "Scores and routes it automatically", featured: true },
  { icon: PaperPlaneTilt, tint: "text-accent-pink bg-accent-pink/10", title: "Auto follow-up", caption: "WhatsApp + email, instantly", featured: false },
];

// Brand-safe hero visual: a flat automation flow (no glow, no shadow).
export function AiHeroFlow() {
  return (
    <Reveal stagger y={16} className="mx-auto flex w-full max-w-sm flex-col items-stretch gap-0">
      {nodes.map((n, i) => (
        <div key={n.title} className="flex flex-col items-stretch">
          <div
            className={`flex items-center gap-4 rounded-xl border bg-surface p-4 ${
              n.featured ? "border-brand" : "border-border"
            }`}
          >
            <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg ${n.tint}`}>
              <n.icon weight="duotone" className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-navy">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.caption}</p>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <span className="mx-auto flex h-8 items-center text-brand/50">
              <ArrowDown weight="bold" className="size-5" />
            </span>
          )}
        </div>
      ))}
    </Reveal>
  );
}
