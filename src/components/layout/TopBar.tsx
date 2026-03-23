import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopBar({ locale }: { locale: string }) {
  const hoursLabel = locale === "sv" ? "Tider:" : "Hours:";

  return (
    <div className="hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white text-sm py-2.5 px-6 rounded-b-lg flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={13} />
              {siteConfig.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={13} />
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                {siteConfig.email}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={13} />
              {hoursLabel} {siteConfig.hours}
            </span>
          </div>
          <LanguageSwitcher locale={locale} variant="topbar" />
        </div>
      </div>
    </div>
  );
}
