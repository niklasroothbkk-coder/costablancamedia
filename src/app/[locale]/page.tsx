import HeroSection from "@/components/home/HeroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import WelcomeSection from "@/components/home/WelcomeSection";
import BlogPreview from "@/components/home/BlogPreview";
import ContactFormSection from "@/components/home/ContactFormSection";
import ClientLogos from "@/components/home/ClientLogos";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroSection dict={dict} />
      <ServicesGrid dict={dict} locale={locale} />
      <WelcomeSection dict={dict} />
      <BlogPreview dict={dict} locale={locale} />
      <ContactFormSection dict={dict} />
      <ClientLogos />
    </>
  );
}
