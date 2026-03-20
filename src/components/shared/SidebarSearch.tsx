"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  image: string;
}

export default function SidebarSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : posts;

  return (
    <>
      {/* Search */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 border border-border rounded-l px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <button className="bg-primary text-white px-4 py-2.5 rounded-r hover:bg-primary-dark transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* More News */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-heading text-xl font-bold text-text-dark mb-6">
          {query.trim() ? `Results for "${query}"` : "More News"}
        </h3>
        {filtered.length === 0 ? (
          <p className="text-text text-sm">No articles found.</p>
        ) : (
          <div className="space-y-5">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/news/${p.slug}`}
                className="flex items-center gap-4 group"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  width={60}
                  height={60}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-text-dark group-hover:text-primary transition-colors leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-text text-xs mt-1">{p.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
