"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Info, LoaderCircle, RotateCcw } from "lucide-react";
import { Honeypot, useHoneypot } from "@/components/shared/honeypot";
import { useFormTracking } from "@/hooks/use-form-tracking";
import { analytics, EVENTS } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { academySource, STAGES, STATUS_META, type ProgramStatus } from "@/lib/academy";
import { cn } from "@/lib/utils";

// Academy interest form. Posts to /api/academy/interest, which validates again,
// stops duplicates (one row per email per program) and emails a confirmation.
// Pass `programs` as plain options from a server component so the full program
// content never ships to the browser.

export type ProgramOption = { slug: string; title: string; status: ProgramStatus };

type Field = "name" | "email" | "institution" | "stage" | "program";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "duplicate" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  else if (v.name.trim().length > 120) e.name = "Please keep it under 120 characters.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address, like you@example.com.";
  if (v.institution.trim().length > 160) e.institution = "Please keep it under 160 characters.";
  if (!v.program) e.program = "Please choose a program.";
  return e;
}

const control = (err: boolean) =>
  cn(
    "w-full rounded-lg border bg-background/70 px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70",
    err
      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
      : "border-border hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/15",
  );

export function InterestForm({
  programs,
  defaultProgram = "",
  lockProgram = false,
  idPrefix = "academy",
}: {
  programs: ProgramOption[];
  defaultProgram?: string;
  /** On a program page the program is fixed; elsewhere the visitor picks one. */
  lockProgram?: boolean;
  idPrefix?: string;
}) {
  const initial: Values = { name: "", email: "", institution: "", stage: "", program: defaultProgram };
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const hp = useHoneypot();
  const ft = useFormTracking(academySource(values.program || "general"));

  const selected = programs.find((p) => p.slug === values.program);
  const id = (f: string) => `${idPrefix}-${f}`;

  function set(field: Field, value: string) {
    ft.onInteract();
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    if (status === "error") setStatus("idle");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      ft.onErrors(Object.keys(found));
      // Move focus to the first problem so keyboard and screen reader users land on it.
      const first = (["name", "email", "institution", "program"] as Field[]).find((f) => found[f]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/academy/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          institution: values.institution,
          stage: values.stage,
          program: values.program,
          attribution: getAttribution(),
          ...hp.payload(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; duplicate?: boolean; error?: string; field?: Field };
      if (!res.ok || !data.ok) {
        if (data.field) setErrors({ [data.field]: data.error });
        setMessage(data.error || "Something went wrong on our side. Please try again.");
        setStatus("error");
        return;
      }
      ft.onSubmitted();
      analytics.track(EVENTS.ACADEMY_INTEREST, {
        form_source: academySource(values.program),
        program: values.program,
        duplicate: Boolean(data.duplicate),
      });
      setStatus(data.duplicate ? "duplicate" : "success");
    } catch {
      setMessage("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  function startOver() {
    setValues({ ...initial, name: values.name, email: values.email, program: lockProgram ? defaultProgram : "" });
    setErrors({});
    setStatus("idle");
  }

  if (status === "success" || status === "duplicate") {
    const done = status === "success";
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-border bg-card px-6 py-10 text-center md:px-10">
        <span
          className={cn(
            "mx-auto grid size-12 place-items-center rounded-full",
            done ? "bg-rating/12 text-rating" : "bg-accent-blue/12 text-accent-blue",
          )}
        >
          {done ? <Check className="size-6" strokeWidth={2.2} /> : <Info className="size-6" strokeWidth={2} />}
        </span>
        <p className="mt-5 font-heading text-xl font-extrabold tracking-tight">
          {done ? "You're on the list." : "You're already registered."}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {done ? (
            <>
              Thanks, {values.name.trim().split(/\s+/)[0]}. We&apos;ve noted your interest in{" "}
              <strong className="text-foreground">{selected?.title}</strong>. We&apos;ll email{" "}
              <strong className="text-foreground">{values.email.trim()}</strong> when cohort details are ready.
            </>
          ) : (
            <>
              <strong className="text-foreground">{values.email.trim()}</strong> is already on the list for{" "}
              <strong className="text-foreground">{selected?.title}</strong>, so there&apos;s nothing more to do.
              We&apos;ll email you when cohort details are ready.
            </>
          )}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!lockProgram && (
            <button
              type="button"
              onClick={startOver}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
            >
              Register for another program
            </button>
          )}
          <Link
            href="/academy/projects"
            className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            See sample projects
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const label = (field: Field, text: string, optional = false): ReactNode => (
    <label htmlFor={id(field)} className="mb-1.5 block text-sm font-semibold">
      {text}
      {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
    </label>
  );
  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="mt-1.5 text-xs text-destructive">
        {errors[field]}
      </p>
    ) : null;
  const a11y = (field: Field) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? id(`${field}-error`) : undefined,
  });

  return (
    <form onSubmit={submit} noValidate aria-busy={submitting} className="relative rounded-lg border border-border bg-card p-6 md:p-8">
      <Honeypot {...hp.field} />

      <fieldset disabled={submitting} className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <div>
          {label("name", "Full name")}
          <input
            id={id("name")} type="text" autoComplete="name" required maxLength={120}
            value={values.name} onChange={(e) => set("name", e.target.value)}
            placeholder="Your name" className={control(Boolean(errors.name))} {...a11y("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          {label("email", "Email")}
          <input
            id={id("email")} type="email" inputMode="email" autoComplete="email" required maxLength={200}
            value={values.email} onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com" className={control(Boolean(errors.email))} {...a11y("email")}
          />
          {fieldError("email")}
        </div>
        <div>
          {label("institution", "College or institution", true)}
          <input
            id={id("institution")} type="text" autoComplete="organization" maxLength={160}
            value={values.institution} onChange={(e) => set("institution", e.target.value)}
            placeholder="e.g. your college" className={control(Boolean(errors.institution))} {...a11y("institution")}
          />
          {fieldError("institution")}
        </div>
        <div>
          {label("stage", "Where are you right now?", true)}
          <select
            id={id("stage")} value={values.stage} onChange={(e) => set("stage", e.target.value)}
            className={control(Boolean(errors.stage))} {...a11y("stage")}
          >
            <option value="">Select one</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {fieldError("stage")}
        </div>

        <div className="sm:col-span-2">
          {lockProgram && selected ? (
            <>
              <p className="mb-1.5 text-sm font-semibold">Program</p>
              <p className="rounded-lg border border-border bg-secondary/50 px-3.5 py-3 text-sm font-semibold">
                {selected.title}
                <span className="font-normal text-muted-foreground"> · {STATUS_META[selected.status].label}</span>
              </p>
            </>
          ) : (
            <>
              {label("program", "Program you're interested in")}
              <select
                id={id("program")} required value={values.program} onChange={(e) => set("program", e.target.value)}
                className={control(Boolean(errors.program))} {...a11y("program")}
              >
                <option value="">Choose a program</option>
                {programs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title} ({STATUS_META[p.status].label})
                  </option>
                ))}
              </select>
              {fieldError("program")}
            </>
          )}
        </div>
      </fieldset>

      <button
        type="submit" disabled={submitting} aria-busy={submitting}
        className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold disabled:opacity-70"
      >
        {submitting ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            {selected ? STATUS_META[selected.status].cta : "Register interest"}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {status === "error" && (
        <div role="alert" className="mt-4 flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div className="min-w-0">
            <p className="text-foreground">{message}</p>
            <button type="submit" className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-brand-text hover:underline">
              <RotateCcw aria-hidden className="size-3.5" />
              Try again
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Free, and it commits you to nothing. We use your details only to email you about the Academy, never show
        them publicly, and delete them on request.
      </p>
    </form>
  );
}
