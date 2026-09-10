import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";
import "./testimonials.css";

function Stars() {
  return (
    <span className="ts__stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} strokeWidth={0} fill="currentColor" />
      ))}
    </span>
  );
}

export function BasTestimonials() {
  const t = bas.testimonials;
  return (
    <section className="ts">
      <div className="ts__container">
        <Reveal className="ts__header">
          <h2 className="ts__title">{t.title}</h2>
          <p className="ts__desc">{t.body}</p>
        </Reveal>

        <div className="ts__grid">
          {t.items.map((item) => (
            <Reveal key={item.name} className="ts__card">
              <Stars />
              <p className="ts__quote">“{item.quote}”</p>
              <div className="ts__author">
                <span className="ts__avatar">{item.initials}</span>
                <span className="ts__who">
                  <span className="ts__name">{item.name}</span>
                  <span className="ts__role">{item.role}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}