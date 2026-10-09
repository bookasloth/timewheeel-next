"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
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
      <p role="status" className="mt-6 text-sm text-brand">Thanks, you&apos;re on the list.</p>
    );

  const busy = state === "loading";
  return (
    <form onSubmit={submit} aria-busy={busy} className="mt-6 max-w-sm">
      <div className="flex gap-2">
        <input
          type="email"
          required
          aria-label="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          aria-label={busy ? "Subscribing" : "Subscribe"}
          className="btn btn-primary inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      {state === "error" && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          Couldn&apos;t subscribe you just now. Check the address and try again.
        </p>
      )}
    </form>
  );
}
