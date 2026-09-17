import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const faqs = [
  {
    q: "How fast will you reply?",
    a: "Within one business day, usually much sooner during IST business hours. Urgent queries get a WhatsApp heads-up even faster.",
  },
  {
    q: "Do you work with clients outside Nagpur?",
    a: "Yes. We're based in Nagpur but work remote-first with clients across India and worldwide. We align on hours that suit your team.",
  },
  {
    q: "Is the first conversation free?",
    a: "Always. A scope call is free and you keep the plan and recommendations either way, no obligation to move forward.",
  },
  {
    q: "Do you charge by the project or by the hour?",
    a: "Mostly fixed-scope projects with transparent pricing and milestones. Retainers are available for ongoing development, marketing, and support.",
  },
  {
    q: "What happens after I send a message?",
    a: "We reply with a clear next step, usually a scope call, then a fixed quote within 24 hours of that call, so you know exactly what you're getting.",
  },
];

export function ContactFaq() {
  return (
    <section className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Quick answers
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Before you get in touch
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card transition-colors open:border-brand/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-transform group-open:rotate-180">
                  <ChevronDown className="size-4" strokeWidth={2.2} />
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}