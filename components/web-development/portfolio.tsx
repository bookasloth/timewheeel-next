import { ClientSitesGrid } from "@/components/shared/client-sites-grid";

// Web-dev palette (blue-forward), so the shared client grid cycles this.
const ACCENTS = ["#269cef", "#29a66f", "#f45b0a", "#8b5cf6"];

// Nested inside the "Our Work" section, below the four project cards.
export function WdPortfolio() {
  return (
    <div id="work" className="mt-10">
      {/* Real client builds, six up front and the rest behind "Load more".
          linkTo="caseStudy" routes each card to its case study instead of
          opening the live site, matching the website-design page. */}
      <ClientSitesGrid accents={ACCENTS} linkTo="caseStudy" />
    </div>
  );
}
