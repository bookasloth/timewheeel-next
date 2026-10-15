import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";
import { EzModuleCard, type ModuleIcon } from "./module-card";

export function EzFeatures() {
  const f = ez.features;
  return (
    <section className="ez-sec ez-sec--tint ez-features">
      <div className="ez-container">
        <Reveal>
          <EzHead number={f.number} label={f.label} title={f.title} body={f.body} />
        </Reveal>
        <Reveal stagger className="ez-modules">
          {f.items.map((item, i) => (
            <EzModuleCard
              key={item.name}
              index={i + 1}
              name={item.name}
              desc={item.desc}
              bullets={item.bullets}
              icon={item.icon as ModuleIcon}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
