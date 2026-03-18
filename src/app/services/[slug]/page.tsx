import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ProjectCard from "@/components/shared/ProjectCard";
import { services, getServiceBySlug } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { Check, Phone } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: {
      canonical: `https://www.costablancamedia.es/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = projects.slice(0, 3);

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-light-gray rounded-lg p-6 sticky top-28">
              <h3 className="font-heading font-bold text-text-dark text-lg mb-4">
                Our Services
              </h3>
              <nav className="space-y-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className={`block px-4 py-2 rounded text-sm transition-colors ${
                      s.slug === slug
                        ? "bg-primary text-white"
                        : "text-text hover:text-primary hover:bg-white"
                    }`}
                  >
                    {s.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 bg-primary rounded-lg p-6 text-white text-center">
                <Phone size={32} className="mx-auto mb-3 opacity-80" />
                <h4 className="font-heading font-bold mb-2">Need help?</h4>
                <p className="text-sm opacity-90 mb-3">
                  Contact us for a free consultation
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary px-6 py-2 rounded font-semibold text-sm hover:bg-light-gray transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Image
              src={service.image}
              alt={`${service.name} service by Costa Blanca Media`}
              width={800}
              height={400}
              className="rounded-2xl object-cover w-full h-64 lg:h-80 mb-8"
            />

            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-6">
              {service.name}
            </h1>

            {service.description.map((paragraph, i) => (
              <p key={i} className="text-text leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            {/* Benefits */}
            <div className="bg-light-gray rounded-lg p-8 my-8">
              <h3 className="font-heading font-bold text-text-dark text-xl mb-4">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Projects */}
            <h3 className="font-heading font-bold text-text-dark text-xl mb-6 mt-12">
              Portfolio Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-primary/10 rounded-lg p-8 text-center">
              <p className="text-text-dark font-heading font-bold text-lg mb-2">
                Contact us for a free consultation
              </p>
              <p className="text-text mb-4">
                Monday to Friday, from 10:00 to 17:00
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                Get in Touch &gt;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
