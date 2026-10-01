"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ClientSitesGrid } from "@/components/shared/client-sites-grid";
import { palette, wd } from "@/lib/website-design";

const ACCENTS = [palette.blue, palette.purple, palette.orange, palette.green];

export function WdOurWork() {
  return (
    <div className="mt-16">
      <ClientSitesGrid accents={ACCENTS} linkTo="caseStudy" />

      <Reveal className="mt-12">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-base font-bold tracking-tight">Want to see your business here?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Every project above started with a conversation about a goal.
            </p>
          </div>
          <Link
            href={wd.hero.primaryCta.href}
            className="group btn btn-primary inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
          >
            Start a Project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
