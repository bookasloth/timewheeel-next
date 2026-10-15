import { ArrowRight, Check, Rocket, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";

const labelIcons = [Rocket, Store];

const copy = [
  {
    heading: "Your brand. Your store.",
    desc: "Build your own online store and turn customers into repeat buyers.",
    linkText: "Explore D2C solutions",
    href: "/solutions",
    image: "/d2c-shops.png",
    imageAlt: "D2C brand selling online",
    imageWidth: 1484,
    imageHeight: 1060,
  },
  {
    heading: "Your shop, online.",
    desc: "For boutiques, kirana, bakery, gift and electronics stores that want to take their shop online without learning code.",
    linkText: "Explore shop solutions",
    href: "/solutions",
    image: "/local-shops.png",
    imageAlt: "Local shop selling online",
    imageWidth: 1535,
    imageHeight: 1025,
  },
];

export function EzAudiences() {
  const a = ez.audiences;
  return (
    <section className="ez-sec ez-audiences">
      <div className="ez-container">
        <Reveal className="ez-aud-head">
          <h2 className="ez-aud-title">{a.title}</h2>
          <p className="ez-aud-sub">From ambitious D2C brands to the local shops customers love.</p>
        </Reveal>
        <Reveal stagger className="ez-aud-grid">
          {a.items.map((item, i) => {
            const LabelIcon = labelIcons[i] || Rocket;
            const c = copy[i] || copy[0];
            return (
              <article key={item.name} className={`ez-aud-card ez-aud-card--${i + 1}`}>
                <p className="ez-aud-label">
                  <span className="ez-aud-label-ic" aria-hidden="true">
                    <LabelIcon size={17} strokeWidth={2} />
                  </span>
                  <span className="ez-aud-label-text">{item.name}</span>
                </p>
                <div className="ez-aud-intro">
                  <span className="ez-aud-art">
                    <Image
                      className="ez-aud-img"
                      src={c.image}
                      alt={c.imageAlt}
                      width={c.imageWidth}
                      height={c.imageHeight}
                      sizes="(max-width: 560px) 140px, 150px"
                    />
                  </span>
                  <div className="ez-aud-intro-text">
                    <h3 className="ez-aud-h">{c.heading}</h3>
                    <p className="ez-aud-desc">{c.desc}</p>
                  </div>
                </div>
                <span className="ez-aud-divider" aria-hidden="true" />
                <ul className="ez-aud-benefits">
                  {item.points.map((pt) => (
                    <li key={pt}>
                      <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link className="ez-aud-link" href={c.href}>
                  {c.linkText}
                  <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
