import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import ServiceCard from "@/components/shared/ServiceCard";
import FAQ from "@/components/about/FAQ";
import { services } from "@/lib/data/services";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Costa Blanca Media, a Swedish-operated web agency in Torrevieja, Spain. Over 30 years of experience in web development, design, and digital marketing.",
  alternates: { canonical: "https://www.costablancamedia.es/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative">
              <Image
                src="/images/hero-1.jpg"
                alt="Costa Blanca Media team working on web projects"
                width={400}
                height={300}
                className="rounded-2xl shadow-lg object-cover"
              />
              <Image
                src="/images/hero-2.jpg"
                alt="Website design project on laptop screen"
                width={280}
                height={200}
                className="rounded-2xl shadow-lg object-cover absolute -bottom-8 -right-4 lg:-right-8 border-4 border-white"
              />
              <div className="absolute bottom-4 left-4 bg-primary text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">30+</div>
                  <div className="text-xs opacity-90">Years of experience</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-primary font-semibold text-sm mb-3">// Get to Know</p>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-6 leading-tight">
                A Swedish operated web agency in Torrevieja
              </h1>
              <ul className="space-y-3 mb-6">
                {[
                  "Swedish & English Speaking staff that understand",
                  "Quality work with responsibility and follow-up",
                  "Affordable and secure for your businesses from day 1",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-text leading-relaxed">
                Welcome to Costa Blanca Media located in the beautiful coastal city of
                Torrevieja! With a strong focus on creativity, innovation, and quality,
                we are dedicated to providing outstanding digital solutions to your business.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <Container>
          <SectionHeader subtitle="// We Offer" title="We Provide Full Range Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeader subtitle="// FAQ" title="Frequently Asked Questions" />
          <div className="mt-12 max-w-3xl mx-auto">
            <FAQ />
          </div>
        </Container>
      </section>
    </>
  );
}
