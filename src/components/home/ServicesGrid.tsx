import Container from "@/components/ui/Container";
import ServiceCard from "@/components/shared/ServiceCard";
import { getServices } from "@/lib/data/get-data";
import type { Locale } from "@/lib/i18n/config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ServicesGrid({ dict, locale }: { dict: any; locale: string }) {
  const services = getServices(locale as Locale);
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3, 7);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* First row: title on left + 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-[20px] mb-2 tracking-wide">
              <span className="text-primary">//</span> <span className="text-text-dark">{dict.servicesGrid.subtitle}</span>
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark leading-tight">
              {dict.servicesGrid.title}
            </h2>
          </div>
          {firstRow.map((service) => (
            <ServiceCard key={service.slug} service={service} locale={locale} />
          ))}
        </div>
        {/* Second row: 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {secondRow.map((service) => (
            <ServiceCard key={service.slug} service={service} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
