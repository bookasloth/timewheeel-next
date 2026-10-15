import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section heading shared by every Archflow block: h2, optional lede.
export function AfHead({
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
    <Reveal className={cn("af-head", light && "af-head--light", center && "af-head--center")}>
      <h2 className="af-h">{title}</h2>
      {body && <p className="af-lede">{body}</p>}
    </Reveal>
  );
}
