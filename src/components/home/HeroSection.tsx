import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { CheckCircle } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HeroSection({ dict }: { dict: any }) {
  return (
    <section className="pt-12 pb-2 lg:pt-20 lg:pb-4 overflow-hidden">
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
              <div className="absolute bottom-4 left-3 bg-primary text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 z-20">
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
                  <div className="text-xs opacity-90">{dict.hero.yearsExperience}</div>
                </div>
              </div>
            </div>
            {/* Rotating decorative text */}
            <div className="absolute -bottom-20 -left-10 w-32 h-32 pointer-events-none hidden lg:block">
              <Image
                src="/images/circle-text.png"
                alt="Costa Blanca Media - Web Design and Development"
                width={128}
                height={128}
                className="animate-rotate-slow opacity-80 w-auto h-auto"
              />
            </div>
          </div>

          {/* Right column - Content */}
          <div className="pt-2">
            <p className="font-semibold text-[20px] mb-2 tracking-wide">
              <span className="text-primary">//</span> <span className="text-text-dark">{dict.hero.subtitle}</span>
            </p>
            <h1 className="font-heading text-3xl lg:text-[42px] font-bold text-text-dark mb-5 leading-tight">
              {dict.hero.title}
            </h1>
            <ul className="space-y-3 mb-5">
              {dict.hero.bullets.map((item: string) => (
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
              {dict.hero.description1}
              <br /><br />
              {dict.hero.description2}
            </p>
            <div className="flex items-center gap-4 p-4 bg-light-gray rounded-lg">
              <Image
                src="/images/Costa Blanca Media Logotype.jpg"
                alt="Costa Blanca Media logo"
                width={210}
                height={58}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
