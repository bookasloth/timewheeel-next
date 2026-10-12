import type { Metadata } from "next";
import { social } from "@/lib/metadata";

const TITLE = "Disclaimer | Timewheel";
const DESC =
  "The limits of the information on timewheel.co.in: results we describe, third-party links and tools, product availability, and how to reach us with questions.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/legal/disclaimer" },
  ...social({ path: "/legal/disclaimer", title: TITLE, description: DESC }),
};

export default function DisclaimerPage() {
  const updated = "October 12, 2026";

  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-text">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">Disclaimer</h1>
      <p className="mb-10 text-sm text-muted-foreground">Last updated: {updated}</p>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">1. General information</h2>
          <p>
            The content on timewheel.co.in, including blog posts, guides, free downloads and
            reports, is published by Timewheel Internet Pvt. Ltd. for general information. It is
            not legal, financial or tax advice. Please speak to a qualified professional before
            acting on it for your business.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">2. Results</h2>
          <p>
            Case studies and examples describe what happened for specific clients at a specific
            time. Search rankings, ad performance and sales depend on your market, budget,
            competition and platform changes we do not control, so we cannot promise the same
            outcome for every business.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">3. Free tools and reports</h2>
          <p>
            Free SEO reports and audits are generated from public data and automated checks. They
            are a starting point for a conversation, not a complete review of your website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">4. Third-party links and services</h2>
          <p>
            We link to and use third-party platforms such as Google, Meta, Shopify and payment
            providers. We are not responsible for their content, policies, pricing or downtime.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">5. Products</h2>
          <p>
            Features, pricing and availability of our products, including Book A Sloth,
            Alluminaty, EZShop, Ticket Dino and The Parliament, may change. The terms you accept
            inside each product apply to your use of it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">6. Contact</h2>
          <p>
            Questions about anything on this site? Email{" "}
            <a href="mailto:team@timewheel.co.in" className="text-brand hover:underline">
              team@timewheel.co.in
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
