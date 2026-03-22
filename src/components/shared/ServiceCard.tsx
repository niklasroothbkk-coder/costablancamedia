import Link from "next/link";
import Image from "next/image";
import {
  Code,
  Palette,
  Megaphone,
  Smartphone,
  PenTool,
  Search,
  Server,
} from "lucide-react";
import type { Service } from "@/lib/data/services";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  palette: Palette,
  megaphone: Megaphone,
  smartphone: Smartphone,
  "pen-tool": PenTool,
  search: Search,
  server: Server,
};

interface ServiceCardProps {
  service: Service;
  variant?: "home" | "numbered";
}

export default function ServiceCard({
  service,
  variant = "home",
}: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Code;

  if (variant === "numbered") {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group block bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <div className="relative h-48 bg-light-gray overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.name} service`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
            {service.number}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon size={20} className="text-primary" />
            </div>
            <h2 className="font-heading font-bold text-text-dark text-[22px]">
              {service.name}
            </h2>
          </div>
          <p className="text-text text-sm mb-4">{service.shortDescription}</p>
          <span className="text-primary text-sm font-semibold group-hover:underline">
            Read More &rarr;
          </span>
        </div>
      </Link>
    );
  }

  // Home variant - card with background image and overlapping icon
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Background image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.name} service`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      {/* Icon circle overlapping */}
      <div className="relative bg-white px-6 pb-5 pt-8 text-center border border-t-0 border-border rounded-b-lg">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md group-hover:bg-primary-dark transition-colors">
          <Icon size={24} className="text-white" />
        </div>
        <h2 className="font-heading font-bold text-text-dark text-base mt-1">
          {service.name}
        </h2>
      </div>
    </Link>
  );
}
