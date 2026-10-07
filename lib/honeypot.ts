// Bot trap shared by the public form routes (/api/lead, /api/comment). The
// client half is components/shared/honeypot.tsx, which posts two fields:
//   hp_x: an off-screen input humans never see. Its name, id and label are
//         deliberately meaningless so browser autofill has nothing to match.
//         (Chrome ignores autocomplete="off" and used to fill the old
//         "company_website" trap, so real visitors were silently dropped.)
//   hp_t: milliseconds between the trap rendering and the submit.
//
// Only "filled AND fast" counts as a bot. Filled but slow is most likely a
// person whose browser or extension filled it anyway, so that submission is
// kept and flagged instead of thrown away.

export const HP_FIELD = "hp_x";
export const HP_TIME = "hp_t";
const HP_MIN_MS = 2000;

export type HoneypotCheck = { verdict: "clean" | "bot" | "suspect"; ms: number | null };

export function checkHoneypot(body: Record<string, unknown>): HoneypotCheck {
  const trap = body[HP_FIELD];
  const t = Number(body[HP_TIME]);
  const ms = Number.isFinite(t) ? Math.round(t) : null;
  if (typeof trap !== "string" || !trap.trim()) return { verdict: "clean", ms };
  // No timing at all means the post did not come from our form script.
  return { verdict: ms === null || ms < HP_MIN_MS ? "bot" : "suspect", ms };
}
