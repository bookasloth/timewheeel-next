import { ArrowRight, Check, MessageCircle, ShoppingBag } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { EzButton } from "./button";

// Server-rendered on purpose: the h1 and the definition paragraph must be in
// the raw HTML for crawlers that don't run JavaScript.
export function EzHero() {
  return (
    <section className="ez-hero">
      <span className="ez-glow" aria-hidden="true" />
      <div className="ez-container ez-hero-grid">
        <div>
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
          <ul className="ez-chips">
            {ez.hero.chips.map((c) => (
              <li key={c}>
                <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustrative storefront mock, not real store data. */}
        <div className="ez-mock" aria-hidden="true">
          <div className="ez-mock-bar">
            <span />
            <span />
            <span />
            <em>yourbrand.in</em>
          </div>
          <div className="ez-mock-body">
            <div className="ez-mock-img" />
            <div className="ez-mock-info">
              <b>Handloom cotton kurta</b>
              <div className="ez-mock-price">
                ₹1,299 <s>₹1,599</s>
              </div>
              <div className="ez-mock-variants">
                <i>S</i>
                <i className="is-on">M</i>
                <i>L</i>
                <i>XL</i>
              </div>
              <div className="ez-mock-pay">UPI · Cards · Cash on Delivery</div>
              <div className="ez-mock-cta">Add to cart</div>
            </div>
          </div>
          <div className="ez-mock-toast">
            <MessageCircle size={16} strokeWidth={2} />
            <span>
              <b>WhatsApp</b> Your order has been shipped
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
