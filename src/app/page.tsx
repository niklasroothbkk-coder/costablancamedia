import HeroSection from "@/components/home/HeroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import WelcomeSection from "@/components/home/WelcomeSection";
import BlogPreview from "@/components/home/BlogPreview";
import ContactFormSection from "@/components/home/ContactFormSection";
import ClientLogos from "@/components/home/ClientLogos";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <WelcomeSection />
      <BlogPreview />
      <ContactFormSection />
      <ClientLogos />
    </>
  );
}
