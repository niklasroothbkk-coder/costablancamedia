import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web Development with quality coding from start to finish. Stunning Web Design for your website. Web Marketing, Graphic Design, SEO and Hosting Service.",
  openGraph: {
    title: "Services | Costa Blanca Media",
    description:
      "Web Development with quality coding from start to finish. Stunning Web Design for your website. Web Marketing, Graphic Design, SEO and Hosting Service.",
    images: [{ url: "/api/og?title=Services&subtitle=Web Development, Design, SEO and Hosting" }],
  },
  alternates: { canonical: "https://www.costablancamedia.es/services" },
};

export default function ServicesPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
            Services
          </h1>
          <h2 className="text-text text-lg mt-3">
            Web Development, Design, SEO & Marketing on the Costa Blanca
          </h2>
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
