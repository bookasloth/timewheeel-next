"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { OUTCOME_TEXT, PAY_MAX, PAY_MIN, payWithZoho, preloadCheckout, type Outcome } from "@/lib/zoho-checkout";

const inputBase =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70";
const fc = (bad: boolean) =>
  `${inputBase} ${bad ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-border focus:border-brand focus:ring-2 focus:ring-brand/20"}`;

const inr = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

type Fields = { amount: string; purpose: string; name: string; email: string; phone: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(v: Fields): Errors {
  const e: Errors = {};
  const amt = Number(v.amount);
  if (!v.amount.trim() || !Number.isFinite(amt)) e.amount = "Enter the amount to pay.";
  else if (amt < PAY_MIN || amt > PAY_MAX) e.amount = `Between ${inr(PAY_MIN)} and ${inr(PAY_MAX)}.`;
  else if (!/^\d+(\.\d{1,2})?$/.test(v.amount.trim())) e.amount = "Use up to 2 decimal places.";
  if (!v.purpose.trim()) e.purpose = "Add an invoice number or what this is for.";
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email.";
  return e;
}

export function PayForm({ defaultAmount = "", defaultPurpose = "" }: { defaultAmount?: string; defaultPurpose?: string }) {
  const [v, setV] = useState<Fields>({ amount: defaultAmount, purpose: defaultPurpose, name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  // Synchronous guard: each submit creates a payment order, so a second submit
  // must never slip through before React re-renders the disabled button.
  const inFlight = useRef(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setOutcome(null);
    setErrorMsg("");
    try {
      const result = await payWithZoho({
        amount: Number(v.amount),
        purpose: v.purpose.trim(),
        name: v.name.trim(),
        email: v.email.trim(),
        phone: v.phone.trim() || undefined,
      });
      setOutcome(result);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong, please try again.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  if (outcome === "paid") {
    return (
      <div className="rounded-2xl border border-border bg-card px-8 py-14 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-rating/10 text-rating">
          <CheckCircle2 className="size-8" />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold tracking-tight md:text-3xl">Payment received.</h2>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
          {inr(Number(v.amount))} for {v.purpose.trim()}. A receipt is on its way to {v.email.trim()}. Thank you!
        </p>
      </div>
    );
  }

  const amt = Number(v.amount);
  const label = Number.isFinite(amt) && amt >= PAY_MIN ? `Pay ${inr(amt)} securely` : "Pay securely";
  const note = outcome ? OUTCOME_TEXT[outcome] : null;

  return (
    <form onSubmit={submit} onFocus={preloadCheckout} noValidate aria-busy={busy} className="rounded-2xl border border-border bg-card p-7 md:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="pay-amount" className="mb-1.5 block text-sm font-semibold">Amount</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">₹</span>
            <input
              id="pay-amount" inputMode="decimal" autoComplete="off" placeholder="0" value={v.amount} onChange={set("amount")}
              aria-invalid={!!errors.amount} className={`${fc(!!errors.amount)} pl-8 text-base font-semibold`}
            />
          </div>
          {errors.amount && <p className="mt-1.5 text-xs text-destructive">{errors.amount}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pay-purpose" className="mb-1.5 block text-sm font-semibold">What is this for?</label>
          <input
            id="pay-purpose" placeholder="Invoice number or project name" value={v.purpose} onChange={set("purpose")}
            aria-invalid={!!errors.purpose} className={fc(!!errors.purpose)}
          />
          {errors.purpose && <p className="mt-1.5 text-xs text-destructive">{errors.purpose}</p>}
        </div>
        <div>
          <label htmlFor="pay-name" className="mb-1.5 block text-sm font-semibold">Name</label>
          <input id="pay-name" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} className={fc(!!errors.name)} />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="pay-email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="pay-email" type="email" autoComplete="email" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} className={fc(!!errors.email)} />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pay-phone" className="mb-1.5 block text-sm font-semibold">
            Phone <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="pay-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} className={fc(false)} />
        </div>
      </div>

      <button
        type="submit" disabled={busy}
        className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : null}
        {busy ? "Opening secure checkout" : label}
        {!busy && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
      </button>

      {note && (
        <p role="status" className={`mt-3 text-center text-sm ${note.tone === "bad" ? "text-destructive" : "text-muted-foreground"}`}>{note.text}</p>
      )}
      {errorMsg && <p role="alert" className="mt-3 text-center text-sm text-destructive">{errorMsg}</p>}

      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" /> Secured by Zoho Payments. UPI, cards and net banking.
      </p>
    </form>
  );
}
