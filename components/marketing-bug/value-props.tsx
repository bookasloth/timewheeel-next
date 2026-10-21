import Image from "next/image";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbHead } from "./head";

export function MbValueProps() {
  const s = mb.valueProps;
  return (
    <section className="mb-sec">
      <div className="mb-container">
        <MbHead label={s.label} title={s.title} />
        <div className="mb-grid mb-grid--3">
          {s.items.map((item) => (
            <Reveal key={item.name} className="mb-vp-card">
              <span className="mb-vp-bug" aria-hidden="true">
                <Image
                  src={item.bug.src}
                  alt=""
                  width={item.bug.width}
                  height={item.bug.height}
                  className="mb-vp-bug-img"
                />
              </span>
              <span className="mb-ic mb-ic--ghost" aria-hidden="true" />
              <h3 className="mb-card-name">{item.name}</h3>
              <p className="mb-card-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
