import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";

/** Latest three posts, pulled automatically from content/blog — keeps the homepage fresh. */
export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section tone="white">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Health blog"
          title="Practical advice for Ile-Ife families"
          description="Doctor-informed guidance on the health questions our patients ask us most."
        />
        <ButtonLink href="/blog" variant="outline" className="self-start md:self-auto">
          All articles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
      <Stagger as="div" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
        {posts.map((post) => (
          <StaggerItem key={post.slug} className="relative h-full">
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
