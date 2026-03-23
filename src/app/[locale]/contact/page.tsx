import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/shared/ContactForm";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const baseUrl = "https://www.costablancamedia.es";
  const path = localePath("/contact", locale as Locale);

  return {
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
    openGraph: {
      title: `${dict.contactPage.metaTitle} | Costa Blanca Media`,
      description: dict.contactPage.metaDescription,
      images: [{ url: "/api/og?title=Contact Us&subtitle=Get in Touch with Costa Blanca Media" }],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { en: `${baseUrl}/contact`, sv: `${baseUrl}/sv/contact` },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const contactInfo = [
    {
      icon: Phone,
      title: dict.contactPage.callForHelp,
      lines: [dict.contactPage.notSupported, dict.contactPage.forNowOnlyMail],
    },
    {
      icon: MapPin,
      title: dict.contactPage.officeAddress,
      lines: [dict.contactPage.addressLine1, dict.contactPage.addressLine2],
    },
    {
      icon: Mail,
      title: dict.contactPage.emailAddress,
      lines: ["support@costablancamedia.es", "info@costablancamedia.es"],
      hrefs: ["mailto:support@costablancamedia.es", "mailto:info@costablancamedia.es"],
    },
    {
      icon: MessageCircle,
      title: dict.contactPage.whatsapp,
      lines: [dict.contactPage.whatsappText],
      hrefs: ["https://wa.me/46729631278"],
      iconHref: "https://wa.me/46729631278",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-2">
              {dict.contactPage.title}
            </h1>
            <h2 className="text-text text-lg mb-8">
              {dict.contactPage.subtitle}
            </h2>
            <ContactForm dict={dict} />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-5"
              >
                {item.iconHref ? (
                  <a href={item.iconHref} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/80 transition-colors">
                    <item.icon size={28} className="text-white" />
                  </a>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <item.icon size={28} className="text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-heading font-bold text-text-dark text-xl mb-1">
                    {item.title}
                  </h3>
                  {item.lines.map((line, i) => (
                    item.hrefs ? (
                      <a
                        key={i}
                        href={item.hrefs[i]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-text hover:text-primary transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-text">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
