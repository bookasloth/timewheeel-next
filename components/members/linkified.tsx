// Member-written text as plain text, with bare URLs turned into links. React
// escapes everything else, so nothing a member types can become HTML.
const URL_RE = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"])/g;

export function Linkified({ text, className }: { text: string; className?: string }) {
  const parts = text.split(URL_RE);
  return (
    <div className={className} style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={part} target="_blank" rel="nofollow ugc noopener noreferrer" className="text-brand-text underline underline-offset-2">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </div>
  );
}
