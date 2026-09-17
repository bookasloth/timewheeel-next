import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

export function CfCreatorTypes({ data }: { data: CoffeeData }) {
  const { creatorTypes } = data;

  return (
    <section className="cf-sec cf-types">
      <div className="cf-container">
        <Reveal className="cf-sec-head cf-sec-head--center">
          <span className="cf-kicker">{creatorTypes.kicker}</span>
          <h2 className="cf-h">{creatorTypes.title}</h2>
        </Reveal>

        <div className="cf-types-grid">
          {creatorTypes.types.map((type) => (
            <Reveal key={type.name} className="cf-type" stagger>
              <div className="cf-type-icon" aria-hidden="true">
                {type.icon}
              </div>
              <div className="cf-type-name">{type.name}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}