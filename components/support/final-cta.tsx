import { ArrowRight, MessageCircle } from "lucide-react";
import { Annotation } from "./annotation";

function Sloth() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <Annotation
        text="Good vibes, real support"
        className="absolute -top-4 right-2 z-10 items-end sm:right-6"
      />

      <svg
        viewBox="0 0 300 210"
        className="w-full max-w-[300px] drop-shadow-[0_18px_30px_rgba(90,53,31,0.12)] sm:max-w-[330px]"
        role="img"
        aria-label="Illustration of a sloth working at a laptop with coffee and a small plant"
      >
        {/* soft warm halo */}
        <ellipse cx="150" cy="70" rx="120" ry="70" fill="#FDEFDD" opacity="0.55" />

        {/* desk */}
        <rect x="8" y="160" width="284" height="12" rx="6" fill="#A8724E" />
        <rect x="8" y="164" width="284" height="4" rx="2" fill="#8F5F3E" opacity="0.5" />

        {/* laptop */}
        <g>
          <rect x="152" y="98" width="118" height="66" rx="10" fill="#3B342E" />
          <rect x="160" y="106" width="102" height="52" rx="5" fill="#F3EAD9" />
          <rect x="168" y="116" width="46" height="5" rx="2.5" fill="#E87922" />
          <rect x="168" y="126" width="64" height="4" rx="2" fill="#D9CBB8" />
          <rect x="168" y="135" width="54" height="4" rx="2" fill="#D9CBB8" />
          <circle cx="216" cy="148" r="3" fill="#C25D14" />
          <rect x="186" y="164" width="118" height="7" rx="3.5" fill="#8A6A4B" />
        </g>

        {/* sloth */}
        <g>
          {/* body */}
          <rect x="36" y="96" width="104" height="66" rx="32" fill="#A08A78" />
          <rect x="50" y="112" width="76" height="46" rx="23" fill="#C0AE9B" />

          {/* arms reaching the keyboard */}
          <path
            d="M118 128 C132 140 142 148 154 155"
            stroke="#A08A78"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M120 128 C133 139 143 146 152 151"
            stroke="#C0AE9B"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M44 128 C40 140 42 150 50 158"
            stroke="#A08A78"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          {/* head */}
          <circle cx="80" cy="74" r="42" fill="#B59E89" />
          <circle cx="44" cy="46" r="14" fill="#B59E89" />
          <circle cx="44" cy="46" r="7" fill="#EAD9C4" />
          <circle cx="116" cy="46" r="14" fill="#B59E89" />
          <circle cx="116" cy="46" r="7" fill="#EAD9C4" />

          {/* face mask */}
          <ellipse cx="80" cy="77" rx="31" ry="27" fill="#F0E7D6" />

          {/* eye patches + happy closed eyes */}
          <path
            d="M60 73 a10 11 0 0 1 20 0"
            fill="#4A3B2E"
            stroke="none"
            transform="translate(0, -2)"
          />
          <path
            d="M80 73 a10 11 0 0 1 20 0"
            fill="#4A3B2E"
            stroke="none"
            transform="translate(0, -2)"
          />
          <path
            d="M65 73 q5 4 10 0"
            stroke="#F0E7D6"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M85 73 q5 4 10 0"
            stroke="#F0E7D6"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* nose + smile */}
          <ellipse cx="80" cy="83" rx="5" ry="3.6" fill="#3E2E20" />
          <path
            d="M73 92 q7 6 14 0"
            stroke="#4A3B2E"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* warm cheek spots */}
          <circle cx="55" cy="82" r="6" fill="#E87922" opacity="0.16" />
          <circle cx="105" cy="82" r="6" fill="#E87922" opacity="0.16" />
        </g>

        {/* mug of coffee on the left */}
        <g>
          <rect x="14" y="138" width="24" height="22" rx="5" fill="#F3E7D1" />
          <rect x="14" y="138" width="24" height="6" rx="3" fill="#E8D3B4" />
          <path
            d="M38 143 h6 a4 4 0 0 1 0 10 h-6"
            stroke="#E8D3B4"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M24 134 C22 126 28 122 26 114"
            className="ct-steam"
            stroke="#D9C2A2"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* plant + notebook on the right */}
        <g>
          <rect x="282" y="128" width="14" height="32" rx="5" fill="#A8724E" />
          <ellipse cx="289" cy="126" rx="16" ry="14" fill="#7C9A68" />
          <ellipse cx="278" cy="136" rx="10" ry="8" fill="#8FA97C" transform="rotate(-28 278 136)" />
          <ellipse cx="300" cy="136" rx="10" ry="8" fill="#8FA97C" transform="rotate(28 300 136)" />

          <rect x="238" y="144" width="34" height="24" rx="4" fill="#6A4A2F" transform="rotate(3 255 156)" />
          <rect x="241" y="147" width="28" height="14" rx="2" fill="#FFFDF8" transform="rotate(3 255 154)" />
        </g>
      </svg>
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="bg-[#FAF7F1] pb-24 pt-10 sm:pb-32 sm:pt-16">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="relative overflow-hidden rounded-[30px] bg-[#FCE7D0] px-8 py-12 sm:px-12 lg:px-14 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(420px 220px at 88% 20%, rgba(255,255,255,0.5), transparent 70%)",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
            {/* left copy */}
            <div className="text-center lg:text-left">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#C25D14]">
                Still need help?
              </p>
              <h2 className="ct-serif mt-4 text-[36px] font-semibold leading-[1.08] text-[#302017] sm:text-[44px]">
                We&apos;re just a message
                <span className="block text-[#C25D14]">away.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[420px] text-[16px] leading-relaxed text-[#6F665F] lg:mx-0">
                Our team is always here to help you, no matter what you need.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <a
                  href="mailto:support@timewheel.co.in"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#302017] px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5A351F] hover:shadow-[0_14px_30px_rgba(48,32,23,0.24)] active:scale-[0.98]"
                >
                  <MessageCircle
                    size={18}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  Contact Support
                  <ArrowRight
                    size={16}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* right illustration */}
            <div className="lg:pl-4">
              <Sloth />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}