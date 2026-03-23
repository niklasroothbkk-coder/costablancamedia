import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const isSwedish = locale === "sv";
  const baseUrl = "https://www.costablancamedia.es";

  return {
    title: {
      default: isSwedish
        ? "Costa Blanca Media - Webbdesign & Utveckling i Torrevieja"
        : "Costa Blanca Media - Web Design & Development in Torrevieja",
      template: "%s | Costa Blanca Media",
    },
    description: isSwedish
      ? "Costa Blanca Media - Skandinavisk webbutveckling & design i Torrevieja, med svensk ledning. Proffs på webbutveckling, social marknadsföring, SEO, säker hosting."
      : "Costa Blanca Media - Scandinavian Web Development & Design in Torrevieja, with Swedish Management. Pros on Web Development, Social Marketing, SEO, Safe Hosting.",
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
    },
    openGraph: {
      type: "website",
      locale: isSwedish ? "sv_SE" : "en_US",
      url: isSwedish ? `${baseUrl}/sv` : baseUrl,
      siteName: "Costa Blanca Media",
      title: isSwedish
        ? "Costa Blanca Media - Webbdesign & Utveckling i Torrevieja"
        : "Costa Blanca Media - Web Design & Development in Torrevieja",
      description: isSwedish
        ? "Costa Blanca Media - Skandinavisk webbutveckling & design i Torrevieja, med svensk ledning."
        : "Costa Blanca Media - Scandinavian Web Development & Design in Torrevieja, with Swedish Management.",
      images: [
        {
          url: "/api/og?title=Costa Blanca Media&subtitle=Web Design & Development in Torrevieja",
          width: 1200,
          height: 630,
          alt: "Costa Blanca Media - Swedish Web Agency in Torrevieja",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isSwedish
        ? "Costa Blanca Media - Webbdesign & Utveckling i Torrevieja"
        : "Costa Blanca Media - Web Design & Development in Torrevieja",
      description: isSwedish
        ? "Costa Blanca Media - Skandinavisk webbutveckling & design i Torrevieja, med svensk ledning."
        : "Costa Blanca Media - Scandinavian Web Development & Design in Torrevieja, with Swedish Management.",
      images: ["/api/og?title=Costa Blanca Media&subtitle=Web Design & Development in Torrevieja"],
    },
    alternates: {
      canonical: isSwedish ? `${baseUrl}/sv` : baseUrl,
      languages: {
        en: baseUrl,
        sv: `${baseUrl}/sv`,
      },
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.costablancamedia.es/#business",
  name: "Costa Blanca Media",
  url: "https://www.costablancamedia.es",
  logo: "https://www.costablancamedia.es/images/Costa Blanca Media Logotype.jpg",
  image: "https://www.costablancamedia.es/images/og-image.jpg",
  telephone: "+34-600-000-000",
  email: "info@costablancamedia.es",
  description:
    "Swedish-operated web agency in Torrevieja, Spain. Web development, design, SEO, and hosting services.",
  openingHours: "Mo-Fr 10:00-17:00",
  priceRange: "$$",
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.9786,
    longitude: -0.6823,
  },
  sameAs: ["https://www.facebook.com/costablancamedia.es"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.costablancamedia.es",
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${dmSans.variable} ${manrope.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
