import {
  Compass,
  Database,
  LayoutDashboard,
  Mail,
  Monitor,
  Package,
  PenTool,
  Server,
  Workflow,
  Code2,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";

const iconMap = {
  compass: Compass,
  pen: PenTool,
  code: Code2,
  server: Server,
  database: Database,
  layout: LayoutDashboard,
  workflow: Workflow,
  mail: Mail,
  monitor: Monitor,
  package: Package,
} as const;

const tints = [
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#6366f1",
  "#14b8a6",
  "#8b5cf6",
  "#22c55e",
  "#eab308",
  "#f43f5e",
  "#f59e0b",
];

export function BasCapabilities() {
  const items = bas.capabilities.items;
  const half = Math.ceil(items.length / 2);

  const columns = [
    items.filter((_, i) => i < half),
    items.filter((_, i) => i >= half),
  ];

  return (
    <section className="sx-sec">
      <div className="sx-container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="sx-h2 mt-7" style={{ whiteSpace: "pre-line" }}>
              {bas.capabilities.title}
            </h2>
            <p className="sx-text mt-6 max-w-sm" style={{ fontSize: "1.08rem" }}>
              {bas.capabilities.body}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-x-16 gap-y-0 sm:grid-cols-2">
            {columns.map((col, ci) => (
              <Reveal key={ci}>
                <ul className="sx-cap-list mt-0">
                  {col.map((item) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    const idx = items.indexOf(item);
                    const tint = tints[idx % tints.length];
                    return (
                      <li
                        key={item.label}
                        className="sx-cap-item"
                        style={{ "--tint": tint } as CSSProperties}
                      >
                        <span className="sx-cap-ic">
                          <Icon size={15} strokeWidth={1.6} />
                        </span>
                        <span className="sx-cap-name">{item.label}</span>
                        <span className="sx-row-num ms-auto" style={{ minWidth: 0 }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}