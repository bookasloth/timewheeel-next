import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getConsoleSession } from "@/lib/admin/console-auth";
import { LoginForm } from "./login-form";

// The admin console's own login, separate from member accounts. Lives in its
// own route group, (admin-bare), so the console shell (app/(admin)/admin/layout.tsx) and its
// guard don't wrap it.
export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string; signedout?: string }> }) {
  const { next, signedout } = await searchParams;
  if (await getConsoleSession()) redirect("/admin");
  return (
    <main className="admin-console flex min-h-[100dvh] bg-gray-50 text-gray-900">
      <section className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-[#1A1A2E] p-10 text-white lg:flex">
        <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-[#F45B0A]/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-16 size-96 rounded-full bg-[#F45B0A]/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/svg/timewheel-icon.svg" alt="" width={40} height={40} />
          <span>
            <span className="block font-heading text-lg font-bold leading-tight">Timewheel</span>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-orange-300">Admin console</span>
          </span>
        </div>
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-300">Timewheel Internet Pvt. Ltd.</p>
          <p className="mt-3 max-w-sm font-heading text-3xl font-bold leading-tight">Invoices, leads, blog and members in one place.</p>
          <p className="mt-3 max-w-sm text-sm text-gray-300">Staff only. Every sign-in is rate limited and the session ends after 12 hours.</p>
        </div>
        <p className="relative text-xs text-gray-400">Nagpur, Maharashtra</p>
      </section>
      <section className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/svg/timewheel-icon.svg" alt="" width={32} height={32} />
            <span className="text-sm font-bold">Timewheel admin</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-1 text-sm text-gray-600">Use the admin console credentials.</p>
          {signedout && <p className="mt-4 rounded-[3px] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">You&apos;re signed out.</p>}
          <LoginForm next={next ?? "/admin"} />
        </div>
      </section>
    </main>
  );
}
