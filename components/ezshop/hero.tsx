import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { EzButton } from "./button";

// Server-rendered on purpose: the h1 and the definition paragraph must be in
// the raw HTML for crawlers that don't run JavaScript.
export function EzHero() {
  return (
    <section className="ez-hero">
      <span className="ez-orb ez-orb--a" aria-hidden="true" />
      <span className="ez-orb ez-orb--b" aria-hidden="true" />

      <div className="ez-container ez-hero-grid">
        <div className="ez-hero-copy">
          <p className="ez-kicker ez-kicker--pill">
            <ShoppingBag size={14} strokeWidth={2} aria-hidden="true" />
            {ez.hero.kicker}
          </p>
          <h1 className="ez-hero-title">{ez.hero.title}</h1>
          <p className="ez-hero-def">{ez.hero.definition}</p>
          <div className="ez-actions">
            <EzButton href={ez.hero.primaryHref}>
              {ez.hero.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </EzButton>
            <EzButton href={ez.hero.secondaryHref} variant="line">
              {ez.hero.secondaryLabel}
            </EzButton>
          </div>
        </div>

        {/* EZShop visual, with an illustrative order ticket on top. */}
        <div className="ez-stage" aria-hidden="true">
          <div className="ez-stage-inner">
            <Image
              className="ez-shot"
              src="/ezshop2.png"
              alt=""
              width={1024}
              height={1536}
              preload
              sizes="(max-width: 960px) 90vw, 420px"
            />

            <div className="ez-receipt">
              <span className="ez-notch ez-notch--l" />
              <span className="ez-notch ez-notch--r" />
              <p className="ez-receipt-head">Order #1042</p>
              <ul>
                <li>
                  <span>Handloom kurta · M</span>
                  <b>₹1,299</b>
                </li>
                <li>
                  <span>Shipping</span>
                  <b>Free</b>
                </li>
                <li>
                  <span>GST invoice</span>
                  <b>Auto</b>
                </li>
              </ul>
              <div className="ez-receipt-total">
                <span>Total</span>
                <b>₹1,299</b>
              </div>
              <span className="ez-barcode" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
