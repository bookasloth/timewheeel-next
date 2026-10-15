import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section heading shared by every Leader block: eyebrow label + h2 + lede.
export function LfHead({
  title,
  body,
  light,
  center,
}: {
  number?: string;
  label?: string;
  title: string;
  body?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("lf-head", light && "lf-head--light", center && "lf-head--center")}>
      <h2 className="lf-h">{title}</h2>
      {body && <p className="lf-lede">{body}</p>}
    </Reveal>
  );
}
