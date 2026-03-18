import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatted = new Date(post.date)
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <article className="group cursor-pointer">
      {/* 1. Featured Image — clip bottom so white bar covers it */}
      <Link href={`/news/${post.slug}`}>
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition duration-300"
          />
          {/* White bar sitting inside image at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-white mx-3 px-4 py-2.5 flex items-center gap-3 rounded-t-sm shadow-sm z-10">
            <span className="bg-[#1BA8C8] text-white text-[11px] font-semibold uppercase tracking-wide px-4 py-1.5 rounded-[4px]">
              {formatted}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#1BA8C8]"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              BY MANAGER
            </span>
          </div>
        </div>
      </Link>

      {/* 3. Title */}
      <h2 className="mt-4 px-4 font-heading font-bold text-[22px] leading-tight text-[#1a1a2e] group-hover:text-[#1BA8C8] transition-colors">
        <Link href={`/news/${post.slug}`}>{post.title}</Link>
      </h2>

      {/* 4. Read More */}
      <Link
        href={`/news/${post.slug}`}
        className="mt-3 px-4 inline-flex items-center gap-2 text-[15px] font-medium text-[#333] hover:text-[#1BA8C8] transition-colors"
      >
        Read More
        <span className="w-6 h-6 rounded-full bg-[#1BA8C8] flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
