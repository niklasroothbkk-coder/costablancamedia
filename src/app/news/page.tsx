import type { Metadata } from "next";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Read the latest news and articles about web development, SEO, digital marketing, and more from Costa Blanca Media.",
  alternates: { canonical: "https://www.costablancamedia.es/news" },
};

export default function NewsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="pt-16 pb-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
