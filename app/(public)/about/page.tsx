import type { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { AboutIntro } from "@/components/about/intro";
import { AboutCompany } from "@/components/about/company";
import { AboutPrinciples } from "@/components/about/principles";
import { AboutValues } from "@/components/about/values";
import { AboutCapabilities } from "@/components/about/capabilities";
import { AboutClients } from "@/components/about/clients";
import { AboutWork } from "@/components/about/work";
import { AboutCaseStudies } from "@/components/about/case-studies";
import { AboutTestimonials } from "@/components/about/testimonials";
import { AboutTeam } from "@/components/about/team";
import { AboutProcess } from "@/components/about/process";
import { AboutCta } from "@/components/about/cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd, organizationLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const description =
  "TIMEWHEEL is a digital design and development partner helping ambitious businesses build websites and digital experiences that are clear, modern, and built to grow.";

export const metadata: Metadata = {
  title: "About, Digital Design & Development",
  description,
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    siteName: site.name,
    title: "About Timewheel, Digital Design & Development",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Timewheel, Digital Design & Development",
    description,
  },
};

const aboutLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ],
};

export default function AboutPage() {
  return (
    <div className="overflow-x-clip">
      <JsonLd data={aboutLd} />
      <AboutHero />
      <AboutIntro />
      <AboutCompany />
      <AboutValues />
      <AboutCapabilities />
      <AboutClients />
      <AboutWork />
      <AboutCaseStudies />
      <AboutTestimonials />
      <AboutTeam />
      <AboutProcess />
      <AboutCta />
    </div>
  );
}