import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { blogPosts } from "@/lib/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.costablancamedia.es";

  function makeEntry(enPath: string, freq: "daily" | "weekly" | "monthly", prio: number) {
    const enUrl = `${baseUrl}${enPath}`;
    const svUrl = `${baseUrl}/sv${enPath}`;
    const alt = { languages: { en: enUrl, sv: svUrl } };
    return [
      { url: enUrl, lastModified: new Date(), changeFrequency: freq, priority: prio, alternates: alt },
      { url: svUrl, lastModified: new Date(), changeFrequency: freq, priority: prio, alternates: alt },
    ];
  }

  return [
    // Homepage - priority 1.0, daily
    ...makeEntry("/", "daily", 1.0),

    // Main pages - priority 0.8, weekly
    ...makeEntry("/about", "weekly", 0.8),
    ...makeEntry("/news", "weekly", 0.8),
    ...makeEntry("/services", "weekly", 0.8),
    ...makeEntry("/projects", "weekly", 0.8),
    ...makeEntry("/contact", "weekly", 0.8),

    // Service pages - priority 0.6, monthly
    ...services.flatMap((s) => makeEntry(`/services/${s.slug}`, "monthly", 0.6)),

    // Project pages - priority 0.6, monthly
    ...projects.flatMap((p) => makeEntry(`/projects/${p.slug}`, "monthly", 0.6)),

    // Blog pages - priority 0.6, monthly
    ...blogPosts.flatMap((p) => makeEntry(`/news/${p.slug}`, "monthly", 0.6)),
  ];
}
