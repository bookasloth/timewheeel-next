import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Crown, Download, ShieldCheck, Users } from "lucide-react";

// Shared frame for login, register and password pages: the form on the right,
// what membership gets you on the left (below the form on phones).
export const metadata: Metadata = { robots: { index: false, follow: true } };

const perks = [
  { icon: Download, title: "Free downloads", text: "Resources from the Timewheel team, free for every member." },
  { icon: Crown, title: "Premium library", text: "Deeper material for members who upgrade to Premium." },
  { icon: Users, title: "Community", text: "Ask questions, share your work and learn from other members." },
  { icon: ShieldCheck, title: "Private by default", text: "We only use your login to sign you in. We never post anything for you." },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-12 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-16 md:py-24">
      <div className="order-2 md:order-1 md:pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Timewheel members</p>
        <p className="mt-3 max-w-md font-heading text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          One account for resources, Premium and the community.
        </p>
        <ul className="mt-8 space-y-5">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-brand">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 md:order-2">{children}</div>
    </section>
  );
}
