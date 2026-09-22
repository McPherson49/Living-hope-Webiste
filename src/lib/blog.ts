import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getService, type ServiceSlug } from "@/content/services";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export const blogCategories = [
  {
    slug: "maternal-child-health",
    name: "Maternal & Child Health",
    description:
      "Pregnancy, labour, newborn care and childhood health guidance for Ile-Ife families.",
  },
  {
    slug: "common-illnesses",
    name: "Common Illnesses",
    description:
      "Malaria, typhoid and the everyday illnesses that affect families in Ile-Ife and across Nigeria.",
  },
  {
    slug: "preventive-care-screening",
    name: "Preventive Care & Screening",
    description:
      "Check-ups, screening and managing conditions such as hypertension and diabetes.",
  },
  {
    slug: "nutrition-family-wellness",
    name: "Nutrition & Family Wellness",
    description:
      "Healthy eating, oral health and everyday habits that keep the whole family well.",
  },
  {
    slug: "hospital-news-community",
    name: "Hospital News & Community",
    description:
      "News from Living Hope Hospital and practical guidance for choosing care in Ile-Ife.",
  },
] as const;

export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];

export type Post = {
  slug: string;
  title: string;
  /** <title> tag, kept under ~60 chars. Falls back to "{title} | Living Hope Hospital". */
  metaTitle: string;
  /** Meta description. */
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  category: BlogCategorySlug;
  /** Primary search keyword this post targets. */
  keyword: string;
  author: string;
  /** Related service page, used for the "Related service" card and internal linking. */
  service?: ServiceSlug;
  readingMinutes: number;
  content: string;
};

export function getCategory(slug: string) {
  return blogCategories.find((c) => c.slug === slug);
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "date", "category"]) {
    if (!data[field]) {
      throw new Error(`content/blog/${file}: missing "${field}" in front matter`);
    }
  }
  if (!getCategory(data.category)) {
    throw new Error(
      `content/blog/${file}: unknown category "${data.category}". Use one of: ${blogCategories.map((c) => c.slug).join(", ")}`,
    );
  }
  if (data.service && !getService(data.service)) {
    throw new Error(`content/blog/${file}: unknown service "${data.service}"`);
  }

  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: data.title,
    metaTitle: data.metaTitle ?? `${data.title} | Living Hope Hospital`,
    description: data.description,
    date: String(data.date),
    category: data.category,
    keyword: data.keyword ?? "",
    author: data.author ?? "Living Hope Hospital Medical Team",
    service: data.service,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

let cache: Post[] | undefined;

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const posts = fs.existsSync(POSTS_DIR)
    ? fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
        .map(readPost)
        .sort((a, b) => b.date.localeCompare(a.date))
    : [];
  cache = posts;
  return posts;
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsForService(service: ServiceSlug, limit = 3) {
  return getAllPosts()
    .filter((p) => p.service === service)
    .slice(0, limit);
}

export function getRelatedPosts(post: Post, limit = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
