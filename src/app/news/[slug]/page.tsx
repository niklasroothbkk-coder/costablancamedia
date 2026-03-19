import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";
import Link from "next/link";
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

          {post.content.map((paragraph, i) => {
            if (paragraph.startsWith("HEADING:")) {
              return (
                <h2 key={i} className="font-heading text-2xl font-bold text-text-dark mt-8 mb-4">
                  {paragraph.replace("HEADING:", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("IMAGERIGHT:")) {
              const src = paragraph.replace("IMAGERIGHT:", "");
              return (
                <Image key={i} src={src} alt="" width={400} height={300} className="float-right ml-6 mb-4 rounded-lg object-cover w-1/2" />
              );
            }
            if (paragraph.startsWith("IMAGE:")) {
              const images = paragraph.replace("IMAGE:", "").split("|");
              return (
                <div key={i} className={`grid gap-4 my-6 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {images.map((src, j) => (
                    <Image key={j} src={src} alt="" width={600} height={400} className="rounded-lg object-cover w-full" />
                  ))}
                </div>
              );
            }
            if (paragraph.startsWith("QUOTE:")) {
              const [quote, author] = paragraph.replace("QUOTE:", "").split("|");
              return (
                <blockquote key={i} className="border-l-4 border-primary pl-6 py-4 my-8 bg-light-gray rounded-r-lg">
                  <p className="text-text-dark italic text-lg leading-relaxed">&ldquo;{quote}&rdquo;</p>
                  {author && <p className="text-text mt-2 font-semibold">- {author}</p>}
                </blockquote>
              );
            }
            // Parse markdown-style links [text](url)
            const parts = paragraph.split(/(\[.*?\]\(.*?\))/g);
            return (
              <p key={i} className="text-text leading-relaxed mb-4 text-lg">
                {parts.map((part, j) => {
                  const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                  if (linkMatch) {
                    return (
                      <Link key={j} href={linkMatch[2]} className="text-primary hover:underline">
                        {linkMatch[1]}
                      </Link>
                    );
                  }
                  return part;
                })}
              </p>
            );
          })}
          {/* Categories & Tags */}
          {(post.categories?.length || post.tags?.length) && (
            <div className="mt-12 pt-8 border-t border-border space-y-4">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-heading font-bold text-text-dark text-lg">Posted in</span>
                  {post.categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/news?category=${encodeURIComponent(cat)}`}
                      className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-heading font-bold text-text-dark text-lg">Tags</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/news?tag=${encodeURIComponent(tag)}`}
                      className="px-4 py-1.5 border-2 border-primary text-primary text-sm font-medium rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
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
