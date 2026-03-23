"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import MobileMenu from "./MobileMenu";

import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site-config";
import { MessageSquare } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n/config";

const navItems: Record<string, { en: string; sv: string; href: string }[]> = {
  items: [
    { en: "Home", sv: "Hem", href: "/" },
    { en: "About Us", sv: "Om oss", href: "/about" },
    { en: "News & Media", sv: "Nyheter", href: "/news" },
    { en: "Services", sv: "Tjänster", href: "/services" },
    { en: "References", sv: "Referenser", href: "/projects" },
  ],
};

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const loc = (locale || "en") as Locale;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar locale={loc} />
      <div className="bg-white">
        <Container>
          <div className="flex items-center justify-between h-20">
            <Link href={localePath("/", loc)} className="flex-shrink-0">
              <Image
                src="/images/Costa Blanca Media Logotype.jpg"
                alt="Costa Blanca Media logo"
                width={275}
                height={75}
                className="object-contain mt-5"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.items.map((item) => {
                const href = localePath(item.href, loc);
                const isActive =
                  pathname === href ||
                  (item.href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={item.en}
                    href={href}
                    className={`text-[16px] font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-text-dark"
                    }`}
                  >
                    {loc === "sv" ? item.sv : item.en}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Link
                href={localePath("/contact", loc)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-md font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                <MessageSquare size={15} />
                {loc === "sv" ? "Kontakta oss >" : "Get in Touch >"}
              </Link>
            </div>

            <MobileMenu locale={loc} />
          </div>
        </Container>
      </div>
    </header>
  );
}
