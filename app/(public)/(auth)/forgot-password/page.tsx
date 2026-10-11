import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/members/auth-card";
import { ForgotPasswordForm } from "@/components/members/auth-forms";

export const metadata: Metadata = { title: "Reset your password", alternates: { canonical: "/forgot-password" } };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot your password?"
      intro="Enter the email you signed up with and we'll send you a link to set a new one."
      footer={
        <Link href="/login" className="font-semibold text-brand-text hover:underline">
          Back to log in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
