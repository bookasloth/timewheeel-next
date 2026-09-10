import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas, shots } from "@/lib/book-a-sloth";
import { Screenshot } from "./screenshot";
import { cn } from "@/lib/utils";

const shotMap = {
  dashboard16x10: shots.dashboard16x10,
  bookingFlow: shots.bookingFlow,
} as const;

export function BasShowcase() {
  return (
    <section className="sx-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="sx-h2 mt-7">{bas.showcase.title}</h2>
          <p
            className="sx-text mx-auto mt-6 max-w-2xl"
            style={{ fontSize: "1.08rem" }}
          >
            {bas.showcase.body}
          </p>
        </Reveal>

        <div className="sx-rule mt-10" />

        {bas.showcase.shots.map((row, i) => {
          const reversed = i % 2 === 1;
          const shot = row.shot ? shotMap[row.shot as keyof typeof shotMap] : null;
          return (
            <Reveal key={row.id}>
              <div
                className={cn("sx-showcase-row", reversed && "is-right")}
                id={row.id}
              >
                <div className="sx-showcase-text">
                  <p className="sx-showcase-label">{row.label}</p>
                  <p className="sx-showcase-desc">{row.desc}</p>
                </div>
                <div className="sx-showcase-shot">
                  {shot ? (
                    <Screenshot
                      src={shot.src}
                      alt={row.label}
                      width={shot.width}
                      height={shot.height}
                      url={bas.hero.shotUrl}
                    />
                  ) : (
                    <div className="sx-glance">
                      <span className="sx-glance-item">Booking</span>
                      <ArrowRight size={14} strokeWidth={1.6} />
                      <span className="sx-glance-item">Confirmation</span>
                      <ArrowRight size={14} strokeWidth={1.6} />
                      <span className="sx-glance-item">Reminder</span>
                      <ArrowRight size={14} strokeWidth={1.6} />
                      <span className="sx-glance-item">Follow-up</span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}