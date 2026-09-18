"use client";

import { useEffect, useRef, useState } from "react";

// Full-screen "Startup Growth Blueprint" lead quiz. Reusable across service
// pages: pass `service` (goes to /api/lead) and optional `intro` heading.
// Opens once per visitor on scroll-depth or exit-intent, never a blind timer.
// Background is the meteor-shower GLSL run on raw WebGL (no three.js dep).
// ponytail: one question set for all marketing pages; add per-service configs
// only if a page actually needs different questions.

type Props = {
  /** Value sent to /api/lead as `service`, e.g. "SEO". */
  service: string;
  /** Optional heading override for step 1. */
  intro?: string;
};

type Answers = {
  website: string;
  experience: string;
  goal: string;
  revenue: string;
  budget: string;
  execution: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const emptyAnswers: Answers = {
  website: "", experience: "", goal: "", revenue: "", budget: "",
  execution: "", firstName: "", lastName: "", email: "", phone: "",
};

const SEEN_KEY = "gbp_seen";
const HIGH_BUDGETS = ["₹1.5L – ₹5L", "₹5L – ₹20L", "₹20L+"];

// Qualification score from the quiz. HOT = wants our team AND real budget;
// WARM = one of the two; COLD = neither. Exported so the branch is testable.
export function scoreLead(a: Pick<Answers, "budget" | "execution">): "HOT" | "WARM" | "COLD" {
  const wantsTeam = a.execution.includes("team");
  const hasBudget = HIGH_BUDGETS.includes(a.budget);
  if (wantsTeam && hasBudget) return "HOT";
  if (wantsTeam || hasBudget) return "WARM";
  return "COLD";
}

const STEPS = 7;

export function GrowthBlueprintModal({ service, intro }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>(emptyAnswers);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const set = (k: keyof Answers, v: string) => setA((p) => ({ ...p, [k]: v }));
  const pick = (k: keyof Answers, v: string) => { set(k, v); next(); };
  const next = () => setStep((s) => Math.min(s + 1, STEPS));

  const openOnce = () => {
    try {
      if (localStorage.getItem(SEEN_KEY)) return false;
      localStorage.setItem(SEEN_KEY, "1");
    } catch { /* private mode: still open, just may repeat */ }
    setOpen(true);
    return true;
  };

  // Trigger: 40% scroll depth or exit-intent (mouse leaves via top). Whichever
  // fires first opens the modal; then both listeners detach.
  useEffect(() => {
    let done = false;
    const trip = () => { if (done) return; if (openOnce()) done = true; cleanup(); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.4) trip();
    };
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0) trip(); };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  // Meteor-shower shader on raw WebGL. Runs only while open.
  useEffect(() => {
    if (!open || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`;
    const frag = `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
float hash(float n){ return fract(sin(n)*43758.5453123); }
vec3 pal(float i){
  if(i < 0.25) return vec3(0.20, 0.45, 1.00);
  if(i < 0.50) return vec3(0.10, 0.85, 0.95);
  if(i < 0.75) return vec3(0.65, 0.25, 1.00);
  return vec3(1.00, 0.25, 0.75);
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float aspect = uRes.x / uRes.y;
  float lane  = (uv.x + uv.y - 1.0) * aspect;
  float along = (uv.x - uv.y) * 0.5 + 0.5;
  vec3 col = vec3(0.0);
  const int N = 14;
  for(int i = 0; i < N; i++){
    float fi = float(i);
    float lanePos = (hash(fi * 1.7) - 0.5) * 3.2;
    float speed   = 0.03 + hash(fi * 3.1) * 0.05;
    float len     = 0.28 + hash(fi * 4.3) * 0.20;
    float phase   = hash(fi * 5.9);
    vec3  color   = pal(hash(fi * 7.1));
    float head = fract(uTime * speed + phase) * 2.0;
    float d   = abs(lane - lanePos);
    float rel = head - along;
    float frac = clamp(rel / len, 0.0, 1.0);
    float inTail = step(0.0, rel) * step(rel, len);
    float width = mix(0.010, 0.0006, frac);
    float tail  = exp(-(d * d) / (width * width)) * pow(1.0 - frac, 1.8) * inTail;
    float hd2  = d * d + rel * rel;
    float core = exp(-hd2 / 0.00060) * 1.6;
    float halo = exp(-hd2 / 0.0050) * 0.7;
    float fade = smoothstep(1.75, 1.4, head);
    col += (color * (tail * 0.9 + halo) + vec3(1.0) * core) * fade;
  }
  vec2 c = uv - 0.5;
  float vig = 1.0 - dot(c, c) * 0.8;
  col *= vig;
  gl_FragColor = vec4(col, 1.0);
}`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const t0 = performance.now();
    let raf = 0;
    const loop = () => {
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [open]);

  async function submit() {
    const score = scoreLead(a);
    const message =
      `[${score} LEAD] Startup Growth Blueprint\n` +
      `Website: ${a.website || "—"}\n` +
      `Experience: ${a.experience || "—"}\n` +
      `Goal: ${a.goal || "—"}\n` +
      `Revenue/yr: ${a.revenue || "—"}\n` +
      `Budget/mo: ${a.budget || "—"}\n` +
      `Execution: ${a.execution || "—"}`;
    setStatus("submitting"); setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${a.firstName} ${a.lastName}`.trim(),
          business: a.website.trim() || "Startup (via Blueprint)",
          email: a.email.trim(),
          phone: a.phone.trim(),
          website: a.website.trim(),
          service,
          message,
          source: `Growth Blueprint — ${service} — ${score}`,
          company_website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatus("error"); setErrorMsg(data?.error ?? "Something went wrong. Please try again."); return; }
      setStatus("success");
    } catch { setStatus("error"); setErrorMsg("Network error, please try again."); }
  }

  if (!open) return null;

  const heading =
    step === 1 ? (intro ?? "Launching or Scaling Your Startup?") :
    step === 2 ? "What is your marketing experience level?" :
    step === 3 ? "What do you want to achieve with more traffic?" :
    step === 4 ? "How much revenue do you generate per year?" :
    step === 5 ? "What is your marketing budget per month?" :
    step === 6 ? "How do you plan to implement your SEO plan?" :
    "Your Startup Growth Blueprint Is Ready";

  return (
    <div className="gbp-overlay" role="dialog" aria-modal="true" aria-label="Startup Growth Blueprint">
      <canvas ref={canvasRef} className="gbp-canvas" aria-hidden />
      <button className="gbp-close" onClick={() => setOpen(false)} aria-label="Close">×</button>

      <div className="gbp-container">
        {status === "success" ? (
          <>
            <div className="gbp-heading">Your blueprint is on its way 🎉</div>
            <div className="gbp-sub">Check your inbox — we’ll send your personalized 7-week action plan shortly.</div>
          </>
        ) : (
          <>
            <div className="gbp-progress">Step {step} of {STEPS}</div>
            <div className="gbp-heading">{heading}</div>

            {step === 1 && (
              <>
                <div className="gbp-sub">Answer a few quick questions and I’ll generate a practical 7-week action plan designed for Indian startups getting started.</div>
                <input className="gbp-input" placeholder="What is the URL of your website?"
                  value={a.website} onChange={(e) => set("website", e.target.value)} />
                <button className="gbp-next" onClick={next}>Next</button>
              </>
            )}

            {step === 2 && ["Beginner", "Intermediate", "Advanced"].map((o) => (
              <button key={o} className="gbp-opt" onClick={() => pick("experience", o)}>{o}</button>
            ))}

            {step === 3 && ["Generate more leads", "Increase number of sales", "Increase brand awareness"].map((o) => (
              <button key={o} className="gbp-opt" onClick={() => pick("goal", o)}>{o}</button>
            ))}

            {step === 4 && ["₹0 – ₹50 Lakhs", "₹50 Lakhs – ₹1 Crore", "₹1 Crore – ₹3 Crore", "₹3 Crore+"].map((o) => (
              <button key={o} className="gbp-opt" onClick={() => pick("revenue", o)}>{o}</button>
            ))}

            {step === 5 && ["Under ₹60,000", "₹60,000 – ₹1.5L", "₹1.5L – ₹5L", "₹5L – ₹20L", "₹20L+"].map((o) => (
              <button key={o} className="gbp-opt" onClick={() => pick("budget", o)}>{o}</button>
            ))}

            {step === 6 && ["I’ll execute it myself", "I’ll outsource parts of it", "I want Shubham’s team to help"].map((o) => (
              <button key={o} className="gbp-opt" onClick={() => pick("execution", o)}>{o}</button>
            ))}

            {step === 7 && (
              <>
                <div className="gbp-sub">Enter your details and I’ll send your personalized 7-week action plan.</div>
                {/* Honeypot: hidden from humans, bots fill it and get dropped server-side. */}
                <input className="gbp-hp" tabIndex={-1} autoComplete="off" aria-hidden
                  value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                <input className="gbp-input" placeholder="First Name" value={a.firstName} onChange={(e) => set("firstName", e.target.value)} />
                <input className="gbp-input" placeholder="Last Name" value={a.lastName} onChange={(e) => set("lastName", e.target.value)} />
                <input className="gbp-input" type="email" placeholder="Your Email" value={a.email} onChange={(e) => set("email", e.target.value)} />
                <input className="gbp-input" type="tel" placeholder="Phone (+91…)" value={a.phone} onChange={(e) => set("phone", e.target.value)} />
                <button className="gbp-next" onClick={submit} disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Get My Action Plan"}
                </button>
                {status === "error" && <p className="gbp-err">{errorMsg}</p>}
              </>
            )}

            <div className="gbp-quote">“Startups don’t fail because of lack of ideas. They fail because of lack of structured distribution.”</div>
          </>
        )}
      </div>

      <style>{`
        .gbp-overlay { position: fixed; inset: 0; background: #000; z-index: 9999; padding: 60px 20px; text-align: center; overflow-y: auto; font-family: var(--font-sans, 'Poppins', sans-serif); }
        .gbp-canvas { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; }
        .gbp-container { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
        .gbp-progress { font-size: 16px; color: #9aa0a6; margin-bottom: 30px; }
        .gbp-heading { font-size: 36px; font-weight: 600; margin-bottom: 20px; color: #fff; }
        .gbp-sub { font-size: 20px; color: #cbd0d6; line-height: 1.7; margin-bottom: 30px; }
        .gbp-input, .gbp-opt, .gbp-next { width: 100%; max-width: 520px; margin: 10px auto; padding: 20px; font-size: 18px; border: .5px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06); color: #fff; display: block; cursor: pointer; font: inherit; border-radius: 6px; backdrop-filter: blur(4px); }
        .gbp-input { cursor: text; }
        .gbp-input::placeholder { color: #9aa0a6; }
        .gbp-opt:hover { border-color: #ff4800; }
        .gbp-next { background: #ff4800; color: #fff; border: none; border-radius: 4px; }
        .gbp-next:hover { opacity: .9; }
        .gbp-next:disabled { opacity: .6; cursor: default; }
        .gbp-quote { margin: 60px auto 0; font-size: 13px; color: #aeb3b9; max-width: 500px; }
        .gbp-close { position: absolute; top: 20px; right: 30px; font-size: 22px; cursor: pointer; color: #fff; z-index: 2; background: none; border: none; }
        .gbp-err { color: #ff8a80; font-size: 14px; margin-top: 12px; }
        .gbp-hp { position: absolute; left: -9999px; width: 0; height: 0; overflow: hidden; }
        @media (max-width: 768px) { .gbp-heading { font-size: 22px; } }
      `}</style>
    </div>
  );
}
