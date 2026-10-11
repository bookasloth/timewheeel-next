"use client";

import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { ArrowClockwise, WarningCircle } from "@phosphor-icons/react";
import { btn } from "@/components/admin/ui";
import { Spinner } from "@/components/admin/feedback";
import { cn } from "@/lib/utils";

// Interactive pieces of the loading-states kit for the admin console.

/** Show "taking longer than usual" once a pending task passes `after` ms. */
export const SLOW_NOTICE = 8000;
export function useSlowNotice(isPending: boolean, after = SLOW_NOTICE) {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!isPending) return;
    const timer = setTimeout(() => setSlow(true), after);
    return () => {
      clearTimeout(timer);
      setSlow(false);
    };
  }, [isPending, after]);
  return slow;
}

type SubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & { pendingLabel?: string; variant?: keyof typeof btn };

/** For <form action={serverAction}>: disables itself and spins while the action runs. */
export function SubmitButton({ children, pendingLabel, variant = "primary", className, disabled, ...rest }: SubmitProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending || disabled} aria-busy={pending} className={cn(btn[variant], "disabled:cursor-not-allowed disabled:opacity-70", className)} {...rest}>
      {pending ? (
        <>
          <Spinner className="size-3.5" />
          {pendingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

/** For error.tsx and failed loads: what happened, plus Retry. */
export function ErrorState({ title = "Something went wrong", message = "Check your connection and try again.", onRetry }: { title?: string; message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-2 rounded-[5px] border border-rose-200 bg-white px-6 py-12 text-center">
      <WarningCircle size={28} weight="duotone" className="text-rose-500" />
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="max-w-sm text-sm text-gray-500">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className={cn(btn.ghost, "mt-2")}>
          <ArrowClockwise size={16} /> Try again
        </button>
      )}
    </div>
  );
}
