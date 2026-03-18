import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "View our portfolio of web development projects. Costa Blanca Media has built websites for businesses across Spain and internationally.",
  alternates: { canonical: "https://www.costablancamedia.es/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark">
            A Few Projects
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
