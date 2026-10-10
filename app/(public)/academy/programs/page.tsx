import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { AcademyPageHeader } from "@/components/academy/page-header";
import { ProgramCard, ProgramRow } from "@/components/academy/program-card";
import { RegisterSection } from "@/components/academy/register-section";
import { launchPrograms, programPath, programs, upcomingPrograms } from "@/lib/academy";
import { breadcrumbLd, itemListLd, organizationLd, webPageLd } from "@/lib/jsonld";
import { social } from "@/lib/metadata";

const TITLE = "Digital Marketing Programs for Students | Timewheel Academy";
const DESC =
  "Compare Timewheel Academy programs in SEO, content and social media marketing, AI for digital marketing, performance marketing and analytics: modules, duration, level, certificates and internships.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/academy/programs" },
  ...social({ path: "/academy/programs", title: TITLE, description: DESC }),
};

const TRAIL = [
  { name: "Academy", path: "/academy" },
  { name: "Programs", path: "/academy/programs" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    webPageLd({
      type: "CollectionPage",
      name: "Timewheel Academy programs",
      path: "/academy/programs",
      description: DESC,
      mainEntity: itemListLd(programs.map((p) => ({ name: p.title, path: programPath(p) }))),
    }),
    breadcrumbLd([{ name: "Home", path: "/" }, ...TRAIL]),
  ],
};

// Static comparison rows, read from the same program data as the cards.
const COMPARE = [
  { k: "Level", get: (p: (typeof programs)[number]) => p.level },
  { k: "Duration", get: (p: (typeof programs)[number]) => p.duration },
  { k: "Weekly effort", get: (p: (typeof programs)[number]) => p.effort },
  { k: "Modules", get: (p: (typeof programs)[number]) => String(p.modules.length) },
];

export default function ProgramsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AcademyPageHeader
        trail={TRAIL}
        eyebrow="Programs"
        title="Pick a skill. Build the proof."
        intro={
          <p>
            Each program is a structured path of modules, and every module ends in a piece of work for your
            portfolio. Every program includes a Timewheel certificate, help with Google, Meta, HubSpot and LinkedIn
            certifications, and internships at Timewheel and our sister companies. SEO, Content and Social Media, and
            AI for Digital Marketing come first. None is open for enrollment yet; registering interest gets you
            cohort details before you decide.
          </p>
        }
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Launch programs</p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            First cohorts in planning
          </RevealHeading>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {launchPrograms.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="h-full">
              <ProgramCard program={p} />
            </Reveal>
          ))}
        </div>

        {/* Side-by-side facts. Scrolls inside its own box on small screens. */}
        <Reveal className="mt-14">
          <h3 className="text-lg font-extrabold tracking-tight">Compare at a glance</h3>
          <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">Launch programs compared by level, duration, weekly effort and modules</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-3.5 font-semibold text-muted-foreground">
                    <span className="sr-only">Detail</span>
                  </th>
                  {launchPrograms.map((p) => (
                    <th key={p.slug} scope="col" className="px-5 py-3.5 font-bold">
                      <Link href={programPath(p)} className="hover:text-brand-text">
                        {p.shortTitle}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.k} className="border-b border-border last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-semibold text-muted-foreground">
                      {row.k}
                    </th>
                    {launchPrograms.map((p) => (
                      <td key={p.slug} className="px-5 py-3.5">
                        {row.get(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-16 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Coming later</p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            Planned after the first launch
          </RevealHeading>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Draft curricula, published so you can see where the Academy is heading. Ask to be notified and
            we&apos;ll email you when one opens.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {upcomingPrograms.map((p) => (
            <ProgramRow key={p.slug} program={p} />
          ))}
        </ul>

        <Reveal className="mt-16 rounded-lg border border-border bg-card p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="font-heading text-lg font-extrabold tracking-tight">Not sure where to start?</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              New to marketing? Start with SEO or Content and Social Media Marketing. AI for Digital Marketing works
              best once you know the basics of either.
            </p>
          </div>
          <Link
            href="/academy/faq"
            className="group btn btn-outline mt-5 inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold md:mt-0"
          >
            Read the FAQ
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      <RegisterSection />
    </>
  );
}
