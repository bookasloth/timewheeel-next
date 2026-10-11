import { Check } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

export function EzAdmin() {
  const a = ez.admin;
  return (
    <section className="ez-sec">
      <div className="ez-container ez-split">
        <Reveal>
          <EzHead number={a.number} label={a.label} title={a.title} body={a.body} />
        </Reveal>
        <Reveal>
          <ul className="ez-ticks ez-ticks--panel">
            {a.items.map((item) => (
              <li key={item}>
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
