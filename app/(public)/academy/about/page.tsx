import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { AcademyPageHeader } from "@/components/academy/page-header";
import { LearningLoop } from "@/components/academy/learning-loop";
import { CareerSupport } from "@/components/academy/career-support";
import { RegisterSection } from "@/components/academy/register-section";
import { NO_PROMISES } from "@/lib/academy";
import { breadcrumbLd, organizationLd, webPageLd } from "@/lib/jsonld";
import { social } from "@/lib/metadata";

const TITLE = "About the Academy: Mission and Teaching Approach | Timewheel Academy";
const DESC =
  "Why Timewheel started a digital marketing academy for students, how it teaches (Learn, Execute, Measure, Prove), its certificates and internships, and what it won't promise.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/academy/about" },
  ...social({ path: "/academy/about", title: TITLE, description: DESC }),
};

const TRAIL = [
  { name: "Academy", path: "/academy" },
  { name: "About", path: "/academy/about" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    webPageLd({ type: "AboutPage", name: "About Timewheel Digital Marketing Academy", path: "/academy/about", description: DESC }),
    breadcrumbLd([{ name: "Home", path: "/" }, ...TRAIL]),
  ],
};

const PRINCIPLES = [
  {
    title: "Work over theory",
    text: "Concepts are taught when the work needs them. If a lesson doesn't change what you'd do on a real brief, it doesn't make the cut.",
  },
  {
    title: "Measure honestly",
    text: "Every assignment ends with a check against data or a clear standard. Learning to say \"this didn't work, here's why\" is part of the job.",
  },
  {
    title: "Show the process",
    text: "Employers and clients want to see how you think. Case studies document the brief, the decisions and the result, not just the final file.",
  },
  {
    title: "Right-sized briefs",
    text: "Assignments are scoped like the work a junior marketer is actually handed: one audit, one calendar, one landing page, done properly.",
  },
  {
    title: "AI as a tool, people in charge",
    text: "AI tools are taught and encouraged, with fact-checking built in. You stay responsible for what goes out under your name.",
  },
];

const WONT = [
  "Guarantee jobs, income or rankings.",
  "Publish placement rates, student counts or reviews we can't back up.",
  "Present practice exercises as client work.",
  "Ask for payment before you have the cohort's dates, format and fees in writing.",
];

export default function AcademyAboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AcademyPageHeader
        trail={TRAIL}
        eyebrow="About the Academy"
        title="Built by people who do the work."
        intro={
          <p>
            Timewheel Digital Marketing Academy is a learning initiative by Timewheel Internet Private Limited, a
            digital marketing and web studio in Nagpur. Our mission: help students learn marketing by doing it, and
            leave with work that proves it.
          </p>
        }
      />

      {/* Why */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Why we started it</p>
            <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
              Knowing the terms isn&apos;t the same as doing the work.
            </RevealHeading>
          </Reveal>
          <Reveal className="space-y-5 leading-relaxed text-muted-foreground">
            <p>
              We run SEO, content, social and paid campaigns for businesses every week. When we talk to students
              and freshers, the gap is rarely knowledge. Most can define a keyword or a funnel. Far fewer have
              audited a website, planned a month of content, or explained a drop in traffic from the data.
            </p>
            <p>
              That gap is what the Academy is for. Each program takes the skills entry-level marketing work asks
              for and teaches them through assignments shaped like that work, with feedback, revision and a written
              case study at the end.
            </p>
            <p>
              We are starting small and honestly: three programs first, details shared with everyone who registers
              interest before anything is asked of them.
            </p>
          </Reveal>
        </div>
      </section>

      <LearningLoop
        title="Learn, Execute, Measure, Prove"
        intro="The learning philosophy behind every program. Doing the work once teaches you something; measuring it and improving it teaches you far more."
      />

      {/* Principles: a plain numbered list */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Teaching approach</p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            Five principles we teach by
          </RevealHeading>
        </Reveal>
        <ol className="mt-12 border-b border-border">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="grid gap-2 border-t border-border py-7 md:grid-cols-[4rem_16rem_1fr] md:gap-8">
              <span className="font-heading text-sm font-bold tabular-nums text-brand-text">0{i + 1}</span>
              <h3 className="text-lg font-extrabold tracking-tight">{p.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CareerSupport />

      {/* Commitments */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Our commitments</p>
            <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
              What we won&apos;t do
            </RevealHeading>
            <p className="mt-4 leading-relaxed text-muted-foreground">{NO_PROMISES}</p>
          </Reveal>
          <Reveal>
            <ul className="space-y-4">
              {WONT.map((w) => (
                <li key={w} className="flex gap-3 rounded-lg border border-border bg-card px-5 py-4 text-sm leading-relaxed">
                  <span aria-hidden className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>We won&apos;t {w.charAt(0).toLowerCase() + w.slice(1)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Who runs it */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Who runs it</p>
            <h2 className="mt-5 font-black tracking-tight">Timewheel Internet Private Limited</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A Nagpur studio building websites and running SEO, social media and digital marketing for
              businesses. The Academy is taught from that day-to-day practice.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href="/about" className="inline-flex items-center gap-1.5 hover:text-brand-text">
              About Timewheel
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 hover:text-brand-text">
              Our client work
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <RegisterSection />
    </>
  );
}
