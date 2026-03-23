import Container from "@/components/ui/Container";

export default function WelcomeSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#1a1a2e] text-white relative overflow-hidden">
      {/* Subtle dark background image overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <Container>
        <div className="relative z-10">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8" style={{ color: '#ffffff' }}>
            Welcome to Costa Blanca Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-gray-300 leading-relaxed text-[17px]">
              Costa Blanca Media is a Swedish-owned media agency that operates
              throughout the Costa Blanca region but is based in Torrevieja. Our
              staff is fluent in both English and Swedish. We are highly proficient
              in web design, WordPress, coding, social marketing, SEO, and graphic
              design. Additionally, we provide excellent hosting services to our
              customers in Spain, which are highly secure, fast, competitively
              priced, and include daily backups.
            </p>
            <p className="text-gray-300 leading-relaxed text-[17px]">
              If you need a new website or want to update your old one, we offer
              excellent, modern, and fully customized solutions for various needs,
              ensuring you receive a dependable solution with future support if
              necessary. Additionally,
              we specialize in designing graphic materials, including logos,
              flyers, business cards, and more. Feel free to reach out to us, let
              us know what you&apos;re looking for, and we&apos;ll take it from there.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
