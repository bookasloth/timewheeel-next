"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HP_FIELD, HP_TIME } from "@/lib/honeypot";

// Off-screen bot trap for public forms; the server check is lib/honeypot.ts.
// Everything here is picked so browsers and password managers leave it alone:
// a meaningless name and id, a label with no form-field words, an autocomplete
// token address autofill never fills, and the common password-manager opt-outs.
// Bots that fill every input still take the bait.
//
//   const hp = useHoneypot();
//   <Honeypot {...hp.field} />                               inside the form
//   body: JSON.stringify({ ...data, ...hp.payload() })       on submit

export function useHoneypot() {
  const [value, setValue] = useState("");
  const shownAt = useRef<number | null>(null);
  const onShown = useCallback(() => {
    shownAt.current = Date.now();
  }, []);
  const payload = () => ({
    [HP_FIELD]: value,
    [HP_TIME]: shownAt.current === null ? undefined : Date.now() - shownAt.current,
  });
  return { field: { value, onChange: setValue, onShown }, payload };
}

type Props = { value: string; onChange: (v: string) => void; onShown: () => void };

export function Honeypot({ value, onChange, onShown }: Props) {
  const id = useId();
  // Start the time-to-submit clock when the trap actually renders (the growth
  // blueprint modal only shows it on its last step).
  useEffect(() => onShown(), [onShown]);
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Leave this empty</label>
      <input
        id={id}
        name={HP_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="new-password"
        data-1p-ignore=""
        data-lpignore="true"
        data-bwignore=""
        data-form-type="other"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
