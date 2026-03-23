import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { blogPosts } from "@/lib/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.costablancamedia.es";

  const staticPaths = ["", "/about", "/services", "/projects", "/news", "/contact"];

  const staticPages = staticPaths.flatMap((path) => {
    const alt = {
      languages: {
        en: `${baseUrl}${path || "/"}`,
        sv: `${baseUrl}/sv${path || "/"}`,
      },
    };
    const freq = (path === "" ? "monthly" : path === "/news" ? "weekly" : "monthly") as "monthly" | "weekly" | "yearly";
    const prio = path === "" ? 1 : path === "/contact" ? 0.7 : 0.8;

    return [
      { url: `${baseUrl}${path || "/"}`, lastModified: new Date(), changeFrequency: freq, priority: prio, alternates: alt },
      { url: `${baseUrl}/sv${path || "/"}`, lastModified: new Date(), changeFrequency: freq, priority: prio, alternates: alt },
    ];
  });

  const servicePages = services.flatMap((s) => {
    const alt = {
      languages: {
        en: `${baseUrl}/services/${s.slug}`,
        sv: `${baseUrl}/sv/services/${s.slug}`,
      },
    };
    return [
      { url: `${baseUrl}/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7, alternates: alt },
      { url: `${baseUrl}/sv/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7, alternates: alt },
    ];
  });

  const projectPages = projects.flatMap((p) => {
    const alt = {
      languages: {
        en: `${baseUrl}/projects/${p.slug}`,
        sv: `${baseUrl}/sv/projects/${p.slug}`,
      },
    };
    return [
      { url: `${baseUrl}/projects/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6, alternates: alt },
      { url: `${baseUrl}/sv/projects/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6, alternates: alt },
    ];
  });

  const blogPages = blogPosts.flatMap((p) => {
    const alt = {
      languages: {
        en: `${baseUrl}/news/${p.slug}`,
        sv: `${baseUrl}/sv/news/${p.slug}`,
      },
    };
    return [
      { url: `${baseUrl}/news/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6, alternates: alt },
      { url: `${baseUrl}/sv/news/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6, alternates: alt },
    ];
  });

  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
