import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

const dotClasses = [
  "cf-ownership-node-dot--1",
  "cf-ownership-node-dot--2",
  "cf-ownership-node-dot--3",
  "cf-ownership-node-dot--4",
  "cf-ownership-node-dot--5",
];

export function CfCreatorOwnership({ data }: { data: CoffeeData }) {
  const { ownership } = data;

  return (
    <section className="cf-sec cf-ownership">
      <div className="cf-container">
        <div className="cf-ownership-layout">
          <div>
            <Reveal>
              <span className="cf-kicker">{ownership.kicker}</span>
              <h2 className="cf-h">{ownership.title}</h2>
              <p className="cf-lede">{ownership.body}</p>
            </Reveal>
          </div>

          <Reveal>
            <div className="cf-ownership-flow">
              {ownership.flow.map((item, i) => (
                <div key={item.label}>
                  <div className="cf-ownership-node">
                    <span className={`cf-ownership-node-dot ${dotClasses[i]}`}>
                      {item.step}
                    </span>
                    <div>
                      <div className="cf-ownership-node-label">{item.label}</div>
                      <div className="cf-ownership-node-sub">{item.sub}</div>
                    </div>
                  </div>
                  {i < ownership.flow.length - 1 && (
                    <div className="cf-ownership-connector" aria-hidden="true" />
                  )}
                </div>
              ))}

              <div className="cf-ownership-result">
                <div className="cf-ownership-result-title">
                  {ownership.result.title}
                </div>
                <div className="cf-ownership-result-desc">{ownership.result.desc}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}