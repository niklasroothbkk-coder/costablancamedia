import Container from "@/components/ui/Container";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function WelcomeSection({ dict }: { dict: any }) {
  return (
    <section className="py-16 lg:py-24 bg-[#1a1a2e] text-white relative overflow-hidden">
      {/* Subtle dark background image overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <Container>
        <div className="relative z-10">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8" style={{ color: '#ffffff' }}>
            {dict.welcome.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-gray-300 leading-relaxed text-[17px]">
              {dict.welcome.paragraph1}
            </p>
            <p className="text-gray-300 leading-relaxed text-[17px]">
              {dict.welcome.paragraph2}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
