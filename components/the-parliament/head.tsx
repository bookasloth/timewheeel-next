import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section heading shared by every block: h2, optional lede.
export function TpHead({
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
    <Reveal className={cn("tp-head", light && "tp-head--light", center && "tp-head--center")}>
      <h2 className="tp-h">{title}</h2>
      {body && <p className="tp-lede">{body}</p>}
    </Reveal>
  );
}
