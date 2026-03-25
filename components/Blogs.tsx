"use client";
import { useState, useEffect } from "react";
import BlogSummaryCard from "./BlogSummaryCard";
import Link from "next/link";
import { getBlogTranslations } from "../lib/translationHelper";

// Add translations for headings (pagination labels no longer needed for buttons)
const pageTranslations = {
  en: {
    home: "Home",
    blog: "Blog",
    pageTitle: "Blog",
    description: "Let’s explore what we do!",
    heroHeading: "We let our customers talk for us.",
  },
  de: {
    home: "Startseite",
    blog: "Blog",
    pageTitle: "Blog",
    description: "Lassen Sie uns entdecken, was wir tun!",
    heroHeading: "Wir lassen unsere Kunden für uns sprechen.",
  },
  es: {
    home: "Inicio",
    blog: "Blog",
    pageTitle: "Blog",
    description: "¡Exploremos lo que hacemos!",
    heroHeading: "Dejamos que nuestros clientes hablen por nosotros.",
  },
  fr: {
    home: "Accueil",
    blog: "Blog",
    pageTitle: "Blog",
    description: "Explorons ce que nous faisons !",
    heroHeading: "Nous laissons nos clients parler pour nous.",
  },
};

const ITEMS_PER_PAGE = 12;

export default function BlogsList({ locale }: { locale: string }) {
  const blogs = getBlogTranslations(locale);
  const translations =
    pageTranslations[locale as keyof typeof pageTranslations] || pageTranslations.en;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  // Reset to first page when locale changes
  useEffect(() => {
    setCurrentPage(1);
  }, [locale]);

  // Slice blogs for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      <div className="mt-[165px] sm:mt-[165px] mx-8 mb-12 max-w-[1280px] w-full px-4">
        <p className="text-[14px] text-gray-700 mt-4">
          <span className="text-[#ccc] hover:text-[#035C7A]">
            <Link href={`/${locale}`} passHref>
              {translations.home}
            </Link>
          </span>{" "}
          / {translations.blog}
        </p>
        <h2 className="text-[42px] font-semibold text-black text-left">
          {translations.pageTitle}
        </h2>
        <p className="text-md text-gray-700 mt-1">{translations.description}</p>
      </div>

      <div
        className="relative max-w-[1280px] mx-8 h-[480px] rounded-[23px] overflow-hidden flex items-center justify-start p-[20px] sm:p-[80px] bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/gallery/6.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 w-[900px] py-8 pt-[150px] text-left">
          <h2 className="text-white text-[38px] sm:text-[56px] mb-4 font-semibold leading-[1.2em]">
            {translations.heroHeading}
          </h2>
        </div>
      </div>

      <div className="my-12 max-w-[1280px] mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-1 place-items-center">
          {currentBlogs.map((blog) => (
            <div key={blog.url}>
              <BlogSummaryCard blog={blog} locale={locale} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous button with left arrow */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`px-4 py-2 rounded-md text-lg font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#035C7A] text-white hover:bg-[#024b63]"
              }`}
            >
              ←
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  onClick={() => goToPage(page as number)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#035C7A] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next button with right arrow */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className={`px-4 py-2 rounded-md text-lg font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#035C7A] text-white hover:bg-[#024b63]"
              }`}
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
}