import Link from "next/link";
import { Check, Crown } from "lucide-react";
import { WheelIllustration } from "@/components/members/library/wheel-illustration";

// The peach "You're a Free Member" panel from the mockup, with real numbers only.
export function UpgradeBanner({ premiumCount, price, period }: { premiumCount: number; price: number | null; period: string }) {
  const points = [
    premiumCount ? `${premiumCount} Premium ${premiumCount === 1 ? "resource" : "resources"} today` : "The Premium library",
    "In-depth playbooks, templates and guides",
    "New Premium resources as they're added",
  ];
  return (
    <section className="grid items-center gap-6 rounded-lg border border-brand/30 bg-brand/[0.05] p-5 sm:p-6 2xl:grid-cols-[minmax(0,1fr)_auto]">
      <div className="flex gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-brand text-white">
          <Crown className="size-7" />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-lg font-extrabold tracking-tight">You&apos;re a Free Member</p>
          <p className="mt-1 text-sm text-muted-foreground">Upgrade to unlock the Premium library: guides, templates and tools to help you market smarter.</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
            {points.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-4 border-t border-brand/20 pt-5 2xl:border-l 2xl:border-t-0 2xl:pl-6 2xl:pt-0">
        <WheelIllustration className="hidden h-24 w-36 sm:block" />
        <div className="w-full text-center sm:w-auto sm:text-left 2xl:text-center">
          <Link href="/members/premium" className="btn btn-primary inline-flex h-11 w-full items-center justify-center rounded-lg px-6 text-sm font-semibold text-brand-foreground sm:w-auto">
            Upgrade to Premium
          </Link>
          {price && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              ₹{price.toLocaleString("en-IN")} for {period}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
