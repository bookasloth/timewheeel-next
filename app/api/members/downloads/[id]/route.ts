import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getMember } from "@/lib/members/session";
import { isRateLimited } from "@/lib/rate-limit";

// GET /api/members/downloads/<id>: checks the member may have the file, logs the
// download, then redirects to a signed storage link that works for 60 seconds.
// The bucket is private, so this route is the only way to a file.
export const runtime = "nodejs";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMember();
  if (!member) return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent("/members/free-downloads")}`, request.url));
  if (!UUID.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (await isRateLimited(`download:${member.id}`, { windowSeconds: 3600, max: 120 })) {
    return NextResponse.json({ error: "Too many downloads in the last hour. Try again later." }, { status: 429 });
  }

  const db = createAdminClient();
  const { data: item } = await db.from("downloads").select("id, tier, file_path, file_name, published").eq("id", id).maybeSingle();
  if (!item || (!item.published && !member.isAdmin)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (item.tier === "premium" && !member.isPremium) {
    return NextResponse.redirect(new URL("/members/premium-downloads?locked=1", request.url), 303);
  }

  const { data: signed, error } = await db.storage.from("member-downloads").createSignedUrl(item.file_path, 60, { download: item.file_name });
  if (error || !signed) {
    console.error("Signed download URL failed:", error?.message);
    return NextResponse.json({ error: "This file isn't available right now." }, { status: 503 });
  }
  await db.from("download_events").insert({ download_id: item.id, user_id: member.id }).then(({ error: e }) => e && console.error("download_events:", e.message));

  const res = NextResponse.redirect(signed.signedUrl, 303);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}
