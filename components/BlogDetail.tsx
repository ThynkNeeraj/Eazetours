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
   renderContent – filters empty lines
   ========================= */
const renderContent = (
  content: string | string[] | undefined,
  links?: IBlogLinks
): React.ReactNode => {
  if (!content) return null;

  // Handle array: filter out empty/whitespace-only lines
  if (Array.isArray(content)) {
    const nonEmptyLines = content.filter(
      (line) => line && line.trim().length > 0
    );
    if (nonEmptyLines.length === 0) return null;

    return (
      <>
        {nonEmptyLines.map((line, idx) => (
          <p key={idx} className="mb-2 last:mb-0">
            {renderContent(line, links)}
          </p>
        ))}
      </>
    );
  }

  // Single string
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
   renderBulletPoints
   ========================= */
const renderBulletPoints = (
  bullet_points: (string | IBlogBulletPoint)[] | undefined,
  links?: IBlogLinks
): React.ReactNode => {
  if (!bullet_points || bullet_points.length === 0) return null;

  const isSingle = bullet_points.length === 1;

  return (
    <ul
      className={`grid gap-4 ${
        isSingle ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
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

/* =========================
   renderSubheadings – skip empty subheadings
   ========================= */
const renderSubheadings = (
  subheadings: IBlogSubheading[] | undefined
): React.ReactNode => {
  if (!subheadings || subheadings.length === 0) return null;

  const validSubheadings = subheadings.filter((sub) => {
    const hasTitle = sub.title && sub.title.trim().length > 0;
    const hasContent = sub.content && renderContent(sub.content, sub.links) !== null;
    const hasBullets = sub.bullet_points && sub.bullet_points.length > 0;
    return hasTitle || hasContent || hasBullets;
  });

  if (validSubheadings.length === 0) return null;

  return (
    <div className="space-y-4 mt-4">  {/* Changed from space-y-6 mt-6 to space-y-4 mt-4 */}
      {validSubheadings.map((sub, i) => (
        <div key={i}>
          {sub.title && sub.title.trim().length > 0 && (
            <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-800">
              {sub.title}
            </h3>
          )}
          {sub.content &&
            (() => {
              const contentNode = renderContent(sub.content, sub.links);
              return contentNode ? (
                <div className="text-gray-700 text-lg leading-relaxed mb-3">
                  {contentNode}
                </div>
              ) : null;
            })()}
          {renderBulletPoints(sub.bullet_points, sub.links)}
        </div>
      ))}
    </div>
  );
};

/* =========================
   Helper: check if a main section has any content
   ========================= */
const hasSectionContent = (section: IBlogSection): boolean => {
  return !!(
    section.image ||
    (section.heading_before && section.heading_before.trim().length > 0) ||
    (section.heading && section.heading.trim().length > 0) ||
    (section.content && renderContent(section.content, section.links) !== null) ||
    (section.bullet_points && section.bullet_points.length > 0) ||
    (section.subheadings && section.subheadings.length > 0)
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

  const introHeading = blog.structure.introduction.heading?.trim();
  const introContentNode = renderContent(
    blog.structure.introduction.content,
    blog.structure.introduction.links
  );
  const hasIntroduction = !!(introHeading || introContentNode);

  const conclusionHeading = blog.structure.conclusion.heading?.trim();
  const conclusionContentNode = renderContent(
    blog.structure.conclusion.content,
    blog.structure.conclusion.links
  );
  const hasConclusion = !!(conclusionHeading || conclusionContentNode);

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
        {hasIntroduction && (
          <section className="mb-12">
            {introHeading && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                {introHeading}
              </h2>
            )}
            {introContentNode && (
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                {introContentNode}
              </div>
            )}
          </section>
        )}

        {/* MAIN SECTIONS – with image height fix */}
        {blog.structure.main_sections.map((section, index) => {
          if (!hasSectionContent(section)) return null;

          const hasHeading = !!(
            (section.heading_before && section.heading_before.trim()) ||
            (section.heading && section.heading.trim())
          );

          const hasBullets = section.bullet_points && section.bullet_points.length > 0;

          return (
            <section key={index} className="mb-16 last:mb-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {section.image && (
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden ${
                      index % 2 === 0 ? "lg:order-1" : "lg:order-2"
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
                  className={`flex flex-col justify-center ${
                    section.image
                      ? index % 2 === 0
                        ? "lg:order-2"
                        : "lg:order-1"
                      : "lg:col-span-2"
                  }`}
                >
                  {section.heading_before && section.heading_before.trim() && (
                    <p className="text-lg font-medium text-gray-600 mb-2">
                      {section.heading_before}
                    </p>
                  )}

                  {section.heading && section.heading.trim() && (
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                      {section.heading}
                    </h2>
                  )}

                  {/* Regular content – margin only if there is a heading */}
                  {(() => {
                    const contentNode = renderContent(section.content, section.links);
                    if (!contentNode) return null;
                    return (
                      <div className={hasHeading ? "mt-4" : "mt-0"}>
                        <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                          {contentNode}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Bullet points – margin only if there is a heading */}
                  {hasBullets && (
                    <div className={hasHeading ? "mt-4" : "mt-0"}>
                      {section.title && (
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                          {section.title}
                        </h3>
                      )}
                      {renderBulletPoints(section.bullet_points, section.links)}
                    </div>
                  )}
                </div>
              </div>

              {renderSubheadings(section.subheadings)}
            </section>
          );
        })}

        {/* CONCLUSION */}
        {hasConclusion && (
          <section className="mt-16 p-0 rounded-2xl">
            {conclusionHeading && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                {conclusionHeading}
              </h2>
            )}
            {conclusionContentNode && (
              <div className="text-gray-700 text-lg leading-relaxed">
                {conclusionContentNode}
              </div>
            )}
          </section>
        )}

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
                    className={`w-full text-left p-4 md:p-6 font-semibold text-lg flex justify-between items-center transition-colors duration-150 ${
                      openFaqIndex === index
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
                      <div className="text-gray-600 leading-relaxed">
                        {renderContent(faqItem.answer)}
                      </div>
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
