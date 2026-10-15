import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdHead } from "./head";

export function TdAudiences() {
  const s = td.audiences;
  return (
    <section className="td-sec td-tint">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} center />
        <Reveal className="td-board" stagger>
          {s.items.map((item, i) => (
            <div key={item.name} className="td-board-cell">
              <span className="td-board-idx" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="td-board-name">{item.name}</h3>
              <p className="td-board-desc">{item.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
