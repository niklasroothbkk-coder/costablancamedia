import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-12 lg:py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column - Images */}
          <div className="relative pt-4">
            <div className="relative z-10">
              <div className="relative inline-block">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Web developer working at computer in Torrevieja office"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-lg object-cover w-[400px] h-auto"
                  priority
                />
                <Image
                  src="/images/hero-2.jpg"
                  alt="Laptop showing website design project"
                  width={200}
                  height={250}
                  className="rounded-2xl shadow-lg object-cover absolute top-16 -right-20 lg:-right-28 border-4 border-white w-[200px] h-auto"
                  priority
                />
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-4 left-0 bg-primary text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold leading-tight">30+</div>
                  <div className="text-xs opacity-90">Years of experience</div>
                </div>
              </div>
            </div>
            {/* Rotating decorative text */}
            <div className="absolute -bottom-20 -left-10 w-32 h-32 pointer-events-none hidden lg:block">
              <Image
                src="/images/circle-text.png"
                alt=""
                width={128}
                height={128}
                className="animate-rotate-slow opacity-80 w-auto h-auto"
              />
            </div>
          </div>

          {/* Right column - Content */}
          <div className="pt-2">
            <p className="text-primary font-semibold text-sm mb-2 tracking-wide">
              // Get to Know
            </p>
            <h1 className="font-heading text-3xl lg:text-[42px] font-bold text-text-dark mb-5 leading-tight">
              Swedish-operated web agency in Torrevieja
            </h1>
            <ul className="space-y-3 mb-5">
              {[
                "Swedish & English Speaking staff that understand",
                "Quality work with responsibility and follow-up",
                "Affordable and secure for your businesses from day 1",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0 fill-primary stroke-white"
                  />
                  <span className="text-text-dark font-medium text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-text mb-6 leading-relaxed text-[15px]">
              Welcome to Costa Blanca Media located in the beautiful coastal
              city of Torrevieja! With a strong focus on creativity, innovation,
              and quality, we are dedicated to providing outstanding digital
              solutions to your business.
            </p>
            <div className="flex items-center gap-4 p-4 bg-light-gray rounded-lg">
              <Image
                src="/images/logo.png"
                alt="Costa Blanca Media logo"
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <p className="font-heading font-bold text-text-dark text-sm">
                  Costa Blanca Media
                </p>
                <p className="text-text text-xs">Torrevieja</p>
              </div>
              <Link
                href="/contact"
                className="ml-auto inline-flex items-center px-5 py-2 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
