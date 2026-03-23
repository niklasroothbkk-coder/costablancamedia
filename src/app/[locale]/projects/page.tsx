import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/shared/ProjectCard";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProjects } from "@/lib/data/get-data";
import { localePath, type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath("/projects", locale as Locale);

  return {
    title: dict.projectsPage.metaTitle,
    description: dict.projectsPage.metaDescription,
    openGraph: {
      title: `${dict.projectsPage.metaTitle} | Costa Blanca Media`,
      description: dict.projectsPage.metaDescription,
      images: [{ url: "/api/og?title=Our Projects&subtitle=Web Development Portfolio" }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { en: `${baseUrl}/projects`, sv: `${baseUrl}/sv/projects` },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const projects = getProjects(locale as Locale);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
            {dict.projectsPage.title}
          </h1>
          <h2 className="text-text text-lg mt-3">
            {dict.projectsPage.subtitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
