"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

type FieldName = "name" | "business" | "email" | "phone" | "website" | "service" | "message";

type FormState = {
  values: Record<FieldName, string>;
  errors: Partial<Record<FieldName, string>>;
};

const initial: FormState = {
  values: { name: "", business: "", email: "", phone: "", website: "", service: "", message: "" },
  errors: {},
};

function validate(v: FormState["values"]): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!v.business.trim()) errors.business = "Please enter your business name.";
  if (!v.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!v.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[+\d][\d\s-]{7,14}$/.test(v.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (v.website.trim() && !/^https?:\/\/.+\..+/.test(v.website.trim())) {
    errors.website = "Please enter a valid URL (e.g. https://example.com).";
  }
  if (!v.service) errors.service = "Please select what you need.";
  if (!v.message.trim() || v.message.trim().length < 10) {
    errors.message = "Please tell us a little more (at least 10 characters).";
  }
  return errors;
}

const inputBase =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70";

function fieldClasses(hasError: boolean) {
  return [
    inputBase,
    hasError
      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
      : "border-border focus:border-brand focus:ring-2 focus:ring-brand/20",
  ].join(" ");
}

export function WdContact() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function setField(field: FieldName, value: string) {
    setForm((f) => ({
      values: { ...f.values, [field]: value },
      errors: { ...f.errors, [field]: undefined },
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate(form.values);
    if (Object.keys(errors).length > 0) {
      setForm((f) => ({ ...f, errors }));
      return;
    }
    // Frontend-only for now — wire to a real endpoint when available.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 600);
  }

  if (status === "success") {
    return (
      <section id="contact" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="rounded-3xl border border-border bg-card px-8 py-16 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-rating/10 text-rating">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
              Thanks — your quote is on the way.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              We&apos;ve received your project details and will send a fixed quote and timeline
              within one business day.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Start your project
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Get a Fixed Quote in 24 Hours
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              Tell us what you need built. You&apos;ll get a clear scope, a fixed price and a
              written timeline — no obligation, no jargon.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { k: "Based in", v: "India" },
                { k: "Serving", v: "Clients across India & abroad" },
                { k: "Quote turnaround", v: "Within one business day" },
                { k: "You own", v: "Code, domain, hosting, data" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5 text-sm"
                >
                  <span className="font-semibold text-foreground">{row.k}</span>
                  <span className="text-muted-foreground">{row.v}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-7 md:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="wd-name" className="mb-1.5 block text-sm font-semibold">Name</label>
                  <input
                    id="wd-name" type="text" required autoComplete="name"
                    value={form.values.name} onChange={(e) => setField("name", e.target.value)}
                    aria-invalid={!!form.errors.name}
                    aria-describedby={form.errors.name ? "wd-name-error" : undefined}
                    placeholder="Your full name" className={fieldClasses(!!form.errors.name)}
                  />
                  {form.errors.name && <p id="wd-name-error" className="mt-1.5 text-xs text-destructive">{form.errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="wd-business" className="mb-1.5 block text-sm font-semibold">Business Name</label>
                  <input
                    id="wd-business" type="text" required autoComplete="organization"
                    value={form.values.business} onChange={(e) => setField("business", e.target.value)}
                    aria-invalid={!!form.errors.business}
                    aria-describedby={form.errors.business ? "wd-business-error" : undefined}
                    placeholder="Your company" className={fieldClasses(!!form.errors.business)}
                  />
                  {form.errors.business && <p id="wd-business-error" className="mt-1.5 text-xs text-destructive">{form.errors.business}</p>}
                </div>
                <div>
                  <label htmlFor="wd-email" className="mb-1.5 block text-sm font-semibold">Email</label>
                  <input
                    id="wd-email" type="email" required autoComplete="email"
                    value={form.values.email} onChange={(e) => setField("email", e.target.value)}
                    aria-invalid={!!form.errors.email}
                    aria-describedby={form.errors.email ? "wd-email-error" : undefined}
                    placeholder="you@company.com" className={fieldClasses(!!form.errors.email)}
                  />
                  {form.errors.email && <p id="wd-email-error" className="mt-1.5 text-xs text-destructive">{form.errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="wd-phone" className="mb-1.5 block text-sm font-semibold">Phone</label>
                  <input
                    id="wd-phone" type="tel" required autoComplete="tel"
                    value={form.values.phone} onChange={(e) => setField("phone", e.target.value)}
                    aria-invalid={!!form.errors.phone}
                    aria-describedby={form.errors.phone ? "wd-phone-error" : undefined}
                    placeholder="+91 00000 00000" className={fieldClasses(!!form.errors.phone)}
                  />
                  {form.errors.phone && <p id="wd-phone-error" className="mt-1.5 text-xs text-destructive">{form.errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="wd-website" className="mb-1.5 block text-sm font-semibold">
                    Current website <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="wd-website" type="url" autoComplete="url"
                    value={form.values.website} onChange={(e) => setField("website", e.target.value)}
                    aria-invalid={!!form.errors.website}
                    aria-describedby={form.errors.website ? "wd-website-error" : undefined}
                    placeholder="https://yourwebsite.com" className={fieldClasses(!!form.errors.website)}
                  />
                  {form.errors.website && <p id="wd-website-error" className="mt-1.5 text-xs text-destructive">{form.errors.website}</p>}
                </div>
                <div>
                  <label htmlFor="wd-service" className="mb-1.5 block text-sm font-semibold">What do you need?</label>
                  <select
                    id="wd-service" value={form.values.service}
                    onChange={(e) => setField("service", e.target.value)}
                    aria-invalid={!!form.errors.service}
                    aria-describedby={form.errors.service ? "wd-service-error" : undefined}
                    className={fieldClasses(!!form.errors.service)}
                  >
                    <option value="">Select…</option>
                    {wd.serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {form.errors.service && <p id="wd-service-error" className="mt-1.5 text-xs text-destructive">{form.errors.service}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="wd-message" className="mb-1.5 block text-sm font-semibold">Project details</label>
                  <textarea
                    id="wd-message" required rows={4}
                    value={form.values.message} onChange={(e) => setField("message", e.target.value)}
                    aria-invalid={!!form.errors.message}
                    aria-describedby={form.errors.message ? "wd-message-error" : undefined}
                    placeholder="What are you building, and any budget or deadline in mind?"
                    className={fieldClasses(!!form.errors.message)}
                  />
                  {form.errors.message && <p id="wd-message-error" className="mt-1.5 text-xs text-destructive">{form.errors.message}</p>}
                </div>
              </div>
              <button
                type="submit" disabled={status === "submitting"}
                className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Get My Fixed Quote"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
