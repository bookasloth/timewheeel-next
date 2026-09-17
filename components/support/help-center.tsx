"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import { Annotation } from "./annotation";

const faqs = [
  {
    q: "Is the page free to start?",
    a: "Yes — 100%. You can set up a Coffee & Toffee support page in a couple of minutes and start receiving support right away. No setup fee, no monthly cost.",
  },
  {
    q: "How do creators get paid?",
    a: "Payouts are delivered straight to your linked bank account. We add a small 3% fee on contributions, and payouts are instant or next-day depending on your region.",
  },
  {
    q: "What's the difference between a Coffee and a Toffee?",
    a: "A Coffee is your classic one-off ₹5 support. A Toffee is a ₹10 contribution — often used for a stronger thank-you, a shout-out, or to unlock a small perk. Both take seconds to send.",
  },
  {
    q: "Can I run memberships and a shop too?",
    a: "Absolutely. The same accounts page powers monthly memberships, one-time purchases, and your supporter wall — so creators can mix recurring support with a tiny shop.",
  },
  {
    q: "Do I own my supporter list?",
    a: "Yes. Supporter names, messages, and emails export to CSV anytime. Your audience is never held hostage inside a closed platform.",
  },
  {
    q: "What payment methods do supporters use?",
    a: "UPI, cards, and net-banking — supporters pay however is easiest for them, in their own currency, so contributing feels effortless.",
  },
];

export function HelpCenter() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="ct-help" className="scroll-mt-24 bg-[#FAF7F1] pb-24 pt-20 sm:pb-32 sm:pt-28">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-14 px-6 lg:grid-cols-[40fr_60fr] lg:gap-16">
        {/* ── left copy ── */}
        <div className="lg:pt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E87922]/35 bg-white/70 px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#C25D14]">
            <BookOpen size={15} strokeWidth={2.2} aria-hidden="true" />
            Help center
          </span>

          <h2 className="ct-serif mt-6 text-[40px] font-semibold leading-[1.06] text-[#302017] sm:text-[48px]">
            Find answers fast
          </h2>

          <p className="mt-5 max-w-[420px] text-[16.5px] leading-relaxed text-[#6F665F]">
            Browse our most common questions and get the help you need — in
            just a few clicks.
          </p>

          <div className="mt-8 flex items-start gap-5">
            <a
              href="#ct-faq"
              className="group inline-flex items-center gap-2 rounded-full border border-[#302017]/20 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-[#302017] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E87922]/60 hover:text-[#C25D14] hover:shadow-[0_10px_26px_rgba(232,121,34,0.14)] active:scale-[0.98]"
            >
              Visit Help Center
              <ArrowRight
                size={16}
                strokeWidth={2.3}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-6">
            <Annotation text="Quick answers here" flip />
          </div>
        </div>

        {/* ── FAQ card ── */}
        <div
          id="ct-faq"
          className="scroll-mt-24 rounded-[26px] border border-[#E8E0D6] bg-[#FFFDF9] p-3 shadow-[0_16px_40px_rgba(70,45,25,0.05)] sm:p-4"
        >
          <div className="grid gap-1">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  className="overflow-hidden rounded-[18px]"
                  initial={false}
                  animate={{
                    backgroundColor: isOpen ? "#FBF4E8" : "transparent",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex h-[64px] w-full items-center justify-between gap-4 px-5 text-left"
                  >
                    <span
                      className={`text-[16px] font-medium transition-colors duration-300 ${
                        isOpen ? "text-[#302017]" : "text-[#4A3A2B]"
                      }`}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#E87922] text-white"
                          : "bg-[#F5E5D2] text-[#C25D14]"
                      }`}
                    >
                      <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[15px] leading-relaxed text-[#6F665F]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;