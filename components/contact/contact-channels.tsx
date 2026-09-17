import { ArrowUpRight, CalendarClock, Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const channels = [
  {
    title: "Email",
    value: site.contact.email,
    note: "For briefs, quotes, and anything in writing.",
    href: `mailto:${site.contact.email}`,
    icon: Mail,
  },
  {
    title: "WhatsApp",
    value: site.contact.phone,
    note: "Fast replies for quick questions.",
    href: `https://wa.me/${site.contact.whatsappDigits}?text=${encodeURIComponent("Hi Timewheel, I'd like to discuss a project.")}`,
    icon: MessageCircle,
  },
  {
    title: "Call",
    value: site.contact.phone,
    note: "Prefer talking? We're on IST business hours.",
    href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    title: "Book a meeting",
    value: "30-minute intro call",
    note: "Get a straight answer on scope, timeline and budget.",
    href: site.calendlyUrl,
    icon: CalendarClock,
  },
];

export function ContactChannels() {
  return (
    <section className="border-b border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <Reveal key={c.title} className="h-full">
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <c.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
                <h2 className="mt-4 text-lg font-bold">{c.title}</h2>
                <p className="mt-1 text-sm font-semibold text-foreground">{c.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}