import { FilterBar } from "@/components/members/library/filter-bar";
import { ResourceCard } from "@/components/members/library/resource-card";
import { RightRail } from "@/components/members/library/right-rail";
import { UpgradeBanner } from "@/components/members/library/upgrade-banner";
import { countDownloads, latestDownloads, listBookmarkIds, listBookmarks, listCategories, listDownloads } from "@/lib/members/data";
import { premiumOffer } from "@/lib/members/premium";
import type { Member } from "@/lib/members/session";
import Link from "next/link";

// Shared by /members/library, /members/free-downloads and /members/premium-downloads.
export async function LibraryView({
  member,
  tier,
  basePath,
  eyebrow,
  title,
  intro,
  searchParams,
}: {
  member: Member;
  tier?: "free" | "premium";
  basePath: string;
  eyebrow: string;
  title: string;
  intro: string;
  searchParams: Record<string, string | undefined>;
}) {
  const q = (searchParams.q ?? "").trim().slice(0, 80);
  const category = (searchParams.category ?? "").slice(0, 60);
  const savedOnly = searchParams.saved === "1";

  const [rows, categories, bookmarkIds, saved, recent, counts] = await Promise.all([
    listDownloads(tier),
    listCategories(),
    listBookmarkIds(),
    listBookmarks(4),
    latestDownloads(3),
    countDownloads(),
  ]);
  const offer = premiumOffer();

  const needle = q.toLowerCase();
  const items = rows.filter(
    (r) =>
      (!category || r.category === category) &&
      (!savedOnly || bookmarkIds.has(r.id)) &&
      (!needle || `${r.title} ${r.description ?? ""} ${r.category}`.toLowerCase().includes(needle)),
  );
  const filtered = Boolean(q || category || savedOnly);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">{eyebrow}</p>
          <h1 className="mt-2 font-heading font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{intro}</p>
        </header>

        {!member.isPremium && tier !== "free" && <UpgradeBanner premiumCount={counts.premium} price={offer.price} period={offer.period} />}

        <FilterBar basePath={basePath} q={q} category={category} categories={categories} saved={savedOnly} />

        {items.length ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
            {items.map((row) => (
              <ResourceCard key={row.id} row={row} locked={row.tier === "premium" && !member.isPremium} saved={bookmarkIds.has(row.id)} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border px-6 py-14 text-center">
            <p className="font-heading text-lg font-bold">
              {savedOnly ? "Nothing saved yet" : filtered ? "No resources match" : "Nothing here yet"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {savedOnly
                ? "Use the bookmark on any resource to save it for later."
                : filtered
                  ? "Try a different search or category."
                  : "The team is preparing these resources. They'll appear here as soon as they're ready."}
            </p>
            {filtered && (
              <Link href={basePath} className="btn btn-outline mt-5 inline-flex rounded-lg px-4 py-2 text-sm font-semibold">
                Clear filters
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <RightRail member={member} saved={saved} recent={recent} premiumCount={counts.premium} price={offer.price} period={offer.period} />
      </div>
    </div>
  );
}
