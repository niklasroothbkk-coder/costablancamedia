export interface Service {
  number: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string[];
  benefits: string[];
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    number: "01",
    slug: "web-development",
    name: "Web Development",
    shortDescription: "Quality coding from start to finish",
    description: [
      "Our web development team builds robust, scalable websites using the latest technologies. We focus on clean code, fast load times, and seamless user experiences that drive results for your business.",
      "Whether you need a simple business website or a complex web application, we have the expertise to deliver a solution that meets your specific needs and exceeds your expectations.",
      "We work with modern frameworks and technologies to ensure your website is future-proof and easy to maintain.",
    ],
    benefits: [
      "Custom-built websites tailored to your needs",
      "Fast loading speeds and optimized performance",
      "Mobile-responsive design",
      "SEO-friendly code structure",
      "Ongoing support and maintenance",
    ],
    icon: "code",
    image: "/images/services/web-development.jpg",
  },
  {
    number: "02",
    slug: "web-design",
    name: "Web Design",
    shortDescription: "Stunning design for your website",
    description: [
      "Great design is the foundation of any successful website. Our designers create visually stunning, user-friendly interfaces that capture your brand identity and engage your visitors.",
      "We follow modern design principles and best practices to create websites that not only look beautiful but also convert visitors into customers.",
      "Every design we create is fully responsive, ensuring a perfect experience on all devices from desktop to mobile.",
    ],
    benefits: [
      "Custom designs that reflect your brand",
      "User-centered design approach",
      "Responsive layouts for all devices",
      "Modern and clean aesthetics",
      "Conversion-optimized layouts",
    ],
    icon: "palette",
    image: "/images/services/web-design.jpg",
  },
  {
    number: "03",
    slug: "web-marketing",
    name: "Web Marketing",
    shortDescription: "Get the results you're looking for",
    description: [
      "Digital marketing is essential for growing your online presence. Our marketing strategies are designed to increase your visibility, drive traffic, and generate leads for your business.",
      "We offer a comprehensive range of digital marketing services including social media marketing, email marketing, content marketing, and paid advertising.",
      "Our data-driven approach ensures that every marketing campaign delivers measurable results and a strong return on investment.",
    ],
    benefits: [
      "Targeted marketing campaigns",
      "Social media management",
      "Email marketing strategies",
      "Content marketing",
      "Analytics and reporting",
    ],
    icon: "megaphone",
    image: "/images/services/web-marketing.jpg",
  },
  {
    number: "04",
    slug: "web-application",
    name: "Web Application",
    shortDescription: "App development for all platforms",
    description: [
      "We develop powerful web applications that streamline your business processes and enhance user engagement. From simple tools to complex platforms, we build applications that work.",
      "Our development process follows agile methodologies, ensuring rapid delivery and continuous improvement based on user feedback.",
      "We use cutting-edge technologies to build scalable, secure, and performant web applications.",
    ],
    benefits: [
      "Custom web application development",
      "Cross-platform compatibility",
      "Scalable architecture",
      "Secure and reliable",
      "User-friendly interfaces",
    ],
    icon: "smartphone",
    image: "/images/services/web-application.jpg",
  },
  {
    number: "05",
    slug: "graphic-design",
    name: "Graphic Design",
    shortDescription: "A stunning and standout design",
    description: [
      "Strong visual identity sets your brand apart from the competition. Our graphic design services cover everything from logos and branding to marketing materials and social media graphics.",
      "We work closely with you to understand your brand values and create designs that communicate your message effectively.",
      "Our designers combine creativity with strategic thinking to produce designs that make a lasting impression.",
    ],
    benefits: [
      "Logo design and branding",
      "Marketing materials",
      "Social media graphics",
      "Print design",
      "Brand identity guidelines",
    ],
    icon: "pen-tool",
    image: "/images/services/graphic-design.jpg",
  },
  {
    number: "06",
    slug: "seo",
    name: "SEO",
    shortDescription: "Get visibility on search engines",
    description: [
      "Search Engine Optimization is crucial for getting your website found online. Our SEO services help improve your search engine rankings and drive organic traffic to your website.",
      "We conduct thorough keyword research, optimize your on-page content, and build quality backlinks to improve your website's authority and visibility.",
      "Our SEO strategies are white-hat and follow Google's best practices, ensuring long-term sustainable results.",
    ],
    benefits: [
      "Keyword research and optimization",
      "On-page SEO improvements",
      "Technical SEO audits",
      "Link building strategies",
      "Monthly reporting and analytics",
    ],
    icon: "search",
    image: "/images/services/seo.jpg",
  },
  {
    number: "07",
    slug: "hosting-service",
    name: "Hosting Service",
    shortDescription: "Secure hosting with daily backups",
    description: [
      "Reliable hosting is the backbone of your online presence. Our hosting services provide fast, secure, and dependable hosting with 99.9% uptime guarantee.",
      "We handle all the technical aspects of hosting so you can focus on running your business. Our servers are optimized for speed and security.",
      "Every hosting plan includes daily backups, SSL certificates, and 24/7 monitoring to keep your website safe and running smoothly.",
    ],
    benefits: [
      "99.9% uptime guarantee",
      "Daily automated backups",
      "Free SSL certificates",
      "24/7 server monitoring",
      "Fast SSD storage",
    ],
    icon: "server",
    image: "/images/services/hosting-service.jpg",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
