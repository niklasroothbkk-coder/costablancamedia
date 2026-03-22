import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Here are a few projects of all that Costa Blanca Media has developed. We have developed over 200 websites and are working on new ones every day.",
  openGraph: {
    title: "Our Projects | Costa Blanca Media",
    description:
      "Here are a few projects of all that Costa Blanca Media has developed. We have developed over 200 websites and are working on new ones every day.",
    images: [{ url: "/api/og?title=Our Projects&subtitle=Web Development Portfolio" }],
  },
  alternates: { canonical: "https://www.costablancamedia.es/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
            A Few Projects
          </h1>
          <h2 className="text-text text-lg mt-3">
            Web Development Portfolio — Over 200 Websites Delivered
          </h2>
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
