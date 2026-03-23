import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts as blogPostsEn } from "@/lib/data/blog-posts";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data/get-data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n/config";
import Link from "next/link";
import { Calendar } from "lucide-react";
import SidebarSearch from "@/components/shared/SidebarSearch";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of blogPostsEn) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug, locale as Locale);
  if (!post) return {};
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath(`/news/${slug}`, locale as Locale);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Costa Blanca Media`,
      description: post.excerpt,
      images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}&subtitle=News %26 Media` }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/news/${slug}`,
        sv: `${baseUrl}/sv/news/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug, locale as Locale);
  if (!post) notFound();

  const dict = await getDictionary(locale as Locale);
  const blogPosts = getBlogPosts(locale as Locale);
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.costablancamedia.es${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Costa Blanca Media",
      url: "https://www.costablancamedia.es",
    },
    publisher: {
      "@type": "Organization",
      name: "Costa Blanca Media",
      logo: {
        "@type": "ImageObject",
        url: "https://www.costablancamedia.es/images/Costa Blanca Media Logotype.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.costablancamedia.es${localePath(`/news/${slug}`, locale as Locale)}`,
    },
  };

  return (
    <section className="py-8 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Container>
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: localePath("/", locale as Locale) },
            { name: dict.nav.newsMedia, href: localePath("/news", locale as Locale) },
            { name: post.title },
          ]}
        />

        <div className="mt-8 flex flex-col lg:flex-row gap-10">
          {/* Article - 2/3 width */}
          <article className="lg:w-2/3">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-2xl object-cover w-full h-64 lg:h-96 mb-8"
            />

            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <Calendar size={16} />
              {post.date}
            </div>

            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-4">
              {post.title}
            </h1>

            {(() => {
              const subtitles: Record<string, Record<string, string>> = {
                "why-choose-costa-blanca-media": { en: "Our Expertise and Experience", sv: "Vår expertis och erfarenhet" },
                "social-marketing-why-so-important": { en: "The Power of Social Media Marketing", sv: "Kraften i marknadsföring på sociala medier" },
                "the-importance-of-setting-up-proper-seo": { en: "Why SEO Matters for Your Online Presence", sv: "Varför SEO är viktigt för din närvaro på nätet" },
                "funnel-a-must-for-your-business": { en: "Understanding Sales Funnels", sv: "Förstå försäljningstrattar" },
                "the-effectiveness-of-email-marketing": { en: "Email Marketing Best Practices", sv: "Bästa praxis för e-postmarknadsföring" },
                "5-tips-to-help-you-with-planning-your-website": { en: "Website Planning Tips", sv: "Tips för planering av webbplats" },
                "the-importance-of-a-good-hosting": { en: "Why Web Hosting Matters", sv: "Varför webbhotell är viktigt" },
              };
              const sub = subtitles[slug];
              if (!sub) return null;
              const lang = locale === "sv" ? "sv" : "en";
              return <h2 className="text-lg text-text font-medium mb-4">{sub[lang]}</h2>;
            })()}

            <Link href={localePath("/news", locale as Locale)} className="inline-block text-sm text-primary hover:text-primary-dark transition-colors mb-8">
              {dict.common.backToAllArticles}
            </Link>

            {post.content.map((paragraph, i) => {
              if (paragraph.startsWith("HEADING:")) {
                return (
                  <h2 key={i} className="font-heading text-2xl font-bold text-text-dark mt-8 mb-4">
                    {paragraph.replace("HEADING:", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("IMAGERIGHT:")) {
                const src = paragraph.replace("IMAGERIGHT:", "");
                return (
                  <Image key={i} src={src} alt={`${post.title} illustration`} width={400} height={300} className="float-right ml-6 mb-4 rounded-lg object-cover w-1/2" />
                );
              }
              if (paragraph.startsWith("IMAGE:")) {
                const images = paragraph.replace("IMAGE:", "").split("|");
                return (
                  <div key={i} className={`grid gap-4 my-6 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {images.map((src, j) => (
                      <Image key={j} src={src} alt={`${post.title} - image ${j + 1}`} width={600} height={400} className="rounded-lg object-cover w-full" />
                    ))}
                  </div>
                );
              }
              if (paragraph.startsWith("BULLET:")) {
                const items = paragraph.replace("BULLET:", "").split("|");
                return (
                  <ul key={i} className="list-disc list-inside space-y-2 my-4 ml-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-text text-lg leading-relaxed">{item}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("QUOTE:")) {
                const [quote, author] = paragraph.replace("QUOTE:", "").split("|");
                return (
                  <blockquote key={i} className="border-l-4 border-primary pl-6 py-4 my-8 bg-light-gray rounded-r-lg">
                    <p className="text-text-dark italic text-lg leading-relaxed">&ldquo;{quote}&rdquo;</p>
                    {author && <p className="text-text mt-2 font-semibold">- {author}</p>}
                  </blockquote>
                );
              }
              // Parse markdown-style links [text](url)
              const parts = paragraph.split(/(\[.*?\]\(.*?\))/g);
              return (
                <p key={i} className="text-text leading-relaxed mb-4 text-lg">
                  {parts.map((part, j) => {
                    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (linkMatch) {
                      return (
                        <Link key={j} href={localePath(linkMatch[2], locale as Locale)} className="text-primary hover:underline">
                          {linkMatch[1]}
                        </Link>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            })}

            {/* Categories & Tags */}
            {(post.categories?.length || post.tags?.length) && (
              <div className="mt-12 pt-8 border-t border-border space-y-4">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-heading font-bold text-text-dark text-lg">{dict.common.postedIn}</span>
                    {post.categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`${localePath("/news", locale as Locale)}?category=${encodeURIComponent(cat)}`}
                        className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-heading font-bold text-text-dark text-lg">{dict.common.tags}</span>
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`${localePath("/news", locale as Locale)}?tag=${encodeURIComponent(tag)}`}
                        className="px-4 py-1.5 border-2 border-primary text-primary text-sm font-medium rounded hover:bg-primary hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </article>

          {/* Sidebar - 1/3 width */}
          <aside className="lg:w-1/3 space-y-8">
            <SidebarSearch
              locale={locale}
              dict={dict}
              posts={blogPosts.map((p) => ({
                slug: p.slug,
                title: p.title,
                date: p.date,
                image: p.image,
              }))}
            />
          </aside>
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-8 text-center">
              {dict.common.moreArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherPosts.map((p) => (
                <BlogCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
