import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { CrownMark } from "@/components/members/crown-mark";
import { getBadges, listPeople } from "@/lib/members/data";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "People" };

export default async function PeoplePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/people"), searchParams]);
  const q = (sp.q ?? "").slice(0, 60);
  const people = await listPeople(q);
  const badges = await getBadges(people.map((p) => p.id));
  const profileEmpty = !(m.profile.headline || m.profile.bio || m.profile.business_name);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Workspace</p>
          <h1 className="mt-2 font-heading font-extrabold tracking-tight">People</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Business owners, marketers and builders in the Timewheel community. Profiles are visible to signed-in members only.
          </p>
        </div>
        <form className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name, business or city"
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none transition-colors hover:border-brand/40 focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </form>
      </header>

      {profileEmpty && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand/30 bg-brand/[0.05] p-4 text-sm">
          <span>Add a headline and a short bio so other members know who you are.</span>
          <Link href="/members/account#profile" className="font-semibold text-brand-text hover:underline">
            Complete your profile
          </Link>
        </div>
      )}

      {people.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {people.map((p) => (
            <li key={p.id}>
              <Link
                href={`/members/people/${p.id}`}
                className="flex h-full flex-col rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={p.full_name} src={p.avatar_url} size={44} />
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      <span className="truncate">{p.full_name || "Member"}</span>
                      <CrownMark badge={badges[p.id]} />
                      {p.id === m.id && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
                    </p>
                    {p.headline && <p className="truncate text-xs text-muted-foreground">{p.headline}</p>}
                  </div>
                </div>
                {(p.business_name || p.city) && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                    {p.business_name && <span className="font-medium text-foreground/80">{p.business_name}</span>}
                    {p.city && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" /> {p.city}
                      </span>
                    )}
                  </p>
                )}
                {p.bio && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{p.bio}</p>}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {q ? "No members match that search." : "No members yet."}
        </p>
      )}
    </div>
  );
}
