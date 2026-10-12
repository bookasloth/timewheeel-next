import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { REVIEW_SERVICES } from "@/lib/review";

// /review sample reviews are one-use: once a customer copies one, nobody is
// offered it again. GET returns the copied indexes for a service, POST marks
// one as copied. Without Supabase configured both succeed and track nothing.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function serviceOf(id: unknown) {
  return REVIEW_SERVICES.find((s) => s.id === id) ?? null;
}

function db() {
  try {
    return createAdminClient();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const service = serviceOf(new URL(req.url).searchParams.get("service"));
  if (!service) return NextResponse.json({ error: "unknown service" }, { status: 400 });
  const client = db();
  if (!client) return NextResponse.json({ used: [] });
  const { data, error } = await client.from("review_samples_used").select("idx").eq("service", service.id);
  if (error) {
    console.error("[review] read used samples:", error.message);
    return NextResponse.json({ used: [] });
  }
  return NextResponse.json({ used: data.map((r) => r.idx as number) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const service = serviceOf(body.service);
  const idx = Number(body.idx);
  if (!service || !Number.isInteger(idx) || idx < 0 || idx >= service.samples.length) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const client = db();
  if (!client) return NextResponse.json({ ok: true });
  const { error } = await client
    .from("review_samples_used")
    .upsert({ service: service.id, idx }, { onConflict: "service,idx", ignoreDuplicates: true });
  if (error) console.error("[review] mark sample used:", error.message);
  return NextResponse.json({ ok: true });
}
