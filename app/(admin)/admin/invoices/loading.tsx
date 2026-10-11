import { HeaderSkeleton, LoadingRegion, StatsSkeleton, TableSkeleton } from "@/components/admin/feedback";

export default function Loading() {
  return (
    <LoadingRegion label="Loading invoices...">
      <HeaderSkeleton action />
      <StatsSkeleton />
      <TableSkeleton cols={6} />
    </LoadingRegion>
  );
}
