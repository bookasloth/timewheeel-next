import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzButton } from "./button";

export function EzFinalCta() {
  return (
    <section className="ez-cta">
      <div className="ez-container">
        <Reveal className="ez-cta-inner">
          <h2 className="ez-cta-title">{ez.final.title}</h2>
          <p className="ez-cta-body">{ez.final.body}</p>
          <div className="ez-actions ez-actions--center">
            <EzButton href={ez.final.primaryHref}>
              {ez.final.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </EzButton>
            <EzButton href={ez.final.secondaryHref} variant="line">
              {ez.final.secondaryLabel}
            </EzButton>
          </div>
        </Reveal>
        <nav className="ez-related" aria-label={ez.related.title}>
          <p>{ez.related.title}</p>
          <ul>
            {ez.related.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
