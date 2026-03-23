import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import ServiceCard from "@/components/shared/ServiceCard";
import FAQ from "@/components/about/FAQ";
import { services } from "@/lib/data/services";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Costa Blanca Media",
  description:
    "About Costa Blanca Media. We are a premier web solutions provider operated by Swedish professionals with over 30 years of experience. Located in Torrevieja.",
  openGraph: {
    title: "About Costa Blanca Media | Costa Blanca Media",
    description:
      "About Costa Blanca Media. We are a premier web solutions provider operated by Swedish professionals with over 30 years of experience. Located in Torrevieja.",
    images: [{ url: "/api/og?title=About Us&subtitle=Swedish Web Agency in Torrevieja" }],
  },
  alternates: { canonical: "https://www.costablancamedia.es/about" },
};

export default function AboutPage() {
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
              <p className="font-semibold text-[20px] mb-3"><span className="text-primary">//</span> <span className="text-text-dark">Who are we</span></p>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-6 leading-tight">
                About Costa Blanca Media
              </h1>
              <p className="text-text leading-relaxed mb-4">
                About Costa Blanca Media! We are a premier web solutions provider operated by Swedish professionals with over 30 years of experience. Located in the beautiful city of Torrevieja, Spain, we are passionate about innovation and committed to excellence. Our specialization lies in web development, web design, web marketing, SEO, and hosting services.
              </p>
              <p className="text-text leading-relaxed">
                At Costa Blanca Media, we believe in going beyond the creation of websites. We understand the power of effective online marketing strategies in driving traffic, increasing conversions, and enhancing online visibility. Our comprehensive web marketing services include search engine optimization (SEO), social media marketing, content marketing, and more. We strive to help you reach your target audience and achieve your business goals through our tailored strategies.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-8 lg:py-12 bg-light-gray">
        <Container>
          <SectionHeader subtitle="// We Offer" title="We Provide Full Range Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
