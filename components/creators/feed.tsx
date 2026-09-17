"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { creatorUi } from "@/lib/creator";

function Poll({
  options,
}: {
  options: readonly { label: string; votes: number }[];
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const total = options.reduce((a, o) => a + o.votes, 0);
  return (
    <div className="ct-poll">
      {options.map((o, i) => (
        <button
          key={o.label}
          type="button"
          className={`ct-poll-opt ${picked === i ? "ct-poll-opt--picked" : ""}`}
          disabled={picked !== null}
          onClick={() => setPicked(i)}
        >
          {picked !== null ? (
            <span
              className="ct-poll-fill"
              style={{ width: `${Math.round((o.votes / total) * 100)}%` }}
            />
          ) : null}
          <span className="ct-poll-text">{o.label}</span>
          {picked !== null ? (
            <span className="ct-poll-pct">{Math.round((o.votes / total) * 100)}%</span>
          ) : null}
        </button>
      ))}
      <p className="ct-poll-foot">
        {picked !== null ? `${total} votes · tap another to change your mind next week` : "Your vote counts, pick one"}
      </p>
    </div>
  );
}

export function CtFeed() {
  const f = creatorUi.feed;
  return (
    <section className="ct-section ct-section--tint">
      <div className="ct-wrap ct-split">
        <div className="ct-split-copy">
          <header className="ct-head">
            <p className="ct-eyebrow">
              <span className="ct-eyebrow-dot" aria-hidden="true" /> {f.eyebrow}
            </p>
            <h2 className="ct-h2">{f.title}</h2>
            <p className="ct-lede">{f.body}</p>
          </header>
          <ul className="ct-points">
            {f.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="ct-feed">
          {f.posts.map((post) => (
            <article key={post.title} className="ct-post">
              <header className="ct-post-top">
                <span className={`ct-post-pill ct-post-pill--${post.kind}`}>
                  {post.kind === "thanks" ? <Heart size={11} strokeWidth={2.4} aria-hidden="true" /> : null}
                  {post.label}
                </span>
                <time className="ct-post-time">{post.time}</time>
              </header>
              <h3 className="ct-post-title">{post.title}</h3>
              {post.kind === "image" && post.art ? (
                <div
                  className="ct-post-art"
                  style={{ background: `linear-gradient(140deg, ${post.art[0]}, ${post.art[1]})` }}
                >
                  <span className="ct-post-art-label">canvas · in progress</span>
                </div>
              ) : null}
              {"body" in post ? <p className="ct-post-body">{post.body}</p> : null}
              {post.kind === "poll" && post.options ? <Poll options={post.options} /> : null}
              {post.kind === "thanks" && post.names ? (
                <div className="ct-thanks-names" aria-hidden="true">
                  {post.names.map((n) => (
                    <span key={n} className="ct-thanks-name">
                      ♡ {n}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}