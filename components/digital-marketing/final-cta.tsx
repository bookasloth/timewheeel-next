import Link from "next/link";
import { ArrowRight, Asterisk } from "lucide-react";
import { Reveal } from "@/components/reveal";

// const marqueeItems = [
//   "Attention → Growth",
//   "Work with us",
//   "Book a meeting",
// ];

// function Marquee() {
//   const row = [...marqueeItems, ...marqueeItems];
//   return (
//     <div
//       aria-hidden
//       className="relative flex overflow-hidden border-y border-white/15 bg-white/[0.04] py-5"
//     >
//       <div className="dm-marquee flex shrink-0 items-center whitespace-nowrap">
//         {row.map((item, i) => (
//           <span key={i} className="flex items-center">
//             <span className="px-6 text-2xl font-black uppercase tracking-tight text-white">
//               {item}
//             </span>
//             <Asterisk className="size-5 shrink-0 text-brand" />
//           </span>
//         ))}
//       </div>
//       <div className="dm-marquee flex shrink-0 items-center whitespace-nowrap" aria-hidden>
//         {row.map((item, i) => (
//           <span key={i} className="flex items-center">
//             <span className="px-6 text-2xl font-black uppercase tracking-tight text-white">
//               {item}
//             </span>
//             <Asterisk className="size-5 shrink-0 text-brand" />
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

export function DmFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-navy text-center text-white">
        {/* abstract illustration */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-2 select-none text-center text-[clamp(4rem,12vw,10rem)] font-black uppercase leading-none tracking-tighter text-white/[0.03]"
        >
          Timewheel
        </div>

        <div className="relative px-8 pb-16 pt-20 md:pb-20 md:pt-24">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.06] tracking-tight md:text-6xl">
            Ready to Turn{" "}
            <span
              className="dm-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #fe5100, #ff4d93, #ffcc1c, #fe5100)",
              }}
            >
              Attention
            </span>{" "}
            Into Growth?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Let&apos;s build a digital marketing system around your business
            goals — strategy, channels, and reports all working in one direction.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
            >
              Book a Meeting
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#case-studies"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}
            >
              Explore Our Work
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* <Marquee /> */}
        </div>
      </Reveal>
    </section>
  );
}