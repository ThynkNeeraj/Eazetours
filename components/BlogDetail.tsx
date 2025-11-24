"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IBlogDataType,
  IBlogLinks,
  IBlogSection,
  IBlogSubheading,
  IBlogBulletPoint,
  IBlogFAQItem,
} from "../types/Common";

interface BlogDetailProps {
  blog: IBlogDataType;
}

// Helper: render content with dynamic links
const renderContent = (content: string, links: IBlogLinks = []) => {
  if (links.length === 0) return content;

  const parts = content.split(/({{LINK:[^:]+:[^}]+}})/g);
  return parts.map((part, index) => {
    const match = part.match(/{{LINK:([^:]+):([^}]+)}}/);
    if (match) {
      const [, linkKey, text] = match;
      const link = links.find((l) => l.key === linkKey);
      if (link) {
        return (
          <a
            key={index}
            href={link.url}
            className="text-[#025C7A] font-semibold underline"
          >
            {text}
          </a>
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

// Type guard for bullet points
const isBulletPoint = (point: string | IBlogBulletPoint): point is IBlogBulletPoint => {
  return typeof point === "object" && "content" in point;
};

export default function BlogDetail({ blog }: BlogDetailProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-[78px] sm:mt-[165px] mx-auto mb-12 max-w-[1200px] w-full px-4">
      {/* Page Heading */}
      <h1 className="text-[30px] sm:text-[45px] font-semibold mb-8">{blog.page_heading}</h1>

      {/* Hero Image */}
      {blog.image && (
        <div className="relative w-full h-[250px] sm:h-[600px] rounded-[40px] overflow-hidden shadow-[0px_0px_2px_1px_#00000040] mb-8">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Introduction */}
      {blog.structure.introduction && (
        <div className="prose prose-lg max-w-none mb-12" style={{ whiteSpace: "pre-line" }}>
          {blog.structure.introduction.heading && (
            <h2 className="text-2xl font-semibold mb-4">{blog.structure.introduction.heading}</h2>
          )}
          <p>{renderContent(blog.structure.introduction.content, blog.structure.introduction.links)}</p>
        </div>
      )}

      {/* Main Sections */}
      {blog.structure.main_sections.map((section: IBlogSection, index: number) => (
        <div key={index} className="mb-12">
          {section.heading_before && (
            <h2 className="text-2xl font-bold mb-2">{section.heading_before}</h2>
          )}
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>

          {/* Section Image */}
          {section.image && (
            <div className="relative w-full h-[400px] mb-6 rounded-3xl overflow-hidden">
              <Image src={section.image} alt={section.heading || "section-image"} fill className="object-cover" />
            </div>
          )}

          {/* Subheadings */}
          {section.subheadings && section.subheadings.length > 0 && (
            <div className="space-y-4">
              {section.subheadings.map((sub: IBlogSubheading, idx: number) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-1">{sub.title}</h3>
                  <p className="mb-2">{renderContent(sub.content, sub.links || section.links || [])}</p>

                  {/* Bullet points for Highlights */}
                  {"bullet_points" in sub && sub.bullet_points && (
                    <ul className="list-disc ml-6 mb-4">
                      {sub.bullet_points.map((bp, i) => (
                        <li key={i}>
                          {isBulletPoint(bp) ? renderContent(bp.content, section.links || []) : renderContent(bp, section.links || [])}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Section-level bullet points */}
          {section.bullet_points && (
            <ul className="list-disc ml-6 mt-2">
              {section.bullet_points.map((point, i) => (
                <li key={i}>
                  {isBulletPoint(point) ? (
                    <>
                      {point.title && <strong>{point.title}: </strong>}
                      {renderContent(point.content, section.links || [])}
                    </>
                  ) : (
                    renderContent(point, section.links || [])
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Section content */}
          {section.content && (
            <div className="prose prose-lg max-w-none mt-4">
              <p>{renderContent(section.content, section.links || [])}</p>
            </div>
          )}
        </div>
      ))}

      {/* Conclusion */}
      {blog.structure.conclusion && (
        <div className="mt-12">
          {blog.structure.conclusion.heading && (
            <h2 className="text-2xl font-semibold mb-4">{blog.structure.conclusion.heading}</h2>
          )}
          <div className="prose prose-lg max-w-none">
            <p>{renderContent(blog.structure.conclusion.content, blog.structure.conclusion.links || [])}</p>
          </div>
        </div>
      )}

      {/* FAQ */}
      {blog.faq && blog.faq.length > 0 && (
        <div className="mt-16 max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#000]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {blog.faq.map((faqItem: IBlogFAQItem, index: number) => (
              <div
                key={index}
                className={`border rounded-2xl shadow-lg transition-shadow duration-300 ${
                  openFaqIndex === index ? "shadow-[#025C7A]/40" : "shadow-gray-200 hover:shadow-[#025C7A]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex justify-between items-center px-6 py-5 rounded-2xl
                    bg-gradient-to-r from-[#6E9753] to-[#6E9753]
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6E9753]/60
                    transition-colors duration-300
                    ${openFaqIndex === index ? "text-[#fff] font-semibold" : "text-[#03475B] font-medium"}
                  `}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                >
                  <span className="text-lg">{faqItem.question}</span>
                  <svg
                    className={`w-7 h-7 transform transition-transform duration-300 ${
                      openFaqIndex === index ? "rotate-180 text-[#025C7A]" : "text-[#03475B]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden px-6 text-gray-700 ${
                    openFaqIndex === index ? "max-h-[1000px] py-6" : "max-h-0"
                  }`}
                >
                  <p className="leading-relaxed">{faqItem.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
