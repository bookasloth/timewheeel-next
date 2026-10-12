import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { SELLER } from "@/lib/admin/invoice-calc";

const TITLE = "GST and Company Details | Timewheel";
const DESC =
  "Company details for Timewheel Internet Pvt. Ltd.: legal name, CIN, GSTIN, PAN, registered state and billing contact for invoices and vendor forms.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/legal/company" },
  ...social({ path: "/legal/company", title: TITLE, description: DESC }),
};

// Registration numbers are public (MCA and GST records). The registered office
// is a home address, so only its locality is shown here.
export default function CompanyPage() {
  const c = site.contact;
  const rows: [string, string][] = [
    ["Legal name", "Timewheel Internet Private Limited"],
    ["Brand name", "Timewheel"],
    ["CIN", process.env.COMPANY_CIN || SELLER.cin],
    ["GSTIN", process.env.INVOICE_GSTIN || SELLER.gstin],
    ["PAN", process.env.INVOICE_PAN || SELLER.pan],
    ["Incorporated", "18 February 2026, Registrar of Companies, Cuttack"],
    ["Registered in", `${SELLER.registeredOffice}, India (GST state code ${SELLER.stateCode})`],
    ["Office", `${c.streetAddress}, ${c.city}, ${c.addressRegion} ${c.postalCode}`],
    ["Billing email", c.email],
    ["Phone", c.phone],
  ];

  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-text">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
        GST &amp; Company Details
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        For invoices, vendor registration and purchase orders.
      </p>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Registration</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-border/50 last:border-0">
                    <th scope="row" className="w-40 px-5 py-3.5 align-top font-medium text-foreground sm:w-56">
                      {k}
                    </th>
                    <td className="px-5 py-3.5 break-words">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Invoices and GST</h2>
          <ul className="ml-5 list-disc space-y-2">
            <li>Invoices are GST invoices under our Odisha registration.</li>
            <li>
              Clients in Odisha are charged CGST and SGST. Clients in every other state,
              including Maharashtra, are charged IGST.
            </li>
            <li>
              To get input tax credit, share your GSTIN and billing address before the invoice
              is raised.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Vendor forms and documents</h2>
          <p>
            Need a GST certificate, cancelled cheque or a filled vendor form? Email{" "}
            <a href={`mailto:${c.email}`} className="text-brand hover:underline">
              {c.email}
            </a>{" "}
            and we will send it within one business day.
          </p>
        </section>
      </article>
    </div>
  );
}
