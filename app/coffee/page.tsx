import type { Metadata } from "next";
import { coffee } from "@/lib/coffee";
import { CfHero } from "@/components/coffee-landing/hero";
import { CfHumanStory } from "@/components/coffee-landing/human-story";
import { CfMoreThanTip } from "@/components/coffee-landing/more-than-tip";
import { CfSupportPreview } from "@/components/coffee-landing/support-preview";
import { CfCommunityPreview } from "@/components/coffee-landing/community-preview";
import { CfSupporterWall } from "@/components/coffee-landing/supporter-wall";
import { CfCreatorOwnership } from "@/components/coffee-landing/creator-ownership";
import { CfProductPreview } from "@/components/coffee-landing/product-preview";
import { CfCreatorTypes } from "@/components/coffee-landing/creator-types";
import { CfIndependence } from "@/components/coffee-landing/independence";
import { CfFinalCta } from "@/components/coffee-landing/final-cta";

export const metadata: Metadata = {
  title: { absolute: coffee.meta.title },
  description: coffee.meta.description,
  alternates: { canonical: "/coffee" },
};

export default function CoffeePage() {
  return (
    <>
      <CfHero data={coffee} />
      <CfHumanStory data={coffee} />
      <CfMoreThanTip data={coffee} />
      <CfSupportPreview data={coffee} />
      <CfCommunityPreview data={coffee} />
      <CfSupporterWall data={coffee} />
      <CfCreatorOwnership data={coffee} />
      <CfProductPreview data={coffee} />
      <CfCreatorTypes data={coffee} />
      <CfIndependence data={coffee} />
      <CfFinalCta data={coffee} />
    </>
  );
}