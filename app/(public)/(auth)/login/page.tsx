import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/members/auth-card";
import { Divider, GoogleButton, LoginForm } from "@/components/members/auth-forms";
import { Alert } from "@/components/members/ui";
import { AUTH_ERRORS } from "@/lib/members/auth-errors";
import { safeNext } from "@/lib/members/config";
import { membersConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Timewheel account for free downloads, the Premium library and the member community.",
  alternates: { canonical: "/login" },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const next = safeNext(sp.next);
  const error = sp.error ? AUTH_ERRORS[sp.error] ?? AUTH_ERRORS.link : null;
  const registerHref = next === "/members" ? "/register" : `/register?next=${encodeURIComponent(next)}`;

  return (
    <AuthCard
      title="Log in"
      intro="Welcome back. Pick up where you left off."
      footer={
        <>
          New to Timewheel?{" "}
          <Link href={registerHref} className="font-semibold text-brand-text hover:underline">
            Create a free account
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        {!membersConfigured() && <Alert tone="bad">{AUTH_ERRORS.unavailable}</Alert>}
        {error && <Alert tone="bad">{error}</Alert>}
        {sp.signedout && <Alert tone="good">You&apos;re signed out. See you soon.</Alert>}
      </div>
      <div className={error || sp.signedout ? "mt-5" : ""}>
        <GoogleButton next={next} />
      </div>
      <Divider />
      <LoginForm next={next} />
    </AuthCard>
  );
}
