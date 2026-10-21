import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Cpu,
  FileText,
  Link2,
  MoveRight,
  Search,
  ShoppingCart,
} from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbHead } from "./head";

const iconMap = {
  keyword: Search,
  content: FileText,
  technical: Cpu,
  links: Link2,
  migration: MoveRight,
  ecommerce: ShoppingCart,
} as const;

export function MbServices() {
  const s = mb.services;
  return (
    <section className="mb-sec mb-dark mb-svc-sec">
      <span className="mb-svc-bg" aria-hidden="true">
        <Image
          src="/marketing-bug/bug1.png"
          alt=""
          width={1092}
          height={1440}
          className="mb-svc-bg-img"
        />
      </span>
      <div className="mb-container">
        <MbHead label={s.label} title={s.title} light />
        <div className="mb-svc-grid">
          {s.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.name} className="mb-svc">
                <div className="mb-svc-top">
                  <span className="mb-svc-num">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="mb-ic mb-ic--dark" style={{ marginBottom: 0 }}>
                    <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mb-svc-name">{item.name}</h3>
                <p className="mb-svc-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
