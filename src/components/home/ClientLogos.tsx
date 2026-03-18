import Image from "next/image";
import Container from "@/components/ui/Container";

const clients = [
  { name: "Torrevieja Rentals", logo: "/images/clients/torrevieja-rentals.png" },
  { name: "Caramelos Cafe", logo: "/images/clients/caramelos-cafe.png" },
  { name: "QuoteMe", logo: "/images/clients/quoteme.png" },
  { name: "Lotta Spjut", logo: "/images/clients/lotta-spjut.png" },
  { name: "Nordic Table Tennis", logo: "/images/clients/nordic-table-tennis.png" },
  { name: "Phnom Penh Real Estate", logo: "/images/clients/phnom-penh-real-estate.png" },
];

export default function ClientLogos() {
  return (
    <section className="py-12 bg-light-gray overflow-hidden">
      <Container>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-logos">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center w-40 h-20 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={140}
                  height={60}
                  className="object-contain h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
