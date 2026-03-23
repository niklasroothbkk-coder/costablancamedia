"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "/images/flags/en.svg" },
  { code: "sv", label: "Svenska", flag: "/images/flags/sv.svg" },
];

export default function LanguageSwitcher({ locale, variant = "default" }: { locale: string; variant?: "default" | "topbar" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const current = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getPath(targetLocale: string) {
    let basePath = pathname;
    if (pathname.startsWith("/sv")) {
      basePath = pathname.slice(3) || "/";
    }
    return targetLocale === "en" ? basePath : `/sv${basePath}`;
  }

  const isTopbar = variant === "topbar";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
          isTopbar
            ? "text-white hover:text-white/80"
            : "text-text-dark hover:text-primary"
        }`}
      >
        <Image
          src={current.flag}
          alt={current.label}
          width={20}
          height={20}
          className="rounded-full object-cover w-5 h-5"
        />
        <span>{current.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-border py-1 min-w-[150px] z-50">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={getPath(lang.code)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-light-gray ${
                lang.code === locale
                  ? "text-primary font-semibold"
                  : "text-text-dark"
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={20}
                height={20}
                className="rounded-full object-cover w-5 h-5"
              />
              {lang.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
