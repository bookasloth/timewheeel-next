import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

// End-of-post conversion block: service CTA + newsletter signup.
export function PostCta() {
  return (
    <section className="mt-14 grid gap-6 rounded-3xl border border-border bg-secondary/50 p-8 md:grid-cols-2 md:p-10">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
          <Sparkles className="size-3.5" /> Work with Timewheel
        </p>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Want this done for you?</h2>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Get a free AI + SEO audit that scores your visibility across Google and AI search — no obligation, no jargon.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/seo-company-in-nagpur"
            className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-brand-foreground"
          >
            Get my free audit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            Talk to us
          </Link>
        </div>
      </div>

      <div className="md:border-l md:border-border/70 md:pl-8">
        <h3 className="text-lg font-bold">Get the next guide in your inbox</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Practical marketing and SEO for Indian businesses. No spam, unsubscribe anytime.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
