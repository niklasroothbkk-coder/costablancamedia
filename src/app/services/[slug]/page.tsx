import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ProjectCard from "@/components/shared/ProjectCard";
import { services, getServiceBySlug } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { Check } from "lucide-react";

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
    description: service.metaDescription,
    openGraph: {
      title: `${service.name} | Costa Blanca Media`,
      description: service.metaDescription,
      images: [{ url: `/api/og?title=${encodeURIComponent(service.name)}&subtitle=Costa Blanca Media` }],
    },
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Costa Blanca Media",
      url: "https://www.costablancamedia.es",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Torrevieja",
        addressRegion: "Alicante",
        addressCountry: "ES",
      },
    },
    areaServed: {
      "@type": "Place",
      name: "Costa Blanca, Spain",
    },
    url: `https://www.costablancamedia.es/services/${slug}`,
  };

  return (
    <section className="py-8 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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

            <Link href="/services" className="inline-block text-sm text-primary hover:text-primary-dark transition-colors mb-6">
              ← Back to all services
            </Link>

            {service.description.map((paragraph, i) =>
              i === 0 ? (
                <h2 key={i} className="leading-relaxed mb-4 text-text-dark font-semibold text-lg">
                  {paragraph}
                </h2>
              ) : (
                <p key={i} className="leading-relaxed mb-4 text-text">
                  {paragraph}
                </p>
              )
            )}

            {/* Hosting packages - only for hosting service */}
            {slug === "hosting-service" && (
              <div className="my-8">
                <h3 className="font-heading font-bold text-text-dark text-2xl mb-2">
                  Hosting packages
                </h3>
                <p className="text-text leading-relaxed mb-4">
                  We offer 2 standard packages and one custom package that can be customized according to your needs. Contact us to discuss the best option for you, and we will assist you in getting exactly what you need.
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="my-8">
              <h3 className="font-heading font-bold text-text-dark text-2xl mb-4">
                Benefits
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0 fill-primary stroke-white" />
                    <span className="text-text">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Projects */}
            <p className="text-text mt-8 mb-2">
              Some of our work you can see here.{" "}
              {relatedProjects.map((project, i) => (
                <span key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="text-text-dark font-semibold hover:text-primary transition-colors">
                    {project.name}
                  </Link>
                  {i < relatedProjects.length - 1 && (i === relatedProjects.length - 2 ? " and " : ", ")}
                </span>
              ))}
            </p>

            {/* CTA */}
            <div className="mt-8 border-l-4 border-primary pl-6 py-4">
              <p className="text-text-dark font-heading font-bold text-lg">
                Contact us for a free consultation Monday to Friday, from 10:00 to 17:00.
              </p>
            </div>

            {/* Other Services */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-heading font-bold text-text-dark text-xl mb-4">
                Our other services
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {services
                  .filter((s) => s.slug !== slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
