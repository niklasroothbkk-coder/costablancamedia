import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import ServiceCard from "@/components/shared/ServiceCard";
import FAQ from "@/components/about/FAQ";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServices } from "@/lib/data/get-data";
import { localePath, type Locale } from "@/lib/i18n/config";
import { Check } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath("/about", locale as Locale);

  return {
    title: dict.aboutPage.metaTitle,
    description: dict.aboutPage.metaDescription,
    openGraph: {
      title: `${dict.aboutPage.metaTitle} | Costa Blanca Media`,
      description: dict.aboutPage.metaDescription,
      images: [{ url: "/api/og?title=About Us&subtitle=Swedish Web Agency in Torrevieja" }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { en: `${baseUrl}/about`, sv: `${baseUrl}/sv/about` },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const services = getServices(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="pt-16 lg:pt-24 pb-8 lg:pb-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div>
              <Image
                src="/images/About.jpg"
                alt="Costa Blanca Media team working on web projects"
                width={600}
                height={450}
                className="rounded-2xl shadow-lg object-cover w-[96%]"
              />
            </div>

            {/* Content */}
            <div>
              <p className="font-semibold text-[20px] mb-3"><span className="text-primary">//</span> <span className="text-text-dark">{dict.aboutPage.subtitle}</span></p>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-6 leading-tight">
                {dict.aboutPage.title}
              </h1>
              <p className="text-text leading-relaxed mb-4">
                {dict.aboutPage.paragraph1}
              </p>
              <p className="text-text leading-relaxed">
                {dict.aboutPage.paragraph2}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-8 lg:py-12 bg-light-gray">
        <Container>
          <SectionHeader subtitle={dict.aboutPage.servicesSubtitle} title={dict.aboutPage.servicesTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} locale={locale} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
