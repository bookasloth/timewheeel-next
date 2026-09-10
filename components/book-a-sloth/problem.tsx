import type { CSSProperties } from "react";
import {
  Banknote,
  CalendarX,
  Database,
  MessageSquare,
  Phone,
  TriangleAlert,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";

const icons = [MessageSquare, Phone, CalendarX, Banknote, TriangleAlert, Database] as const;

const colors = [
  { pain: "#FE5100", soft: "#FFF0E8" },
  { pain: "#2563EB", soft: "#EFF4FF" },
  { pain: "#EF4444", soft: "#FEEFEF" },
  { pain: "#8B5CF6", soft: "#F4EFFF" },
  { pain: "#EC4899", soft: "#FCE8F3" },
  { pain: "#0EA5E9", soft: "#EBF7FE" },
] as const;

export function BasProblem() {
  return (
    <section className="sx-sec">
      <div className="sx-container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="sx-h2 mt-7" style={{ whiteSpace: "pre-line" }}>
              {bas.problem.title}
            </h2>
            <p className="sx-text mt-6 max-w-sm" style={{ fontSize: "1.08rem" }}>
              {bas.problem.body}
            </p>
            <p className="sx-challenge-fact mt-7">{bas.problem.fact}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal stagger className="grid gap-4 sm:grid-cols-2">
            {bas.problem.items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const { pain, soft } = colors[i % colors.length];
              return (
                <div
                  key={item.name}
                  className="sx-pain"
                  style={{ "--pain": pain, "--pain-soft": soft } as CSSProperties}
                >
                  <div className="sx-pain-top">
                    <span className="sx-pain-ic">
                      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="sx-pain-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="sx-pain-name">{item.name}</h3>
                  <p className="sx-pain-desc">{item.desc}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}