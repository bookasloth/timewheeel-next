import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & SLA | Timewheel",
  description:
    "Review Timewheel's refund policy, service-level commitments, and support response targets.",
  alternates: { canonical: "/legal/refund" },
};

export default function RefundPage() {
  const updated = "September 17, 2026";

  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-text">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
        Refund &amp; SLA
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Last updated: {updated}
      </p>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">1. Overview</h2>
        <p>
          This page outlines Timewheel&apos;s refund eligibility, our
          service-level commitments (SLA), and the response targets you can
          expect from our support team.
        </p>
      </section>

      {/* ── Refund Policy ──────────────────────────────── */}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">2. Refund Policy</h2>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Free Plans &amp; Trials</h3>
          <p>
            Free plans and trial subscriptions do not involve any payment and
            are therefore not subject to refunds. You may cancel a trial at any
            time without charge.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Monthly Subscriptions</h3>
          <p>
            Monthly subscription fees are non-refundable once the billing
            period has started. You may cancel at any time, and your access
            will continue until the end of the current billing period.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Annual Subscriptions</h3>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              Full refund if requested within <span className="font-medium text-foreground">14 days</span> of
              initial purchase.
            </li>
            <li>
              After 14 days, a prorated refund may be issued at our discretion
              for the unused portion of the annual term, minus a 10%
              administrative fee.
            </li>
          </ul>
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Add-ons &amp; One-Time Purchases</h3>
          <p>
            Add-on features and one-time purchases are non-refundable unless
            the product is materially different from its description or is
            non-functional due to a defect on our end.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          3. How to Request a Refund
        </h2>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Email{" "}
            <a
              href="mailto:billing@timewheel.com"
              className="text-brand hover:underline"
            >
              billing@timewheel.com
            </a>{" "}
            with your account email and reason for the refund request.
          </li>
          <li>
            We will review your request and respond within 3 business days.
          </li>
          <li>
            Approved refunds are processed to the original payment method within
            5–10 business days.
          </li>
        </ol>
      </section>

      {/* ── SLA ────────────────────────────────────────── */}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          4. Service-Level Agreement (SLA)
        </h2>
        <p>
          We commit to the following uptime and performance targets for
          production environments:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 pr-6 font-medium text-foreground">Metric</th>
                <th className="pb-3 font-medium text-foreground">Target</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">Monthly Uptime</td>
                <td className="py-3 font-medium text-foreground">99.9%</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">Scheduled Maintenance</td>
                <td className="py-3 font-medium text-foreground">
                  &lt; 4 hours / month, off-peak
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">Incident Notification</td>
                <td className="py-3 font-medium text-foreground">
                  Within 30 minutes of detection
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Data Durability</td>
                <td className="py-3 font-medium text-foreground">
                  99.999999999% (11 nines)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          5. SLA Credit Policy
        </h2>
        <p>
          If monthly uptime falls below the SLA target, you may be eligible for
          service credits:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 pr-6 font-medium text-foreground">Uptime</th>
                <th className="pb-3 font-medium text-foreground">Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">99.0% – 99.9%</td>
                <td className="py-3">10% of monthly fee</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">95.0% – 99.0%</td>
                <td className="py-3">25% of monthly fee</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Below 95.0%</td>
                <td className="py-3">50% of monthly fee</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Credits are applied to your next billing cycle and must be requested
          within 30 days of the incident. Credits are capped at 50% of the
          monthly subscription fee.
        </p>
      </section>

      {/* ── Support ────────────────────────────────────── */}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          6. Support Response Times
        </h2>
        <p>
          Response times depend on your plan tier and the severity of the
          issue:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 pr-6 font-medium text-foreground">Severity</th>
                <th className="pb-3 pr-6 font-medium text-foreground">Description</th>
                <th className="pb-3 font-medium text-foreground">Response</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">
                  <span className="inline-block rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                    Critical
                  </span>
                </td>
                <td className="py-3 pr-6">Service is down or severely impaired</td>
                <td className="py-3 font-medium text-foreground">{"< 1 hour"}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">
                  <span className="inline-block rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                    High
                  </span>
                </td>
                <td className="py-3 pr-6">
                  Major feature is broken, no workaround
                </td>
                <td className="py-3 font-medium text-foreground">{"< 4 hours"}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6">
                  <span className="inline-block rounded-full bg-accent-yellow/20 px-2 py-0.5 text-xs font-medium text-foreground">
                    Medium
                  </span>
                </td>
                <td className="py-3 pr-6">
                  Feature is degraded but usable
                </td>
                <td className="py-3 font-medium text-foreground">{"< 24 hours"}</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">
                  <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Low
                  </span>
                </td>
                <td className="py-3 pr-6">
                  General question, feature request, or cosmetic issue
                </td>
                <td className="py-3 font-medium text-foreground">{"< 48 hours"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          7. Exclusions
        </h2>
        <p>The SLA does not apply to downtime caused by:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Force majeure events (natural disasters, pandemics, war, etc.).</li>
          <li>Your misuse of the Service or violation of our Terms of Service.</li>
          <li>Third-party services outside our control (DNS providers, ISPs, etc.).</li>
          <li>
            Scheduled maintenance announced at least 48 hours in advance.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">8. Contact Us</h2>
        <p>
          For refund requests or SLA inquiries, please contact us at{" "}
          <a
            href="mailto:billing@timewheel.com"
            className="text-brand hover:underline"
          >
            billing@timewheel.com
          </a>
          .
        </p>
      </section>
      </article>
    </div>
  );
}
