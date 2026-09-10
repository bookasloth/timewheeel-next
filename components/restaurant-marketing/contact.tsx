"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { rmServiceOptions } from "@/lib/restaurant-marketing";

type FieldName =
  | "name"
  | "restaurant"
  | "email"
  | "phone"
  | "website"
  | "service"
  | "message";

type FormState = {
  values: Record<FieldName, string>;
  errors: Partial<Record<FieldName, string>>;
};

const initial: FormState = {
  values: {
    name: "",
    restaurant: "",
    email: "",
    phone: "",
    website: "",
    service: "",
    message: "",
  },
  errors: {},
};

function validate(v: FormState["values"]): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!v.restaurant.trim()) errors.restaurant = "Please enter your restaurant name.";
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
  if (!v.service) errors.service = "Please select a service.";
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

export function RmContact() {
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
              Thanks — we&apos;ll be in touch.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Your enquiry has been received. Our team will reach out shortly to
              help grow your restaurant&apos;s brand.
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
              Start the conversation
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Let&apos;s Fill More Tables
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              Tell us about your restaurant and goals. We&apos;ll respond with a
              clear next step — no obligation, no jargon.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { k: "Based in", v: "Mumbai, Maharashtra" },
                { k: "Serving", v: "Restaurants across India" },
                { k: "Response", v: "Within one business day" },
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
            <form
              onSubmit={submit}
              noValidate
              className="rounded-3xl border border-border bg-card p-7 md:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="rm-name" className="mb-1.5 block text-sm font-semibold">
                    Name
                  </label>
                  <input
                    id="rm-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.values.name}
                    onChange={(e) => setField("name", e.target.value)}
                    aria-invalid={!!form.errors.name}
                    aria-describedby={form.errors.name ? "rm-name-error" : undefined}
                    placeholder="Your full name"
                    className={fieldClasses(!!form.errors.name)}
                  />
                  {form.errors.name && (
                    <p id="rm-name-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="rm-restaurant" className="mb-1.5 block text-sm font-semibold">
                    Restaurant Name
                  </label>
                  <input
                    id="rm-restaurant"
                    type="text"
                    required
                    autoComplete="organization"
                    value={form.values.restaurant}
                    onChange={(e) => setField("restaurant", e.target.value)}
                    aria-invalid={!!form.errors.restaurant}
                    aria-describedby={form.errors.restaurant ? "rm-restaurant-error" : undefined}
                    placeholder="Your restaurant"
                    className={fieldClasses(!!form.errors.restaurant)}
                  />
                  {form.errors.restaurant && (
                    <p id="rm-restaurant-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.restaurant}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="rm-email" className="mb-1.5 block text-sm font-semibold">
                    Email
                  </label>
                  <input
                    id="rm-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    aria-invalid={!!form.errors.email}
                    aria-describedby={form.errors.email ? "rm-email-error" : undefined}
                    placeholder="you@restaurant.com"
                    className={fieldClasses(!!form.errors.email)}
                  />
                  {form.errors.email && (
                    <p id="rm-email-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="rm-phone" className="mb-1.5 block text-sm font-semibold">
                    Phone
                  </label>
                  <input
                    id="rm-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.values.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    aria-invalid={!!form.errors.phone}
                    aria-describedby={form.errors.phone ? "rm-phone-error" : undefined}
                    placeholder="+91 00000 00000"
                    className={fieldClasses(!!form.errors.phone)}
                  />
                  {form.errors.phone && (
                    <p id="rm-phone-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="rm-website" className="mb-1.5 block text-sm font-semibold">
                    Website{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="rm-website"
                    type="url"
                    autoComplete="url"
                    value={form.values.website}
                    onChange={(e) => setField("website", e.target.value)}
                    aria-invalid={!!form.errors.website}
                    aria-describedby={form.errors.website ? "rm-website-error" : undefined}
                    placeholder="https://yourrestaurant.com"
                    className={fieldClasses(!!form.errors.website)}
                  />
                  {form.errors.website && (
                    <p id="rm-website-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.website}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="rm-service" className="mb-1.5 block text-sm font-semibold">
                    Service Interested In
                  </label>
                  <select
                    id="rm-service"
                    value={form.values.service}
                    onChange={(e) => setField("service", e.target.value)}
                    aria-invalid={!!form.errors.service}
                    aria-describedby={form.errors.service ? "rm-service-error" : undefined}
                    className={fieldClasses(!!form.errors.service)}
                  >
                    <option value="">Select a service…</option>
                    {rmServiceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {form.errors.service && (
                    <p id="rm-service-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.service}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rm-message" className="mb-1.5 block text-sm font-semibold">
                    Message
                  </label>
                  <textarea
                    id="rm-message"
                    required
                    rows={4}
                    value={form.values.message}
                    onChange={(e) => setField("message", e.target.value)}
                    aria-invalid={!!form.errors.message}
                    aria-describedby={form.errors.message ? "rm-message-error" : undefined}
                    placeholder="Tell us about your restaurant and what you'd like to achieve."
                    className={fieldClasses(!!form.errors.message)}
                  />
                  {form.errors.message && (
                    <p id="rm-message-error" className="mt-1.5 text-xs text-destructive">
                      {form.errors.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
              >
                {status === "submitting"
                  ? "Sending…"
                  : "Let's Fill More Tables"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
