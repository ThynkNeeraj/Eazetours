"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  IBlogDataType,
  IBlogLinks,
  IBlogSection,
  IBlogBulletPoint,
  IBlogSubheading,
} from "../types/Common";
import { getBlogTranslations } from "../lib/translationHelper";

interface BlogDetailProps {
  blogId?: string;
  locale: string;
}

/* =========================
   UPDATED: renderContent
   - supports string | string[]
   ========================= */
const renderContent = (
  content: string | string[] | undefined,
  links?: IBlogLinks
) => {
  if (!content) return null;

  // ✅ NEW: Handle array content (line breaks from JSON)
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((line, idx) => (
          <p key={idx} className="mb-2 last:mb-0">
            {renderContent(line, links)}
          </p>
        ))}
      </>
    );
  }

  // Existing logic (unchanged)
  if (!links || links.length === 0) {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  }

  const parts = content.split(/({{LINK:[^:]+:[^}]+}}|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/{{LINK:([^:]+):([^}]+)}}/);
    if (linkMatch) {
      const [, linkKey, text] = linkMatch;
      const link = links.find((l) => l.key === linkKey);

      if (link) {
        return (
          <a
            key={index}
            href={link.url}
            className="text-[#025C7A] font-semibold underline hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        );
      }
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <span key={index}>{part}</span>;
  });
};

/* =========================
   UPDATED: renderBulletPoints
   - single bullet = full width
   ========================= */
const renderBulletPoints = (
  bullet_points: (string | IBlogBulletPoint)[],
  links?: IBlogLinks
) => {
  const isSingle = bullet_points.length === 1;

  return (
    <ul
      className={`mt-6 grid gap-4 ${isSingle ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
        }`}
    >
      {bullet_points.map((point, pointIndex) => (
        <li key={pointIndex} className="flex items-start">
          <span className="inline-block w-2 h-2 bg-[#025C7A] rounded-full mt-[9px] mr-3 flex-shrink-0"></span>

          <div className="text-gray-700 text-lg flex-1">
            {typeof point === "object" && "content" in point ? (
              <div>
                {point.title && (
                  <div className="font-semibold text-gray-800 inline-block align-top">
                    {point.title}:{" "}
                  </div>
                )}
                <span className="text-gray-700 inline text-lg">
                  {renderContent(point.content, point.links ?? links)}
                </span>
              </div>
            ) : (
              <span className="text-gray-600 align-top">
                {renderContent(point as string, links)}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

// Helper to render subheadings (unchanged)
const renderSubheadings = (subheadings: IBlogSubheading[]) => {
  return (
    <div className="space-y-6 mt-6">
      {subheadings.map((sub, i) => (
        <div key={i}>
          {sub.title && (
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {sub.title}
            </h3>
          )}
          {sub.content && (
            <p className="text-gray-700 text-lg leading-relaxed mb-3">
              {renderContent(sub.content, sub.links)}
            </p>
          )}
          {sub.bullet_points &&
            renderBulletPoints(sub.bullet_points, sub.links)}
        </div>
      ))}
    </div>
  );
};

export default function BlogDetail({ blogId, locale }: BlogDetailProps) {
  const blogData = getBlogTranslations(locale);
  const blog = blogData.find(
    (item) => item.url === blogId
  ) as IBlogDataType | undefined;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!blog) {
    return (
      <div className="mt-[78px] sm:mt-[165px] mx-auto mb-12 max-w-[1200px] w-full px-4">
        <div className="py-6 text-center">
          <p className="text-xl text-gray-600">Blog not found</p>
        </div>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-[78px] sm:mt-[165px] mx-auto mb-12 max-w-[1200px] w-full px-4">
      <div className="py-6">
        {/* PAGE HEADING */}
        <h1 className="text-3xl sm:text-4xl lg:text-[45px] text-left font-semibold mb-8 leading-normal">
          {blog.page_heading}
        </h1>

        {/* HERO IMAGE */}
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[40px] overflow-hidden shadow-lg mb-10">
          <Image
            src={blog.image}
            alt={blog.title || blog.page_heading}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 100vw"
          />
        </div>

        {/* INTRODUCTION */}
        <section className="mb-12">
          {blog.structure.introduction.heading && (
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
              {blog.structure.introduction.heading}
            </h2>
          )}
          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
            {renderContent(
              blog.structure.introduction.content,
              blog.structure.introduction.links
            )}
          </div>
        </section>

        {/* MAIN SECTIONS */}
        {blog.structure.main_sections.map((section, index) => (
          <section key={index} className="mb-16 last:mb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
              {section.image && (
                <div
                  className={`relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                    }`}
                >
                  <Image
                    src={section.image}
                    alt={
                      section.heading ||
                      section.heading_before ||
                      `Section ${index + 1}`
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}

              <div
                className={`flex flex-col justify-center ${section.image
                    ? index % 2 === 0
                      ? "lg:order-2"
                      : "lg:order-1"
                    : "lg:col-span-2"
                  }`}
              >
                {section.heading_before && (
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    {section.heading_before}
                  </p>
                )}

                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    {section.heading}
                  </h2>
                )}

                {section.content && (
                  <div className="mt-4 prose max-w-none text-gray-700 text-lg leading-relaxed">
                    {renderContent(section.content, section.links)}

                    {section.bullet_points && section.title && (
                      <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                          {section.title}
                        </h3>
                        {renderBulletPoints(
                          section.bullet_points,
                          section.links
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {section.subheadings && section.subheadings.length > 0 && (
              <div className="mt-8">
                {renderSubheadings(section.subheadings)}
              </div>
            )}


            {section.bullet_points && !section.title && (
              <div className="mt-8">
                {renderBulletPoints(section.bullet_points, section.links)}
              </div>
            )}
          </section>
        ))}

        {/* CONCLUSION */}
        <section className="mt-16 p-0 rounded-2xl">
          {blog.structure.conclusion.heading && (
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
              {blog.structure.conclusion.heading}
            </h2>
          )}
          <p className="text-gray-700 text-lg leading-relaxed">
            {renderContent(
              blog.structure.conclusion.content,
              blog.structure.conclusion.links
            )}
          </p>
        </section>

        {/* FAQ */}
        {blog.faq && blog.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions
            </h2>

            <div className="w-full flex flex-col gap-4">
              {blog.faq.map((faqItem, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <button
                    className={`w-full text-left p-4 md:p-6 font-semibold text-lg flex justify-between items-center transition-colors duration-150 ${openFaqIndex === index
                        ? "bg-[#6E9753]"
                        : "bg-[#025C7A] hover:bg-[#6E9753]"
                      }`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-white">{faqItem.question}</span>
                    <span className="text-white text-xl ml-4">
                      {openFaqIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaqIndex === index && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed">
                        {renderContent(faqItem.answer)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
