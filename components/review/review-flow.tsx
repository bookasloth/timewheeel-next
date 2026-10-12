"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Pencil, RefreshCw, Star } from "lucide-react";
import { analytics, EVENTS } from "@/lib/analytics";
import { BRAND, GOOGLE_REVIEW_URL, REVIEW_SERVICES, type ReviewService } from "@/lib/review";

// Two slides: pick the service, then copy a sample review. The main button
// copies the text and opens Timewheel's Google review form in one tap. A copied
// sample is never offered again: the server tracks it for everyone, and this
// browser also remembers it in case the server isn't configured.

const LOCAL_KEY = "tw-review-used";

function localUsed(): Record<string, number[]> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}

function rememberLocal(service: string, idx: number) {
  try {
    const all = localUsed();
    all[service] = [...new Set([...(all[service] ?? []), idx])];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
  } catch {
    /* storage blocked: the server copy still counts */
  }
}

// Unused indexes for a service, shuffled so two people on the page at the
// same moment are unlikely to land on the same sample.
async function availableFor(s: ReviewService): Promise<number[]> {
  let used: number[] = [];
  try {
    const res = await fetch(`/api/review/samples?service=${encodeURIComponent(s.id)}`, { cache: "no-store" });
    if (res.ok) used = (await res.json()).used ?? [];
  } catch {
    /* offline or server down: fall back to this browser's list */
  }
  const skip = new Set([...used, ...(localUsed()[s.id] ?? [])]);
  const free = s.samples.map((_, i) => i).filter((i) => !skip.has(i));
  for (let i = free.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [free[i], free[j]] = [free[j], free[i]];
  }
  return free;
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -24 : 24 }),
};

export function ReviewFlow() {
  const [service, setService] = useState<ReviewService | null>(null);
  const [dir, setDir] = useState(1);
  const [pool, setPool] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    analytics.track(EVENTS.REVIEW_PAGE_VIEWED);
  }, []);

  async function pick(s: ReviewService) {
    setService(s);
    setCopied(false);
    setDir(1);
    setLoading(true);
    setReview("");
    const free = await availableFor(s);
    setPool(free);
    setPos(0);
    setReview(free.length ? s.samples[free[0]] : "");
    setLoading(false);
    analytics.track(EVENTS.REVIEW_GENERATED, { service: s.id, available: free.length });
  }

  function back() {
    setDir(-1);
    setService(null);
  }

  function another() {
    if (!service || pool.length < 2) return;
    const next = (pos + 1) % pool.length;
    setPos(next);
    setReview(service.samples[pool[next]]);
    setCopied(false);
  }

  // Runs inside the link's click, so the clipboard write happens within the
  // user gesture and the new tab is a normal link open (no popup blocking).
  function copyAndGo() {
    copyText(review);
    setCopied(true);
    const idx = pool[pos];
    if (service && idx !== undefined) {
      rememberLocal(service.id, idx);
      fetch("/api/review/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: service.id, idx }),
        keepalive: true,
      }).catch(() => {});
    }
    analytics.track(EVENTS.REVIEW_COPIED, { length: review.length, service: service?.id });
    analytics.track(EVENTS.REVIEW_GOOGLE_CLICKED, { service: service?.id });
  }

  const step = service ? 2 : 1;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-10 pt-6 sm:pt-10">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {BRAND}
        </Link>
        <span className="text-xs text-muted-foreground">Step {step} of 2</span>
      </header>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={false}
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ type: "spring", stiffness: 160, damping: 24 }}
        />
      </div>

      <div className="relative flex-1 pt-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {!service ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-text">
                  Share your experience
                </p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Which service did you get from us?
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  Pick one and we will give you a ready review to post on Google.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {REVIEW_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => pick(s)}
                      className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 text-left text-base font-semibold transition-colors hover:border-brand"
                    >
                      {s.label}
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center text-center">
                  <Stars />
                  <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                    Tap 5 stars, then paste
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We copy this review for you and open our Google page. Edit anything you like
                    first.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Pencil className="size-3.5" />
                    {service.label} review
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                      setCopied(false);
                    }}
                    rows={6}
                    placeholder={loading ? "Loading your review..." : "Write a few lines about your experience with Timewheel."}
                    className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-base leading-relaxed outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                  {pool.length > 1 && <button
                    type="button"
                    onClick={another}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RefreshCw className="size-3.5" />
                    Try another
                  </button>}
                </div>

                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={copyAndGo}
                  aria-disabled={!review.trim()}
                  className="btn btn-primary group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-semibold text-brand-foreground aria-disabled:pointer-events-none aria-disabled:opacity-40"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" strokeWidth={3} />
                      Copied, opening Google
                    </>
                  ) : (
                    <>
                      Copy &amp; review on Google
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </a>
                {copied && (
                  <p role="status" className="mt-3 text-center text-sm text-muted-foreground">
                    Google didn&apos;t open?{" "}
                    <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                      Open it here
                    </a>
                    . Your review is on the clipboard.
                  </p>
                )}

                <button
                  type="button"
                  onClick={back}
                  className="mx-auto mt-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Pick a different service
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  } else {
    legacyCopy(text);
  }
}

// Older browsers / blocked clipboard: select a hidden textarea and copy.
function legacyCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    /* the text is still on screen to copy by hand */
  }
  document.body.removeChild(ta);
}

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-9 fill-[#fbbc04] text-[#fbbc04]" strokeWidth={0} />
      ))}
    </div>
  );
}
