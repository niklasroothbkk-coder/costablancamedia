import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import { ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `https://www.costablancamedia.es/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.name },
          ]}
        />

        <div className="max-w-4xl mx-auto mt-8">
          <Image
            src={project.image}
            alt={`${project.name} project by Costa Blanca Media`}
            width={800}
            height={400}
            className="rounded-2xl object-cover w-full h-64 lg:h-96 mb-8"
          />

          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-4">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.services.map((service) => (
              <span
                key={service}
                className="text-sm bg-primary/10 text-primary px-4 py-1.5 rounded-full font-medium"
              >
                {service}
              </span>
            ))}
          </div>

          <p className="text-text leading-relaxed text-lg mb-8">
            {project.description}
          </p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
            >
              Visit Website <ExternalLink size={16} />
            </a>
          )}

          <div className="mt-12 bg-primary/10 rounded-lg p-8 text-center">
            <p className="text-text-dark font-heading font-bold text-lg mb-2">
              Interested in a similar project?
            </p>
            <p className="text-text mb-4">
              Contact us for a free consultation Monday to Friday, from 10:00 to 17:00
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
            >
              Get in Touch &gt;
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
