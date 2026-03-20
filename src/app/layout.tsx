import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Costa Blanca Media - Web Design and Development in Torrevieja",
    template: "%s | Costa Blanca Media",
  },
  description:
    "Costa Blanca Media - Scandinavian Web Development & Design in Torrevieja, with Swedish Management. Pros on Web Development, Social Marketing, SEO, Safe Hosting.",
  metadataBase: new URL("https://www.costablancamedia.es"),
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.costablancamedia.es",
    siteName: "Costa Blanca Media",
    title: "Costa Blanca Media - Web Design and Development in Torrevieja",
    description:
      "Costa Blanca Media - Scandinavian Web Development & Design in Torrevieja, with Swedish Management. Pros on Web Development, Social Marketing, SEO, Safe Hosting.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Costa Blanca Media - Swedish Web Agency in Torrevieja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Costa Blanca Media - Web Design and Development in Torrevieja",
    description:
      "Costa Blanca Media - Scandinavian Web Development & Design in Torrevieja, with Swedish Management.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.costablancamedia.es",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Costa Blanca Media",
  url: "https://www.costablancamedia.es",
  logo: "https://www.costablancamedia.es/images/Costa Blanca Media Logotype.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@costablancamedia.es",
    contactType: "customer service",
    availableLanguage: ["English", "Swedish"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Torrevieja",
    addressRegion: "Alicante",
    addressCountry: "ES",
  },
  sameAs: ["https://www.facebook.com/costablancamedia.es"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${manrope.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
