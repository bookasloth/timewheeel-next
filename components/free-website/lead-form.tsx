"use client";

// Lead-capture form for the "Free Website for Businesses in Nagpur" campaign.
// Richer than the generic lead form because these leads get re-sold later:
// business category, Nagpur locality, current website and an explicit marketing
// consent all feed segmentation. Posts to /api/lead (reusing its SMTP email,
// honeypot, rate limit, Supabase persistence and Meta CAPI).
//
// Full form lifecycle is tracked for retargeting: form_started (first touch),
// form_field_error (validation), form_abandoned (left partial + unsubmitted),
// lead_captured (success, with first-touch attribution).
import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { trackLead } from "@/lib/track";
import { getAttribution } from "@/lib/attribution";
import { useFormTracking } from "@/hooks/use-form-tracking";

type FieldName = "name" | "business" | "phone" | "email" | "category" | "location" | "website" | "message";

type FormState = { values: Record<FieldName, string>; errors: Partial<Record<FieldName, string>> };

const empty: FormState = {
  values: { name: "", business: "", phone: "", email: "", category: "", location: "", website: "", message: "" },
  errors: {},
};

// Categories double as the later upsell segments (SEO vs ads vs hosting etc).
const CATEGORIES = [
  "Restaurant / Cafe",
  "Retail / Shop",
  "Clinic / Healthcare",
  "Salon / Spa",
  "Gym / Fitness",
  "Education / Coaching",
  "Real Estate",
  "Professional Services",
  "Manufacturing / Wholesale",
  "Events / Hospitality",
  "Other",
];

function validate(v: FormState["values"]): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.business.trim()) e.business = "Please enter your business name.";
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{7,14}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.category) e.category = "Please pick your business category.";
  if (!v.location.trim()) e.location = "Which part of Nagpur are you in?";
  if (v.website.trim() && !/^https?:\/\/.+\..+/.test(v.website.trim()))
    e.website = "Include http:// or https://, or leave it blank.";
  if (!v.message.trim() || v.message.trim().length < 10) e.message = "Tell us a little more (10+ characters).";
  return e;
}

const inputBase =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70";

function fc(hasError: boolean) {
  return [
    inputBase,
    hasError
      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
      : "border-border focus:border-brand focus:ring-2 focus:ring-brand/20",
  ].join(" ");
}

const SOURCE = "free-website-nagpur";
const SERVICE = "Free Website (Nagpur)";

export function FreeWebsiteForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Shared funnel tracking: form_started / form_field_error / form_abandoned.
  const ft = useFormTracking(SOURCE);

  function set(field: FieldName, value: string) {
    ft.onInteract();
    setForm((f) => ({ values: { ...f.values, [field]: value }, errors: { ...f.errors, [field]: undefined } }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate(form.values);
    if (Object.keys(errors).length) {
      setForm((f) => ({ ...f, errors }));
      ft.onErrors(Object.keys(errors));
      return;
    }
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
          website: form.values.website,
          category: form.values.category,
          location: form.values.location,
          message: form.values.message,
          marketing_consent: consent,
          service: SERVICE,
          source: SOURCE,
          attribution: getAttribution(),
          company_website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      ft.onSubmitted();
      setStatus("success");
      trackLead(SOURCE, { service: SERVICE, eventId: data?.eventId });
    } catch {
      setStatus("error");
      setErrorMsg("Network error, please try again.");
    }
  }

  const id = (f: string) => `fw-${f}`;

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card px-8 py-16 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-rating/10 text-rating">
          <CheckCircle2 className="size-8" />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold tracking-tight md:text-3xl">Your spot is claimed</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Thanks! We have your details and will call or email you within one business day to start your free
          website. Keep an eye on your phone.
        </p>
      </div>
    );
  }

  const text = (field: FieldName, label: string, type: string, ph: string, auto: string, optional = false) => (
    <div>
      <label htmlFor={id(field)} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      <input
        id={id(field)}
        type={type}
        required={!optional}
        autoComplete={auto}
        value={form.values[field]}
        onChange={(e) => set(field, e.target.value)}
        aria-invalid={!!form.errors[field]}
        placeholder={ph}
        className={fc(!!form.errors[field])}
      />
      {form.errors[field] && <p className="mt-1.5 text-xs text-destructive">{form.errors[field]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-7 md:p-9">
      {/* Honeypot: hidden from humans; bots fill it and get silently dropped. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company_website")}>Company website</label>
        <input
          id={id("company_website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {text("name", "Your name", "text", "Full name", "name")}
        {text("business", "Business name", "text", "Your business", "organization")}
        {text("phone", "Phone / WhatsApp", "tel", "+91 00000 00000", "tel")}
        {text("email", "Email", "email", "you@business.com", "email")}

        <div>
          <label htmlFor={id("category")} className="mb-1.5 block text-sm font-semibold">
            Business category
          </label>
          <select
            id={id("category")}
            value={form.values.category}
            onChange={(e) => set("category", e.target.value)}
            aria-invalid={!!form.errors.category}
            className={fc(!!form.errors.category)}
          >
            <option value="">Select…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {form.errors.category && <p className="mt-1.5 text-xs text-destructive">{form.errors.category}</p>}
        </div>

        {text("location", "Area in Nagpur", "text", "e.g. Dharampeth, Sadar, Pratap Nagar", "address-level2")}
        <div className="sm:col-span-2">
          {text("website", "Current website", "url", "https://yourbusiness.com", "url", true)}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="mb-1.5 block text-sm font-semibold">
            What do you need the website to do?
          </label>
          <textarea
            id={id("message")}
            required
            rows={4}
            value={form.values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!form.errors.message}
            placeholder="Tell us about your business and what the website should help you achieve."
            className={fc(!!form.errors.message)}
          />
          {form.errors.message && <p className="mt-1.5 text-xs text-destructive">{form.errors.message}</p>}
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            ft.onInteract();
            setConsent(e.target.checked);
          }}
          className="mt-0.5 size-4 shrink-0 rounded border-border accent-brand"
        />
        <span>
          Keep me posted about offers and services that could help my business (website upgrades, SEO,
          marketing, hosting). You can opt out any time.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {status === "submitting" ? "Claiming your spot…" : "Claim my free website"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-sm text-destructive">
          {errorMsg}
        </p>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 text-rating" /> No cost, no card. Your details stay private.
      </p>
    </form>
  );
}
