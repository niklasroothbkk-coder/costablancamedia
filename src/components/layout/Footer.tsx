import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site-config";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Costa Blanca Media logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Swedish-operated web agency in Torrevieja, Spain. Providing
              quality web solutions since day one.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: References */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              References
            </h3>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-primary flex-shrink-0"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-gray-700">
        <Container className="py-6">
          <p className="text-center text-sm text-gray-500">
            Copyright 2023 by Costa Blanca Media
          </p>
        </Container>
      </div>
    </footer>
  );
}
