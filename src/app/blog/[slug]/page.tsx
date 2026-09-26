import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Info } from "lucide-react";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { Markdown } from "@/components/blog/Markdown";
import { PostCard } from "@/components/blog/PostCard";
// import { BookCard } from "@/components/ui/BookCard"; // restore with the "Book an appointment" panel
import { Container } from "@/components/ui/Container";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { ServiceIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getAllPosts, getCategory, getPost, getRelatedPosts } from "@/lib/blog";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const base = buildMetadata({
    title: post.metaTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...base,
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: site.name,
      locale: "en_NG",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const service = post.service ? getService(post.service) : undefined;
  const related = getRelatedPosts(post, 3);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />

      <PageHero
        eyebrow={category?.name}
        title={post.title}
        breadcrumbs={[
          { name: "Health Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      >
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-brand-500" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-500" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
          <span>By {post.author}</span>
        </p>
      </PageHero>

      <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <article className="min-w-0">
          <Markdown>{post.content}</Markdown>

          <aside className="mt-12 flex gap-3 rounded-2xl border border-line bg-mist p-5 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <p>
              This article is for general information and is not a substitute for professional
              medical advice, diagnosis or treatment. If you’re worried about your health or your
              child’s, please see a doctor. In an emergency, call our emergency line or go to the
              nearest emergency unit.
            </p>
          </aside>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {service && (
            <Link
              href={`/services/${service.slug}`}
              className="group block rounded-3xl border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                Related service
              </p>
              <span className="mt-3 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </span>
                <span className="font-semibold text-brand-900">{service.name}</span>
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          )}
          {/* "Book an appointment" panel hidden for now. To restore, uncomment this and the BookCard import.
          <BookCard
            department={service?.slug}
            message="Hello Living Hope Hospital, I read your article and would like to book an appointment."
          />
          */}
        </aside>
      </Container>

      {related.length > 0 && (
        <Section tone="mist">
          <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">More from our health blog</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <EmergencyBand />
    </>
  );
}
