import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/members/auth-card";
import { RegisterForm } from "@/components/members/auth-forms";
import { Alert } from "@/components/members/ui";
import { AUTH_ERRORS } from "@/lib/members/auth-errors";
import { safeNext } from "@/lib/members/config";
import { membersConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Create your free account",
  description: "Join Timewheel for free: member downloads, the Premium library and a community of people growing their business online.",
  alternates: { canonical: "/register" },
};

export default async function RegisterPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const next = safeNext(sp.next);
  const loginHref = next === "/members" ? "/login" : `/login?next=${encodeURIComponent(next)}`;

  return (
    <AuthCard
      title="Create your account"
      intro="Free, and it takes under a minute."
      footer={
        <>
          Already a member?{" "}
          <Link href={loginHref} className="font-semibold text-brand-text hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {!membersConfigured() && (
        <div className="mb-5">
          <Alert tone="bad">{AUTH_ERRORS.unavailable}</Alert>
        </div>
      )}
      <RegisterForm next={next} googleNext={`${next}${next.includes("?") ? "&" : "?"}welcome=1`} />
    </AuthCard>
  );
}
