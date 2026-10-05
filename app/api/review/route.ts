import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { BRAND, generateReview, type ReviewAnswers } from "@/lib/review";

// Polishes a happy customer's own words into a natural Google review. The LLM
// ONLY rephrases what they wrote; a hard-coded guardrail forbids inventing any
// fact, number, service or outcome. If the key is missing or the call fails we
// fall back to the deterministic generator so the funnel never dead-ends.

export const runtime = "nodejs";
export const maxDuration = 20;

const MODEL = "claude-haiku-4-5";
const MAX_EXPERIENCE_CHARS = 1200;

const SYSTEM = `You turn a customer's own feedback into a short, natural, first-person Google review for ${BRAND}, a web design and digital marketing agency in Nagpur, India.

Hard rules, never break them:
- Use ONLY what the customer actually said. Never invent or add services, features, numbers, results, timelines, names, places or praise they did not give.
- If their note is thin, keep the review short. Do not pad it.
- Write in the first person, the way a real person types a review. Plain and genuine, not marketing language.
- 1 to 3 short sentences, about 55 words maximum.
- Name ${BRAND} once, naturally.
- Let the star rating set the warmth, but never overstate beyond their words.
- Do not use em-dashes anywhere.
- Output ONLY the review text. No quotes, no labels, no preamble, no sign-off.`;

export async function POST(request: Request) {
  let body: { rating?: unknown; experience?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const rating = Number(body.rating);
  const experience = typeof body.experience === "string" ? body.experience.trim() : "";

  if (!experience || !Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const answers: ReviewAnswers = {
    rating,
    experience: experience.slice(0, MAX_EXPERIENCE_CHARS),
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured: silently use the deterministic generator.
    return NextResponse.json({ review: generateReview(answers), source: "fallback" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 300,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Star rating: ${answers.rating} out of 5.\nWhat they wrote: "${answers.experience}"\n\nWrite their Google review.`,
        },
      ],
    });

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .trim();

    if (!text) {
      return NextResponse.json({ review: generateReview(answers), source: "fallback" });
    }
    return NextResponse.json({ review: text, source: "llm" });
  } catch {
    // Any API failure: fall back rather than fail the funnel.
    return NextResponse.json({ review: generateReview(answers), source: "fallback" });
  }
}
