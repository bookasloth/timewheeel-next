"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { trackLead } from "@/lib/track";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Fill-in-the-blank project estimate. Underlined transparent fields read as one
// sentence; selects are searchable (service is multi). Submits to /api/lead.
type Vals = {
  name: string; email: string; phone: string; project: string;
  services: string[]; budget: string; timeline: string;
};

const empty: Vals = {
  name: "", email: "", phone: "", project: "",
  services: [], budget: "", timeline: "",
};

const SERVICES = ["Design", "SEO", "Web Development", "Web App", "Digital Marketing", "Branding", "AI & Automation", "Something else"];
const BUDGETS = ["₹20k – ₹40k", "₹45k – ₹75k", "₹75k – ₹1.5L", "₹1.5L – ₹3L"];
const TIMELINES = ["ASAP", "This month", "This quarter", "Just exploring"];

// Underlined, transparent blank. Grows with content but keeps a comfortable
// minimum width so empty blanks are never cramped.
function Blank({ id, label, ph, value, onChange, type = "text", min = 12 }: {
  id: string; label: string; ph: string; value: string; onChange: (v: string) => void; type?: string; min?: number;
}) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={ph}
        size={Math.max(ph.length, min)}
        style={{ minWidth: `${min}ch` }}
        className="est-field mx-2 max-w-full border-0 border-b border-white/50 bg-transparent px-1 pb-1 font-semibold text-white outline-none transition-colors placeholder:font-normal placeholder:text-white/55 focus:border-white [field-sizing:content]"
      />
    </>
  );
}

// Searchable select. `multi` toggles checkbox multi-select (used for services).
function Combo({ label, placeholder, options, value, onChange, multi = false, dropUp = false, wide = false }: {
  label: string; placeholder: string; options: string[];
  value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean; dropUp?: boolean; wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrap = useRef<HTMLSpanElement>(null);
  const selected = multi ? (value as string[]) : ([value].filter(Boolean) as string[]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const shown = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  const display = selected.length ? selected.join(", ") : placeholder;

  const pick = (o: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
    } else {
      onChange(o); setOpen(false); setQ("");
    }
  };

  return (
    <span ref={wrap} className={`relative mx-2 inline-block ${wide ? "flex-1" : ""}`}>
      <button
        type="button" onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox" aria-expanded={open} aria-label={label}
        className={`inline-flex items-center justify-between gap-2 truncate border-b border-white/50 px-1 pb-1 font-semibold outline-none transition-colors focus:border-white ${wide ? "w-full max-w-none" : "min-w-[9ch] max-w-[24ch]"} ${selected.length ? "text-white" : "text-white/60"}`}
      >
        <span className="truncate">{display}</span>
        <ChevronDown className="size-4 shrink-0 text-white/80" aria-hidden />
      </button>

      {open && (
        <div className={`absolute left-0 z-50 w-64 rounded-xl border border-black/10 bg-white p-2 text-left text-neutral-900 shadow-xl ${dropUp ? "bottom-full mb-2" : "top-full mt-2"}`}>
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}…`}
            className="mb-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
          />
          <ul className="max-h-56 overflow-y-auto py-1" role="listbox">
            {shown.length === 0 && <li className="px-3 py-2 text-sm text-neutral-400">No matches</li>}
            {shown.map((o) => {
              const on = selected.includes(o);
              return (
                <li key={o}>
                  <button
                    type="button" onClick={() => pick(o)} role="option" aria-selected={on}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-100 ${on ? "font-semibold text-brand" : "text-neutral-800"}`}
                  >
                    {o}
                    {on && <Check className="size-4 shrink-0" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </span>
  );
}

export function EstimateForm({ accent }: { accent: string }) {
  const [v, setV] = useState<Vals>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const uid = useId();
  const setStr = (k: "name" | "email" | "phone" | "project" | "budget" | "timeline") =>
    (val: string) => setV((p) => ({ ...p, [k]: val }));
  const id = (k: string) => `${uid}-${k}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!v.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) || !v.phone.trim() || v.services.length === 0) {
      setErr("Add your name, a valid email, phone and at least one service so we can reply."); setStatus("error"); return;
    }
    setStatus("sending"); setErr("");
    const message =
      `Project estimate (footer)\n` +
      `Building: ${v.project || "—"}\n` +
      `Needs: ${v.services.join(", ")}\n` +
      `Budget: ${v.budget || "—"} · Timeline: ${v.timeline || "—"}`;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: v.name.trim(), business: v.project.trim() || "—",
          email: v.email.trim(), phone: v.phone.trim(),
          service: v.services.join(", "), message, source: "Footer estimate",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatus("error"); setErr(data?.error ?? "Something went wrong. Please try again."); return; }
      setStatus("ok");
      trackLead("estimate", { service: v.services.join(", "), value: v.budget, eventId: data?.eventId });
    } catch { setStatus("error"); setErr("Network error, please try again."); }
  }

  if (status === "ok") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <RevealHeading as="h2" className="text-2xl font-black tracking-tight md:text-3xl">Thanks — that&apos;s in. 🎉</RevealHeading>
        <p className="mt-3 text-white/80">We usually respond within a couple of business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full" aria-label="Project estimate">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Get your project estimate — free</p>
      <p className="mt-2 text-sm text-white/70">Fill in the underlined blanks.</p>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-3 text-[18px] tracking-tight md:text-[22px]">
        <span>Hey, I&apos;m</span>
        <Blank id={id("name")} label="Your name" ph="your name" value={v.name} onChange={setStr("name")} min={12} />
        <span>— reach me at</span>
        <Blank id={id("email")} label="Your email" ph="email" type="email" value={v.email} onChange={setStr("email")} min={18} />
        <span>or</span>
        <Blank id={id("phone")} label="Your phone" ph="phone" type="tel" value={v.phone} onChange={setStr("phone")} min={13} />
        <span>.</span>

        <span className="basis-full" aria-hidden />
        <span>I&apos;m building</span>
        <Blank id={id("project")} label="Project or business name" ph="project name" value={v.project} onChange={setStr("project")} min={16} />
        <span>and I need help with</span>
        <Combo label="Services" placeholder="services" options={SERVICES} value={v.services} onChange={(val) => setV((p) => ({ ...p, services: val as string[] }))} multi dropUp wide />
        <span>.</span>

        <span className="basis-full" aria-hidden />
        <span>I can invest</span>
        <Combo label="Budget" placeholder="budget" options={BUDGETS} value={v.budget} onChange={(val) => setStr("budget")(val as string)} dropUp />
        <span>and want to get moving</span>
        <Combo label="Timeline" placeholder="timeline" options={TIMELINES} value={v.timeline} onChange={(val) => setStr("timeline")(val as string)} dropUp />
        <span>.</span>
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit" disabled={status === "sending"} style={{ color: accent }}
          className="btn inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Let's Talk"}
          <ArrowRight className="size-4" />
        </button>
        {status === "error" && <p role="alert" className="text-sm text-white">{err}</p>}
      </div>
    </form>
  );
}
