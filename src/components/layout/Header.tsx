"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import MobileMenu from "./MobileMenu";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site-config";
import { MessageSquare } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />
      <div className="bg-white">
        <Container>
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
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
              {siteConfig.navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[16px] font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-text-dark"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-md font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                <MessageSquare size={15} />
                Get in Touch &gt;
              </Link>
            </div>

            <MobileMenu />
          </div>
        </Container>
      </div>
    </header>
  );
}
