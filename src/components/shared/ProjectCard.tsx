import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { localePath, type Locale } from "@/lib/i18n/config";

interface ProjectCardProps {
  project: Project;
  locale?: string;
}

export default function ProjectCard({ project, locale = "en" }: ProjectCardProps) {
  const loc = locale as Locale;

  return (
    <Link
      href={localePath(`/projects/${project.slug}`, loc)}
      className="group block bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 bg-light-gray overflow-hidden flex items-center justify-center">
        <Image
          src={project.image}
          alt={`${project.name} project`}
          width={300}
          height={200}
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          style={project.imageScale ? { maxWidth: `${project.imageScale}%`, height: 'auto' } : undefined}
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-text-dark text-[22px] mb-2">
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span
              key={service}
              className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
