import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { JobDetail } from "@/components/careers/role-detail";
import { JobFaq } from "@/components/careers/faq";
import { ApplyForm } from "@/components/careers/apply-form";
import { breadcrumbLd, faqLd, organizationLd } from "@/lib/jsonld";
import { getJob, getJobSlugs, jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

// Every role detail page is a static path; the list is short and rarely changes.
export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role not found, Timewheel" };

  const title = `${job.title} in ${job.location}, Timewheel Careers`;
  const description = `${job.summary} ${job.compensation[0]}. Apply online, no experience required.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/careers/${job.slug}` },
  ...social({ path: `/careers/${job.slug}`, title, description, type: "article" }),
  };
}

// JobPosting so the role can surface in Google for Jobs, plus a FAQPage that
// mirrors the visible questions exactly (both read from lib/jobs.ts).
function jobPostingLd(job: (typeof jobs)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.summary}\n\n${job.intro}`,
    datePosted: job.postedAt,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Timewheel Internet Pvt. Ltd.",
      sameAs: site.url,
    },
    jobLocationType: "onsite",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "IN",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.contact.city,
        addressRegion: site.contact.addressRegion,
        addressCountry: "IN",
      },
    },
    industry: "Internet Marketing",
    occupationalCategory: "Sales",
    experienceRequirements: job.experience,
    totalJobOpenings: 1,
    directApply: true,
    url: `${site.url}/careers/${job.slug}`,
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <div className="overflow-x-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            organizationLd(),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Careers", path: "/careers" },
              { name: job.title, path: `/careers/${job.slug}` },
            ]),
            jobPostingLd(job),
            faqLd(job.faqs),
          ],
        }}
      />

      <JobDetail job={job} />
      <JobFaq job={job} />

      {/* Apply */}
      <section id="apply" className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Apply now
            </p>
            <h2 className="mt-5 font-black tracking-tight">
              Send us your details for the {job.title} role.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Two minutes, no account needed. We read every application and reply
              to everyone. Add a link to your CV or LinkedIn if you have one,
              otherwise just tell us what you&apos;d do to win a business owner
              over.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
                  `Application: ${job.title}`,
                )}`}
                className="font-semibold text-brand-text hover:underline"
              >
                Send your CV to {site.contact.email}
              </a>
            </p>
          </div>

          <ApplyForm job={job} />
        </div>
      </section>
    </div>
  );
}