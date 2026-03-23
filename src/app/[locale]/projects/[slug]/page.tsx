import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { projects as projectsEn } from "@/lib/data/projects";
import { getProjectBySlug } from "@/lib/data/get-data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of projectsEn) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) return {};
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath(`/projects/${slug}`, locale as Locale);

  return {
    title: project.h1Title || project.name,
    description: project.description,
    openGraph: {
      title: `${project.h1Title || project.name} | Costa Blanca Media`,
      description: project.description,
      images: [{ url: `/api/og?title=${encodeURIComponent(project.h1Title || project.name)}&subtitle=Project Reference` }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/projects/${slug}`,
        sv: `${baseUrl}/sv/projects/${slug}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) notFound();

  const dict = await getDictionary(locale as Locale);
  const heroImg = project.heroImage || project.image;
  const descriptions = project.longDescription || [project.description];

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: localePath("/", locale as Locale) },
            { name: dict.nav.references, href: localePath("/projects", locale as Locale) },
            { name: project.name },
          ]}
        />

        {/* Hero Image */}
        <div className="mt-8">
          <Image
            src={heroImg}
            alt={`${project.name} project by Costa Blanca Media`}
            width={1200}
            height={500}
            className="rounded-2xl object-cover w-full h-64 lg:h-[450px]"
            priority
          />
        </div>

        {/* Content + Sidebar */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text-dark">
              {project.h1Title || project.name}
            </h1>
            {project.h2Subtitle && (
              <h2 className="text-lg text-text font-medium mt-1 mb-8">
                {project.h2Subtitle}
              </h2>
            )}
            {!project.h2Subtitle && <div className="mb-8" />}

            <Link href={localePath("/projects", locale as Locale)} className="inline-block text-sm text-primary hover:text-primary-dark transition-colors mb-6">
              {dict.common.backToAllProjects}
            </Link>

            <div className="space-y-6">
              {descriptions.map((paragraph, i) => (
                <p key={i} className="text-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Logo + Quote */}
            {project.quote && (
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-8">
                <Image
                  src={project.quoteImage || project.image}
                  alt={`${project.name} logo`}
                  width={180}
                  height={180}
                  className="w-44 h-auto object-contain flex-shrink-0"
                />
                <p className="text-text italic text-lg leading-relaxed">
                  {project.quote}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Project Information */}
          <aside>
            <div className="bg-white rounded-lg border border-border p-8 space-y-6">
              <h3 className="font-heading text-xl font-bold text-text-dark">
                {dict.projectPage.projectInformation}
              </h3>

              {project.client && (
                <div className="border-b border-border pb-4">
                  <h3 className="text-primary font-bold mb-1">{dict.projectPage.client}</h3>
                  <p className="text-text-dark">{project.client}</p>
                </div>
              )}

              {project.url && (
                <div className="border-b border-border pb-4">
                  <h3 className="text-primary font-bold mb-1">{dict.projectPage.website}</h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dark underline hover:text-primary transition-colors"
                  >
                    {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}

              {project.category && (
                <div className="border-b border-border pb-4">
                  <h3 className="text-primary font-bold mb-1">{dict.projectPage.workDone}</h3>
                  <p className="text-text-dark">{project.category}</p>
                </div>
              )}

              {project.timeframe && (
                <div>
                  <h3 className="text-primary font-bold mb-1">{dict.projectPage.timeframe}</h3>
                  <p className="text-text-dark">{project.timeframe}</p>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary/10 rounded-lg p-8 text-center">
          <p className="text-text-dark font-heading font-bold text-lg mb-2">
            {dict.projectPage.interestedInSimilar}
          </p>
          <p className="text-text mb-4">
            {dict.projectPage.ctaText}
          </p>
          <Link
            href={localePath("/contact", locale as Locale)}
            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            {dict.common.getInTouch}
          </Link>
        </div>
      </Container>
    </section>
  );
}
