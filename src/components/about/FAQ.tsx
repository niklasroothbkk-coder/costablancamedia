"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What system do you recommend for a website?",
    answer:
      "We recommend WordPress for most business websites. It is the most popular content management system in the world, powering over 40% of all websites. WordPress is flexible, easy to use, and has a massive ecosystem of themes and plugins. For more custom needs, we also work with modern frameworks like Next.js and React.",
  },
  {
    question: "What is SEO and why is it important?",
    answer:
      "SEO stands for Search Engine Optimization. It is the practice of optimizing your website to rank higher in search engine results like Google. Good SEO helps your website get found by potential customers who are searching for the products or services you offer. Without proper SEO, even the best website will struggle to attract organic traffic.",
  },
  {
    question: "Can you design a logo and menu?",
    answer:
      "Yes, absolutely! We offer comprehensive graphic design services including logo design, menu design, business cards, branding materials, and more. Our designers work closely with you to create designs that reflect your brand identity and resonate with your target audience.",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqData = items || faqs;

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="border border-border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-light-gray transition-colors cursor-pointer"
          >
            <span className="font-heading font-semibold text-text-dark">
              {faq.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="px-6 pb-4 text-text leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
