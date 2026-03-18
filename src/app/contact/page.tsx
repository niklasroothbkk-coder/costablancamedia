import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/shared/ContactForm";
import { Phone, MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Costa Blanca Media for web development, design, and digital marketing services in Torrevieja, Spain.",
  alternates: { canonical: "https://www.costablancamedia.es/contact" },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    text: "Only mail support",
  },
  {
    icon: MapPin,
    title: "Address",
    text: "Torrevieja Center, Alicante, Spain",
  },
  {
    icon: Mail,
    title: "Email",
    text: "info@costablancamedia.es",
    href: "mailto:info@costablancamedia.es",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark">
            Request a quote for work
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="bg-light-gray rounded-lg p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-dark mb-1">
                    {item.title}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-text hover:text-primary transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-text">{item.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
