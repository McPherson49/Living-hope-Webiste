import Link from "next/link";
import { getCategory, type Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { CategoryIcon, categoryGradients } from "./CategoryIcon";

export function PostCard({ post }: { post: Post }) {
  const category = getCategory(post.category);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div
        className={`relative grid h-36 place-items-center bg-linear-to-br ${categoryGradients[post.category]} text-white`}
        aria-hidden="true"
      >
        <CategoryIcon category={post.category} className="h-12 w-12 opacity-90" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {category.name}
          </p>
        )}
        <h3 className="mt-2 text-xl font-semibold leading-snug text-brand-900">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 hover:text-brand-700"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {post.description}
        </p>
        <p className="mt-5 text-xs text-muted">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
