import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";
import { Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.costablancamedia.es/news/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "News & Media", href: "/news" },
            { name: post.title },
          ]}
        />

        <article className="max-w-4xl mx-auto mt-8">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-2xl object-cover w-full h-64 lg:h-96 mb-8"
          />

          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <Calendar size={16} />
            {post.date}
          </div>

          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-8">
            {post.title}
          </h1>

          {post.content.map((paragraph, i) => (
            <p key={i} className="text-text leading-relaxed mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-8 text-center">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
