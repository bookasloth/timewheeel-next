import { Check } from "lucide-react";
import Image from "next/image";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

export function EzAdmin() {
  const a = ez.admin;
  return (
    <section className="ez-sec ez-admin">
      <div className="ez-container ez-admin-grid">
        <div className="ez-admin-copy">
          <Reveal>
            <EzHead number={a.number} label={a.label} title={a.title} body={a.body} />
          </Reveal>
          <Reveal>
            <ul className="ez-admin-list">
              {a.items.map((item) => (
                <li key={item}>
                  <span className="ez-admin-check" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="ez-dash-wrap">
          <div className="ez-dash">
            <div className="ez-dash-bar" aria-hidden="true">
              <span className="ez-dot" />
              <span className="ez-dot" />
              <span className="ez-dot" />
              <em>admin · yourbrand.in</em>
              <b className="ez-dash-role">Owner</b>
            </div>
            <Image
              className="ez-dash-img"
              src="/dash.jpg"
              alt="EZShop admin panel showing revenue, orders and refunds"
              width={1024}
              height={587}
              sizes="(max-width: 960px) 92vw, 640px"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
