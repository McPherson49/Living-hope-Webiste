import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  // Internal links use next/link; external links open safely in a new tab.
  a({ href = "", children }) {
    if (href.startsWith("/") || href.startsWith("#")) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

/** Renders a post body from Markdown (GitHub-flavoured: tables, task lists, strikethrough). */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-lg article max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:font-semibold prose-a:underline-offset-2 prose-li:marker:text-brand-500">
      {/* skipHtml: drop raw HTML (react-markdown would otherwise print it as literal text). This is what
          lets a post keep a `<!-- … -->` note, e.g. the original wording of a hidden booking sentence. */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
        {children}
      </ReactMarkdown>
    </div>
  );
}
