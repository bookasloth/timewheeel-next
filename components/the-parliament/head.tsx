import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section heading shared by every block: numbered kicker, h2, optional lede.
export function TpHead({
  number,
  label,
  title,
  body,
  light,
  center,
}: {
  number: string;
  label: string;
  title: string;
  body?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("tp-head", light && "tp-head--light", center && "tp-head--center")}>
      <p className="tp-kicker">
        <span className="tp-kicker-num">{number}</span>
        {label}
      </p>
      <h2 className="tp-h">{title}</h2>
      {body && <p className="tp-lede">{body}</p>}
    </Reveal>
  );
}
