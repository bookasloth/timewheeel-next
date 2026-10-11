import type { Metadata } from "next";
import { Check, Crown } from "lucide-react";
import { DownloadList, EmptyState } from "@/components/members/download-list";
import { MemberPageHeader } from "@/components/members/page-header";
import { PremiumCheckout } from "@/components/members/premium-checkout";
import { Alert } from "@/components/members/ui";
import { listDownloads } from "@/lib/members/data";
import { formatDate, isLifetime } from "@/lib/members/config";
import { premiumOffer } from "@/lib/members/premium";
import { requireMember } from "@/lib/members/session";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Premium downloads" };

export default async function PremiumDownloadsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/premium-downloads"), searchParams]);
  const items = await listDownloads("premium");
  const offer = premiumOffer();

  return (
    <div className="space-y-8">
      <MemberPageHeader
        eyebrow="Downloads"
        title="Premium downloads"
        intro={
          m.isPremium
            ? m.isAdmin && !m.premiumUntil
              ? "You have Premium access as an admin."
              : `Your Premium access runs ${isLifetime(m.premiumUntil) ? "for life" : `until ${formatDate(m.premiumUntil)}`}.`
            : "The full library, for Premium members."
        }
      />

      {!m.isPremium && (
        <section className="rounded-lg border border-brand/40 bg-brand/[0.04] p-5 sm:p-7">
          {sp.locked && (
            <div className="mb-5">
              <Alert tone="info">That file is part of Premium. Upgrade to download it.</Alert>
            </div>
          )}
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground">
              <Crown className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-xl font-extrabold tracking-tight">Upgrade to Premium</p>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  `Every Premium download${items.length ? ` (${items.length} now, more as we add them)` : ", as we add them"}`,
                  "Everything in your free membership",
                  offer.price ? `One payment covers ${offer.period}. It doesn't renew on its own.` : null,
                ]
                  .filter(Boolean)
                  .map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-rating" />
                      {t}
                    </li>
                  ))}
              </ul>
              <div className="mt-6">
                {offer.price ? (
                  <PremiumCheckout price={offer.price} period={offer.period} name={m.name} email={m.email} />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>Online checkout for Premium isn&apos;t open yet.</p>
                    <a
                      href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Timewheel Premium membership")}&body=${encodeURIComponent(`Hi Timewheel team, I'd like Premium for my account (${m.email}).`)}`}
                      className="btn btn-primary mt-3 inline-flex rounded-lg px-5 py-2.5 text-sm font-semibold text-brand-foreground"
                    >
                      Ask us about Premium
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {items.length ? (
        <DownloadList items={items} locked={!m.isPremium} />
      ) : (
        <EmptyState title="No Premium downloads yet" admin={m.isAdmin}>
          The Premium library is being put together. New files will show up here.
        </EmptyState>
      )}
    </div>
  );
}
