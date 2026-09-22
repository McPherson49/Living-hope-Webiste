import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { PostCard } from "@/components/blog/PostCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { blogCategories, getCategory, getPostsByCategory } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogCategories
    .filter((c) => getPostsByCategory(c.slug).length > 0)
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name} | Living Hope Hospital Blog`,
    description: cat.description,
    path: `/blog/category/${cat.slug}`,
  });
}

export default async function BlogCategoryPage({
  params,
}: PageProps<"/blog/category/[category]">) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.slug);

  return (
    <>
      <PageHero
        eyebrow="Health blog"
        title={cat.name}
        description={cat.description}
        breadcrumbs={[
          { name: "Health Blog", path: "/blog" },
          { name: cat.name, path: `/blog/category/${cat.slug}` },
        ]}
      />

      <Section tone="mist">
        <CategoryNav active={cat.slug} />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="relative h-full">
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <EmergencyBand />
    </>
  );
}
