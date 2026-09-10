import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";

export function BasFinalCta() {
  return (
    <section className="sx-cta2">
      <Reveal className="sx-cta2-inner">
        <h2 className="sx-cta2-title">{bas.final.big}</h2>
        <p className="sx-cta2-body">{bas.final.body}</p>
        <div className="sx-cta2-actions">
          <Link href="/digital-marketing" className="sx-cta2-btn sx-cta2-btn--primary">
            {bas.final.primary}
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <Link href="/" className="sx-cta2-btn sx-cta2-btn--outline">
            {bas.final.secondary}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}