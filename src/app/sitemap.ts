import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { blogCategories, getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  const now = new Date();

  const core: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/about", 0.7, "yearly"],
    ["/doctors", 0.8, "monthly"],
    ["/services", 0.9, "monthly"],
    // Booking is hidden site-wide for now, so the page is kept out of the sitemap. Restore with the page's links.
    // ["/book-appointment", 0.9, "yearly"],
    ["/insurance-hmo", 0.6, "monthly"],
    ["/visiting-hours", 0.5, "yearly"],
    ["/faqs", 0.6, "monthly"],
    ["/contact", 0.8, "yearly"],
    ["/careers", 0.4, "monthly"],
    ["/blog", 0.7, "weekly"],
    ["/privacy-policy", 0.2, "yearly"],
  ];

  const posts = getAllPosts();

  return [
    ...core.map(([path, priority, changeFrequency]) => ({
      url: url(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...blogCategories
      .filter((c) => posts.some((p) => p.category === c.slug))
      .map((c) => ({
        url: url(`/blog/category/${c.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(`${p.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
