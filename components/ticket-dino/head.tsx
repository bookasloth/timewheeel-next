import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Section heading shared by every block: h2, optional lede.
export function TdHead({
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
    <Reveal className={cn("td-head", light && "td-head--light", center && "td-head--center")}>
      <h2 className="td-h">{title}</h2>
      {body && <p className="td-lede">{body}</p>}
    </Reveal>
  );
}
