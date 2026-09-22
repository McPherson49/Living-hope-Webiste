import Link from "next/link";
import { blogCategories, getAllPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Category chips. Only categories that have at least one post are shown. */
export function CategoryNav({ active }: { active?: string }) {
  const posts = getAllPosts();
  const categories = blogCategories.filter((c) => posts.some((p) => p.category === c.slug));

  const chip = (isActive: boolean) =>
    cn(
      "inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      isActive
        ? "border-brand-700 bg-brand-700 text-white"
        : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50",
    );

  return (
    <nav aria-label="Blog categories">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/blog" aria-current={!active ? "page" : undefined} className={chip(!active)}>
            All articles
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/blog/category/${c.slug}`}
              aria-current={active === c.slug ? "page" : undefined}
              className={chip(active === c.slug)}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
