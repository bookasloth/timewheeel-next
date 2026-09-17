import { Quote } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

export function CfTestimonials({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-testimonials">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={data.testimonials.number}>
          <h2 className="cf-h">{data.testimonials.title}</h2>
          <p className="cf-lede">{data.testimonials.body}</p>
        </Reveal>

        <div className="cf-testimonials-grid">
          {data.testimonials.items.map((t) => (
            <Reveal key={t.name} className="cf-card cf-testimonial">
              <Quote className="cf-testimonial-quote" size={22} strokeWidth={1.6} aria-hidden="true" />
              <p className="cf-testimonial-text">“{t.quote}”</p>
              <div className="cf-testimonial-person">
                <span className="cf-testimonial-av">{t.initials}</span>
                <span>
                  <strong>{t.name}</strong>
                  <em>{t.role}</em>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
