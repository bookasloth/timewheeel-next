import type { ReactNode } from "react";
import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

type PanelStat = { value: string; label: string };
type PanelProfile = { name: string; role: string; initials: string; stats: PanelStat[] };
type PanelSupporter = {
  name: string;
  initials: string;
  amount: string;
  note?: string;
  color: string;
};
type PanelUpdate = { text: string; meta: string };
type PanelWall = { name: string; initials: string; color: string };

type PreviewPanel = {
  title: string;
  dot: string;
  profile?: PanelProfile;
  supporters?: PanelSupporter[];
  updates?: PanelUpdate[];
  wall?: PanelWall[];
};

const dotStyles: Record<string, string> = {
  terracotta: "cf-preview-panel-dot--1",
  gold: "cf-preview-panel-dot--2",
  green: "cf-preview-panel-dot--3",
  caramel: "cf-preview-panel-dot--4",
};

function PanelFrame({
  title,
  dot,
  children,
}: {
  title: string;
  dot: string;
  children: ReactNode;
}) {
  return (
    <div className="cf-preview-panel">
      <div className="cf-preview-panel-header">
        <span className={`cf-preview-panel-dot ${dotStyles[dot] ?? ""}`} aria-hidden="true" />
        <span className="cf-preview-panel-title">{title}</span>
      </div>
      <div className="cf-preview-panel-body">{children}</div>
    </div>
  );
}

export function CfProductPreview({ data }: { data: CoffeeData }) {
  const { productPreview } = data;
  const panels = productPreview.panels as unknown as PreviewPanel[];

  return (
    <section className="cf-sec cf-preview">
      <div className="cf-container">
        <Reveal className="cf-sec-head">
          <span className="cf-kicker">{productPreview.kicker}</span>
          <h2 className="cf-h">{productPreview.title}</h2>
        </Reveal>

        <div className="cf-preview-panels">
          {panels.map((panel, i) => (
            <Reveal key={panel.title} delay={i * 0.1}>
              <PanelFrame title={panel.title} dot={panel.dot}>
                {panel.profile && (
                  <>
                    <div className="cf-pp-profile">
                      <span className="cf-pp-avatar">{panel.profile.initials}</span>
                      <div>
                        <div className="cf-pp-name">{panel.profile.name}</div>
                        <div className="cf-pp-role">{panel.profile.role}</div>
                      </div>
                    </div>
                    <div className="cf-pp-stats-row">
                      {panel.profile.stats.map((stat) => (
                        <div className="cf-pp-stat" key={stat.label}>
                          <div className="cf-pp-stat-value">{stat.value}</div>
                          <div className="cf-pp-stat-label">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {panel.supporters && (
                  <div>
                    {panel.supporters.map((s) => (
                      <div className="cf-pp-support-row" key={s.name}>
                        <span className="cf-pp-support-name">
                          <span className="cf-pp-support-av" style={{ background: s.color }}>
                            {s.initials}
                          </span>
                          <span>
                            {s.name}
                            {s.note && (
                              <div className="cf-pp-support-note">“{s.note}”</div>
                            )}
                          </span>
                        </span>
                        <span className="cf-pp-support-amount">{s.amount}</span>
                      </div>
                    ))}
                  </div>
                )}

                {panel.updates && (
                  <div>
                    {panel.updates.map((u) => (
                      <div className="cf-pp-update" key={u.text}>
                        <p className="cf-pp-update-text">{u.text}</p>
                        <div className="cf-pp-update-meta">{u.meta}</div>
                      </div>
                    ))}
                  </div>
                )}

                {panel.wall && (
                  <div className="cf-pp-wall-grid">
                    {panel.wall.map((w) => (
                      <div className="cf-pp-wall-item" key={w.name}>
                        <span className="cf-pp-wall-av" style={{ background: w.color }}>
                          {w.initials}
                        </span>
                        <div className="cf-pp-wall-name">{w.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </PanelFrame>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Reveal delay={0.2}>
            <p className="cf-lede" style={{ marginInline: "auto", fontSize: 15 }}>
              4 connected views from one page — one ecosystem for everything
              between creating and being supported.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}