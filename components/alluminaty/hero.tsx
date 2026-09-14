import type { CSSProperties } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MessagesSquare,
  Search,
  Store,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { az } from "@/lib/alluminaty";
import { AzButton } from "./button";

export function AzHero() {
  const [first, second, third] = az.hero.members;
  return (
    <section className="az-hero">
      <span className="az-blob az-blob--blue" aria-hidden="true" />
      <span className="az-blob az-blob--teal" aria-hidden="true" />
      <span className="az-blob az-blob--gold" aria-hidden="true" />

      <div className="az-container az-hero-inner">
        <Reveal className="az-hero-copy">
          <p className="az-hero-pill">
            <span className="az-hero-pill-dot" aria-hidden="true" />
            ALUMNI NETWORK PLATFORM
          </p>
          <h1 className="az-hero-title">
            {az.hero.titleLine1}{" "}
            <span className="az-accent-serif">{az.hero.titleAccent}</span>
          </h1>
          <p className="az-hero-body">{az.hero.body}</p>
          <div className="az-hero-cta">
            <AzButton href={az.hero.primaryHref} variant="accent">
              {az.hero.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </AzButton>
            <AzButton href={az.hero.secondaryHref} external variant="line">
              {az.hero.secondaryLabel}
            </AzButton>
          </div>
        </Reveal>

        <Reveal className="az-hero-visual" delay={0.08}>
          <div className="az-console">
            <div className="az-console-bar">
              <span className="az-console-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="az-console-title">ALLUMINATY · DIRECTORY</span>
              <span className="az-console-live">
                <span className="az-pulse" aria-hidden="true" />
                LIVE
              </span>
            </div>

            <div className="az-console-search">
              <Search size={14} strokeWidth={2} aria-hidden="true" />
              Find batchmates — batch, house, city or company
            </div>

            <div className="az-console-body">
              {[first, second, third].map((m, i) => (
                <div className="az-console-row" key={m.name}>
                  <span
                    className="az-console-av"
                    style={
                      {
                        "--az-av":
                          i === 0
                            ? "linear-gradient(135deg,#40b0ff,#1173cf)"
                            : i === 1
                              ? "linear-gradient(135deg,#f4c04c,#f0b429)"
                              : "linear-gradient(135deg,#31e0c5,#0e8f7c)",
                      } as CSSProperties
                    }
                  >
                    {m.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div className="az-console-main">
                    <div className="az-console-top">
                      <strong className="az-console-name">{m.name}</strong>
                      <span className="az-console-badge">
                        <BadgeCheck size={12} strokeWidth={2} aria-hidden="true" />
                        Verified
                      </span>
                    </div>
                    <p className="az-console-meta">{m.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="az-console-foot">
              <span className="az-console-stat">
                <strong>500+</strong>
                <span>MEMBERS</span>
              </span>
              <span className="az-console-stat">
                <strong>18</strong>
                <span>COUNTRIES</span>
              </span>
              <span className="az-console-stat">
                <strong>10</strong>
                <span>HOUSES</span>
              </span>
            </div>
          </div>

          <div className="az-float az-float--a">
            <span className="az-float-ic">
              <CalendarCheck size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="az-float-copy">
              <span className="az-float-title">RSVP Confirmed</span>
              <span className="az-float-sub">Reunion 2026 · 214 going</span>
            </span>
          </div>

          <div className="az-float az-float--b">
            <span className="az-float-ic">
              <MessagesSquare size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="az-float-copy">
              <span className="az-float-title">Batch 06–13 is live</span>
              <span className="az-float-sub">183 messages today</span>
            </span>
          </div>

          <div className="az-float az-float--c">
            <span className="az-float-ic">
              <Store size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="az-float-copy">
              <span className="az-float-title">Business listed</span>
              <span className="az-float-sub">+4 this week</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}