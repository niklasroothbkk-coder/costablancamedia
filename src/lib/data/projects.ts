export interface Project {
  slug: string;
  name: string;
  services: string[];
  image: string;
  url?: string;
  description: string;
}

export const projects: Project[] = [
  {
    slug: "torrevieja-rentals",
    name: "Torrevieja Rentals",
    services: ["Web Development"],
    image: "/images/projects/torrevieja-rentals.jpg",
    url: "https://www.torreviejarentals.com",
    description:
      "A comprehensive rental property website for Torrevieja, featuring property listings, search functionality, and a modern responsive design.",
  },
  {
    slug: "sihanoukville",
    name: "Sihanoukville.com",
    services: ["Web Development"],
    image: "/images/projects/sihanoukville.jpg",
    url: "https://www.sihanoukville.com",
    description:
      "A travel and information portal for Sihanoukville, Cambodia, providing visitors with comprehensive guides and local information.",
  },
  {
    slug: "quoteme",
    name: "QuoteMe",
    services: ["Web Development"],
    image: "/images/projects/quoteme.jpg",
    description:
      "A modern web application for generating and managing quotes, built with a focus on user experience and efficiency.",
  },
  {
    slug: "phnom-penh-real-estate",
    name: "Phnom Penh Real Estate",
    services: ["SEO", "Web Development"],
    image: "/images/projects/phnom-penh-real-estate.jpg",
    description:
      "A real estate platform for Phnom Penh, Cambodia, featuring property listings with advanced search and SEO optimization.",
  },
  {
    slug: "lotta-spjut-business",
    name: "Lotta Spjut Business",
    services: ["Web Development"],
    image: "/images/projects/lotta-spjut.jpg",
    description:
      "A professional business website for Lotta Spjut, showcasing services and portfolio with a clean, modern design.",
  },
  {
    slug: "nordic-table-tennis",
    name: "Nordic Table Tennis",
    services: ["Web Development"],
    image: "/images/projects/nordic-table-tennis.jpg",
    description:
      "An e-commerce and information website for Nordic Table Tennis, featuring product catalogs and club information.",
  },
  {
    slug: "caramelos-cafe",
    name: "Caramelos Cafe",
    services: ["Web Development"],
    image: "/images/projects/caramelos-cafe.jpg",
    description:
      "A vibrant website for Caramelos Cafe, featuring menus, location information, and an inviting design that reflects the cafe's atmosphere.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
