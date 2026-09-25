"use client";

import Link from "next/link";
import { ArrowDownRight, Heart, SquareMousePointer } from "lucide-react";
import { InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { wd } from "@/lib/website-design";

const TYPE =
  "text-5xl font-light leading-none tracking-wider md:text-6xl lg:text-7xl xl:text-[7rem]";
const ICON = "size-10 shrink-0 md:size-12 lg:size-16 xl:size-[7rem]";

// Only real profiles render; placeholder "#" links are dropped.
const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramLogo },
  { href: site.social.twitter, label: "X", Icon: XLogo },
  { href: site.social.youtube, label: "YouTube", Icon: YoutubeLogo },
].filter((s) => s.href !== "#");

export function WdHero() {
  const location = `${site.contact.city}, ${site.contact.region}`.toUpperCase();

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,_black_1px,_transparent_1px)] opacity-15 [background-size:20px_20px]"
      />

      <main className="relative pb-20 pt-20">
        <div className="relative flex w-full flex-col justify-center gap-2 px-6 md:items-center">
          <div className="items-center gap-6 md:flex">
            <p className="max-w-[220px] text-start text-xs leading-5 text-muted-foreground md:max-w-[180px] md:text-right md:text-sm">
              {wd.hero.eyebrow}
            </p>
            <h1 className={`whitespace-nowrap ${TYPE}`}>WE DESIGN</h1>
          </div>

          <div className="items-center gap-6 md:flex">
            <h1 className={`flex items-center ${TYPE}`}>
              <span>WEB</span>
              <SquareMousePointer strokeWidth={1.5} className={`text-wblue ${ICON}`} />
              <span>SITES</span>
            </h1>
            <p className="max-w-[250px] pt-8 text-xs leading-5 text-muted-foreground md:max-w-[180px] md:text-sm">
              {wd.hero.sub}
            </p>
          </div>

          <div className="items-center gap-6 md:flex">
            <h1 className={`flex items-center whitespace-nowrap ${TYPE}`}>
              <span>PEOPLE</span>
              <Heart fill="red" strokeWidth={0} className={ICON} />
              <span>REMEMBER.</span>
            </h1>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl gap-3 px-6">
          <div className="grid items-center gap-3 md:mx-8 md:flex md:justify-end">
            <div className="mx-auto my-6 h-px w-full max-w-3xl bg-border" />
            <div className="whitespace-nowrap text-xs md:text-sm">{location}</div>
            <div className="flex w-full items-end gap-3">
              <span className="text-2xl font-thin md:text-4xl">STUDIO</span>
              <span className="text-3xl font-bold italic text-worange md:text-5xl">
                {site.name}
              </span>
            </div>
          </div>
        </div>

          <div className="pt-8">
            <p className="text-xs leading-5 text-muted-foreground md:text-sm">
              {wd.hero.trustLine}
            </p>
            <Link
              href={wd.hero.secondaryCta.href}
              className="group mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground md:text-sm"
            >
              {wd.hero.secondaryCta.label}
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </div>

        <div className="absolute right-8 bottom-8 flex gap-6 md:right-12">
          {socials.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              <Icon className="size-6" weight="regular" />
            </Link>
          ))}
        </div>

        <Link
          href={wd.hero.primaryCta.href}
          className="absolute right-0 top-1/2 hidden h-36 -translate-y-1/2 items-center md:flex"
        >
          <span className="bg-foreground px-3 py-6 text-sm font-bold text-background">
            <span className="rotate-180 [writing-mode:vertical-rl]">
              {wd.hero.primaryCta.label}
            </span>
          </span>
        </Link>
      </main>
    </section>
  );
}
