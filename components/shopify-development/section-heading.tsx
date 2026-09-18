import { Reveal } from "@/components/reveal";

// Shared section heading used across the Shopify page sections.
export function SdSectionHeading({
  label,
  heading,
  accent,
  body,
}: {
  label: string;
  heading: string;
  accent: string;
  body?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">{label}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
        <span className="text-navy">{heading}</span> <span className="text-brand">{accent}</span>
      </h2>
      {body ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p> : null}
    </Reveal>
  );
}
