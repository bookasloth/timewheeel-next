"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { trackLead } from "@/lib/track";
import { ArrowRight, CheckCircle2, PartyPopper, User, Mail, Phone, Globe, PencilLine } from "lucide-react";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Signup form for the "30 days, 30 websites" challenge. Posts to /api/lead
// (source + service fixed here) so it reuses the existing SMTP notification,
// honeypot, rate limit and validation. The one extra field is "budget":
// pay what you want, ₹0 and up, with quick-pick chips for feel.

type FieldName = "name" | "business" | "email" | "phone" | "budget" | "message";

type FormState = { values: Record<FieldName, string>; errors: Partial<Record<FieldName, string>> };

const empty: FormState = {
  values: { name: "", business: "", email: "", phone: "", budget: "", message: "" },
  errors: {},
};

// Quick-pick prices. "0" leads: the whole point is everyone's welcome.
const PRICE_CHIPS = ["0", "499", "1999", "4999"];
const inr = (n: string) => (n === "0" ? "Free" : `₹${Number(n).toLocaleString("en-IN")}`);

function validate(v: FormState["values"]): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.business.trim()) e.business = "Tell us what the website is for.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{7,14}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  // budget: any whole number >= 0, including 0.
  if (!v.budget.trim()) e.budget = "Name your price. Free is welcome.";
  else if (!/^\d+$/.test(v.budget.trim())) e.budget = "Enter a whole number (₹0 or more).";
  if (!v.message.trim() || v.message.trim().length < 10) e.message = "Tell us a little more (10+ characters).";
  return e;
}

const inputBase =
  "w-full rounded-xl border bg-background/70 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70";

function fc(hasError: boolean, hasIcon = true) {
  return [
    inputBase,
    hasIcon ? "pl-11 pr-3.5" : "px-3.5",
    hasError
      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
      : "border-border focus:border-brand focus:ring-4 focus:ring-brand/15 hover:border-brand/50",
  ].join(" ");
}

export function ChallengeForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");

  function set(field: FieldName, value: string) {
    setForm((f) => ({ values: { ...f.values, [field]: value }, errors: { ...f.errors, [field]: undefined } }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate(form.values);
    if (Object.keys(errors).length) { setForm((f) => ({ ...f, errors })); return; }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.values.name,
          business: form.values.business,
          email: form.values.email,
          phone: form.values.phone,
          message: form.values.message,
          budget: form.values.budget.trim() === "0" ? "Free (₹0)" : `₹${form.values.budget.trim()}`,
          service: "30 Day Website Challenge",
          source: "30-days-challenge",
          company_website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      trackLead("30-day-challenge", { value: form.values.budget, eventId: data?.eventId });
    } catch {
      setStatus("error");
      setErrorMsg("Network error, please try again.");
    }
  }

  const id = (f: string) => `challenge-${f}`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-[0_20px_60px_-30px_rgba(244,91,10,0.5)]"
      >
        <motion.span
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 14 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-rating/10 text-rating"
        >
          <PartyPopper className="size-8" />
        </motion.span>
        <RevealHeading as="h2" className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">You&apos;re on the list!</RevealHeading>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Spot claimed. I&apos;ll reach out on your email or phone with the next step. Your website is coming.
        </p>
      </motion.div>
    );
  }

  const Icon = ({ children }: { children: React.ReactNode }) => (
    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/80">{children}</span>
  );

  const iconFor: Record<string, React.ReactNode> = {
    name: <User className="size-4" strokeWidth={1.9} />,
    email: <Mail className="size-4" strokeWidth={1.9} />,
    phone: <Phone className="size-4" strokeWidth={1.9} />,
    business: <Globe className="size-4" strokeWidth={1.9} />,
  };

  const text = (field: FieldName, label: string, type: string, ph: string, auto: string) => (
    <div>
      <label htmlFor={id(field)} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <div className="relative">
        <Icon>{iconFor[field]}</Icon>
        <input
          id={id(field)} type={type} required autoComplete={auto}
          value={form.values[field]} onChange={(e) => set(field, e.target.value)}
          aria-invalid={!!form.errors[field]} placeholder={ph} className={fc(!!form.errors[field])}
        />
      </div>
      {form.errors[field] && <p className="mt-1.5 text-xs text-destructive">{form.errors[field]}</p>}
    </div>
  );

  return (
    <form
      onSubmit={submit} noValidate
      className="rounded-3xl border border-border bg-card p-7 shadow-[0_24px_70px_-40px_rgba(23,19,14,0.45)] md:p-9"
    >
      {/* Honeypot: hidden from humans; bots fill it and get silently dropped. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company_website")}>Company website</label>
        <input
          id={id("company_website")} type="text" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {text("name", "Your name", "text", "Full name", "name")}
        {text("email", "Email", "email", "you@email.com", "email")}
        {text("phone", "Phone", "tel", "+91 00000 00000", "tel")}

        {/* Name your price: number + quick-pick chips */}
        <div>
          <label htmlFor={id("budget")} className="mb-1.5 block text-sm font-semibold">
            Name your price <span className="font-normal text-muted-foreground">(pay what you want)</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">₹</span>
            <input
              id={id("budget")} type="number" min={0} step={1} inputMode="numeric" required
              value={form.values.budget} onChange={(e) => set("budget", e.target.value)}
              aria-invalid={!!form.errors.budget} placeholder="0"
              className={fc(!!form.errors.budget, false) + " pl-8"}
            />
          </div>
          {form.errors.budget && <p className="mt-1.5 text-xs text-destructive">{form.errors.budget}</p>}
        </div>

        {/* Chips span full width under the grid pair */}
        <div className="-mt-1 flex flex-wrap gap-2 sm:col-span-2">
          {PRICE_CHIPS.map((p) => {
            const active = form.values.budget.trim() === p;
            return (
              <motion.button
                key={p} type="button" whileTap={{ scale: 0.94 }}
                onClick={() => set("budget", p)}
                aria-pressed={active}
                className={[
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-background/60 text-muted-foreground hover:border-brand/60 hover:text-brand-text",
                ].join(" ")}
              >
                {inr(p)}
              </motion.button>
            );
          })}
          <span className="self-center text-xs text-muted-foreground">or type any amount</span>
        </div>

        <div className="sm:col-span-2">
          {text("business", "What's the website for?", "text", "Your business, brand, portfolio, idea…", "organization")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="mb-1.5 block text-sm font-semibold">Tell me about it</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-4 text-muted-foreground/80">
              <PencilLine className="size-4" strokeWidth={1.9} />
            </span>
            <textarea
              id={id("message")} required rows={4}
              value={form.values.message} onChange={(e) => set("message", e.target.value)}
              aria-invalid={!!form.errors.message}
              placeholder="What do you do, and what should the website help you achieve?"
              className={fc(!!form.errors.message) + " resize-none"}
            />
          </div>
          {form.errors.message && <p className="mt-1.5 text-xs text-destructive">{form.errors.message}</p>}
        </div>
      </div>

      <motion.button
        type="submit" disabled={status === "submitting"} whileTap={{ scale: 0.98 }}
        className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {status === "submitting" ? "Claiming your spot…" : "Claim my spot"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-sm text-destructive">{errorMsg}</p>
      )}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5 text-rating" /> Free or paid, everyone gets a real website.
      </p>
    </form>
  );
}
