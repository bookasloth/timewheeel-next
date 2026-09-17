import { Annotation } from "./annotation";

function Bean({ className = "", rot = 0 }: { className?: string; rot?: number }) {
  return (
    <span
      className={`pointer-events-none absolute block h-[18px] w-[11px] rounded-full bg-[#4A2C16] ${className}`}
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-[3px] h-[12px] w-[2px] -translate-x-1/2 rounded-full bg-[#6B4524]" />
    </span>
  );
}

export function CoffeeScene() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] pb-2">
      <Annotation
        text="We're here!"
        className="absolute left-[2%] top-0 z-20"
      />

      <div className="relative mt-4 h-[380px] sm:h-[430px]">
        {/* ground shadow */}
        <div
          className="absolute bottom-[7%] left-1/2 h-10 w-[330px] -translate-x-1/2 rounded-full bg-[#302017]/[0.06] blur-[12px]"
          aria-hidden="true"
        />

        {/* laptop — back left */}
        <div className="absolute left-[5%] top-[10%] w-[168px] -rotate-6">
          <div className="h-[92px] w-full rounded-t-[10px] border-[7px] border-[#6E5140] bg-[#241C15]">
            <div className="mx-auto mt-2 h-[62px] w-[128px] rounded-[5px] bg-[#3528165c]" />
          </div>
          <div className="h-[9px] w-[184px] rounded-[4px] bg-[#8A6A4B]" />
        </div>

        {/* plant — back right */}
        <div className="absolute right-[3%] top-[8%] w-[92px] scale-[0.92]">
          <div className="flex items-end justify-center gap-[3px]">
            <span className="h-12 w-7 rotate-[-24deg] rounded-[60%_60%_10%_60%/70%_60%_20%_60%] bg-[#8FA97C]" />
            <span className="h-16 w-8 rotate-[8deg] rounded-[60%_60%_10%_60%/70%_60%_20%_60%] bg-[#7C9A68]" />
            <span className="h-11 w-6 rotate-[30deg] rounded-[60%_60%_10%_60%/70%_60%_20%_60%] bg-[#9BB487]" />
          </div>
          <div className="mx-auto -mt-1 h-[38px] w-[54px] rounded-b-[14px] rounded-t-[4px] bg-[#A8724E]">
            <div className="mx-auto mt-[6px] h-[3px] w-8 rounded-full bg-[#8F5F3E]" />
          </div>
        </div>

        {/* notebook — front right */}
        <div className="absolute bottom-[22%] right-[6%] w-[116px] rotate-[3deg]">
          <div className="rounded-[10px] bg-[#6A4A2F] p-1.5">
            <div className="rounded-[6px] bg-[#FFFDF8] px-2 pt-2">
              <div className="mb-1.5 h-1.5 w-2/3 rounded-full bg-[#E8D3B4]" />
              <div className="mb-1 h-1.5 w-full rounded-full bg-[#EFE3D2]" />
              <div className="mb-2.5 h-1.5 w-5/6 rounded-full bg-[#EFE3D2]" />
              <div className="h-4 w-8 rounded-[4px] bg-[#E87922]/[0.14] [writing-mode:vertical-rl] text-center text-[9px] leading-4 text-[#C25D14]">
                coffee
              </div>
            </div>
          </div>
        </div>

        {/* wooden tray + coffee cup — center stage */}
        <div className="absolute bottom-[16%] left-1/2 w-[312px] -translate-x-1/2">
          <div className="relative ml-auto mr-auto flex w-[210px] flex-col items-center">
            {/* saucer */}
            <div className="relative z-[1] h-[24px] w-[162px] rounded-full border border-[#E5D8C3] bg-[#FFFCF6] shadow-[0_6px_14px_rgba(70,45,25,0.08)]">
              <div className="absolute inset-x-4 top-[9px] h-[5px] rounded-full bg-[#F0E6D4]" />
            </div>
            {/* cup body */}
            <div className="relative z-[2] -mb-[16px] h-[86px] w-[118px] rounded-b-[46px] rounded-t-[20px] bg-[linear-gradient(180deg,#FFFEFB_0%,#F4E9D9_100%)] shadow-[0_10px_24px_rgba(70,45,25,0.1)]" />
            {/* handle */}
            <div
              className="absolute right-[-30px] top-[12px] z-[1] h-[48px] w-[30px] rounded-full border-[9px] border-[#E8D6BE] bg-transparent"
              aria-hidden="true"
            />
            {/* rim + coffee */}
            <div className="relative z-[3] -mt-[74px] w-[136px]">
              <div className="relative h-[30px] w-full rounded-full border border-[#E3D5BF] bg-[#FFFEFB] shadow-[0_4px_10px_rgba(70,45,25,0.05)]">
                <div className="absolute inset-x-[10px] top-[11px] h-[9px] rounded-full bg-[#4A2C16] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]">
                  {/* crema ring */}
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(196,139,66,0.55),transparent_60%)]" />
                  {/* latte art heart */}
                  <svg
                    viewBox="0 0 40 30"
                    className="ct-latte absolute bottom-[-6px] left-1/2 w-9 -translate-x-1/2"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 7 C20 1 12 1 9 6 C7.2 9.2 9 13 10.5 15 C13 19 18 23.5 20 25 C22 23.5 27 19 29.5 15 C31 13 32.8 9.2 31 6 C28 1 20 1 20 7 Z"
                      fill="#F3E7D1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* steam */}
        <svg
          viewBox="0 0 120 70"
          className="pointer-events-none absolute bottom-[44%] left-1/2 z-[4] w-[120px] -translate-x-1/2"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M46 66 C44 48 56 44 50 26"
            className="ct-steam"
            stroke="#DCC5A8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M66 66 C72 50 58 42 66 26"
            className="ct-steam ct-steam--d1"
            stroke="#D9C2A2"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30 64 C24 50 36 42 30 24"
            className="ct-steam ct-steam--d2"
            stroke="#E0CBB0"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>

        {/* scattered beans */}
        <Bean className="left-[24%] top-[46%]" rot={-12} />
        <Bean className="right-[22%] top-[38%]" rot={18} />
        <Bean className="left-[30%] bottom-[10%]" rot={-34} />
        <Bean className="right-[26%] bottom-[12%]" rot={8} />
      </div>
    </div>
  );
}