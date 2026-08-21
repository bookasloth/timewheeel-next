import { Boxes, ServerCog, UserCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const props = [
  {
    icon: Boxes,
    title: "Replace fragmented workflows",
    body: "Run bookings, payments, events, and communities from one connected system without juggling tools.",
  },
  {
    icon: UserCheck,
    title: "Own your customer relationships",
    body: "Keep your users, revenue, and audience under your control instead of platform dependency.",
  },
  {
    icon: ServerCog,
    title: "Build on infrastructure you control",
    body: "Own your operational systems and keep your business stable without recurring platform lock-ins.",
  },
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold md:text-4xl">
          Built with ownership-first systems for modern businesses
        </h2>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {props.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/40"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
              <p.icon className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
