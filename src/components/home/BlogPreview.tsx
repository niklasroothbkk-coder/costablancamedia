import BlogCard from "@/components/shared/BlogCard";
import { getBlogPosts } from "@/lib/data/get-data";
import type { Locale } from "@/lib/i18n/config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BlogPreview({ dict, locale }: { dict: any; locale: string }) {
  const blogPosts = getBlogPosts(locale as Locale);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-semibold text-[20px] mb-2">
            <span className="text-primary">//</span> <span className="text-text-dark">{dict.blogPreview.subtitle}</span>
          </p>
          <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-[#1a1a2e]">
            {dict.blogPreview.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
