import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { DeleteAccountForm, EmailPrefsForm, ProfileForm } from "@/components/members/account-forms";
import { Alert } from "@/components/members/ui";
import { formatDate, isLifetime } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Account" };

function Panel({ title, intro, children, tone, id }: { title: string; intro?: ReactNode; children: ReactNode; tone?: "danger"; id?: string }) {
  return (
    <section id={id} className={"scroll-mt-24 " + (tone === "danger" ? "rounded-lg border border-destructive/30 bg-surface p-5 sm:p-6" : "rounded-lg border border-border bg-surface p-5 sm:p-6")}>
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
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Your account</p>
        <h1 className="mt-2 font-heading font-extrabold tracking-tight">Profile &amp; account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Member since {formatDate(m.joinedAt)} ·{" "}
          <Link href={`/members/people/${m.id}`} className="font-semibold text-brand-text hover:underline">
            View your profile
          </Link>
        </p>
      </header>
      {sp.updated === "password" && <Alert tone="good">Your password was updated.</Alert>}

      <Panel id="profile" title="Your profile" intro="Shown to other signed-in members on your profile and next to your posts.">
        <ProfileForm values={{ name: m.name, ...m.profile }} />
      </Panel>

      <Panel id="emails" title="Email preferences">
        <EmailPrefsForm replies={m.emailPrefs.replies} announcements={m.emailPrefs.announcements} />
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
