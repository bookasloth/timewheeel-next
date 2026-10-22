"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Check, Mail, MapPin, Phone, Upload, User } from "lucide-react";
import { trackLead } from "@/lib/track";
import { useFormTracking } from "@/hooks/use-form-tracking";
import { getAttribution } from "@/lib/attribution";
import { jobLeadSource, type Job } from "@/lib/jobs";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { Honeypot, useHoneypot } from "@/components/shared/honeypot";
import { HP_FIELD, HP_TIME } from "@/lib/honeypot";
import { CV_ACCEPT, cvFileError, formatBytes } from "@/lib/cv-upload";

// Job application form. Posts to the existing /api/lead pipeline (Supabase row +
// SMTP notification + Meta CAPI) so applications land in the same inbox and
// dashboard as every other lead, tagged with source "careers-<slug>". The
// "business"/"service" columns are required by the leads table, so they carry
// the company (or a placeholder) and the role title.
//
// The CV is uploaded as a file, so this form posts multipart/form-data; the
// lead API takes both that and the JSON every other form on the site sends.

type FieldName = "name" | "email" | "phone" | "location" | "company" | "experience" | "message" | "cv";
type TextField = Exclude<FieldName, "cv">;

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "1 to 2 years",
  "3 to 5 years",
  "5+ years",
];

const DEFAULT_EXPERIENCE_LABEL = "Relevant experience";
const DEFAULT_MESSAGE_PLACEHOLDER =
  "Tell us why you're a good fit for this role, and what you'd want to be doing a year from now.";

type FormState = { values: Record<TextField, string>; errors: Partial<Record<FieldName, string>> };

const empty: FormState = {
  values: {
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    experience: "",
    message: "",
  },
  errors: {},
};

function validate(v: FormState["values"], cv: File | null): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{7,14}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!v.location.trim()) e.location = "Tell us where you're based.";
  if (!v.experience) e.experience = "Pick the closest match.";
  if (!v.message.trim() || v.message.trim().length < 20)
    e.message = "Tell us a bit more, 20+ characters.";
  if (cv) {
    const problem = cvFileError(cv);
    if (problem) e.cv = problem;
  }
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

const ICONS: Partial<Record<TextField, React.ReactNode>> = {
  name: <User className="size-4" strokeWidth={1.9} />,
  email: <Mail className="size-4" strokeWidth={1.9} />,
  phone: <Phone className="size-4" strokeWidth={1.9} />,
  location: <MapPin className="size-4" strokeWidth={1.9} />,
  company: <BriefcaseBusiness className="size-4" strokeWidth={1.9} />,
};

export function ApplyForm({ job }: { job: Job }) {
  const source = jobLeadSource(job);
  const experienceLabel = job.apply?.experienceLabel ?? DEFAULT_EXPERIENCE_LABEL;
  const experienceOptions = job.apply?.experienceOptions ?? EXPERIENCE_OPTIONS;
  const messagePlaceholder = job.apply?.messagePlaceholder ?? DEFAULT_MESSAGE_PLACEHOLDER;
  const [form, setForm] = useState<FormState>(empty);
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const hp = useHoneypot();
  const ft = useFormTracking(source);

  function set(field: TextField, value: string) {
    ft.onInteract();
    setForm((f) => ({ values: { ...f.values, [field]: value }, errors: { ...f.errors, [field]: undefined } }));
  }

  function pickCv(e: React.ChangeEvent<HTMLInputElement>) {
    ft.onInteract();
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setCv(null);
      setForm((f) => ({ ...f, errors: { ...f.errors, cv: undefined } }));
      return;
    }
    const problem = cvFileError(file);
    if (problem) {
      // Clear the input so the same file can be picked again after fixing it.
      e.target.value = "";
      setCv(null);
      setForm((f) => ({ ...f, errors: { ...f.errors, cv: problem } }));
      return;
    }
    setCv(file);
    setForm((f) => ({ ...f, errors: { ...f.errors, cv: undefined } }));
  }

  function clearCv() {
    setCv(null);
    setForm((f) => ({ ...f, errors: { ...f.errors, cv: undefined } }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate(form.values, cv);
    if (Object.keys(errors).length) {
      setForm((f) => ({ ...f, errors }));
      ft.onErrors(Object.keys(errors));
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const hpPayload = hp.payload();
      const fd = new FormData();
      fd.set("name", form.values.name.trim());
      fd.set("email", form.values.email.trim());
      fd.set("phone", form.values.phone.trim());
      // Leads table requires both; keep them meaningful rather than empty.
      fd.set("business", form.values.company.trim() || "Job Application");
      fd.set("service", `${job.title} (Job Application)`);
      fd.set("category", "Job Application");
      fd.set("location", form.values.location.trim());
      fd.set("source", source);
      // The leads table has no experience column, so the qualification the
      // team actually screens on travels at the top of the message body.
      fd.set("message", `${experienceLabel}: ${form.values.experience}\n\n${form.values.message.trim()}`);
      fd.set("marketing_consent", "false");
      fd.set("attribution", JSON.stringify(getAttribution()));
      if (cv) fd.set("cv", cv, cv.name);
      // Honeypot: hidden from humans; bots fill it and get silently dropped.
      fd.set(HP_FIELD, hpPayload[HP_FIELD]);
      if (hpPayload[HP_TIME] !== undefined) fd.set(HP_TIME, String(hpPayload[HP_TIME]));

      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      ft.onSubmitted();
      setStatus("success");
      trackLead(source, { service: job.title, eventId: data?.eventId });
    } catch {
      setStatus("error");
      setErrorMsg("Network error, please try again.");
    }
  }

  const id = (f: FieldName) => `apply-${job.slug}-${f}`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="rounded-3xl border border-border bg-card px-8 py-16 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 14 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-rating/10 text-rating"
        >
          <Check className="size-8" strokeWidth={2.2} />
        </motion.span>
        <RevealHeading as="h2" className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
          Application received.
        </RevealHeading>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Thanks for applying for the {job.title} role. We&apos;ve got your details
          and will be in touch on {form.values.phone} about a first conversation.
        </p>
      </motion.div>
    );
  }

  const text = (field: TextField, label: string, type: string, ph: string, auto: string, optional = false) => (
    <div>
      <label htmlFor={id(field)} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      <div className="relative">
        <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/80">
          {ICONS[field]}
        </span>
        <input
          id={id(field)} type={type} required={!optional} autoComplete={auto}
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
      className="rounded-3xl border border-border bg-card p-7 md:p-9"
    >
      {/* Honeypot: hidden from humans; bots fill it and get silently dropped. */}
      <Honeypot {...hp.field} />

      <div className="grid gap-4 sm:grid-cols-2">
        {text("name", "Your name", "text", "Full name", "name")}
        {text("email", "Email", "email", "you@email.com", "email")}
        {text("phone", "Phone", "tel", "+91 00000 00000", "tel")}
        {text("location", "Where are you based?", "text", "e.g. DharAndheri, Nagpur", "address-level2")}
        {text("company", "Current company", "text", "Student, fresher, or your current firm", "organization", true)}

        <div>
          <label htmlFor={id("experience")} className="mb-1.5 block text-sm font-semibold">
            {experienceLabel}
          </label>
          <div className="relative">
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/80">
              <BriefcaseBusiness className="size-4" strokeWidth={1.9} />
            </span>
            <select
              id={id("experience")} required
              value={form.values.experience}
              onChange={(e) => set("experience", e.target.value)}
              aria-invalid={!!form.errors.experience}
              className={fc(!!form.errors.experience)}
            >
              <option value="">Select one</option>
              {experienceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          {form.errors.experience && <p className="mt-1.5 text-xs text-destructive">{form.errors.experience}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("cv")} className="mb-1.5 block text-sm font-semibold">
            Upload your CV
            <span className="font-normal text-muted-foreground"> (optional)</span>
          </label>
          <div className="relative">
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/80">
              <Upload className="size-4" strokeWidth={1.9} />
            </span>
            <input
              id={id("cv")} type="file"
              accept={CV_ACCEPT}
              onChange={pickCv}
              aria-invalid={!!form.errors.cv}
              className={[
                "w-full rounded-xl border bg-background/70 py-2.5 pl-11 pr-3.5 text-sm text-foreground outline-none transition-all duration-200",
                "file:mr-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-text",
                form.errors.cv
                  ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                  : "border-border focus:border-brand focus:ring-4 focus:ring-brand/15 hover:border-brand/50",
              ].join(" ")}
            />
          </div>
          {form.errors.cv ? (
            <p className="mt-1.5 text-xs text-destructive">{form.errors.cv}</p>
          ) : (
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
              <span>PDF, Word document or image, up to 5 MB.</span>
              {cv && (
                <>
                  <span className="font-semibold text-foreground">
                    {cv.name} · {formatBytes(cv.size)}
                  </span>
                  <button
                    type="button"
                    onClick={clearCv}
                    className="font-semibold text-brand-text hover:underline"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="mb-1.5 block text-sm font-semibold">
            Why you, and why this role
          </label>
          <textarea
            id={id("message")} required rows={5}
            value={form.values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!form.errors.message}
            placeholder={messagePlaceholder}
            className={fc(!!form.errors.message) + " resize-none"}
          />
          {form.errors.message && <p className="mt-1.5 text-xs text-destructive">{form.errors.message}</p>}
        </div>
      </div>

      <motion.button
        type="submit" disabled={status === "submitting"} whileTap={{ scale: 0.98 }}
        className="group btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit application"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-sm text-destructive">{errorMsg}</p>
      )}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Your details are used only to consider you for this role.
      </p>
    </form>
  );
}
