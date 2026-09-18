import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Timewheel",
  description:
    "Learn about the cookies Timewheel uses and how you can manage your preferences.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  const updated = "September 17, 2026";

  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-text">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
        Cookie Policy
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Last updated: {updated}
      </p>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          1. What Are Cookies
        </h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help the site remember your actions and preferences over
          time, so you don&apos;t have to re-enter them each time you visit.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          2. How We Use Cookies
        </h2>
        <p>We use cookies for the following purposes:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-medium text-foreground">
              Essential Cookies:
            </span>{" "}
            Required for the Service to function. These include session
            cookies, authentication tokens, and security cookies. They cannot
            be disabled.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Analytics Cookies:
            </span>{" "}
            Help us understand how visitors interact with our website by
            collecting anonymous usage data. This helps us improve the Service.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Preference Cookies:
            </span>{" "}
            Remember your settings and choices (such as language or region) to
            provide a more personalized experience.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Marketing Cookies:
            </span>{" "}
            Used to deliver relevant advertisements and track campaign
            effectiveness. These are only set with your explicit consent.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          3. Specific Cookies We Use
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 pr-6 font-medium text-foreground">Cookie</th>
                <th className="pb-3 pr-6 font-medium text-foreground">Purpose</th>
                <th className="pb-3 pr-6 font-medium text-foreground">Duration</th>
                <th className="pb-3 font-medium text-foreground">Type</th>
              </tr>
            </thead>
            <tbody className="space-y-3">
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6 font-mono text-xs">session_id</td>
                <td className="py-3 pr-6">Maintains your logged-in session</td>
                <td className="py-3 pr-6">Session</td>
                <td className="py-3">Essential</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6 font-mono text-xs">csrf_token</td>
                <td className="py-3 pr-6">Protects against cross-site request forgery</td>
                <td className="py-3 pr-6">Session</td>
                <td className="py-3">Essential</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6 font-mono text-xs">_ga / _gid</td>
                <td className="py-3 pr-6">Google Analytics, anonymous usage stats</td>
                <td className="py-3 pr-6">2 years / 24 hours</td>
                <td className="py-3">Analytics</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6 font-mono text-xs">theme_pref</td>
                <td className="py-3 pr-6">Stores UI preferences</td>
                <td className="py-3 pr-6">1 year</td>
                <td className="py-3">Preference</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          4. Third-Party Cookies
        </h2>
        <p>
          Some cookies are placed by third-party services embedded in our pages.
          These include analytics providers and payment processors. We do not
          control these third-party cookies. Please refer to the respective
          third party&apos;s privacy policy for more information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          5. Managing Cookies
        </h2>
        <p>You can control and manage cookies in several ways:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-medium text-foreground">Browser Settings:</span>{" "}
            Most browsers allow you to block or delete cookies. Refer to your
            browser&apos;s help documentation for instructions.
          </li>
          <li>
            <span className="font-medium text-foreground">Opt-Out Links:</span>{" "}
            You can opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Google Analytics Opt-Out Browser Add-on
            </a>
            .
          </li>
          <li>
            <span className="font-medium text-foreground">
              Cookie Consent Banner:
            </span>{" "}
            When you first visit the Service, you can choose which categories
            of cookies to accept or reject.
          </li>
        </ul>
        <p>
          Note: Disabling essential cookies may impair the functionality of the
          Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          6. Do Not Track Signals
        </h2>
        <p>
          Some browsers offer a &quot;Do Not Track&quot; (DNT) signal. There is
          no universal standard for how websites should respond to DNT signals.
          At this time, our Service does not alter its data collection practices
          in response to DNT signals, but we remain committed to minimizing data
          collection and respecting user privacy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          7. Changes to This Policy
        </h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in technology, legislation, or our operations. Updates will be posted
          on this page with a revised &quot;Last updated&quot; date.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">8. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us at{" "}
          <a
            href="mailto:privacy@timewheel.com"
            className="text-brand hover:underline"
          >
            privacy@timewheel.com
          </a>
          .
        </p>
      </section>
      </article>
    </div>
  );
}
