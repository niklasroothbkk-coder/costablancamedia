import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { blogPosts } from "@/lib/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.costablancamedia.es";

  const staticPaths = ["", "/about", "/services", "/projects", "/news", "/contact"];

  const staticPages = staticPaths.flatMap((path) => [
    {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: (path === "" ? "monthly" : path === "/news" ? "weekly" : "monthly") as "monthly" | "weekly" | "yearly",
      priority: path === "" ? 1 : path === "/contact" ? 0.7 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}${path}`,
          sv: `${baseUrl}/sv${path}`,
        },
      },
    },
  ]);

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/services/${s.slug}`,
        sv: `${baseUrl}/sv/services/${s.slug}`,
      },
    },
  }));

  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${baseUrl}/projects/${p.slug}`,
        sv: `${baseUrl}/sv/projects/${p.slug}`,
      },
    },
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/news/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${baseUrl}/news/${p.slug}`,
        sv: `${baseUrl}/sv/news/${p.slug}`,
      },
    },
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
