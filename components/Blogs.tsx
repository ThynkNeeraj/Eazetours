"use client";
import BlogSummaryCard from "./BlogSummaryCard";
import Link from "next/link";
import { getBlogTranslations } from "../lib/translationHelper";

// Add translations for headings and text
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

export default function BlogsList({ locale }: { locale: string }) {
  const blogs = getBlogTranslations(locale);
  
  // Get translations based on current locale, fallback to English
  const translations = pageTranslations[locale as keyof typeof pageTranslations] || pageTranslations.en;

  return (
    <>
      <div className="mt-[115px] sm:mt-[165px] mx-8 mb-12 max-w-[1280px] w-full px-4">
        <p className="text-[14px] text-gray-700 mt-4">
          <span className="text-[#ccc] hover:text-[#035C7A]">
            <Link href={`/${locale}`} passHref>
              {translations.home}
            </Link>
          </span>{" "}
          / {translations.blog}
        </p>
        <h2 className="text-[42px] font-semibold text-black text-left">{translations.pageTitle}</h2>
        <p className="text-md text-gray-700 mt-1">{translations.description}</p>
      </div>

      <div
        className="relative max-w-[1280px] mx-8 h-[480px] rounded-[23px] overflow-hidden flex items-center justify-start p-[20px] sm:p-[80px] bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/gallery/6.jpg")' }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-[900px] py-8 pt-[150px] text-left">
          <h2 className="text-white text-[56px] mb-4 font-semibold leading-[1.2em]">
            {translations.heroHeading}
          </h2>
          {/* Input Field and Subscribe Button */}
        </div>
      </div>

      <div className="my-12 max-w-[1280px] mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-1 place-items-center">
          {blogs.map(blog => (
            <div key={blog.url}>
              <BlogSummaryCard blog={blog} locale={locale}></BlogSummaryCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
