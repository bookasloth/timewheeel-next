"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, LoaderCircle, MailCheck } from "lucide-react";
import {
  requestPasswordReset,
  resendConfirmation,
  signInWithGoogle,
  signInWithPassword,
  signUp,
  updatePassword,
  type AuthState,
} from "@/lib/members/auth-actions";
import { Honeypot, useHoneypot } from "@/components/shared/honeypot";
import { HP_FIELD, HP_TIME } from "@/lib/honeypot";
import {
  Alert,
  Field,
  SubmitButton,
  inputClass,
} from "@/components/members/ui";

const initial: AuthState = {};

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-[18px]" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function GoogleSubmit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="btn flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/30"
    >
      {pending ? (
        <LoaderCircle className="size-[18px] animate-spin" />
      ) : (
        <GoogleMark />
      )}
      {label}
    </button>
  );
}

export function GoogleButton({
  next,
  label = "Continue with Google",
}: {
  next: string;
  label?: string;
}) {
  return (
    <form action={signInWithGoogle}>
      <input type="hidden" name="next" value={next} />
      <GoogleSubmit label={label} />
    </form>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      or
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function PasswordInput({
  id,
  name,
  autoComplete,
  error,
  placeholder,
}: {
  id: string;
  name: string;
  autoComplete: string;
  error?: boolean;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        required
        minLength={autoComplete === "new-password" ? 8 : undefined}
        maxLength={72}
        placeholder={placeholder}
        aria-invalid={error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(error) + " pr-11"}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted-foreground hover:text-foreground"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function CheckInbox({
  email,
  title,
  children,
}: {
  email?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div role="status" className="text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-rating/12 text-rating">
        <MailCheck className="size-6" />
      </span>
      <p className="mt-5 font-heading text-xl font-extrabold tracking-tight">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We sent a link to <strong className="text-foreground">{email}</strong>.
        It can take a minute, and it sometimes lands in spam or Promotions.
      </p>
      {children}
    </div>
  );
}

function ResendLink({ email }: { email?: string }) {
  const [state, action] = useActionState(resendConfirmation, initial);
  if (state.sent === "resent")
    return (
      <p className="mt-3 text-xs text-muted-foreground">
        Sent again. Give it a minute.
      </p>
    );
  return (
    <form action={action} className="mt-3">
      <input type="hidden" name="email" value={email ?? ""} />
      {state.error && (
        <p className="mb-2 text-xs text-destructive">{state.error}</p>
      )}
      <ResendButton />
    </form>
  );
}

function ResendButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-xs font-semibold text-brand-text underline-offset-4 hover:underline disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send the confirmation email again"}
    </button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState(signInWithPassword, initial);
  const err = (f: AuthState["field"]) =>
    state.field === f ? state.error : undefined;
  return (
    <form action={action} className="space-y-4" noValidate>
      <input type="hidden" name="next" value={next} />
      {state.error && !state.field && (
        <Alert tone="bad">
          {state.error}
          {state.unconfirmed && <ResendLink email={state.email} />}
        </Alert>
      )}
      <Field id="login-email" label="Email" error={err("email")}>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          placeholder="you@example.com"
          aria-invalid={Boolean(err("email"))}
          className={inputClass(Boolean(err("email")))}
        />
      </Field>
      <Field
        id="login-password"
        label="Password"
        error={err("password")}
        aside={
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-brand-text hover:underline"
          >
            Forgot password?
          </Link>
        }
      >
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          error={Boolean(err("password"))}
        />
      </Field>
      <SubmitButton className="w-full" pendingText="Logging in...">
        Log in
      </SubmitButton>
    </form>
  );
}

export function RegisterForm({
  next,
  googleNext,
}: {
  next: string;
  googleNext: string;
}) {
  const [state, action] = useActionState(signUp, initial);
  const hp = useHoneypot();
  const err = (f: AuthState["field"]) =>
    state.field === f ? state.error : undefined;

  if (state.sent === "confirm") {
    return (
      <CheckInbox email={state.email} title="Check your inbox to finish">
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Click the link in that email to confirm your address and you&apos;re
          in.
        </p>
        <ResendLink email={state.email} />
      </CheckInbox>
    );
  }

  return (
    <>
      <GoogleButton next={googleNext} label="Sign up with Google" />
      <Divider />
      <form
        action={(fd) => {
          const p = hp.payload();
          fd.set(HP_FIELD, String(p[HP_FIELD] ?? ""));
          if (p[HP_TIME] !== undefined) fd.set(HP_TIME, String(p[HP_TIME]));
          return action(fd);
        }}
        className="relative space-y-4"
        noValidate
      >
        <input type="hidden" name="next" value={next} />
        <Honeypot {...hp.field} />
        {state.error && !state.field && <Alert tone="bad">{state.error}</Alert>}
        <Field id="reg-name" label="Your name" error={err("name")}>
          <input
            id="reg-name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={state.name}
            placeholder="Full name"
            aria-invalid={Boolean(err("name"))}
            className={inputClass(Boolean(err("name")))}
          />
        </Field>
        <Field id="reg-email" label="Email" error={err("email")}>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.email}
            placeholder="you@example.com"
            aria-invalid={Boolean(err("email"))}
            className={inputClass(Boolean(err("email")))}
          />
        </Field>
        <Field
          id="reg-password"
          label="Password"
          error={err("password")}
          hint="At least 8 characters."
        >
          <PasswordInput
            id="reg-password"
            name="password"
            autoComplete="new-password"
            error={Boolean(err("password"))}
          />
        </Field>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="newsletter"
            className="mt-0.5 size-4 accent-[var(--brand)]"
          />
          <span>
            Send me the occasional Timewheel newsletter. Unsubscribe any time.
          </span>
        </label>
        <SubmitButton className="w-full" pendingText="Creating your account...">
          Create account
        </SubmitButton>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link
            href="/legal/terms"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </>
  );
}

export function ForgotPasswordForm() {
  const [state, action] = useActionState(requestPasswordReset, initial);
  if (state.sent === "reset") {
    return (
      <CheckInbox email={state.email} title="Check your inbox">
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          If there&apos;s an account for that address, the email has a link to
          set a new password. Accounts created with Google don&apos;t have a
          password: use Continue with Google instead.
        </p>
      </CheckInbox>
    );
  }
  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && !state.field && <Alert tone="bad">{state.error}</Alert>}
      <Field
        id="forgot-email"
        label="Email"
        error={state.field === "email" ? state.error : undefined}
      >
        <input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          placeholder="you@example.com"
          className={inputClass(state.field === "email")}
        />
      </Field>
      <SubmitButton className="w-full" pendingText="Sending...">
        Email me a reset link
      </SubmitButton>
    </form>
  );
}

export function ResetPasswordForm() {
  const [state, action] = useActionState(updatePassword, initial);
  const err = (f: AuthState["field"]) =>
    state.field === f ? state.error : undefined;
  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && !state.field && <Alert tone="bad">{state.error}</Alert>}
      <Field
        id="reset-password"
        label="New password"
        error={err("password")}
        hint="At least 8 characters."
      >
        <PasswordInput
          id="reset-password"
          name="password"
          autoComplete="new-password"
          error={Boolean(err("password"))}
        />
      </Field>
      <Field id="reset-confirm" label="Type it again" error={err("confirm")}>
        <PasswordInput
          id="reset-confirm"
          name="confirm"
          autoComplete="new-password"
          error={Boolean(err("confirm"))}
        />
      </Field>
      <SubmitButton className="w-full" pendingText="Saving...">
        Save new password
      </SubmitButton>
    </form>
  );
}
