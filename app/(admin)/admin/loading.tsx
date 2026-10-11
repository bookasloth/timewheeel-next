import { HeaderSkeleton, LoadingRegion, StatsSkeleton, TableSkeleton } from "@/components/admin/feedback";

// Shown instantly while any console page loads; the shell (rail, sidebar,
// top bar) stays on screen because it lives in the layout.
export default function Loading() {
  return (
    <LoadingRegion label="Loading page...">
      <HeaderSkeleton />
      <StatsSkeleton />
      <TableSkeleton />
    </LoadingRegion>
  );
}
