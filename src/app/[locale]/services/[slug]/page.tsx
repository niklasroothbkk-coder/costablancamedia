import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { services as servicesEn } from "@/lib/data/services";
import { getServices, getServiceBySlug, getProjects } from "@/lib/data/get-data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n/config";
import { Check } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const s of servicesEn) {
      params.push({ locale, slug: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug, locale as Locale);
  if (!service) return {};
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath(`/services/${slug}`, locale as Locale);

  return {
    title: service.name,
    description: service.metaDescription,
    openGraph: {
      title: `${service.name} | Costa Blanca Media`,
      description: service.metaDescription,
      images: [{ url: `/api/og?title=${encodeURIComponent(service.name)}&subtitle=Costa Blanca Media` }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `${baseUrl}/services/${slug}`,
        sv: `${baseUrl}/sv/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug, locale as Locale);
  if (!service) notFound();

  const dict = await getDictionary(locale as Locale);
  const services = getServices(locale as Locale);
  const projects = getProjects(locale as Locale);
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
    url: `https://www.costablancamedia.es${localePath(`/services/${slug}`, locale as Locale)}`,
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
            { name: dict.nav.home, href: localePath("/", locale as Locale) },
            { name: dict.nav.services, href: localePath("/services", locale as Locale) },
            { name: service.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-light-gray rounded-lg p-6 sticky top-28">
              <h3 className="font-heading font-bold text-text-dark text-lg mb-4">
                {dict.servicePage.ourServices}
              </h3>
              <nav className="space-y-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={localePath(`/services/${s.slug}`, locale as Locale)}
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
                <h4 className="font-heading font-bold mb-2">{dict.servicePage.needHelp}</h4>
                <p className="text-sm opacity-90 mb-3">
                  {dict.servicePage.freeConsultation}
                </p>
                <Link
                  href={localePath("/contact", locale as Locale)}
                  className="inline-block bg-white text-primary px-6 py-2 rounded font-semibold text-sm hover:bg-light-gray transition-colors"
                >
                  {dict.common.contactUs}
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

            <Link href={localePath("/services", locale as Locale)} className="inline-block text-sm text-primary hover:text-primary-dark transition-colors mb-6">
              {dict.common.backToAllServices}
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
                  {dict.servicePage.hostingPackages}
                </h3>
                <p className="text-text leading-relaxed mb-4">
                  {dict.servicePage.hostingDescription}
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="my-8">
              <h3 className="font-heading font-bold text-text-dark text-2xl mb-4">
                {dict.servicePage.benefits}
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
              {dict.servicePage.someOfOurWork}{" "}
              {relatedProjects.map((project, i) => (
                <span key={project.slug}>
                  <Link href={localePath(`/projects/${project.slug}`, locale as Locale)} className="text-text-dark font-semibold hover:text-primary transition-colors">
                    {project.name}
                  </Link>
                  {i < relatedProjects.length - 1 && (i === relatedProjects.length - 2 ? " and " : ", ")}
                </span>
              ))}
            </p>

            {/* CTA */}
            <div className="mt-8 border-l-4 border-primary pl-6 py-4">
              <p className="text-text-dark font-heading font-bold text-lg">
                {dict.servicePage.ctaText}
              </p>
            </div>

            {/* Other Services */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-heading font-bold text-text-dark text-xl mb-4">
                {dict.servicePage.otherServices}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {services
                  .filter((s) => s.slug !== slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={localePath(`/services/${s.slug}`, locale as Locale)}
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
