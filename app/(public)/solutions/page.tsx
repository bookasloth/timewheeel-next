import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";
import { SolHero } from "@/components/solutions/hero";
import { BuildSection } from "@/components/solutions/build-section";
import { SolOwnership } from "@/components/solutions/ownership";
import { SolFinalCta } from "@/components/solutions/final-cta";

const TITLE = "Solutions for Creators, Schools, Shops & Events";
const DESC =
  "Timewheel products for creators, schools and colleges, small businesses, event organizers, communities, sports clubs and D2C brands — booking, ticketing, memberships and stores on systems you own.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/solutions" },
  ...social({ path: "/solutions", title: TITLE, description: DESC }),
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <SolHero />
      <BuildSection />
      <SolOwnership />
      <SolFinalCta />
    </>
  );
}
