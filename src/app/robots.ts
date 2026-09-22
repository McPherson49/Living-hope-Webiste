import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isIndexable } from "@/lib/contact";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    // Pre-launch: keep crawlers out until real contact details and the live URL are set.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
