import BlogCard from "@/components/shared/BlogCard";
import { blogPosts } from "@/lib/data/blog-posts";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-semibold text-[20px] mb-2">
            <span className="text-primary">//</span> <span className="text-text-dark">News &amp; Articles</span>
          </p>
          <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-[#1a1a2e]">
            Latest from the blog
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
