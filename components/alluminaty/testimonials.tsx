import { Quote } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

export function AzTestimonials() {
  return (
    <section className="az-sec az-quotes">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={az.testimonials.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{az.testimonials.number}</span>
            {az.testimonials.label}
          </p>
          <h2 className="az-h">{az.testimonials.title}</h2>
          <p className="az-lede">{az.testimonials.body}</p>
        </Reveal>

        <div className="az-quotes-grid">
          {az.testimonials.items.map((item) => (
            <Reveal key={item.name} className="az-quote">
              <Quote size={22} strokeWidth={1.6} className="az-quote-mark" aria-hidden="true" />
              <p className="az-quote-text">{item.quote}</p>
              <div className="az-quote-person">
                <span className="az-quote-av">{item.initials}</span>
                <span className="az-quote-meta">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}