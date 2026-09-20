import { Reveal } from "@/components/reveal";
import {
  siNvidia,
  siSupabase,
  siGithub,
  siTurso,
  siClerk,
  siClaude,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

// ponytail: static logo wall, placeholder collaborators — swap for real partners.
// OpenAI has no simple-icons glyph (trademark), so it renders as a wordmark only.
const logos: { icon?: SimpleIcon; label: string }[] = [
  { icon: siNvidia, label: "NVIDIA" },
  { icon: siSupabase, label: "Supabase" },
  { icon: siGithub, label: "GitHub" },
  { label: "OpenAI" },
  { icon: siTurso, label: "Turso" },
  { icon: siClerk, label: "Clerk" },
  { icon: siClaude, label: "Claude" },
  { icon: siVercel, label: "Vercel" },
];

function Plus({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`absolute -translate-x-1/2 -translate-y-1/2 text-lg leading-none text-white/25 ${className}`}
      style={style}
    >
      +
    </span>
  );
}

export function SmmCollaborators() {
  return (
    <section className="bg-navy py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-r from-white/50 via-white to-white/50 bg-clip-text text-transparent">
              Companies we collaborate with.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          {/* gap-px over a light ground draws the grid lines — no nth-child math */}
          <ul className="relative mt-12 grid grid-cols-2 gap-px rounded-lg border border-white/10 bg-white/10 sm:grid-cols-4">
            {/* plus marks at interior line crossings */}
            <span aria-hidden className="pointer-events-none absolute inset-0">
              {/* mobile: 1 vertical × 3 horizontal lines */}
              {[25, 50, 75].map((top) => (
                <Plus key={`m${top}`} className="sm:hidden" style={{ left: "50%", top: `${top}%` }} />
              ))}
              {/* desktop: 3 vertical × 1 horizontal line */}
              {[25, 50, 75].map((left) => (
                <Plus key={`d${left}`} className="hidden sm:block" style={{ left: `${left}%`, top: "50%" }} />
              ))}
            </span>
            {logos.map((l) => (
              <li
                key={l.label}
                className="flex items-center justify-center gap-2.5 bg-navy py-8 md:py-10"
              >
                {l.icon && (
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="size-6 shrink-0 text-white"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={l.icon.path} />
                  </svg>
                )}
                <span className="text-lg font-bold tracking-tight text-white md:text-xl">
                  {l.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
