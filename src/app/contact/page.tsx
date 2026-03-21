import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/shared/ContactForm";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Feel free to contact us through the contact form. We get back to you within 24 hours or even faster.",
  openGraph: {
    title: "Contact Us | Costa Blanca Media",
    description:
      "Feel free to contact us through the contact form. We get back to you within 24 hours or even faster.",
    images: [{ url: "/images/og-image.jpg" }],
  },
  alternates: { canonical: "https://www.costablancamedia.es/contact" },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call for help",
    lines: ["Not supported right now.", "For now only mail support"],
  },
  {
    icon: MapPin,
    title: "Office address",
    lines: ["Torrevieja Center", "Alicante, Spain"],
  },
  {
    icon: Mail,
    title: "Email address",
    lines: ["support@costablancamedia.es", "info@costablancamedia.es"],
    hrefs: ["mailto:support@costablancamedia.es", "mailto:info@costablancamedia.es"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["Feel free to contact us through WhatsApp by clicking here."],
    hrefs: ["https://wa.me/46729631278"],
    iconHref: "https://wa.me/46729631278",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark mb-2">
              Request a quote for work
            </h1>
            <p className="text-text mb-8">
              Feel free to contact us through the contact form.
            </p>
            <ContactForm />
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
