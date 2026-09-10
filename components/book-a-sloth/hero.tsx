import Image from "next/image";
import { ArrowRight, BellRing, CalendarCheck, CheckCircle2, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas, shots } from "@/lib/book-a-sloth";
import { SxButton } from "./cta";

export function BasHero() {
  const shot = shots.heroBanner;
  return (
    <section className="sx-hero">
      <div className="sx-container sx-hero-body">
        <Reveal>
          <h1 className="sx-hero-title">
            {bas.hero.titleLine1} to{" "}
            <span className="sx-accent">{bas.hero.titleAccent}</span>
          </h1>
          <p className="sx-hero-para">{bas.hero.body}</p>
          <p className="sx-builtby">
            <span className="sx-builtby-dot" aria-hidden="true" />
            {bas.hero.builtBy}
          </p>
          <div className="sx-hero-cta">
            <SxButton href={bas.liveUrl} external variant="accent">
              {bas.hero.primary}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </SxButton>
            <SxButton href="/" variant="line">
              <PlayCircle size={16} strokeWidth={2} aria-hidden="true" />
              {bas.hero.secondary}
            </SxButton>
          </div>
        </Reveal>

        <Reveal className="sx-hero-visual-wrap">
          <div className="sx-hero-visual">
            <div className="sx-hero-glow" aria-hidden="true" />
            <div className="sx-hero-shot">
              <Image
                src={shot.src}
                alt={bas.hero.shotAlt}
                width={shot.width}
                height={shot.height}
                priority
                sizes="(max-width: 1024px) 100vw, 47vw"
              />
            </div>

            <div className="sx-float sx-float--a">
              <span className="sx-float-row">
                <span className="sx-float-ic sx-float-ic--ok">
                  <CheckCircle2 size={15} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="sx-float-title">Booking Confirmed</span>
              </span>
            </div>

            <div className="sx-float sx-float--b">
              <span className="sx-float-row">
                <span className="sx-float-ic">
                  <CalendarCheck size={15} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="sx-float-title">Today&apos;s Bookings</span>
              </span>
              <span className="sx-float-value">24</span>
            </div>

            <div className="sx-float sx-float--c">
              <span className="sx-float-row">
                <span className="sx-float-ic">
                  <BellRing size={15} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="sx-float-title">Customer Reminder</span>
              </span>
              <span className="sx-float-value">Sent</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}