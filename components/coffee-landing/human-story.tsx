import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

export function CfHumanStory({ data }: { data: CoffeeData }) {
  const { story } = data;

  return (
    <section className="cf-sec cf-story">
      <div className="cf-container">
        <div className="cf-story-grid">
          <div>
            <Reveal>
              <span className="cf-kicker">{story.kicker}</span>
              <h2 className="cf-h">{story.title}</h2>
              <p className="cf-lede">{story.body}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="cf-tip-quote">
                <p className="cf-tip-quote-text">
                  Creators don&apos;t only need money. They need people who{" "}
                  <em className="cf-accent">return</em>,{" "}
                  <em className="cf-accent">care</em>, and{" "}
                  <em className="cf-accent">believe</em>.
                </p>
                <p className="cf-tip-quote-attr">— The reason Coffee & Toffee exists</p>
              </div>
            </Reveal>
          </div>

          <Reveal className="cf-story-visual">
            <div className="cf-story-update">
              <div className="cf-story-update-header">
                <span className="cf-story-update-avatar">{story.update.initials}</span>
                <div>
                  <div className="cf-story-update-name">{story.update.name}</div>
                  <div className="cf-story-update-time">{story.update.time}</div>
                </div>
              </div>
              <p className="cf-story-update-body">“{story.update.body}”</p>

              <div className="cf-story-replies">
                {story.replies.map((reply) => (
                  <div className="cf-story-reply" key={reply.name}>
                    <span className={`cf-story-reply-avatar${reply.initials === "AP" ? " cf-story-reply-avatar--1" : " cf-story-reply-avatar--2"}`}>
                      {reply.initials}
                    </span>
                    <div className="cf-story-reply-content">
                      <div className="cf-story-reply-name">{reply.name}</div>
                      <p className="cf-story-reply-text">“{reply.text}”</p>
                      <div className="cf-story-reply-time">{reply.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cf-story-float-note">
              <p className="cf-story-float-text">{story.floatNote.text}</p>
              <p className="cf-story-float-author">{story.floatNote.author}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}