"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import signature from "../public/images/logo.png";
import { getLandingTranslations, getFooterTranslations } from "../lib/translationHelper";
import LanguageSelector from "./LanguageSelector";

function Footer({ locale }: { locale: string }) {
  const { navigation } = getLandingTranslations(locale);
  const footer = getFooterTranslations(locale);

  // FINAL PREFIX RULE
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <footer className="footer flex flex-col bg-[#0D2000] text-white border-t-2 border-gray-300 gap-0">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row gap-y-0 sm:gap-2 lg:gap-4 justify-between p-6 md:py-10 md:px-7">

        {/* FIRST COLUMN - About Section */}
        <div className="md:w-[20%] w-full lg:w-[18%] mb-8 text-left pl-0">
          <Link href={prefix || "/"} passHref>
            <Image
              className="z-0 mb-4 md:mx-0"
              src={signature}
              width={200}
              height={87}
              alt="Logo"
            />
          </Link>

          <p className="text-sm mt-2 mb-4">{footer.about}</p>

          <div className="flex justify-start md:justify-start space-x-2 my-4">
            {/* Social Media Links */}
            <a href="https://www.tripadvisor.in/Attraction_Review-g304551-d17734269-Reviews-EAZE_TOURS-New_Delhi_National_Capital_Territory_of_Delhi.html" target="_blank" rel="noopener noreferrer" aria-label="Tripadvisor">
              <span className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300">
                <i className="fab fa-tripadvisor text-lg leading-lg" />
              </span>
            </a>
            <a href="https://www.facebook.com/eazetour/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300">
                <i className="fab fa-facebook-f text-lg leading-lg" />
              </span>
            </a>
            <a href="https://www.pinterest.com/eazetourpackages/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <span className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300">
                <i className="fab fa-pinterest text-sm leading-lg" />
              </span>
            </a>
            <a href="https://www.instagram.com/eazetourpackages/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300">
                <i className="fab fa-instagram text-lg leading-lg" />
              </span>
            </a>
          </div>

          <div className="mt-4">
            <LanguageSelector currentLocale={locale} variant="footer" />
          </div>
        </div>

        {/* SECOND COLUMN - Popular Packages */}
        <div className="md:w-[50%] w-full lg:w-[40%] mb-8 md:pt-10">
          <div className="text-lg font-semibold mb-4">{footer.sections.packages || footer.sections.topDestinations}</div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-2">
            <li className="w-max">
              <Link href={`${prefix}/packages/forts-and-palaces-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.fortsAndPalaces}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/royal-rajasthan-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.luxuryTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/gujarat-tribal-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.tribalTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/kerala-cochin-trivandrum-tour-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.keralaTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/ayurveda-tour-package-kerala-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.ayurvedaTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/chardham-pilgrimage-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.chardhamTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/tiger-safari-tour-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.tigerSafari}
              </Link>
            </li>
            <li className="whitespace-normal break-words">
              <Link href={`${prefix}/packages`} className="hover:text-blue-600 transition-colors">
                {footer.packages.bestToursFromUSA}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/wildlife-safari-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.wildlifeTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/markha-trek-leh-travel-package`} className="hover:text-blue-600 transition-colors">
                {footer.packages.trekkingTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/south-india-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.southIndiaTour}
              </Link>
            </li>
            <li className="w-max">
              <Link href={`${prefix}/packages/romantic-andaman-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.packages.honeymoonTour}
              </Link>
            </li>
          </ul>
        </div>

        {/* THIRD COLUMN - Popular Destinations */}
        <div className="md:w-[10%] w-full lg:w-[8%] mb-8 md:pt-10">
          <div className="text-lg font-semibold mb-4">{footer.sections.destinations || footer.sections.topDestinations}</div>
          <ul className="space-y-2 pl-1">
            <li>
              <Link href={`${prefix}/packages/classical-delhi-jaipur-agra-khajurao-varanasi-tour-india`} className="hover:text-blue-600 transition-colors">
                {footer.destinations.delhi}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/packages/forts-of-rajasthan-from-delhi-11-days-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.destinations.jaipur}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/packages/golden-triangle-delhi-agra-jaipur-7-days-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.destinations.agra}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/packages/north-india-temple-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.destinations.varanasi}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/packages/golden-chariot-bangalore-mysore-goa-tour-package-india`} className="hover:text-blue-600 transition-colors">
                {footer.destinations.goa}
              </Link>
            </li>
          </ul>
        </div>

        {/* FOURTH COLUMN - Useful Links */}
        <div className="md:w-[20%] w-full lg:w-[7%] mb-8 md:pt-10">
          <div className="text-lg font-semibold mb-4">{footer.sections.usefulLinks}</div>
          <ul className="space-y-2 pl-1">
            <li>
              <Link href={`${prefix}/about`} className="hover:text-blue-600 transition-colors">
                {navigation.links.aboutUs}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/contact`} className="hover:text-blue-600 transition-colors">
                {navigation.links.contactUs}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/packages`} className="hover:text-blue-600 transition-colors">
                {navigation.links.packages}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/gallery`} className="hover:text-blue-600 transition-colors">
                {navigation.links.gallery}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/testimonials`} className="hover:text-blue-600 transition-colors">
                {navigation.links.testimonials}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/blog`} className="hover:text-blue-600 transition-colors">
                {navigation.links.blog}
              </Link>
            </li>
          </ul>
        </div>

        {/* FIFTH COLUMN - Contact Information */}
        <div className="md:w-[70%] w-full lg:w-[17%] mb-8 md:pt-10">
          <div className="text-lg font-semibold mb-4">{footer.contact?.title || "Contact Us"}</div>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <i className="fa fa-phone-alt text-lg -mt-1" />
              <div>
                <p className="text-sm">
                  <a href="tel:+919873186168" className="hover:text-blue-600 transition-colors">
                    +91 98731 86168
                  </a>
                </p>
                <p className="text-sm">
                  <a href="tel:+919911684818" className="hover:text-blue-600 transition-colors">
                    +91 99116 84818
                  </a>
                </p>
                <p className="text-sm">
                  <a href="tel:+919818006830" className="hover:text-blue-600 transition-colors">
                    +91 98180 06830
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <i className="far fa-envelope text-lg -mt-1" />
              <div>
                <p className="text-sm">
                  <a href="mailto:info@eazetours.com" className="hover:text-blue-600 transition-colors">
                    info@eazetours.com
                  </a>
                </p>
                <p className="text-sm">
                  <a href="mailto:harshit@eazetours.com" className="hover:text-blue-600 transition-colors">
                    harshit@eazetours.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2 w-[50%] lg:w-[100%]">
              <i className="fa fa-map-marker-alt text-lg -mt-1" />
              <p className="text-sm">
                <a
                  href="https://maps.app.goo.gl/H7RTSzRAnT3WYnjr9"
                  className="hover:text-blue-600 w-[200px] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eaze House ~2nd Floor, RZP-146 Palam Colony, New Delhi, South West Delhi, 110075
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full bg-midnight text-white py-7 text-center justify-center border-t border-white border-opacity-50">
        <p className="text-sm">
          &copy; Copyright <Link href={prefix || "/"} className="hover:text-blue-600 transition-colors">Eaze Tours</Link> {new Date().getFullYear()} {footer.copyright || "All Rights Reserved"}.
        </p>
      </div>
    </footer>
  );
}

export default Footer;