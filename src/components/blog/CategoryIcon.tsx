import {
  Baby,
  Droplets,
  Newspaper,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { BlogCategorySlug } from "@/lib/blog";

const icons: Record<BlogCategorySlug, LucideIcon> = {
  "maternal-child-health": Baby,
  "common-illnesses": Droplets,
  "preventive-care-screening": ShieldCheck,
  "nutrition-family-wellness": Sparkles,
  "hospital-news-community": Newspaper,
};

/** Posts have no photos yet, so each category gets its own icon + gradient header. */
export const categoryGradients: Record<BlogCategorySlug, string> = {
  "maternal-child-health": "from-brand-600 to-brand-800",
  "common-illnesses": "from-brand-700 to-brand-900",
  "preventive-care-screening": "from-brand-500 to-brand-700",
  "nutrition-family-wellness": "from-accent-500 to-accent-700",
  "hospital-news-community": "from-brand-800 to-brand-950",
};

export function CategoryIcon({
  category,
  className,
}: {
  category: BlogCategorySlug;
  className?: string;
}) {
  const Icon = icons[category];
  return <Icon className={className} aria-hidden="true" />;
}
