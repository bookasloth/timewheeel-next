import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, MessagesSquare } from "lucide-react";
import { site } from "@/lib/site";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Help & support" };

const faqs: [string, string][] = [
  ["How do I download a file?", "Open Resource library, Free downloads or Premium downloads and press Download. Files open as a normal download in your browser."],
  ["Why is a resource locked?", "Locked resources are part of Premium. Upgrade from Membership & billing to open them."],
  ["I joined with Google. Do I have a password?", "No. Accounts created with Google sign in with Google only, so there's no password to reset."],
  ["How do I change my name or profile?", "Go to Profile & account. Your name, headline and bio show next to your posts and on your profile."],
  ["How do I stop emails?", "Go to Profile & account, Email preferences, and switch off replies or announcements. Every email also has an unsubscribe note."],
  ["How do I delete my account?", "Profile & account has a Delete account section at the bottom. It removes your profile and posts permanently."],
];

export default async function HelpPage() {
  const m = await requireMember("/members/help");
  const ways = [
    {
      icon: Mail,
      title: "Email us",
      text: `${site.contact.email} · ${site.contact.responseTime.toLowerCase()}`,
      href: `mailto:${site.contact.email}?subject=${encodeURIComponent("Member support")}&body=${encodeURIComponent(`Account: ${m.email}\n\n`)}`,
      cta: "Write an email",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      text: `${site.contact.phone} · ${site.contact.hours}`,
      href: `https://wa.me/${site.contact.whatsappDigits}?text=${encodeURIComponent("Hi Timewheel, I need help with my member account.")}`,
      cta: "Open WhatsApp",
    },
    {
      icon: MessagesSquare,
      title: "Ask the community",
      text: "Post in Questions and other members or the team will help.",
      href: "/members/community/new?topic=questions",
      cta: "Ask a question",
    },
  ];
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Your account</p>
        <h1 className="mt-2 font-heading font-extrabold tracking-tight">Help &amp; support</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">Stuck with something? Here&apos;s how to reach us.</p>
      </header>
      <section className="grid gap-4 sm:grid-cols-3">
        {ways.map(({ icon: Icon, title, text, href, cta }) => (
          <div key={title} className="flex flex-col rounded-lg border border-border bg-surface p-5">
            <span className="grid size-10 place-items-center rounded-lg bg-brand/10 text-brand-text">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <p className="mt-3 text-sm font-semibold">{title}</p>
            <p className="mt-1 flex-1 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
            <Link href={href} className="btn btn-outline mt-4 inline-flex justify-center rounded-lg px-4 py-2 text-sm font-semibold">
              {cta}
            </Link>
          </div>
        ))}
      </section>
      <section>
        <p className="mb-3 font-heading text-lg font-bold">Common questions</p>
        <div className="divide-y divide-border rounded-lg border border-border bg-surface">
          {faqs.map(([q, a]) => (
            <details key={q} className="group p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {q}
                  <span className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
