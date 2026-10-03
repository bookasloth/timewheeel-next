"use client";

import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, MessageSquare, BadgeCheck, Rocket } from "lucide-react";
import { trackLead } from "@/lib/track";
import { useFormTracking } from "@/hooks/use-form-tracking";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { site } from "@/lib/site";
import { WheelHalftone } from "@/components/brand/wheel-halftone";

// Global pre-footer contact band. The form card overlaps down into the footer
// on desktop (negative margin) and stacks cleanly on mobile. Submits to
// /api/lead, mirroring the shared LeadForm's payload + tracking.

const SOURCE = "pre-footer";

// (wheel halftone extracted to components/brand/wheel-halftone.tsx)

const benefits = [
  "You own the code",
  "Senior team, no juniors",
  "Fixed, clear pricing",
  "Reply within 1 business day",
  "Built on systems you control",
  "Local, Nagpur-based",
];

const steps = [
  { icon: MessageSquare, title: "Tell us what you're building", desc: "A message, a call, or a booking." },
  { icon: BadgeCheck, title: "Get a scoped reply", desc: "Direction, timeline, and a budget range." },
  { icon: Rocket, title: "Kick off and ship", desc: "Keep full ownership of product and code." },
];

const serviceOptions = [
  "SEO",
  "Digital Marketing",
  "Web Development",
  "Web App Development",
  "Website Design",
  "Something else",
];

type FieldName = "name" | "business" | "email" | "phone" | "service" | "message";
type Values = Record<FieldName, string>;

const empty: Values = { name: "", business: "", email: "", phone: "", service: "", message: "" };

function validate(v: Values): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.business.trim()) e.business = "Please enter your company.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{7,14}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
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

export function PreFooterCta() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const ft = useFormTracking(SOURCE);

  function set(field: FieldName, value: string) {
    ft.onInteract();
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      ft.onErrors(Object.keys(found));
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: SOURCE, company_website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      ft.onSubmitted();
      setStatus("success");
      trackLead(SOURCE, { service: values.service, eventId: data?.eventId });
    } catch {
      setStatus("error");
      setErrorMsg("Network error, please try again.");
    }
  }

  const id = (f: string) => `prefooter-${f}`;

  const field = (name: FieldName, label: string, type: string, ph: string, auto: string) => (
    <div>
      <label htmlFor={id(name)} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input
        id={id(name)} type={type} required autoComplete={auto}
        value={values[name]} onChange={(e) => set(name, e.target.value)}
        aria-invalid={!!errors[name]} placeholder={ph} className={fc(!!errors[name])}
      />
      {errors[name] && <p className="mt-1.5 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <section aria-label="Partner with us" className="relative overflow-hidden bg-secondary/50">
      {/* Background motif: the Timewheel mark rendered as a dot halftone. */}
      <WheelHalftone className="pointer-events-none absolute top-1/2 right-[-14%] h-[560px] w-[560px] -translate-y-1/2 text-brand opacity-[0.12] md:right-[-6%] md:h-[680px] md:w-[680px] lg:right-[6%]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28 lg:pb-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-16">
          {/* Left: pitch + benefits + steps */}
          <Reveal className="lg:pb-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Partner with us</p>
            <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-[2.6rem] lg:leading-[1.08]">
              Let&apos;s build something you own
            </RevealHeading>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              Tell us what you&apos;re working on. We reply within one business day with a clear, scoped next step.
            </p>

            <ul className="mt-8 grid max-w-md grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <p className="text-sm font-semibold">What happens next</p>
              <ol className="mt-4 grid gap-4 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                      <s.icon className="size-4" strokeWidth={1.9} />
                    </span>
                    <div>
                      <p className="text-[0.8rem] font-bold uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</p>
                      <p className="mt-1 text-sm font-semibold leading-snug">{s.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-9 text-sm text-muted-foreground">
              Prefer to talk?{" "}
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-text hover:underline">
                {site.contact.phone}
              </a>
            </p>
          </Reveal>

          {/* Right: floating form card, overlaps into the footer on desktop */}
          <Reveal delay={0.1} className="relative z-10 lg:-mb-24">
            {status === "success" ? (
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-black/5 md:p-10">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-rating/10 text-rating">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight">Thanks, we&apos;ve got it.</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
                  We&apos;ll reply within one business day with a clear next step.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-black/5 md:p-9">
                <h3 className="text-center text-xl font-bold tracking-tight">Schedule a free consultation</h3>
                <div className="mx-auto mt-3 mb-6 h-px w-full max-w-xs bg-border" />

                {/* Honeypot: hidden from humans; bots fill it and get dropped. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor={id("company_website")}>Company website</label>
                  <input
                    id={id("company_website")} type="text" tabIndex={-1} autoComplete="off"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {field("name", "Name", "text", "Your full name", "name")}
                  {field("business", "Company", "text", "Your company", "organization")}
                  {field("email", "Email", "email", "you@company.com", "email")}
                  {field("phone", "Phone", "tel", "+91 00000 00000", "tel")}
                  <div className="sm:col-span-2">
                    <label htmlFor={id("service")} className="mb-1.5 block text-sm font-semibold">How can we help?</label>
                    <select
                      id={id("service")} value={values.service}
                      onChange={(e) => set("service", e.target.value)}
                      aria-invalid={!!errors.service} className={fc(!!errors.service)}
                    >
                      <option value="">Select an option…</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="mt-1.5 text-xs text-destructive">{errors.service}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={id("message")} className="mb-1.5 block text-sm font-semibold">Message</label>
                    <textarea
                      id={id("message")} required rows={3}
                      value={values.message} onChange={(e) => set("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      placeholder="To better assist you, tell us how we can help…"
                      className={fc(!!errors.message)}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
                  </div>
                </div>

                <button
                  type="submit" disabled={status === "submitting"}
                  className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Submit"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                {status === "error" && (
                  <p role="alert" className="mt-3 text-center text-sm text-destructive">{errorMsg}</p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
