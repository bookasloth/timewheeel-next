import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Timewheel",
  description:
    "Read the terms and conditions governing your use of Timewheel products and services.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  const updated = "September 17, 2026";

  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-text">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
        Terms of Service
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Last updated: {updated}
      </p>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using the Timewheel website and services
          (collectively, the &quot;Service&quot;), you agree to be bound by
          these Terms of Service (&quot;Terms&quot;). If you are using the
          Service on behalf of an organization, you represent that you have the
          authority to bind that organization to these Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          2. Description of Service
        </h2>
        <p>
          Timewheel provides a suite of digital products including but not
          limited to booking systems, payment processing, event management,
          community platforms, and digital marketing tools. Specific features
          and pricing are described on our{" "}
          <a href="/pricing" className="text-brand hover:underline">
            pricing page
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          3. Account Registration
        </h2>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            You must provide accurate and complete information when creating an
            account.
          </li>
          <li>
            You are responsible for safeguarding your account credentials.
          </li>
          <li>
            You must notify us immediately of any unauthorized use of your
            account.
          </li>
          <li>
            You may not share your account with others or transfer it without
            our written consent.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          4. Acceptable Use
        </h2>
        <p>You agree not to:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Use the Service for any unlawful purpose or in violation of any regulations.</li>
          <li>
            Attempt to gain unauthorized access to any part of the Service or
            its related systems.
          </li>
          <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          <li>
            Reverse engineer, decompile, or disassemble any aspect of the
            Service.
          </li>
          <li>
            Use automated systems (bots, scrapers) to access the Service without
            our written permission.
          </li>
          <li>
            Resell, sublicense, or distribute the Service without our written
            consent.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          5. Intellectual Property
        </h2>
        <p>
          The Service and its original content, features, and functionality are
          owned by Timewheel and are protected by copyright, trademark, and
          other intellectual property laws. You retain ownership of any data or
          content you submit to the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          6. Payment Terms
        </h2>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Paid plans are billed in advance on a monthly or annual basis, as
            selected at checkout.
          </li>
          <li>
            All fees are non-refundable except as outlined in our{" "}
            <a href="/legal/refund" className="text-brand hover:underline">
              Refund &amp; SLA
            </a>{" "}
            policy.
          </li>
          <li>
            We reserve the right to modify pricing with 30 days&apos; prior
            notice. Changes take effect at the start of your next billing cycle.
          </li>
          <li>
            Failure to pay may result in suspension or termination of your
            account.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          7. Service Availability &amp; SLA
        </h2>
        <p>
          We strive to maintain high availability. Our service-level targets
          and commitments are detailed in our{" "}
          <a href="/legal/refund" className="text-brand hover:underline">
            Refund &amp; SLA
          </a>{" "}
          page. Scheduled maintenance windows will be communicated in advance
          when possible.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          8. Data &amp; Privacy
        </h2>
        <p>
          Your use of the Service is also governed by our{" "}
          <a href="/legal/privacy" className="text-brand hover:underline">
            Privacy Policy
          </a>
          , which describes how we collect, use, and protect your personal
          information. By using the Service, you consent to such processing and
          you warrant that all data provided by you is accurate.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          9. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, Timewheel shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages, or any loss of profits or revenues, whether incurred directly
          or indirectly, or any loss of data, use, goodwill, or other intangible
          losses resulting from:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Your use of or inability to use the Service.</li>
          <li>Any unauthorized access to or alteration of your data.</li>
          <li>Any third-party conduct or content on the Service.</li>
        </ul>
        <p>
          Our total aggregate liability shall not exceed the amount you paid us,
          if any, in the 12 months preceding the claim.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          10. Termination
        </h2>
        <p>
          We may suspend or terminate your access to the Service at any time,
          with or without cause, with or without notice. Upon termination, your
          right to use the Service ceases immediately. We will make your data
          available for export for a reasonable period following termination.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          11. Governing Law
        </h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of India, without regard to its conflict of law provisions. Any
          disputes arising under these Terms shall be resolved in the courts of
          Nagpur, Maharashtra.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          12. Changes to These Terms
        </h2>
        <p>
          We reserve the right to modify these Terms at any time. Material
          changes will be communicated via email or a prominent notice on the
          Service at least 30 days before they take effect. Your continued use
          of the Service after the effective date constitutes acceptance of the
          revised Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">13. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at{" "}
          <a
            href="mailto:legal@timewheel.com"
            className="text-brand hover:underline"
          >
            legal@timewheel.com
          </a>
          .
        </p>
      </section>
      </article>
    </div>
  );
}
