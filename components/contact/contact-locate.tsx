import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Contact block: intro + three info cards + map / message-form split.
// Design only — the form is presentational and is NOT wired to a backend.

const ADDRESS = "Eureka Coworking, Pratap Nagar Metro Square, Nagpur, Maharashtra";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Eureka Coworking Pratap Nagar Metro Square Nagpur",
)}&output=embed`;

const cards = [
  {
    icon: MapPin,
    title: "Our Address",
    lines: ["Eureka Coworking, Pratap Nagar", "Metro Square, Nagpur, Maharashtra"],
  },
  {
    icon: Mail,
    title: "Contact Info",
    lines: [site.contact.email, site.contact.phone],
  },
  {
    icon: MessageCircle,
    title: "Live Support",
    lines: ["Chat with us on WhatsApp", site.contact.hours],
  },
];

const field =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand focus:ring-2 focus:ring-brand/30";

export function ContactLocate() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Intro */}
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">Contact us</p>
          <RevealHeading as="h2" className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
            Our{" "}
            <span className="underline decoration-brand decoration-4 underline-offset-8">team</span>{" "}
            are here to help you.
          </RevealHeading>
        </Reveal>

        {/* Info cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <Reveal key={c.title} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card px-6 py-8 text-center">
                <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <c.icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-base font-bold">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted-foreground">{l}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Map + message form */}
        <Reveal className="mt-8 overflow-hidden rounded-3xl border border-border">
          <div className="grid lg:grid-cols-2">
            <iframe
              src={MAP_SRC}
              title={`Map to ${ADDRESS}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[360px] w-full border-0 lg:min-h-full"
            />

            {/* ponytail: design-only form, no submit handler by request */}
            <div className="bg-neutral-950 p-8 md:p-10">
              <h3 className="text-2xl font-extrabold tracking-tight text-white">Send Message.</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cl-name" className="mb-1.5 block text-sm font-semibold text-white/80">Name*</label>
                  <input id="cl-name" type="text" placeholder="Your name" className={field} />
                </div>
                <div>
                  <label htmlFor="cl-email" className="mb-1.5 block text-sm font-semibold text-white/80">Email*</label>
                  <input id="cl-email" type="email" placeholder="you@company.com" className={field} />
                </div>
                <div>
                  <label htmlFor="cl-message" className="mb-1.5 block text-sm font-semibold text-white/80">Your message*</label>
                  <textarea id="cl-message" rows={5} placeholder="How can we help?" className={field} />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-full rounded-lg px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-foreground"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
