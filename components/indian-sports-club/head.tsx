import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section header: the h2 and optional lede.
export function IscHead({
  title,
  body,
  light,
  center,
}: {
  title: string;
  body?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("isc-head", light && "isc-head--light", center && "isc-head--center")}>
      <h2 className="isc-h">{title}</h2>
      {body && <p className="isc-lede">{body}</p>}
    </Reveal>
  );
}
