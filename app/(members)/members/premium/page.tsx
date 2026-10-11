import type { Metadata } from "next";
import Link from "next/link";
import { Check, Crown, FileText, Lock, ShieldCheck } from "lucide-react";
import { WheelIllustration } from "@/components/members/library/wheel-illustration";
import { PremiumCheckout } from "@/components/members/premium-checkout";
import { listDownloads, listReceipts } from "@/lib/members/data";
import { formatDate, isLifetime } from "@/lib/members/config";
import { premiumOffer } from "@/lib/members/premium";
import { requireMember } from "@/lib/members/session";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Membership & billing" };

const perks = [
  "Every Premium download: in-depth playbooks, templates and tools",
  "Everything in your free membership",
  "New Premium resources as they're added",
  "A crown next to your name in the community",
];

export default async function PremiumPage() {
  const m = await requireMember("/members/premium");
  const [premiumItems, receipts] = await Promise.all([listDownloads("premium", 50), listReceipts(m.id)]);
  const offer = premiumOffer();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Your account</p>
        <h1 className="mt-2 font-heading font-extrabold tracking-tight">Membership &amp; billing</h1>
      </header>

      {m.hasPaidPremium ? (
        <section className="grid gap-6 rounded-lg bg-ink p-6 text-white sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <span className="grid size-12 place-items-center rounded-lg bg-brand">
              <Crown className="size-6" />
            </span>
            <p className="mt-4 font-heading text-2xl font-extrabold">You&apos;re a Premium member</p>
            <p className="mt-1 text-white/70">
              {isLifetime(m.premiumUntil) ? "Lifetime access. Thank you!" : `Your Premium access is active until ${formatDate(m.premiumUntil)}.`}
            </p>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {p}
                </li>
              ))}
            </ul>
          </div>
          {offer.price && !isLifetime(m.premiumUntil) && (
            <div className="rounded-lg bg-white/5 p-5 md:w-64">
              <p className="text-sm font-semibold">Add another {offer.period}</p>
              <p className="mt-1 text-xs text-white/60">Extends from your current end date, so you never lose days.</p>
              <div className="mt-4 [&_button]:w-full">
                <PremiumCheckout price={offer.price} period={offer.period} name={m.name} email={m.email} />
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="grid gap-6 rounded-lg border border-brand/30 bg-brand/[0.05] p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_260px] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text">{m.isAdmin ? "Team access" : "Timewheel Premium"}</p>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
              {offer.price ? (
                <>
                  ₹{offer.price.toLocaleString("en-IN")}
                  <span className="text-lg font-bold text-muted-foreground"> / {offer.period}</span>
                </>
              ) : (
                "Go Premium"
              )}
            </p>
            {m.isAdmin && <p className="mt-1 text-sm text-muted-foreground">As an admin you can already open every resource.</p>}
            <ul className="mt-5 space-y-2 text-sm">
              {perks.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              {offer.price ? (
                <PremiumCheckout price={offer.price} period={offer.period} name={m.name} email={m.email} />
              ) : (
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Timewheel Premium membership")}`}
                  className="btn btn-primary inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-brand-foreground"
                >
                  Ask us about Premium
                </a>
              )}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" /> Secure payment by Zoho Payments. One payment, no automatic renewal.
            </p>
          </div>
          <WheelIllustration className="mx-auto hidden w-full max-w-[260px] md:block" />
        </section>
      )}

      <section>
        <p className="mb-3 font-heading text-lg font-bold">What&apos;s in Premium right now</p>
        {premiumItems.length ? (
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {premiumItems.map((d) => (
              <li key={d.id} className="flex items-start gap-3 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-text">
                  <FileText className="size-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{d.title}</p>
                  {d.description && <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{d.description}</p>}
                </div>
                {!m.isPremium && <Lock className="mt-1 size-4 shrink-0 text-muted-foreground" />}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">The Premium library is being put together.</p>
        )}
        {m.isPremium && (
          <Link href="/members/premium-downloads" className="mt-3 inline-block text-sm font-semibold text-brand-text hover:underline">
            Go to Premium downloads
          </Link>
        )}
      </section>

      <section>
        <p className="mb-3 font-heading text-lg font-bold">Receipts</p>
        {receipts.length ? (
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Date</th>
                  <th className="px-4 py-2.5 font-semibold">For</th>
                  <th className="px-4 py-2.5 font-semibold">Amount</th>
                  <th className="px-4 py-2.5 font-semibold">Payment ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {receipts.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">{formatDate(r.paid_at)}</td>
                    <td className="px-4 py-3">{r.purpose}</td>
                    <td className="px-4 py-3 tabular-nums">₹{r.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.provider_payment_id ?? r.id.slice(0, 8)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No payments yet. Receipts for Premium purchases appear here and arrive by email.</p>
        )}
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <p className="font-heading text-base font-bold">Questions</p>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="font-semibold">Does Premium renew automatically?</dt>
            <dd className="mt-0.5 text-muted-foreground">No. One payment covers {offer.period}. We&apos;ll never charge you again without you choosing to.</dd>
          </div>
          <div>
            <dt className="font-semibold">What happens when it ends?</dt>
            <dd className="mt-0.5 text-muted-foreground">You keep your account, free downloads and the community. Premium files lock again until you renew.</dd>
          </div>
          <div>
            <dt className="font-semibold">Need an invoice or help with a payment?</dt>
            <dd className="mt-0.5 text-muted-foreground">
              Email{" "}
              <a href={`mailto:${site.contact.email}`} className="font-semibold text-brand-text hover:underline">
                {site.contact.email}
              </a>{" "}
              and we&apos;ll sort it out.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
