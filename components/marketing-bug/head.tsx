import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section heading shared by every block: optional kicker label, h2, lede.
export function MbHead({
  label,
  title,
  body,
  light,
  center,
}: {
  label?: string;
  title: string;
  body?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("mb-head", light && "mb-head--light", center && "mb-head--center")}>
      {label && <p className="mb-kicker">{label}</p>}
      <h2 className="mb-h">{title}</h2>
      {body && <p className="mb-lede">{body}</p>}
    </Reveal>
  );
}
