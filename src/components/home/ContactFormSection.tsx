import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/shared/ContactForm";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ContactFormSection({ dict }: { dict: any }) {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <div>
            <p className="font-semibold text-[20px] mb-2">
              <span className="text-primary">//</span> <span className="text-text-dark">{dict.contactFormSection.subtitle}</span>
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark mb-8">
              {dict.contactFormSection.title}
            </h2>
            <ContactForm dict={dict} />
          </div>

          {/* Right: Image with gradient */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-primary/30 to-primary/50 rounded-2xl" />
            <Image
              src="/images/contact-person.jpg"
              alt="Happy professional working on laptop"
              width={600}
              height={500}
              className="rounded-2xl object-cover relative z-10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
