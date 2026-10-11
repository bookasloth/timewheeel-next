import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";
import { safeNext } from "@/lib/members/config";

// Opening a notification: mark it read, then go where it points.
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getMember())) return NextResponse.redirect(new URL("/login?next=/members/notifications", request.url));
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id)
    .select("link")
    .maybeSingle();
  return NextResponse.redirect(new URL(safeNext(data?.link, "/members/notifications"), request.url));
}
