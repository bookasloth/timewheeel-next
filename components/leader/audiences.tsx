import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";

export function LfAudiences() {
  const s = leader.audiences;
  return (
    <section className="lf-who">
      <div className="lf-container lf-who-grid">
        <Reveal className="lf-who-head">
          <h2 className="lf-who-title">{s.title}</h2>
          <p className="lf-who-note">
            One clean list, whatever you sell. If your week starts with finding people to reach, Leader was built for it.
          </p>
          <Link href="/book-a-demo" className="lf-who-link">
            See it on your city
            <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal>
          <ol className="lf-who-list">
            {s.items.map((item, i) => (
              <li className="lf-who-item" key={item.name}>
                <span className="lf-who-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="lf-who-name">{item.name}</h3>
                <span className="lf-who-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
                <p className="lf-who-desc">{item.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
