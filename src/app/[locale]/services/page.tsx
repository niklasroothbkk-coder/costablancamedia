import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/shared/ServiceCard";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServices } from "@/lib/data/get-data";
import { localePath, type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath("/services", locale as Locale);

  return {
    title: dict.servicesPage.metaTitle,
    description: dict.servicesPage.metaDescription,
    openGraph: {
      title: `${dict.servicesPage.metaTitle} | Costa Blanca Media`,
      description: dict.servicesPage.metaDescription,
      images: [{ url: "/api/og?title=Services&subtitle=Web Development, Design, SEO and Hosting" }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { en: `${baseUrl}/services`, sv: `${baseUrl}/sv/services` },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const services = getServices(locale as Locale);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
            {dict.servicesPage.title}
          </h1>
          <h2 className="text-text text-lg mt-3">
            {dict.servicesPage.subtitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              variant="numbered"
              locale={locale}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
