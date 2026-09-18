import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/jsonld";
import { ComingSoon } from "@/components/shared/coming-soon";

const PATH = "/ai-marketing-automation-in-nagpur";
const url = `${site.url}${PATH}`;
const title = "AI + Marketing Automation in Nagpur | Timewheel";
const description =
  "AI-powered marketing automation in Nagpur, workflows, lead nurturing and personalization that run themselves. Page launching soon, talk to our team to get started.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, siteName: site.name, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "AI + Marketing Automation", path: PATH },
];

export default function AiMarketingAutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <ComingSoon
        eyebrow="AI + Marketing Automation"
        title="AI + Marketing Automation in Nagpur"
        blurb="Automated workflows, lead nurturing and personalization powered by AI, so your marketing runs itself. This page is on the way, in the meantime, tell us what you need."
        accent="#ff4d93"
      />
    </>
  );
}
