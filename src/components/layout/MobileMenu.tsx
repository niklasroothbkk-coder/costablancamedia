"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { en: "Home", sv: "Hem", href: "/" },
  { en: "About Us", sv: "Om oss", href: "/about" },
  { en: "News & Media", sv: "Nyheter", href: "/news" },
  { en: "Services", sv: "Tjänster", href: "/services" },
  { en: "References", sv: "Referenser", href: "/projects" },
];

export default function MobileMenu({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const loc = locale as Locale;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="p-2 text-text-dark"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-border z-50">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.en}
                href={localePath(item.href, loc)}
                className="px-6 py-3 text-text-dark hover:text-primary hover:bg-light-gray transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {loc === "sv" ? item.sv : item.en}
              </Link>
            ))}
            <div className="px-6 py-3">
              <LanguageSwitcher locale={loc} />
            </div>
            <div className="px-6 pt-3">
              <Link
                href={localePath("/contact", loc)}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {loc === "sv" ? "Kontakta oss >" : "Get in Touch >"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
