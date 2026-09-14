import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const imgSrc = `https://picsum.photos/seed/${cs.slug}/900/600`;

  return (
    <Link
      href={cs.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_24px_60px_-24px_rgba(15,17,17,0.25)]"
    >
      <div
        className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/0"
        aria-hidden="true"
      />
      <Image
        src={imgSrc}
        alt={cs.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-opacity duration-500 group-hover:opacity-0"
      />

      <span
        className="absolute bottom-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
        style={{ backgroundColor: cs.accent }}
      >
        {cs.name}
      </span>

      <div className="relative flex h-full flex-1 flex-col p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex w-fit rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] font-semibold text-foreground">
          {cs.category}
        </span>
        <p className="mt-3 text-sm font-semibold text-foreground/70">{cs.tagline}</p>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight" style={{ color: cs.accent }}>
          {cs.name}
        </h3>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-bold text-foreground">
          Read case study
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}