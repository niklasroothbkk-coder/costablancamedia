"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n/config";

interface Post {
  slug: string;
  title: string;
  date: string;
  image: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SidebarSearch({ posts, locale = "en", dict }: { posts: Post[]; locale?: string; dict?: any }) {
  const [query, setQuery] = useState("");
  const loc = locale as Locale;

  const filtered = query.trim()
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : posts;

  const searchPlaceholder = dict?.common?.searchArticles || "Search articles...";
  const moreNewsLabel = dict?.common?.moreNews || "More News";
  const resultsForLabel = dict?.common?.resultsFor || "Results for";
  const noArticlesLabel = dict?.common?.noArticlesFound || "No articles found.";

  return (
    <>
      {/* Search */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
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
          {query.trim() ? `${resultsForLabel} "${query}"` : moreNewsLabel}
        </h3>
        {filtered.length === 0 ? (
          <p className="text-text text-sm">{noArticlesLabel}</p>
        ) : (
          <div className="space-y-5">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={localePath(`/news/${p.slug}`, loc)}
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
