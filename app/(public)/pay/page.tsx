import type { Metadata } from "next";
import { PayForm } from "@/components/pay/pay-form";
import { site } from "@/lib/site";

// Payment page for invoices, deposits and one-off work, collected via Zoho Payments.
// Shareable prefilled links: /pay?amount=4999&for=Invoice%20TW-1042
// Utility page: kept out of search results, the sitemap and llms.txt.
export const metadata: Metadata = {
  title: "Make a Payment",
  description: "Pay Timewheel securely via Zoho Payments: UPI, cards and net banking.",
  alternates: { canonical: "/pay" },
  robots: { index: false, follow: false },
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const q = await searchParams;
  const amount = first(q.amount).trim();
  const purpose = first(q.for).trim().slice(0, 200);

  return (
    <section className="mx-auto max-w-xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Payments</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Make a payment</h1>
      <p className="mt-3 text-muted-foreground">
        Pay an invoice, deposit or project milestone. You&apos;ll get an email receipt, and our team is
        notified the moment it clears. Questions? Write to{" "}
        <a href={`mailto:${site.contact.email}`} className="font-semibold text-foreground underline underline-offset-4">
          {site.contact.email}
        </a>
        .
      </p>
      <div className="mt-10">
        <PayForm defaultAmount={/^\d+(\.\d{1,2})?$/.test(amount) ? amount : ""} defaultPurpose={purpose} />
      </div>
    </section>
  );
}
