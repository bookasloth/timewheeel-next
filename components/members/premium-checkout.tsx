"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { OUTCOME_TEXT, payWithZoho, preloadCheckout, type Outcome } from "@/lib/zoho-checkout";
import { analytics, EVENTS } from "@/lib/analytics";
import { Alert } from "@/components/members/ui";

// Premium upgrade button. The server prices the order (/api/members/premium/order);
// the amount passed here is only for the shared request shape and is ignored.
export function PremiumCheckout({ price, period, name, email }: { price: number; period: string; name: string; email: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Exclude<Outcome, "paid"> | null>(null);
  const [error, setError] = useState("");

  async function pay() {
    setBusy(true);
    setError("");
    setOutcome(null);
    try {
      const result = await payWithZoho({ purpose: "Premium", amount: price, name, email }, "/api/members/premium/order");
      if (result === "paid") {
        analytics.track(EVENTS.PREMIUM_PURCHASED, { value: price, currency: "INR", period });
        router.refresh();
        return;
      }
      setOutcome(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong, please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={pay}
        onMouseEnter={preloadCheckout}
        onFocus={preloadCheckout}
        disabled={busy}
        aria-busy={busy}
        className="btn btn-primary inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-brand-foreground sm:w-auto"
      >
        {busy && <LoaderCircle className="size-4 animate-spin" />}
        Upgrade for ₹{price.toLocaleString("en-IN")} / {period}
      </button>
      {outcome && <Alert tone={OUTCOME_TEXT[outcome].tone === "bad" ? "bad" : "info"}>{OUTCOME_TEXT[outcome].text}</Alert>}
      {error && <Alert tone="bad">{error}</Alert>}
    </div>
  );
}
