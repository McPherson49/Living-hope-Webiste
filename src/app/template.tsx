/**
 * Re-mounts on every navigation (see the Next.js `template.js` docs), so this
 * plays a short fade each time a page opens. Opacity only, and pure CSS: no
 * transform (which would break sticky sidebars mid-animation) and no JS (so
 * the first paint is never held back waiting for hydration).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
