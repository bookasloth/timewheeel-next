"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

// Fill-in-the-blank project estimate. Underlined transparent fields read as one
// sentence; selects are searchable (service is multi). Submits to /api/lead.
type Vals = {
  name: string; email: string; phone: string; project: string;
  services: string[]; today: string; become: string; budget: string; timeline: string;
};

const empty: Vals = {
  name: "", email: "", phone: "", project: "",
  services: [], today: "", become: "", budget: "", timeline: "",
};

const SERVICES = ["Design", "SEO", "Web Development", "Web App", "Digital Marketing", "Branding", "AI & Automation", "Something else"];
const BUDGETS = ["Under ₹50k", "₹50k – ₹1L", "₹1L – ₹3L", "₹3L – ₹10L", "₹10L+"];
const TIMELINES = ["ASAP", "This month", "This quarter", "Just exploring"];

// Underlined, transparent blank. field-sizing grows it to the content.
function Blank({ id, label, ph, value, onChange, type = "text" }: {
  id: string; label: string; ph: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={ph}
        size={Math.max(ph.length, 6)}
        className="est-field mx-1.5 max-w-full border-0 border-b border-white/50 bg-transparent pb-0.5 font-semibold text-white outline-none transition-colors placeholder:font-normal placeholder:text-white/55 focus:border-white [field-sizing:content]"
      />
    </>
  );
}

// Searchable select. `multi` toggles checkbox multi-select (used for services).
function Combo({ label, placeholder, options, value, onChange, multi = false }: {
  label: string; placeholder: string; options: string[];
  value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean;
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
    <span ref={wrap} className="relative mx-1.5 inline-block">
      <button
        type="button" onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox" aria-expanded={open} aria-label={label}
        className={`inline-flex max-w-[22ch] items-center gap-1 truncate border-b border-white/50 pb-0.5 font-semibold outline-none transition-colors focus:border-white ${selected.length ? "text-white" : "text-white/60"}`}
      >
        <span className="truncate">{display}</span>
        <ChevronDown className="size-4 shrink-0 text-white/80" aria-hidden />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-black/10 bg-white p-2 text-left text-neutral-900 shadow-xl">
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
  const setStr = (k: "name" | "email" | "phone" | "project" | "today" | "become" | "budget" | "timeline") =>
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
      `From: ${v.today || "—"} → ${v.become || "—"}\n` +
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
    } catch { setStatus("error"); setErr("Network error, please try again."); }
  }

  if (status === "ok") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Thanks — that&apos;s in. 🎉</h2>
        <p className="mt-3 text-white/80">We usually respond within a couple of business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl" aria-label="Project estimate">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Get your project estimate — free</p>
      <p className="mt-2 text-sm text-white/70">Fill in the underlined blanks.</p>

      <p className="mt-7 text-lg leading-loose tracking-tight md:text-2xl md:leading-[2.3]">
        Hey, I&apos;m <Blank id={id("name")} label="Your name" ph="your name" value={v.name} onChange={setStr("name")} /> — reach me at{" "}
        <Blank id={id("email")} label="Your email" ph="email" type="email" value={v.email} onChange={setStr("email")} /> or{" "}
        <Blank id={id("phone")} label="Your phone" ph="phone" type="tel" value={v.phone} onChange={setStr("phone")} />. I&apos;m building{" "}
        <Blank id={id("project")} label="Project or business name" ph="project name" value={v.project} onChange={setStr("project")} /> and I need help with{" "}
        <Combo label="Services" placeholder="services" options={SERVICES} value={v.services} onChange={(val) => setV((p) => ({ ...p, services: val as string[] }))} multi />. The idea: turn{" "}
        <Blank id={id("today")} label="What it is today" ph="today" value={v.today} onChange={setStr("today")} /> into{" "}
        <Blank id={id("become")} label="What you want it to become" ph="what's next" value={v.become} onChange={setStr("become")} />. I can invest{" "}
        <Combo label="Budget" placeholder="budget" options={BUDGETS} value={v.budget} onChange={(val) => setStr("budget")(val as string)} /> and want to get moving{" "}
        <Combo label="Timeline" placeholder="timeline" options={TIMELINES} value={v.timeline} onChange={(val) => setStr("timeline")(val as string)} />. Shall we make it happen?
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
