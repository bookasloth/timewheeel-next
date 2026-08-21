"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <p className="mt-6 text-sm text-brand">Thanks — you&apos;re on the list.</p>
    );

  return (
    <form onSubmit={submit} className="mt-6 flex max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-primary inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {state === "loading" ? "…" : <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
