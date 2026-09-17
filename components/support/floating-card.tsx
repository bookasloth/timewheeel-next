"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Coffee, Minus, Plus } from "lucide-react";

type Phase =
  | "idle" // ₹5 · qty 1
  | "plus1" // [+] tap
  | "two" // ₹10 · qty 2
  | "plus2" // [+] tap
  | "three" // ₹15 · qty 3
  | "flash" // button highlight
  | "done"; // success state

/** Cycle timeouts in ms from the start of one loop (~7.6s). */
const TIMELINE: Array<[number, Phase]> = [
  [0, "idle"],
  [2250, "plus1"],
  [2500, "two"],
  [4400, "plus2"],
  [4650, "three"],
  [6650, "flash"],
  [7000, "done"],
];

const CYCLE_MS = 7700;

export function FloatingCard() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers = TIMELINE.map(([delay, p]) => setTimeout(() => setPhase(p), delay));
    const next = setTimeout(() => {
      setPhase("idle");
      setCycle((c) => c + 1);
    }, CYCLE_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(next);
    };
  }, [cycle]);

  const qty = phase === "two" || phase === "three" ? (phase === "three" ? 3 : 2) : 1;
  const total = qty * 5;
  const pressing = phase === "plus1" || phase === "plus2";

  return (
    <motion.div
      className="absolute right-0 top-[12%] z-30 w-[200px] cursor-pointer select-none"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <div className="border border-[#E9DCC6] bg-[#FFFDF8]/95 shadow-[0_14px_34px_rgba(70,45,25,0.12)] backdrop-blur-sm rounded-[20px] p-4">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 py-2 text-center"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCE7D0]">
                <Check size={17} strokeWidth={2.6} className="text-[#4A6B2E]" />
              </span>
              <p className="text-[13px] font-semibold text-[#302017]">
                Support received
              </p>
              <p className="flex items-center gap-1 text-[12px] text-[#6F665F]">
                Keep creating
                <Coffee size={13} strokeWidth={2.2} className="text-[#A9712F]" />
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`buy-${phase}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#302017]">
                  Buy a coffee
                </span>
                <span className="flex items-center gap-1 text-[13px] font-semibold text-[#C25D14]">
                  <Coffee size={13} strokeWidth={2.2} />
                  ₹{total}
                </span>
              </div>

              <div className="mb-3 flex w-full items-center justify-between rounded-full border border-[#EADDC8] bg-white px-2 py-[5px]">
                <motion.span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FCE7D0] text-[#C25D14]"
                  animate={
                    phase === "plus1"
                      ? { scale: [1, 0.82, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  <Minus size={13} strokeWidth={2.4} />
                </motion.span>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={qty}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="text-[14px] font-bold tabular-nums text-[#302017]"
                  >
                    {qty}
                  </motion.span>
                </AnimatePresence>

                <motion.span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FCE7D0] text-[#C25D14]"
                  animate={pressing ? { scale: [1, 0.78, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Plus size={13} strokeWidth={2.4} />
                </motion.span>
              </div>

              <motion.div
                className="flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-[#302017] text-[12.5px] font-semibold text-white"
                animate={
                  phase === "flash"
                    ? { backgroundColor: ["#302017", "#C25D14", "#302017"] }
                    : { backgroundColor: "#302017" }
                }
                transition={{ duration: 0.5 }}
              >
                Support ₹{total}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}