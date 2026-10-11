import type { Metadata } from "next";
import { social } from "@/lib/metadata";

const TITLE = "Privacy Policy, How Timewheel Handles Your Data";
const DESC =
  "Learn how Timewheel collects, uses, stores and protects your personal information when you use our website, forms, payments and services, and your rights.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/legal/privacy" },
  ...social({ path: "/legal/privacy", title: TITLE, description: DESC }),
};

export default function PrivacyPage() {
  const updated = "October 11, 2026";

  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-text">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Last updated: {updated}
      </p>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          1. Introduction
        </h2>
        <p>
          Timewheel (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates
          the timewheel.co.in website and related products and services (the
          &quot;Service&quot;). This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website or use our Service.
        </p>
        <p>
          By accessing or using the Service, you agree to the collection and use
          of information in accordance with this policy. If you do not agree,
          please discontinue use of the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          2. Information We Collect
        </h2>
        <p>We may collect the following categories of information:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-medium text-foreground">
              Personal Information:
            </span>{" "}
            Name, email address, phone number, billing details, and any
            information you voluntarily provide through forms or account
            registration.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Usage Data:
            </span>{" "}
            Pages visited, features used, browser type, device information, IP
            address, and timestamps of interactions.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Cookies &amp; Tracking:
            </span>{" "}
            We use cookies and similar technologies to maintain sessions,
            remember preferences, and analyze usage patterns. See our{" "}
            <a href="/legal/cookies" className="text-brand hover:underline">
              Cookie Policy
            </a>{" "}
            for details.
          </li>
        </ul>
        <h3 className="pt-2 font-semibold text-foreground">Member accounts and Sign in with Google</h3>
        <p>
          If you create a Timewheel account we store your name, email address and
          sign-in details (a securely hashed password if you choose one; we never
          see or store it in readable form), your membership status, the files you
          download, and anything you post in the member community, which other
          signed-in members can read.
        </p>
        <p>
          If you sign in with Google, we receive only your name, email address and
          profile picture from Google (the &quot;openid&quot;, &quot;email&quot; and
          &quot;profile&quot; permissions). We use them solely to create and sign you
          in to your account and to show your name and picture in the community. We
          do not access your Gmail, contacts, calendar, Drive or any other Google
          data, we never post anything on your behalf, and we do not sell or share
          Google user data with anyone, or use it for advertising. Our use of
          information received from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
        <p>
          Account data is stored with our database provider (Supabase). You can
          delete your account at any time from the Account page in the member area,
          which permanently removes your profile, membership and community posts.
          Payment records we must keep for tax purposes are retained without the
          link to your account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          3. How We Use Your Information
        </h2>
        <p>We use collected information to:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Provide, operate, and maintain the Service.</li>
          <li>Process transactions and send related information (receipts, invoices).</li>
          <li>Send administrative notifications (service updates, security alerts).</li>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Improve and personalize the Service based on usage patterns.</li>
          <li>Send marketing communications, only with your explicit consent.</li>
          <li>Detect, prevent, and address technical issues or fraudulent activity.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          4. How We Share Your Information
        </h2>
        <p>
          We do not sell your personal information. We may share data with
          trusted third parties only as necessary to operate the Service,
          including:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-medium text-foreground">
              Infrastructure Providers:
            </span>{" "}
            Cloud hosting and database services that store data on our behalf.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Payment Processors:
            </span>{" "}
            Third-party payment gateways that process transactions securely.
          </li>
          <li>
            <span className="font-medium text-foreground">Analytics &amp; Advertising:</span>{" "}
            Analytics and ad-measurement tools to understand usage and measure
            campaigns, including Google Analytics and Google Tag Manager, the Meta
            (Facebook) Pixel and Conversions API, Microsoft Clarity and PostHog.
            The Meta Pixel, Google Analytics, Google Tag Manager and Microsoft
            Clarity load only after you accept marketing cookies. We share hashed
            contact details with Meta via its Conversions API to measure ad
            conversions; we never share your raw email or phone with analytics or
            ad platforms.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Legal Requirements:
            </span>{" "}
            If required by law, regulation, or valid legal process.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          5. Data Retention
        </h2>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes described in this policy, unless a longer
          retention period is required or permitted by law. When data is no
          longer needed, we securely delete or anonymize it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          6. Data Security
        </h2>
        <p>
          We implement industry-standard security measures including
          encryption in transit (TLS), encryption at rest, access controls,
          and regular security audits. However, no method of transmission or
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          7. Your Rights
        </h2>
        <p>
          Depending on your jurisdiction, you may have the right to:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your personal information (account holders can also delete their account themselves from the Account page).</li>
          <li>Object to or restrict processing of your data.</li>
          <li>Data portability, receive your data in a structured format.</li>
          <li>Withdraw consent at any time where processing is based on consent.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:team@timewheel.co.in"
            className="text-brand hover:underline"
          >
            team@timewheel.co.in
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          8. International Transfers
        </h2>
        <p>
          Your information may be transferred to and processed in countries
          other than your own. We ensure appropriate safeguards are in place
          for any such transfers, including standard contractual clauses where
          required.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          9. Children&apos;s Privacy
        </h2>
        <p>
          The Service is not intended for individuals under 16 years of age.
          We do not knowingly collect personal information from children. If
          we become aware that we have collected data from a child, we will
          take steps to delete it promptly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          10. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will
          notify you of any material changes by posting the updated policy on
          this page with a revised &quot;Last updated&quot; date. Continued use
          of the Service after changes constitutes acceptance of the updated
          policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us:
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:team@timewheel.co.in"
            className="text-brand hover:underline"
          >
            team@timewheel.co.in
          </a>
        </p>
        <p>Timewheel Internet Pvt. Ltd. · timewheel.co.in</p>
      </section>
      </article>
    </div>
  );
}
