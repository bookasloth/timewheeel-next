import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { DeleteAccountForm, ProfileForm } from "@/components/members/account-forms";
import { MemberPageHeader } from "@/components/members/page-header";
import { Alert } from "@/components/members/ui";
import { formatDate, isLifetime } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Account" };

function Panel({ title, intro, children, tone }: { title: string; intro?: ReactNode; children: ReactNode; tone?: "danger" }) {
  return (
    <section className={tone === "danger" ? "rounded-lg border border-destructive/30 bg-card p-5 sm:p-6" : "rounded-lg border border-border bg-card p-5 sm:p-6"}>
      <p className="font-heading text-lg font-bold">{title}</p>
      {intro && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function AccountPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/account"), searchParams]);
  const google = m.providers.includes("google");
  const password = m.providers.includes("email");

  return (
    <div className="space-y-6">
      <MemberPageHeader eyebrow="Account" title="Your account" intro={`Member since ${formatDate(m.joinedAt)}.`} />
      {sp.updated === "password" && <Alert tone="good">Your password was updated.</Alert>}

      <Panel title="Profile">
        <ProfileForm name={m.name} />
      </Panel>

      <Panel title="Sign-in">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-0.5 font-semibold">{m.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Signs in with</dt>
            <dd className="mt-0.5 font-semibold">{[google && "Google", password && "Email and password"].filter(Boolean).join(", ") || "Email"}</dd>
          </div>
        </dl>
        {password ? (
          <Link href="/reset-password" className="btn btn-outline mt-5 inline-flex rounded-lg px-4 py-2 text-sm font-semibold">
            Change password
          </Link>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">You sign in with Google, so there&apos;s no password to manage here.</p>
        )}
      </Panel>

      <Panel title="Membership">
        <p className="text-sm">
          <span className="font-semibold">{m.isPremium ? "Premium" : "Free"}</span>
          <span className="text-muted-foreground">
            {m.isPremium &&
              (m.isAdmin && !m.premiumUntil
                ? ", included with admin access"
                : isLifetime(m.premiumUntil)
                  ? ", lifetime"
                  : `, until ${formatDate(m.premiumUntil)}`)}
          </span>
        </p>
        {!m.isPremium && (
          <Link href="/members/premium-downloads" className="mt-3 inline-block text-sm font-semibold text-brand-text hover:underline">
            See what Premium includes
          </Link>
        )}
      </Panel>

      <Panel
        title="Delete account"
        tone="danger"
        intro="This permanently deletes your account, your profile and everything you posted in the community. Payment records we're required to keep for tax stay with us. It can't be undone."
      >
        <DeleteAccountForm />
      </Panel>
    </div>
  );
}
