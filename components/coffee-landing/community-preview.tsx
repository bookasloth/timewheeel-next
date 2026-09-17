import { Image as ImageIcon } from "lucide-react";
import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

export function CfCommunityPreview({ data }: { data: CoffeeData }) {
  const { communityPreview } = data;

  return (
    <section className="cf-sec cf-community" id="community">
      <div className="cf-container">
        <div className="cf-community-layout">
          <div>
            <Reveal>
              <span className="cf-kicker">{communityPreview.kicker}</span>
              <h2 className="cf-h">{communityPreview.title}</h2>
              <p className="cf-lede">{communityPreview.body}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="cf-ownership-result">
                <div className="cf-ownership-result-title">A creator journal</div>
                <div className="cf-ownership-result-desc">
                  Updates, milestones, and behind-the-scenes moments — shared with
                  the people who genuinely want to follow the journey.
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            {communityPreview.posts.map((post, i) => (
              <Reveal key={i} className={post.type === "milestone" ? "cf-comm-post cf-comm-post--dark" : "cf-comm-post"} delay={i * 0.08}>
                {post.type === "image" && (
                  <>
                    <div className="cf-comm-post-header">
                      <span className="cf-comm-post-avatar">{post.initials}</span>
                      <div>
                        <div className="cf-comm-post-name">{post.name}</div>
                        <div className="cf-comm-post-time">{post.time}</div>
                      </div>
                    </div>
                    <p className="cf-comm-post-body">{post.body}</p>
                    <div className="cf-comm-post-image">
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ImageIcon size={16} strokeWidth={1.6} aria-hidden="true" />
                        New collection preview
                      </span>
                    </div>
                  </>
                )}

                {post.type === "milestone" && (
                  <div className="cf-comm-milestone">
                    <div className="cf-comm-milestone-number">{post.number}</div>
                    <div className="cf-comm-milestone-text">{post.text}</div>
                    <div className="cf-comm-milestone-body">{post.body}</div>
                  </div>
                )}

                {post.type === "poll" && (
                  <>
                    <div className="cf-comm-poll-question">{post.question}</div>
                    <div>
                      {post.options.map((option) => (
                        <div className="cf-comm-poll-option" key={option.label}>
                          <span
                            className="cf-comm-poll-bar"
                            style={{
                              width: option.pct ? `${option.pct}%` : 0,
                            }}
                            aria-hidden="true"
                          />
                          <span className="cf-comm-poll-label">{option.label}</span>
                          <span className="cf-comm-poll-pct">{option.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {post.type === "text" && (
                  <>
                    <div className="cf-comm-post-header">
                      <span className="cf-comm-post-avatar">{post.initials}</span>
                      <div>
                        <div className="cf-comm-post-name">{post.name}</div>
                        <div className="cf-comm-post-time">{post.time}</div>
                      </div>
                    </div>
                    <p className="cf-comm-post-body">{post.body}</p>
                  </>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}