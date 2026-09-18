import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/blog";

// Token-styled markdown renderer for blog posts. Server component, the mapped
// elements use no hooks, so no client JS is shipped.
function textOf(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

const components: Components = {
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-12 scroll-mt-28 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(textOf(children))} className="mt-8 scroll-mt-28 text-lg font-bold text-foreground md:text-xl">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">{children}</p>
  ),
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-5 space-y-2.5 pl-1 text-muted-foreground md:text-lg">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-muted-foreground md:text-lg">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 pl-0">
      <span className="mt-2.5 hidden size-1.5 shrink-0 rounded-full bg-brand md:block" aria-hidden />
      <span className="flex-1">{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-3 border-brand bg-secondary/40 py-1 pl-5 text-muted-foreground [border-left-width:3px]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border bg-secondary/50 px-3 py-2 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => <td className="border border-border px-3 py-2 text-muted-foreground">{children}</td>,
  // Inline code only; fenced blocks arrive with a `language-*` className and are
  // left unstyled here so the `pre` wrapper controls block styling.
  code: ({ className, children }) => {
    if (className?.includes("language-")) {
      return <code className={`${className} text-sm`}>{children}</code>;
    }
    return <code className="rounded bg-secondary px-1.5 py-0.5 text-sm text-foreground">{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-[#0d0d0d] p-4 text-sm text-neutral-100">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <figure className="mt-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" className="w-full rounded-2xl border border-border" />
      {alt && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{alt}</figcaption>}
    </figure>
  ),
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
