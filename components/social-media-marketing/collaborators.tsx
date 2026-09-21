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
// OpenAI has no simple-icons glyph (trademark), so its official blossom path is inlined.
type Logo = { icon?: SimpleIcon; path?: string; viewBox?: string; label: string };

const openaiPath =
  "M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z";

const logos: Logo[] = [
  { icon: siNvidia, label: "NVIDIA" },
  { icon: siSupabase, label: "Supabase" },
  { icon: siGithub, label: "GitHub" },
  { path: openaiPath, viewBox: "0 0 256 260", label: "OpenAI" },
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
                className="group flex items-center justify-center gap-2.5 bg-navy py-8 md:py-10"
              >
                {l.icon ? (
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="size-6 shrink-0 grayscale transition duration-300 group-hover:grayscale-0"
                    style={{
                      // monochrome at rest; brand colour on hover. Black marks
                      // (GitHub, Vercel) get white so they stay visible on navy.
                      fill:
                        l.icon.hex && l.icon.hex !== "181717" && l.icon.hex !== "000000"
                          ? `#${l.icon.hex}`
                          : "#ffffff",
                    }}
                  >
                    <path d={l.icon.path} />
                  </svg>
                ) : (
                  <svg
                    role="img"
                    viewBox={l.viewBox ?? "0 0 256 260"}
                    aria-hidden
                    className="h-6 w-auto shrink-0 grayscale transition duration-300 group-hover:grayscale-0"
                    style={{ fill: "#ffffff" }}
                  >
                    <path d={l.path} />
                  </svg>
                )}
                <span className="text-lg font-bold tracking-tight text-white/70 transition duration-300 group-hover:text-white md:text-xl">
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
