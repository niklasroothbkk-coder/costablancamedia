import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

export default function TopBar() {
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
              Hours: {siteConfig.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
