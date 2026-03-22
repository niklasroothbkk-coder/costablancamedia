export interface Project {
  slug: string;
  name: string;
  services: string[];
  image: string;
  heroImage?: string;
  url?: string;
  description: string;
  longDescription?: string[];
  client?: string;
  category?: string;
  timeframe?: string;
  quote?: string;
  quoteImage?: string;
  imageScale?: number;
  h1Title?: string;
  h2Subtitle?: string;
}

export const projects: Project[] = [
  {
    slug: "torrevieja-rentals",
    name: "Torrevieja Rentals",
    h1Title: "Project Torrevieja Rentals",
    h2Subtitle: "- Your home away from home.",
    services: ["Web Development"],
    image: "/images/projects/torrevieja-rentals.jpg",
    heroImage: "/images/projects/torrevieja-rentals-hero.png",
    url: "https://www.torreviejarentals.es",
    client: "Torrevieja Rentals",
    category: "Web Development (WordPress), Graphic Design, SEO & Marketing, Hosting",
    timeframe: "Around 1 month. Ongoing work with marketing etc.",
    description:
      "A comprehensive rental property website for Torrevieja, featuring property listings, search functionality, and a modern responsive design.",
    longDescription: [
      "Torrevieja Rentals goal: one site where people can easily find what they're looking for and get answers to their inquiries directly from the owner or the responsible party. They also aim to provide an easy and user-friendly website for those who wish to rent out their homes, whether for short or long-term stays. All transactions are conducted directly with the customer.",
      "Costa Blanca Media has created a user-friendly platform that suits both people who want to rent out their homes and those who are looking to rent. Each listing has a booking system and a calendar, making it easy to see if the dates are available or booked. Everything is managed by the owner.",
    ],
    quote:
      "Torrevieja Rentals is a fantastic free site for people looking for a user-friendly platform to rent out their homes in Torrevieja.",
  },
  {
    slug: "sihanoukville",
    name: "Sihanoukville.com",
    h1Title: "Project Sihanoukville.com",
    h2Subtitle: "- what a super idea!",
    services: ["Web Development"],
    image: "/images/projects/SHV.jpg",
    imageScale: 56,
    heroImage: "/images/projects/sihanhanoukville-hero.webp",
    url: "https://www.sihanoukville.com",
    client: "The Sihanoukville Group",
    category: "Web Development (WordPress), Graphic Design, SEO & Marketing, Hosting",
    timeframe: "Around 3 months. This prime domain and site are now for sale.",
    description:
      "A travel and information portal for Sihanoukville, Cambodia, providing visitors with comprehensive guides and local information.",
    longDescription: [
      "Sihanoukville, situated in Southeast Asia, is a remarkable destination adorned with picturesque mile-long beaches and enchanting surrounding islands. Over the years, this once quiet coastal town has experienced a remarkable transformation, evolving into a thriving metropolis adorned with countless new structures, business complexes, and improved infrastructure. Named after the esteemed former king Norodom Sihanouk, the city is home to a population of approximately 150,000 people, with around 80,000 residing in its urban center.",
      "Costa Blanca Media have been assigned the task of creating a new, modern website for Sihanoukville.com, which will encompass various features such as casinos, beaches, hotels, and more. Additionally, the website should provide a user-friendly platform for new venues to easily list their establishments with just a few clicks. The project commenced in 2022, involving thorough research of the area. Due to the significant influx of new venues in the past 3-4 years, it proved to be quite challenging to gain a comprehensive understanding of the current situation.",
    ],
    quoteImage: "/images/projects/sihanoukvillelogo.webp",
    quote:
      "Sihanoukville.com is the one and only \"city guide\" that you need to find what you're looking for in this Asian pearl beach city in Cambodia.",
  },
  {
    slug: "quoteme",
    name: "QuoteMe",
    h1Title: "Project QuoteMe",
    h2Subtitle: "- what a brilliant idea!",
    services: ["Web Development"],
    image: "/images/projects/quoteme.jpg",
    heroImage: "/images/projects/quoteme-hero.webp",
    url: "https://www.quoteme.es",
    client: "QuoteMe Ltd",
    category: "Web Development (Next.js, Supabase, and React Native), Graphic Design, SEO & Marketing",
    timeframe: "Around 6 months. (Rebuilt 2026). Ongoing work with marketing etc.",
    description:
      "A modern web application for generating and managing quotes, built with a focus on user experience and efficiency.",
    longDescription: [
      "By utilizing QuoteMe, service seekers can effortlessly discover English-speaking service providers who meet their requirements. Simultaneously, service providers can effortlessly connect with new customers without resorting to extensive advertising. This streamlined approach empowers service providers to better manage their schedules, ultimately enhancing their productivity.",
      "Costa Blanca Media received the assignment at the beginning of 2022 to build a fully functional website with an advanced backend for both Service Seekers and Service Providers, while still being easy to navigate. It should also be simple to post new jobs and contact those seeking assistance. This was one of the largest projects we have undertaken, and it is turning out really well. In 2024-2025, the work continues to build an app for the platform.",
    ],
    quote:
      "QuoteMe is a platform where Service Seekers can easily find help, and Service Providers can find more jobs without the need for traditional advertising.",
  },
  {
    slug: "phnom-penh-real-estate",
    name: "Phnom Penh Real Estate",
    h1Title: "Project Phnom Penh Real Estate",
    h2Subtitle: "- The No. 1 Choice in Phnom Penh.",
    services: ["SEO", "Web Development"],
    image: "/images/projects/PPRE-Logo.png",
    imageScale: 56,
    heroImage: "/images/projects/phnom-penh-real-estate-hero.webp",
    url: "https://www.phnompenhrealestate.net",
    client: "Phnom Penh Real Estate",
    category: "Web Development (Next.js, Supabase, and React Native), Graphic Design, SEO & Marketing",
    timeframe: "Around 2 months. Ongoing work with marketing and SEO.",
    description:
      "A real estate platform for Phnom Penh, Cambodia, featuring property listings with advanced search and SEO optimization.",
    longDescription: [
      "Phnom Penh Real Estate is a renowned platform for renting or selling housing properties and businesses across Cambodia's real estate market. It serves as an independent residential platform where sellers, buyers, and renters can connect and transact apartments, houses, and businesses with one another.",
      "At Phnom Penh Real Estate, they do not directly list any properties themselves. Instead, they collaborate with various agencies to list their properties and businesses. Through Phnom Penh Real Estate, you can ensure that these listings reach a wide audience, guaranteeing maximum visibility and visitors for the listed objects.",
      "Costa Blanca Media has built this real estate platform from scratch with a well-planned strategy to make it one of the largest websites in Phnom Penh, Cambodia. From the beginning, we have marketed and maintained this platform and have had the opportunity to witness its journey to becoming the dominant real estate site in Cambodia.",
    ],
    quote:
      "Searching for property for sale or rent in the Phnom Penh area has never been easier with Phnom Penh Real Estate, the leading agency in Phnom Penh.",
  },
  {
    slug: "lotta-spjut-business",
    name: "Lotta Spjut Business",
    h1Title: "Project Lotta Spjut",
    h2Subtitle: "- an entrepreneur like no other.",
    services: ["Web Development"],
    image: "/images/projects/lotta-spjut.jpg",
    heroImage: "/images/projects/lotta-spjut-hero.webp",
    url: "https://www.lottaspjutbusiness.com",
    client: "Lotta Spjut Business",
    category: "Web Development (WordPress), Graphic Design, SEO, Hosting",
    timeframe: "Around 2 weeks.",
    description:
      "A professional business website for Lotta Spjut, showcasing services and portfolio with a clean, modern design.",
    longDescription: [
      "Since 2007, Lotta has been an entrepreneur and CEO, and her journey has been filled with both successes and challenges, from which she has gained valuable insights. Her business has grown steadily through dedication and determination, allowing her to experience both the positive and negative aspects of the business world. Additionally, she has had the privilege of mentoring and educating numerous individuals worldwide, covering topics ranging from health to entrepreneurship. She has collaborated with leaders in the network/social marketing industry and has facilitated numerous connections, both directly and indirectly, on a global scale. She has a genuine passion for forging meaningful connections and derives great satisfaction from assisting others in achieving their professional and personal goals.",
      "In 2022, Costa Blanca Media was tasked with building a new website for Lotta and implementing SEO strategies to improve her search engine rankings. This project has been ongoing for several months in order to achieve the desired outcome.",
    ],
    quote:
      "Lotta Spjut mentors and educates leaders all over the world, assisting them in achieving their professional and personal goals.",
  },
  {
    slug: "nordic-table-tennis",
    name: "Nordic Table Tennis",
    h1Title: "Project Nordic Table Tennis",
    h2Subtitle: "- Training camps in Spain and Sweden.",
    services: ["Web Development"],
    image: "/images/projects/nordic-table-tennis.jpg",
    heroImage: "/images/projects/nordic-table-tennis-hero.webp",
    url: "https://www.nordictabletennis.com",
    client: "Nordic Table Tennis AB",
    category: "Web Development (WordPress), Graphic Design, SEO, Hosting",
    timeframe: "Around 2 weeks.",
    description:
      "An e-commerce and information website for Nordic Table Tennis, featuring product catalogs and club information.",
    longDescription: [
      "Nordic Table Tennis has firmly established itself as the leading company in Sweden for all-inclusive table tennis training camps in Spain. With a focus on excellence, expert coaching, world-class facilities, community building, and inclusivity, Nordic Table Tennis provides an unparalleled experience for table tennis enthusiasts. For those looking to elevate their game and immerse themselves in a comprehensive training program, Nordic Table Tennis stands as the epitome of excellence in the world of table tennis training camps.",
      "One of the key features that elevate Nordic Table Tennis above the competition is its team of expert coaches. Renowned for their extensive knowledge and experience in table tennis, these coaches are dedicated to honing the skills of each participant. The personalized attention ensures that players receive tailored guidance, fostering both technical proficiency and strategic acumen.",
      "Costa Blanca Media helped build this website in collaboration with one of the owners of Nordic Table Tennis.",
    ],
    quote:
      "Nordic Table Tennis is the leading company in Sweden when it comes to all-inclusive training camps in Spain.",
  },
  {
    slug: "caramelos-cafe",
    name: "Caramelos Cafe",
    h1Title: "Project Caramelos Cafe",
    h2Subtitle: "- Swedish candies in Torrevieja.",
    services: ["Web Development"],
    image: "/images/projects/caramelos-cafe.jpg",
    heroImage: "/images/projects/caramelos-cafe-hero.webp",
    url: "https://www.carameloscafe.com",
    client: "Caramelos Café",
    category: "Web Development (WordPress), Graphic Design, SEO, Hosting",
    timeframe: "Around 2 Weeks. Ongoing work with marketing etc.",
    description:
      "A vibrant website for Caramelos Cafe, featuring menus, location information, and an inviting design that reflects the cafe's atmosphere.",
    longDescription: [
      "Caramelos Café in Torrevieja, located at C. Patricio Perez, 15, is a cozy family-run café known for its warm atmosphere and exceptional service. Specializing in Swedish candy, chips, and a variety of drinks like cappuccinos, smoothies, and cocktails, it's a haven for sweet lovers. The café offers tasty tapas, breakfast, and lunch options, with a 4.8/5 Google Maps rating for its quality and welcoming vibe. Open daily, it's perfect for a relaxing coffee break or a quick treat.",
    ],
    quoteImage: "/images/projects/caramelosliten.webp",
    quote:
      "Caramelos Café selling Swedish candy in Torrevieja. Also have chips, popcorn, cheese doodles, chocolate and many other great products from Sweden.",
  },
  {
    slug: "torrevieja-plus",
    name: "Torrevieja Plus",
    h1Title: "Project Torrevieja Plus",
    h2Subtitle: "- the only city guide you need!",
    services: ["Web Development"],
    image: "/images/projects/TV+.png",
    imageScale: 56,
    heroImage: "/images/projects/TorreviejaPlus.jpg",
    url: "https://www.torreviejaplus.es",
    client: "Torrevieja Plus",
    category: "Web Development (Next.js, Supabase, and React Native), Graphic Design, SEO, Social Media Marketing, Hosting",
    timeframe: "7-8 weeks, and ongoing work with SEO and Marketing.",
    description:
      "A comprehensive platform for Torrevieja, providing locals and visitors with information and services.",
    longDescription: [
      "TorreviejaPlus is a bilingual local guide and venue directory platform built for tourists and expats living in or visiting Torrevieja on Spain's Costa Blanca. The platform covers everything from restaurants, bars, and beach clubs to events, deals, and local news — all presented in both English and Swedish to serve the region's large international community.",
      "TorreviejaPlus brings together venue listings, recurring events, exclusive deals, and up-to-date local news in one place, making it easy for visitors and residents to discover what the city has to offer. Venue owners benefit from increased visibility through a tiered subscription model, while users enjoy a seamless experience across both web and mobile.",
      "Costa Blanca Media built TorreviejaPlus from the ground up using a modern tech stack including Next.js, Supabase, and React Native — ensuring fast performance, scalable infrastructure, and a consistent experience across web and app. The platform features automated Swedish translations via DeepL, interactive maps powered by Mapbox, and a fully custom admin panel for managing venues, events, deals, and editorial content.",
      "From architecture and development to SEO strategy and ongoing optimization, we have been involved at every stage of TorreviejaPlus — and continue to grow it into the go-to digital guide for life on the Costa Blanca.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
