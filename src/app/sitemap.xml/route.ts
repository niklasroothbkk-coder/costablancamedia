import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { blogPosts } from "@/lib/data/blog-posts";

const baseUrl = "https://www.costablancamedia.es";

function urlEntry(enPath: string, freq: string, prio: number): string {
  const enUrl = `${baseUrl}${enPath}`;
  const svUrl = `${baseUrl}/sv${enPath}`;
  const now = new Date().toISOString();
  const hreflang = `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n    <xhtml:link rel="alternate" hreflang="sv" href="${svUrl}" />`;

  return `  <url>
    <loc>${enUrl}</loc>
${hreflang}
    <lastmod>${now}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>
  <url>
    <loc>${svUrl}</loc>
${hreflang}
    <lastmod>${now}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`;
}

export async function GET() {
  const urls = [
    // Homepage
    urlEntry("/", "daily", 1.0),

    // Main pages
    urlEntry("/about", "weekly", 0.8),
    urlEntry("/news", "weekly", 0.8),
    urlEntry("/services", "weekly", 0.8),
    urlEntry("/projects", "weekly", 0.8),
    urlEntry("/contact", "weekly", 0.8),

    // Service pages
    ...services.map((s) => urlEntry(`/services/${s.slug}`, "monthly", 0.6)),

    // Project pages
    ...projects.map((p) => urlEntry(`/projects/${p.slug}`, "monthly", 0.6)),

    // Blog pages
    ...blogPosts.map((p) => urlEntry(`/news/${p.slug}`, "monthly", 0.6)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
