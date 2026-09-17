type AnnotationProps = {
  text: string;
  className?: string;
  flip?: boolean;
};

export function Annotation({ text, className = "", flip = false }: AnnotationProps) {
  return (
    <span className={`ct-hand inline-flex flex-col items-start ${className}`}>
      <span className="text-[17px] leading-none text-[#6F665F]">{text}</span>
      <svg
        viewBox="0 0 64 30"
        className={flip ? "mt-1 h-5 w-14 -scale-x-100" : "mt-1 h-5 w-14"}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4 C20 22 40 26 58 16"
          stroke="#6F665F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.1 8"
          strokeDashoffset="0.1"
        />
        <path
          d="M50 11 L59 16 L52 22"
          stroke="#6F665F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}