"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { CircleAlert, CircleCheck, Info, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputClass } from "@/components/members/input-class";

export { inputClass };

// Small form primitives for the member area, styled like the site's lead forms.

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  aside,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-semibold">
          {label}
          {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function Alert({ tone = "info", children }: { tone?: "info" | "bad" | "good"; children: ReactNode }) {
  const Icon = tone === "bad" ? CircleAlert : tone === "good" ? CircleCheck : Info;
  return (
    <div
      role={tone === "bad" ? "alert" : "status"}
      className={cn(
        "flex gap-2.5 rounded-lg border px-3.5 py-3 text-sm leading-relaxed",
        tone === "bad" && "border-destructive/30 bg-destructive/5 text-destructive",
        tone === "good" && "border-rating/30 bg-rating/8 text-foreground",
        tone === "info" && "border-accent-blue/30 bg-accent-blue/6 text-foreground",
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", tone === "good" && "text-rating", tone === "info" && "text-accent-blue")} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function SubmitButton({
  children,
  pendingText,
  variant = "primary",
  className,
  ...rest
}: {
  children: ReactNode;
  pendingText?: string;
  variant?: "primary" | "outline" | "danger";
  className?: string;
  name?: string;
  value?: string;
  formAction?: (fd: FormData) => void | Promise<void>;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-busy={pending}
      {...rest}
      disabled={pending || rest.disabled}
      className={cn(
        "btn inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold",
        variant === "primary" && "btn-primary text-brand-foreground",
        variant === "outline" && "btn-outline",
        variant === "danger" && "border border-destructive/40 text-destructive hover:bg-destructive hover:text-white",
        className,
      )}
    >
      {pending && <LoaderCircle className="size-4 animate-spin" />}
      {pending && pendingText ? pendingText : children}
    </button>
  );
}

/** Submit button that asks first. For deletes and other one-way actions. */
export function ConfirmSubmit({ message, children, className }: { message: string; children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={cn("inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive disabled:opacity-60", className)}
    >
      {pending && <LoaderCircle className="size-3.5 animate-spin" />}
      {children}
    </button>
  );
}
