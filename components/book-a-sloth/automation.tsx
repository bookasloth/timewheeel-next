import type { CSSProperties } from "react";
import { ArrowRight, Bell, CalendarCheck, CalendarSync, CreditCard, LayoutDashboard, MailCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";

const icons = [CalendarCheck, CreditCard, CalendarSync, MailCheck, Bell, LayoutDashboard];

const flowColors = ["#FE5100", "#F59E0B", "#16A34A", "#0EA5E9", "#8B5CF6", "#EC4899"] as const;

export function BasAutomation() {
  return (
    <section id="automation" className="sx-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="sx-h2 mt-7" style={{ whiteSpace: "pre-line" }}>
            {bas.automation.title}
          </h2>
          <p
            className="sx-text mx-auto mt-6 max-w-2xl"
            style={{ fontSize: "1.08rem" }}
          >
            {bas.automation.body}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ol className="sx-flow-list sx-flow mt-0 md:mt-0">
            {bas.automation.steps.map((step, i) => {
              const Icon = icons[i % icons.length];
              const color = flowColors[i % flowColors.length];
              return (
                <li
                  key={step}
                  className="sx-flow-item"
                  style={{ "--flow": color } as CSSProperties}
                >
                  <span className="sx-flow-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sx-flow-ic">
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                  <span className="sx-flow-name">{step}</span>
                  {i < bas.automation.steps.length - 1 ? (
                    <span className="sx-flow-sep" aria-hidden="true">
                      <ArrowRight size={15} strokeWidth={1.6} />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}