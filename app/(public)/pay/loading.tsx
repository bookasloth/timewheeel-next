import { Skeleton, SkeletonGroup } from "@/components/ui/skeleton";

// /pay reads ?amount= and ?for=, so it renders per request. The heading is
// static and shows straight away; only the form slot is a placeholder, laid
// out like PayForm (amount, purpose, name + email, phone, button).
export default function Loading() {
  const field = (span = false) => (
    <div className={span ? "sm:col-span-2" : undefined}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-2 h-[42px] w-full" />
    </div>
  );
  return (
    <section className="mx-auto max-w-xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Payments</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Make a payment</h1>
      <div className="skeleton-delay">
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-4/5" />
        <Skeleton className="mt-2 h-4 w-2/5" />
      </div>

      <SkeletonGroup label="Loading payment form" className="mt-10 rounded-2xl border border-border bg-card p-7 md:p-9">
        <div className="grid gap-4 sm:grid-cols-2">
          {field(true)}
          {field(true)}
          {field()}
          {field()}
          {field(true)}
        </div>
        <Skeleton className="mt-6 h-12 w-full rounded-lg" />
        <Skeleton className="mx-auto mt-5 h-3 w-64" />
      </SkeletonGroup>
    </section>
  );
}
