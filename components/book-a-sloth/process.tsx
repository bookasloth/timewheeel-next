import {
  BadgeCheck,
  CalendarCheck,
  LayoutDashboard,
  Link2,
  Settings2,
  Tag,
  Wallet,
} from "lucide-react";
import { bas } from "@/lib/book-a-sloth";
import { SxButton } from "./cta";
import "./process.css";

const stopIcons = [Settings2, Tag, Link2, CalendarCheck, Wallet, LayoutDashboard];
const cardIcons = stopIcons;

export function BasProcess() {
  const s = bas.steps;

  return (
    <section className="pw">
      <div className="pw__container">
        <h2 className="pw__title">
          One link. Get booked, get paid, get your time back.
        </h2>

        <p className="pw__desc">{s.body}</p>

        <div className="pw__metro">
          <div className="pw__track" role="group" aria-label="Booking journey">
            <div className="pw__trackline" aria-hidden="true" />
            {s.steps.map((step, i) => {
              const Icon = stopIcons[i % stopIcons.length];
              const isStart = i === 0;
              const isEnd = i === s.steps.length - 1;
              return (
                <div key={step.name} className="pw__stop">
                  <span
                    className={`pw__node${isStart ? " pw__node--go" : ""}${
                      isEnd ? " pw__node--paid" : ""
                    }`}
                  >
                    {isEnd ? (
                      <BadgeCheck size={22} strokeWidth={1.8} aria-hidden="true" />
                    ) : (
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    )}
                    <span className="pw__nodeNum">{i + 1}</span>
                  </span>
                  <span className="pw__stopLabel">{step.stop}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pw__grid">
          {s.steps.map((step, i) => {
            const Icon = cardIcons[i % cardIcons.length];
            return (
              <article key={step.name} className="pw__card">
                <span className="pw__cardNum" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pw__cardIc">
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="pw__cardName">{step.name}</h3>
                <p className="pw__cardDesc">{step.desc}</p>
              </article>
            );
          })}
        </div>

        <div className="pw__ticket" aria-hidden="true">
          <span className="pw__ticketDot" />
          <span className="pw__ticketLabel">ONE LINK</span>
          <span className="pw__ticketRoute">
            GET BOOKED · GET PAID OVER UPI · GET YOUR TIME BACK
          </span>
          <span className="pw__ticketStamp">PAID</span>
        </div>

        <div className="pw__foot">
          <SxButton href={bas.liveUrl} external variant="accent">
            Try Book A Sloth
          </SxButton>
        </div>
      </div>
    </section>
  );
}