import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full range of web services including web development, web design, SEO, web marketing, graphic design, web applications, and hosting from Costa Blanca Media.",
  alternates: { canonical: "https://www.costablancamedia.es/services" },
};

export default function ServicesPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark">
            Services
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              variant="numbered"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
