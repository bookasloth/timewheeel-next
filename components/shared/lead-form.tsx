"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

// Reusable lead-capture section. Frontend-only for now (fakes success) — wire
// to a real endpoint when one exists. Copy is passed per page.
type FieldName = "name" | "business" | "email" | "phone" | "website" | "service" | "message";

type Props = {
  eyebrow: string;
  heading: string;
  blurb: string;
  infoRows: { k: string; v: string }[];
  serviceOptions: string[];
  serviceLabel?: string;
  submitLabel: string;
  successHeading: string;
  successBody: string;
  idPrefix: string;
  /** Where the lead came from, included in the notification email. */
  source: string;
};

type FormState = { values: Record<FieldName, string>; errors: Partial<Record<FieldName, string>> };

const empty: FormState = {
  values: { name: "", business: "", email: "", phone: "", website: "", service: "", message: "" },
  errors: {},
};

function validate(v: FormState["values"]): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.business.trim()) e.business = "Please enter your business name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{7,14}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (v.website.trim() && !/^https?:\/\/.+\..+/.test(v.website.trim())) e.website = "Please enter a valid URL.";
  if (!v.service) e.service = "Please select an option.";
  if (!v.message.trim() || v.message.trim().length < 10) e.message = "Please tell us a little more.";
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

export function LeadForm(p: Props) {
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
        body: JSON.stringify({ ...form.values, source: p.source, company_website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again.");
    }
  }

  const id = (f: string) => `${p.idPrefix}-${f}`;

  if (status === "success") {
    return (
      <section id="contact" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="rounded-3xl border border-border bg-card px-8 py-16 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-rating/10 text-rating">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">{p.successHeading}</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">{p.successBody}</p>
          </Reveal>
        </div>
      </section>
    );
  }

  const text = (field: FieldName, label: string, type: string, ph: string, auto: string, optional = false) => (
    <div>
      <label htmlFor={id(field)} className="mb-1.5 block text-sm font-semibold">
        {label}{optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      <input
        id={id(field)} type={type} required={!optional} autoComplete={auto}
        value={form.values[field]} onChange={(e) => set(field, e.target.value)}
        aria-invalid={!!form.errors[field]} placeholder={ph} className={fc(!!form.errors[field])}
      />
      {form.errors[field] && <p className="mt-1.5 text-xs text-destructive">{form.errors[field]}</p>}
    </div>
  );

  return (
    <section id="contact" className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">{p.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{p.heading}</h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">{p.blurb}</p>
            <div className="mt-8 space-y-4">
              {p.infoRows.map((row) => (
                <div key={row.k} className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5 text-sm">
                  <span className="font-semibold text-foreground">{row.k}</span>
                  <span className="text-muted-foreground">{row.v}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
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
                {text("name", "Name", "text", "Your full name", "name")}
                {text("business", "Business Name", "text", "Your company", "organization")}
                {text("email", "Email", "email", "you@company.com", "email")}
                {text("phone", "Phone", "tel", "+91 00000 00000", "tel")}
                {text("website", "Website", "url", "https://yourwebsite.com", "url", true)}
                <div>
                  <label htmlFor={id("service")} className="mb-1.5 block text-sm font-semibold">
                    {p.serviceLabel ?? "Service"}
                  </label>
                  <select
                    id={id("service")} value={form.values.service}
                    onChange={(e) => set("service", e.target.value)}
                    aria-invalid={!!form.errors.service} className={fc(!!form.errors.service)}
                  >
                    <option value="">Select…</option>
                    {p.serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {form.errors.service && <p className="mt-1.5 text-xs text-destructive">{form.errors.service}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={id("message")} className="mb-1.5 block text-sm font-semibold">Message</label>
                  <textarea
                    id={id("message")} required rows={4}
                    value={form.values.message} onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!form.errors.message}
                    placeholder="Tell us about your business and goals."
                    className={fc(!!form.errors.message)}
                  />
                  {form.errors.message && <p className="mt-1.5 text-xs text-destructive">{form.errors.message}</p>}
                </div>
              </div>
              <button
                type="submit" disabled={status === "submitting"}
                className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : p.submitLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              {status === "error" && (
                <p role="alert" className="mt-3 text-center text-sm text-destructive">{errorMsg}</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
