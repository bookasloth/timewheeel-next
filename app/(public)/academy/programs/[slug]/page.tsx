import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProgramDetail, RelatedPrograms } from "@/components/academy/program-detail";
import { RegisterSection } from "@/components/academy/register-section";
import { getProgram, programPath, programs, STATUS_META } from "@/lib/academy";
import { breadcrumbLd, faqLd, organizationLd, webPageLd } from "@/lib/jsonld";
import { social } from "@/lib/metadata";

// Every program is a static page; anything else 404s instead of rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};

  const title = `${program.title} Program for Students | Timewheel Academy`;
  const description = `${program.summary} ${program.level}, ${program.duration.toLowerCase()}. Certificate and internships included. ${STATUS_META[program.status].label}.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: programPath(program) },
    ...social({ path: programPath(program), title, description }),
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const trail = [
    { name: "Academy", path: "/academy" },
    { name: "Programs", path: "/academy/programs" },
    { name: program.shortTitle, path: programPath(program) },
  ];

  // No Course markup: there is no cohort, schedule or price yet, so the
  // course rich result requirements aren't met. FAQPage mirrors the visible list.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd(),
      webPageLd({ name: program.title, path: programPath(program), description: program.summary }),
      breadcrumbLd([{ name: "Home", path: "/" }, ...trail]),
      ...(program.faqs.length ? [faqLd(program.faqs)] : []),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProgramDetail program={program} trail={trail} />
      <RegisterSection program={program} />
      <RelatedPrograms program={program} />
    </>
  );
}
