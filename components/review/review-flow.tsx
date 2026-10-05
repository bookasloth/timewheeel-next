"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Pencil,
  RefreshCw,
  Star,
} from "lucide-react";
import { analytics, EVENTS } from "@/lib/analytics";
import {
  BRAND,
  BUSINESS_TYPES,
  EMPTY_ANSWERS,
  FEATURE_CHIPS,
  GOOGLE_REVIEW_URL,
  QUESTIONS,
  WELCOME,
  generateReview,
  hasEnoughToGenerate,
  type ReviewAnswers,
} from "@/lib/review";

const LAST_STEP = QUESTIONS.length; // 5
const RESULT_STEP = LAST_STEP + 1; // 6

// Framer-motion step transition (respects the direction of travel).
const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -24 : 24 }),
};

export function ReviewFlow() {
  const [step, setStep] = useState(0); // 0 welcome, 1..5 questions, 6 result
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<ReviewAnswers>(EMPTY_ANSWERS);
  const [review, setReview] = useState("");
  const [variant, setVariant] = useState(0);
  const [copied, setCopied] = useState(false);
  const generatedRef = useRef(false);

  useEffect(() => {
    analytics.track(EVENTS.REVIEW_PAGE_VIEWED);
  }, []);

  function set<K extends keyof ReviewAnswers>(key: K, value: ReviewAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function toggleFeature(label: string) {
    setAnswers((a) => ({
      ...a,
      features: a.features.includes(label)
        ? a.features.filter((f) => f !== label)
        : [...a.features, label],
    }));
  }

  const canAdvance = useMemo(() => {
    switch (step) {
      case 1:
        return answers.businessType !== "" &&
          (answers.businessType !== "other" || answers.businessTypeOther.trim().length > 1);
      case 2:
        return answers.before.trim().length > 1;
      case 3:
        return answers.features.length > 0 || answers.featuresOther.trim().length > 1;
      case 4:
        return answers.changed.trim().length > 1;
      case 5:
        return true; // recommendation is optional
      default:
        return true;
    }
  }, [step, answers]);

  function goNext() {
    if (step === LAST_STEP) {
      // Finishing the questions: generate once we land on the result.
      if (!hasEnoughToGenerate(answers)) return;
      const text = generateReview(answers, 0);
      setReview(text);
      setVariant(0);
      if (!generatedRef.current) {
        analytics.track(EVENTS.REVIEW_QUESTIONS_COMPLETED, {
          business_type: answers.businessType || "unset",
          features_count: answers.features.length,
        });
        analytics.track(EVENTS.REVIEW_GENERATED, { length: text.length });
        generatedRef.current = true;
      }
    }
    setDir(1);
    setStep((s) => Math.min(RESULT_STEP, s + 1));
  }

  function goBack() {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  function rephrase() {
    const next = variant + 1;
    setVariant(next);
    setReview(generateReview(answers, next));
  }

  function startOver() {
    setAnswers(EMPTY_ANSWERS);
    setReview("");
    setVariant(0);
    setCopied(false);
    generatedRef.current = false;
    setDir(-1);
    setStep(0);
  }

  async function copyReview() {
    try {
      await navigator.clipboard.writeText(review);
    } catch {
      // Older browsers / blocked clipboard: fall back to a hidden textarea select.
      const ta = document.createElement("textarea");
      ta.value = review;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* give up quietly; the text is still editable on screen */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    analytics.track(EVENTS.REVIEW_COPIED, { length: review.length });
    window.setTimeout(() => setCopied(false), 2200);
  }

  function onGoogleClick() {
    analytics.track(EVENTS.REVIEW_GOOGLE_CLICKED);
  }

  const progress =
    step === 0 ? 0 : step > LAST_STEP ? 100 : Math.round((step / LAST_STEP) * 100);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-10 pt-6 sm:pt-10">
      {/* Masthead */}
      <header className="flex items-center justify-between">
        <a href="/" className="text-sm font-semibold tracking-tight">
          {BRAND}
        </a>
      </header>

      {/* Progress */}
      {step > 0 && step <= LAST_STEP && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Question {step} of {LAST_STEP}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
            />
          </div>
        </div>
      )}

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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <Welcome onStart={goNext} />}

            {step === 1 && (
              <QuestionShell q={QUESTIONS[0]}>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_TYPES.map((b) => (
                    <Chip
                      key={b.id}
                      active={answers.businessType === b.id}
                      onClick={() => set("businessType", b.id)}
                    >
                      {b.label}
                    </Chip>
                  ))}
                </div>
                {answers.businessType === "other" && (
                  <input
                    autoFocus
                    value={answers.businessTypeOther}
                    onChange={(e) => set("businessTypeOther", e.target.value)}
                    placeholder="What do you do? e.g. tattoo studio"
                    className={inputCls}
                  />
                )}
                <input
                  value={answers.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Your city (optional)"
                  className={`${inputCls} mt-3`}
                />
              </QuestionShell>
            )}

            {step === 2 && (
              <QuestionShell q={QUESTIONS[1]}>
                <textarea
                  autoFocus
                  value={answers.before}
                  onChange={(e) => set("before", e.target.value)}
                  placeholder={QUESTIONS[1].placeholder}
                  rows={4}
                  className={textareaCls}
                />
              </QuestionShell>
            )}

            {step === 3 && (
              <QuestionShell q={QUESTIONS[2]}>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_CHIPS.map((f) => (
                    <Chip key={f} active={answers.features.includes(f)} onClick={() => toggleFeature(f)}>
                      {f}
                    </Chip>
                  ))}
                </div>
                <input
                  value={answers.featuresOther}
                  onChange={(e) => set("featuresOther", e.target.value)}
                  placeholder={QUESTIONS[2].placeholder}
                  className={`${inputCls} mt-3`}
                />
              </QuestionShell>
            )}

            {step === 4 && (
              <QuestionShell q={QUESTIONS[3]}>
                <textarea
                  autoFocus
                  value={answers.changed}
                  onChange={(e) => set("changed", e.target.value)}
                  placeholder={QUESTIONS[3].placeholder}
                  rows={4}
                  className={textareaCls}
                />
              </QuestionShell>
            )}

            {step === 5 && (
              <QuestionShell q={QUESTIONS[4]}>
                <textarea
                  autoFocus
                  value={answers.recommend}
                  onChange={(e) => set("recommend", e.target.value)}
                  placeholder={QUESTIONS[4].placeholder}
                  rows={4}
                  className={textareaCls}
                />
              </QuestionShell>
            )}

            {step === RESULT_STEP && (
              <Result
                review={review}
                onChange={setReview}
                copied={copied}
                onCopy={copyReview}
                onGoogle={onGoogleClick}
                onRephrase={rephrase}
                onStartOver={startOver}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer controls for the question steps */}
      {step >= 1 && step <= LAST_STEP && (
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
            onClick={goNext}
            disabled={!canAdvance}
            className="btn btn-primary group inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-brand-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === LAST_STEP ? "Create my review" : "Next"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── pieces ──────────────────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
const textareaCls = `${inputCls} resize-none leading-relaxed`;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-card text-foreground hover:border-brand/50"
      }`}
    >
      {children}
    </button>
  );
}

function QuestionShell({
  q,
  children,
}: {
  q: (typeof QUESTIONS)[number];
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{q.title}</h1>
      {q.help && <p className="mt-2 text-sm text-muted-foreground">{q.help}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="pt-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-text">
        {WELCOME.kicker}
      </p>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {WELCOME.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{WELCOME.body}</p>
      <ul className="mt-6 space-y-3">
        {WELCOME.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-rating/15 text-rating">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="btn btn-primary group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold text-brand-foreground sm:w-auto"
      >
        {WELCOME.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="Five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-5 fill-[#fbbc04] text-[#fbbc04]" strokeWidth={0} />
      ))}
    </div>
  );
}

function Result({
  review,
  onChange,
  copied,
  onCopy,
  onGoogle,
  onRephrase,
  onStartOver,
}: {
  review: string;
  onChange: (v: string) => void;
  copied: boolean;
  onCopy: () => void;
  onGoogle: () => void;
  onRephrase: () => void;
  onStartOver: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Your review is ready</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Written from your answers. Edit anything before you post.
          </p>
        </div>
        <Stars />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Pencil className="size-3.5" />
          Your review
        </div>
        <textarea
          value={review}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className={`${textareaCls} text-base`}
        />
        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onRephrase}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className="size-3.5" />
            Rephrase
          </button>
          <span className="text-xs text-muted-foreground">{review.trim().length} characters</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onCopy}
          disabled={!review.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-brand/50 disabled:opacity-40"
        >
          {copied ? (
            <>
              <Check className="size-4 text-rating" strokeWidth={3} />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy review
            </>
          )}
        </button>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onGoogle}
          className="btn btn-primary group inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold text-brand-foreground"
        >
          Leave Google review
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="text-center text-xs text-muted-foreground">
          Paste your review on the Google page that opens, then tap post.
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
