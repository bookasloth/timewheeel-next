import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { CaseStudyDetail } from "@/components/case-studies/case-study-detail";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd, organizationLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.name} — Case Study by Timewheel`;
  return {
    title: { absolute: title },
    description: cs.summary,
    alternates: { canonical: cs.href },
    openGraph: {
      type: "website",
      title,
      description: cs.summary,
      siteName: "Timewheel",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cs.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) {
    notFound();
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd(),
      {
        "@type": "Article",
        headline: `${cs.name} — Case Study`,
        description: cs.summary,
        articleSection: cs.category,
        keywords: cs.tags.join(", "),
        ...(cs.meta?.date ? { datePublished: cs.meta.date } : {}),
        ...(cs.image ? { image: `${site.url}${cs.image.src}` } : {}),
        mainEntityOfPage: `${site.url}${cs.href}`,
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: cs.name, path: cs.href },
        ])}
      />
      <CaseStudyDetail cs={cs} />
    </>
  );
}