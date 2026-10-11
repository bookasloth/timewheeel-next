"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { MEMBER_HINT_COOKIE } from "@/lib/members/config";
import { cn } from "@/lib/utils";

// "Log in" or "My account" without making every page dynamic: reads the
// non-secret signed-in hint cookie after hydration (server render says "Log in").
const subscribe = () => () => {};
const signedIn = () => document.cookie.split("; ").some((c) => c.startsWith(`${MEMBER_HINT_COOKIE}=`));

export function AccountLink({ className, onClick }: { className?: string; onClick?: () => void }) {
  const isIn = useSyncExternalStore(subscribe, signedIn, () => false);
  return (
    <Link href={isIn ? "/members" : "/login"} onClick={onClick} className={cn("inline-flex items-center gap-1.5", className)}>
      <UserRound className="size-4" strokeWidth={1.9} />
      {isIn ? "My account" : "Log in"}
    </Link>
  );
}
