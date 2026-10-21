"use client";

import { useState } from "react";
import { mb } from "@/lib/marketing-bug";

export function MbSubscribeForm() {
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

  if (state === "ok") {
    return (
      <p role="status" className="mb-subscribe-note">
        Thanks, you&apos;re on the list. Tomorrow&apos;s issue lands in your inbox.
      </p>
    );
  }

  const busy = state === "loading";

  return (
    <div id="mb-subscribe">
      <form onSubmit={submit} aria-busy={busy} className="mb-subscribe">
        <input
          type="email"
          required
          aria-label={mb.hero.formLabel}
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder={mb.hero.formLabel}
        />
        <button type="submit" disabled={busy} aria-busy={busy}>
          {busy ? "Subscribing…" : mb.hero.formCta}
        </button>
      </form>
      {state === "error" && (
        <p role="alert" className="mb-subscribe-note" style={{ color: "#c92f21" }}>
          Couldn&apos;t subscribe you just now. Check the address and try again.
        </p>
      )}
    </div>
  );
}
