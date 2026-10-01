"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Heart,
  Buildings,
  SolarPanel,
  Rocket,
  User,
  VideoCamera,
  Lightning,
  PaintBrushBroad,
  Mountains,
  GraduationCap,
  Globe,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { clientSites } from "@/lib/client-sites";

const ICONS: Record<string, Icon> = {
  heart: Heart,
  buildings: Buildings,
  solar: SolarPanel,
  rocket: Rocket,
  user: User,
  video: VideoCamera,
  lightning: Lightning,
  brush: PaintBrushBroad,
  mountains: Mountains,
  graduation: GraduationCap,
};

// Six cards up front, the rest behind a click so the section stays compact.
const VISIBLE = 6;

export function ClientSitesGrid({
  accents,
  linkTo = "site",
}: {
  accents?: string[];
  /** "site" opens the live site in a new tab, "caseStudy" goes to its case study. */
  linkTo?: "site" | "caseStudy";
}) {
  const [shown, setShown] = useState(VISIBLE);
  const hasMore = shown < clientSites.length;
  const palette = accents?.length ? accents : null;
  const toCaseStudy = linkTo === "caseStudy";

  return (
    <>
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clientSites.slice(0, shown).map((site, i) => {
          const Icon = ICONS[site.iconKey] ?? Globe;
          const color = palette ? palette[i % palette.length] : site.accent;
          return (
            <Link
              key={site.href}
              href={toCaseStudy ? `/case-studies/${site.caseStudySlug}` : site.href}
              {...(toCaseStudy
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid size-11 place-items-center rounded-xl"
                  style={{ backgroundColor: `${color}1a`, color }}
                >
                  <Icon size={22} weight="duotone" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating">
                  Live
                </span>
              </div>
              <h3 className="mt-4 flex items-center gap-1.5 text-lg font-bold">
                {site.name}
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{site.category}</p>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {site.description}
              </p>
            </Link>
          );
        })}
      </Reveal>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShown(clientSites.length)}
            className="btn btn-outline rounded-lg px-6 py-2.5 text-sm font-semibold"
          >
            Load more projects
          </button>
        </div>
      )}
    </>
  );
}
