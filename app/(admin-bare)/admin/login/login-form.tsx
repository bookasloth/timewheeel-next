"use client";

import { useActionState } from "react";
import { consoleLogin, type ConsoleLoginState } from "@/lib/admin/console-login-actions";
import { btn, field } from "@/components/admin/ui";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<ConsoleLoginState, FormData>(consoleLogin, {});
  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className={field.label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" defaultValue={state.email} className={field.input} />
      </div>
      <div>
        <label htmlFor="password" className={field.label}>Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={field.input} />
      </div>
      {state.error && <p role="alert" className="rounded-[3px] border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{state.error}</p>}
      <button type="submit" disabled={pending} className={`${btn.primary} w-full justify-center`}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
