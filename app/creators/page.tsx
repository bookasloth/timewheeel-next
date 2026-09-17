import type { Metadata } from "next";
import { creatorUi } from "@/lib/creator";
import { CtHero } from "@/components/creators/hero";
import { CtTicker } from "@/components/creators/ticker";
import { CtShowcase } from "@/components/creators/showcase";
import { CtFeed } from "@/components/creators/feed";
import { CtWall } from "@/components/creators/wall";
import { CtAdmin } from "@/components/creators/admin";
import { CtProcess } from "@/components/creators/process";
import { CtQuotes } from "@/components/creators/quotes";
import { CtFaq } from "@/components/creators/faq";
import { CtFinal } from "@/components/creators/final";

export const metadata: Metadata = {
  title: { absolute: creatorUi.meta.title },
  description: creatorUi.meta.description,
  alternates: { canonical: "/creators" },
  openGraph: {
    type: "website",
    title: creatorUi.meta.title,
    description: creatorUi.meta.description,
    siteName: "Timewheel",
  },
  twitter: {
    card: "summary_large_image",
    title: creatorUi.meta.title,
    description: creatorUi.meta.description,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: creatorUi.faq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CreatorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <CtHero />
      <CtTicker />
      <CtShowcase />
      <CtFeed />
      <CtWall />
      <CtAdmin />
      <CtProcess />
      <CtQuotes />
      <CtFaq />
      <CtFinal />
    </>
  );
}