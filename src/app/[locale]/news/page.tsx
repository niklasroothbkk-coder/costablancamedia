import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/shared/BlogCard";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getBlogPosts } from "@/lib/data/get-data";
import { localePath, type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath("/news", locale as Locale);

  return {
    title: dict.newsPage.metaTitle,
    description: dict.newsPage.metaDescription,
    openGraph: {
      title: `${dict.newsPage.metaTitle} | Costa Blanca Media`,
      description: dict.newsPage.metaDescription,
      images: [{ url: "/api/og?title=News %26 Media&subtitle=Latest from Costa Blanca Media" }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { en: `${baseUrl}/news`, sv: `${baseUrl}/sv/news` },
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const blogPosts = getBlogPosts(locale as Locale);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
            {dict.newsPage.title}
          </h1>
          <h2 className="text-text text-lg mt-3">
            {dict.newsPage.subtitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
