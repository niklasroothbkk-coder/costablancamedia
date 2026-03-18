"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-6 py-3 text-text-dark hover:text-primary hover:bg-light-gray transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6 pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-dark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get in Touch &gt;
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
