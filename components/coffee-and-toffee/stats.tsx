"use client";

import { motion } from "framer-motion";
import { type CfData } from "@/lib/coffee-and-toffee";

// ponytail: plain facts, no count-up. Add one back only for a real, sourced number.
export function CfStats({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-stats">
      <div className="cf-container">
        <div className="cf-stats-grid">
          {data.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="cf-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            >
              <span className="cf-stat-value">{s.value}</span>
              <span className="cf-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
