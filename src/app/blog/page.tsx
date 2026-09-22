import { CategoryNav } from "@/components/blog/CategoryNav";
import { PostCard } from "@/components/blog/PostCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Health Blog | Living Hope Hospital, Ile-Ife",
  description:
    "Practical health advice for Ile-Ife families — maternal and child health, malaria and typhoid, screening and more from Living Hope Hospital.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Health blog"
        title="Practical health advice for Ile-Ife families"
        description="Clear, doctor-informed guidance on the questions our patients ask us most — from pregnancy and childhood illness to malaria, typhoid and staying well."
        breadcrumbs={[{ name: "Health Blog", path: "/blog" }]}
      />

      <Section tone="mist">
        <CategoryNav />
        {posts.length > 0 ? (
          <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {posts.map((post) => (
              <StaggerItem key={post.slug} className="relative h-full">
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="mt-10 text-lg text-muted">New articles are coming soon.</p>
        )}
      </Section>

      <EmergencyBand />
    </>
  );
}
