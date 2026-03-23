"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const switchTo = locale === "en" ? "sv" : "en";

  let basePath = pathname;
  if (pathname.startsWith("/sv")) {
    basePath = pathname.slice(3) || "/";
  }
  const newPath = switchTo === "en" ? basePath : `/sv${basePath}`;

  return (
    <Link
      href={newPath}
      className="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
    >
      {switchTo === "sv" ? (
        <>
          <span className="text-base leading-none">&#127480;&#127466;</span> SV
        </>
      ) : (
        <>
          <span className="text-base leading-none">&#127468;&#127463;</span> EN
        </>
      )}
    </Link>
  );
}
