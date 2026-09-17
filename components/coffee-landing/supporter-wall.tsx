import { Award } from "lucide-react";
import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

const avatarClasses = [
  "cf-wall-avatar--gold",
  "cf-wall-avatar--peach",
  "cf-wall-avatar--coffee",
  "cf-wall-avatar--terracotta",
];

export function CfSupporterWall({ data }: { data: CoffeeData }) {
  const { supporterWall } = data;

  return (
    <section className="cf-sec cf-wall">
      <div className="cf-container">
        <Reveal className="cf-sec-head cf-sec-head--center">
          <span className="cf-kicker">{supporterWall.kicker}</span>
          <h2 className="cf-h">{supporterWall.title}</h2>
          <p className="cf-lede cf-lede--center">{supporterWall.body}</p>
        </Reveal>

        <div className="cf-wall-grid">
          {supporterWall.supporters.map((supporter, i) => (
            <Reveal key={supporter.name} className="cf-wall-card" stagger>
              <span
                className={`cf-wall-avatar ${avatarClasses[i % avatarClasses.length]}`}
              >
                {supporter.initials}
              </span>
              <div className="cf-wall-name">{supporter.name}</div>
              {supporter.badge && (
                <span
                  className={`cf-wall-badge${
                    supporter.badgeStyle ? ` cf-wall-badge--${supporter.badgeStyle}` : ""
                  }`}
                >
                  <Award size={11} strokeWidth={2} aria-hidden="true" />
                  {supporter.badge}
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="cf-wall-recent" delay={0.2}>
          <span className="cf-wall-recent-label">Recent supporters</span>
          <div className="cf-wall-recent-avatars">
            {supporterWall.recentAvatars.map((av) => (
              <span
                key={av.initials}
                className="cf-wall-recent-av"
                style={{ background: av.color }}
              >
                {av.initials}
              </span>
            ))}
          </div>
          <span className="cf-wall-recent-count">{supporterWall.recentCount}</span>
        </Reveal>
      </div>
    </section>
  );
}