import { Crown, ShieldCheck } from "lucide-react";
import type { Badge } from "@/lib/members/data";

// Small icon after a member's name: crown for Premium, shield for the team.
export function CrownMark({ badge }: { badge?: Badge }) {
  if (badge === "premium") return <Crown className="size-3.5 shrink-0 text-brand" aria-label="Premium member" />;
  if (badge === "team") return <ShieldCheck className="size-3.5 shrink-0 text-accent-blue" aria-label="Timewheel team" />;
  return null;
}
