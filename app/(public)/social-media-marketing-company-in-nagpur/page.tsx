import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/jsonld";
import { ComingSoon } from "@/components/shared/coming-soon";

const PATH = "/social-media-marketing-company-in-nagpur";
const url = `${site.url}${PATH}`;
const title = "Social Media Marketing Company in Nagpur | Timewheel";
const description =
  "Social media marketing services in Nagpur, content, community and paid social that grow your brand. Page launching soon, talk to our team to get started.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, siteName: site.name, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Social Media Marketing", path: PATH },
];

export default function SocialMediaMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <ComingSoon
        eyebrow="Social Media Marketing"
        title="Social Media Marketing in Nagpur"
        blurb="Content, community and paid social built to grow your brand and bring in customers. This page is on the way, in the meantime, tell us what you need."
        accent="#269cef"
      />
    </>
  );
}
