import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

// Decorative artifacts, one per problem item, drawing the mess sellers
// actually work in. Illustrative only.
const ARTIFACTS = [
  { tag: "Instagram DM", lines: ["“Is this available in M?”", "“₹1,299 right?”", "“UPI id please”"] },
  { tag: "Marketplace listing", lines: ["Your product", "next to a cheaper one", "in someone else's store"] },
  { tag: "order-sheet.xlsx", lines: ["CGST 9% + SGST 9%", "= ? per order", "typed by hand"] },
  { tag: "link in bio", lines: ["No website", "every reel sends", "traffic elsewhere"] },
];

export function EzProblem() {
  const p = ez.problem;
  return (
    <section className="ez-sec ez-problem">
      <div className="ez-container">
        <Reveal>
          <EzHead number={p.number} label={p.label} title={p.title} body={p.body} />
        </Reveal>
        <Reveal stagger className="ez-chaos">
          {p.items.map((item, i) => (
            <article key={item.name} className={`ez-chaos-card ez-chaos-card--${i + 1}`}>
              {/* The article is the `Reveal stagger` target, so its inline
                  transform belongs to the entrance tween. The tilt and the
                  hover straighten live on the inner box so they don't fight. */}
              <div className="ez-chaos-inner">
                <div className="ez-chaos-art" aria-hidden="true">
                  <span className="ez-chaos-tag">{ARTIFACTS[i].tag}</span>
                  {ARTIFACTS[i].lines.map((line, j) => (
                    <span className="ez-chaos-line" key={j}>
                      {line}
                    </span>
                  ))}
                </div>
                <h3 className="ez-card-title">{item.name}</h3>
                <p className="ez-card-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
