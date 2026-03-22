import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Here you can follow the latest from Costa Blanca Media. We update News & Media as often as we have something new to share.",
  openGraph: {
    title: "News & Media | Costa Blanca Media",
    description:
      "Here you can follow the latest from Costa Blanca Media. We update News & Media as often as we have something new to share.",
    images: [{ url: "/api/og?title=News %26 Media&subtitle=Latest from Costa Blanca Media" }],
  },
  alternates: { canonical: "https://www.costablancamedia.es/news" },
};

export default function NewsPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
            News &amp; Media
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
