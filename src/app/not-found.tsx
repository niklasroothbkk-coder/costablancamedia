import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <h1 className="font-heading text-6xl lg:text-8xl font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-text text-lg mb-8">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded font-semibold text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Our Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded font-semibold text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
