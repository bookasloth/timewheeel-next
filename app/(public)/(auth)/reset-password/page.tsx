import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/members/auth-card";
import { ResetPasswordForm } from "@/components/members/auth-forms";
import { Alert } from "@/components/members/ui";
import { getUser } from "@/lib/members/session";

export const metadata: Metadata = { title: "Set a new password", alternates: { canonical: "/reset-password" } };

// Reached from the reset email (via /auth/callback or /auth/confirm, which sign
// the member in first), or from Account to change a password.
export default async function ResetPasswordPage() {
  const user = await getUser();
  return (
    <AuthCard
      title="Set a new password"
      intro={user ? <>For <strong className="text-foreground">{user.email}</strong>.</> : undefined}
      footer={
        <Link href={user ? "/members/account" : "/login"} className="font-semibold text-brand-text hover:underline">
          {user ? "Back to your account" : "Back to log in"}
        </Link>
      }
    >
      {user ? (
        <ResetPasswordForm />
      ) : (
        <Alert tone="bad">
          This page needs the link from your reset email, and that link has expired or was already used.{" "}
          <Link href="/forgot-password" className="font-semibold underline underline-offset-2">
            Request a new link
          </Link>
          .
        </Alert>
      )}
    </AuthCard>
  );
}
