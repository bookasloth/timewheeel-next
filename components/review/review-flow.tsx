"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Loader2, Pencil, Star } from "lucide-react";
import { analytics, EVENTS } from "@/lib/analytics";
import {
  BRAND,
  COPIED_RESET_MS,
  COPY,
  EMPTY_ANSWERS,
  GOOGLE_REVIEW_URL,
  hasEnoughToGenerate,
  isHappy,
  ratingLabel,
  requestReview,
  type ReviewAnswers,
} from "@/lib/review";

// Three steps: 1 rating, 2 write / private feedback, 3 result / thank-you.
const STEP_RATING = 1;
const STEP_WRITE = 2;
const STEP_RESULT = 3;
const TOTAL_STEPS = 3;

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -24 : 24 }),
};

export function ReviewFlow() {
  const [step, setStep] = useState(STEP_RATING);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<ReviewAnswers>(EMPTY_ANSWERS);
  const [review, setReview] = useState("");
  const [copied, setCopied] = useState(false);
  const [writing, setWriting] = useState(false);
  const generatedRef = useRef(false);
  const advanceTimer = useRef<number | null>(null);

  const happy = isHappy(answers.rating);

  useEffect(() => {
    analytics.track(EVENTS.REVIEW_PAGE_VIEWED);
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  function pickRating(rating: number) {
    setAnswers((a) => ({ ...a, rating }));
    analytics.track(EVENTS.REVIEW_RATING_SELECTED, { rating, happy: isHappy(rating) });
    // Auto-advance after a beat so the choice registers visually.
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      setDir(1);
      setStep(STEP_WRITE);
    }, 420);
  }

  async function submitWrite() {
    if (!hasEnoughToGenerate(answers) || writing) return;
    if (happy) {
      setWriting(true);
      const text = await requestReview(answers);
      setReview(text);
      if (!generatedRef.current) {
        analytics.track(EVENTS.REVIEW_GENERATED, { rating: answers.rating, length: text.length });
        generatedRef.current = true;
      }
      setWriting(false);
    } else {
      analytics.track(EVENTS.REVIEW_FEEDBACK_SUBMITTED, {
        rating: answers.rating,
        length: answers.experience.trim().length,
      });
    }
    setDir(1);
    setStep(STEP_RESULT);
  }

  function goBack() {
    setDir(-1);
    setStep((s) => Math.max(STEP_RATING, s - 1));
  }

  function startOver() {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setAnswers(EMPTY_ANSWERS);
    setReview("");
    setCopied(false);
    generatedRef.current = false;
    setDir(-1);
    setStep(STEP_RATING);
  }

  // Copy synchronously inside the click so the browser keeps the user gesture
  // and the Google link (a real anchor) is never popup-blocked.
  function copyBeforeGoogle() {
    try {
      navigator.clipboard?.writeText(review);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = review;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* text is still on screen to copy by hand */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    analytics.track(EVENTS.REVIEW_COPIED, { length: review.length });
    analytics.track(EVENTS.REVIEW_GOOGLE_CLICKED, { rating: answers.rating });
    window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-10 pt-6 sm:pt-10">
      {/* Masthead */}
      <header className="flex items-center justify-between">
        <a href="/" className="text-sm font-semibold tracking-tight">
          {BRAND}
        </a>
        <span className="text-xs text-muted-foreground">
          Step {step} of {TOTAL_STEPS}
        </span>
      </header>

      {/* Progress */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 160, damping: 24 }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex-1 pt-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === STEP_RATING && (
              <RatingStep rating={answers.rating} onPick={pickRating} />
            )}

            {step === STEP_WRITE && (
              <WriteStep
                happy={happy}
                value={answers.experience}
                onChange={(v) => setAnswers((a) => ({ ...a, experience: v }))}
              />
            )}

            {step === STEP_RESULT &&
              (happy ? (
                <Result
                  rating={answers.rating}
                  review={review}
                  onChange={setReview}
                  copied={copied}
                  onCopyGoogle={copyBeforeGoogle}
                  onStartOver={startOver}
                />
              ) : (
                <Thanks />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer controls for the write step */}
      {step === STEP_WRITE && (
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <button
            type="button"
            onClick={submitWrite}
            disabled={!hasEnoughToGenerate(answers) || writing}
            className="btn btn-primary group inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-brand-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {writing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Writing your review
              </>
            ) : (
              <>
                {happy ? COPY.write.cta : COPY.feedback.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ── pieces ───────────────────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
const textareaCls = `${inputCls} resize-none leading-relaxed`;

function RatingStep({ rating, onPick }: { rating: number; onPick: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || rating;
  return (
    <div className="pt-4 text-center sm:pt-8">
      <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
        {COPY.rating.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{COPY.rating.help}</p>

      <div
        className="mt-8 flex items-center justify-center gap-1.5"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onClick={() => onPick(n)}
            className="rounded-md p-1 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <Star
              className={`size-10 transition-colors sm:size-12 ${
                n <= shown ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-transparent text-border"
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>

      <p className="mt-4 h-5 text-sm font-medium text-brand-text">{ratingLabel(shown)}</p>
    </div>
  );
}

function WriteStep({
  happy,
  value,
  onChange,
}: {
  happy: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const c = happy ? COPY.write : COPY.feedback;
  return (
    <div>
      <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{c.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{c.help}</p>
      <div className="mt-6">
        <textarea
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={c.placeholder}
          rows={5}
          className={`${textareaCls} text-base`}
        />
      </div>
    </div>
  );
}

function Result({
  rating,
  review,
  onChange,
  copied,
  onCopyGoogle,
  onStartOver,
}: {
  rating: number;
  review: string;
  onChange: (v: string) => void;
  copied: boolean;
  onCopyGoogle: () => void;
  onStartOver: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{COPY.result.title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{COPY.result.help}</p>
        </div>
        <ReadonlyStars rating={rating} />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Pencil className="size-3.5" />
          Your review
        </div>
        <textarea
          value={review}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className={`${textareaCls} text-base`}
        />
        <div className="mt-2 text-right text-xs text-muted-foreground">
          {review.trim().length} characters
        </div>
      </div>

      <div className="mt-5">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCopyGoogle}
          aria-disabled={!review.trim()}
          className={`btn btn-primary group inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-semibold text-brand-foreground ${
            review.trim() ? "" : "pointer-events-none opacity-40"
          }`}
        >
          {copied ? (
            <>
              <Check className="size-5" strokeWidth={3} />
              {COPY.result.copied}
            </>
          ) : (
            <>
              {COPY.result.primary}
              <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </a>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Your review is copied, just paste it on the Google page and tap post.
        </p>
      </div>

      <button
        type="button"
        onClick={onStartOver}
        className="mt-6 block w-full text-center text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        Start over
      </button>
    </div>
  );
}

function Thanks() {
  return (
    <div className="pt-6 text-center">
      <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-rating/15 text-rating">
        <Check className="size-7" strokeWidth={3} />
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{COPY.thanks.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        {COPY.thanks.body}
      </p>
      <a
        href="/"
        className="btn btn-primary mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
      >
        Back to {BRAND}
      </a>
    </div>
  );
}

function ReadonlyStars({ rating }: { rating: number }) {
  return (
    <div className="flex shrink-0 gap-0.5" aria-label={`${rating} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`size-5 ${
            n <= rating ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-transparent text-border"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
