// components/PackagesList.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import PackageForm from "./PackageForm";
import PackageSummaryCard from "./PackageSummaryCard";
import { IPackageDetailDataType } from "../types/Common";
import { getPackagesTranslations } from "../lib/translationHelper";

interface PackagesListProps {
  locale: string; // 'en', 'de', 'es', 'fr'
}

function PackagesList({ locale }: PackagesListProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";

  console.log("PackagesList received locale:", locale);

  const packageData = getPackagesTranslations(locale);

  const [tabName, setTabName] = useState(initialTab);
  const [packagesList, setPackagesList] = useState<IPackageDetailDataType[]>(packageData);
  const dropDownRef = useRef<HTMLDetailsElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackageDetailDataType | null>(null);

  // Mapping von Tab-Keys zu den tatsächlichen Tags in der JSON für jede unterstützte Sprache
  const getTagForTab = (tab: string, currentLocale: string): string => {
    const maps: Record<string, Record<string, string>> = {
      en: {
        adventure: "adventure",
        ayurveda: "ayurveda",
        cultural: "cultural",
        luxury: "luxury",
        honeymoon: "honeymoon",
        pilgrim: "pilgrim",
        tribal: "tribal",
        wildlife: "wildlife",
        bhutan: "bhutan",
        srilanka: "srilanka",
        nepal: "nepal",
        maldives: "maldives",
      },
      de: {
        adventure: "abenteuer",
        ayurveda: "ayurveda",
        cultural: "kultur",
        luxury: "luxus",
        honeymoon: "hochzeitsreise",
        pilgrim: "pilger",
        tribal: "stammeskultur",
        wildlife: "wildlife",
        bhutan: "bhutan",
        srilanka: "srilanka",
        nepal: "nepal",
        maldives: "malediven",
      },
      es: {
        adventure: "aventura",
        ayurveda: "ayurveda",
        cultural: "cultural",
        luxury: "lujo",
        honeymoon: "luna de miel",
        pilgrim: "peregrinación",
        tribal: "tribal",
        wildlife: "fauna",
        bhutan: "bután",
        srilanka: "sri lanka",
        nepal: "nepal",
        maldives: "maldivas",
      },
      fr: {
        adventure: "aventure",
        ayurveda: "ayurveda",
        cultural: "culturel",
        luxury: "luxe",
        honeymoon: "lune de miel",
        pilgrim: "pèlerinage",
        tribal: "tribal",
        wildlife: "faune",
        bhutan: "bhoutan",
        srilanka: "sri lanka",
        nepal: "népal",
        maldives: "maldives",
      },
    };

    // Fallback: Wenn die Sprache nicht unterstützt wird oder der Tab nicht gefunden wird, den Tab selbst zurückgeben
    return maps[currentLocale]?.[tab] || tab;
  };

  // Übersetzte Tab-Beschriftungen für die Anzeige
  const tabLabels = {
    en: {
      all: "All Packages",
      adventure: "Adventure Tours",
      ayurveda: "Ayurveda",
      cultural: "Cultural Tours",
      luxury: "Luxury Tours",
      honeymoon: "Honeymoon Tours",
      pilgrim: "Pilgrimage Tours",
      tribal: "Tribals Tours",
      wildlife: "Wildlife Tours",
      bhutan: "Bhutan",
      srilanka: "Sri Lanka",
      nepal: "Nepal",
      maldives: "Maldives",
    },
    de: {
      all: "Alle Pakete",
      adventure: "Abenteuerreisen",
      ayurveda: "Ayurveda",
      cultural: "Kulturreisen",
      luxury: "Luxusreisen",
      honeymoon: "Hochzeitsreisen",
      pilgrim: "Pilgerreisen",
      tribal: "Stammesreisen",
      wildlife: "Wildtierreisen",
      bhutan: "Bhutan",
      srilanka: "Sri Lanka",
      nepal: "Nepal",
      maldives: "Malediven",
    },
    es: {
      all: "Todos los paquetes",
      adventure: "Viajes de aventura",
      ayurveda: "Ayurveda",
      cultural: "Viajes culturales",
      luxury: "Viajes de lujo",
      honeymoon: "Viajes de luna de miel",
      pilgrim: "Peregrinaciones",
      tribal: "Viajes tribales",
      wildlife: "Viajes de vida silvestre",
      bhutan: "Bután",
      srilanka: "Sri Lanka",
      nepal: "Nepal",
      maldives: "Maldivas",
    },
    fr: {
      all: "Tous les forfaits",
      adventure: "Voyages d'aventure",
      ayurveda: "Ayurveda",
      cultural: "Voyages culturels",
      luxury: "Voyages de luxe",
      honeymoon: "Voyages de lune de miel",
      pilgrim: "Pèlerinages",
      tribal: "Voyages tribaux",
      wildlife: "Safaris animaliers",
      bhutan: "Bhoutan",
      srilanka: "Sri Lanka",
      nepal: "Népal",
      maldives: "Maldives",
    },
  };

  // Fallback auf Englisch, falls die aktuelle Sprache nicht in tabLabels definiert ist
  const currentLabels = tabLabels[locale as keyof typeof tabLabels] || tabLabels.en;

  useEffect(() => {
    const updatedPackages = getPackagesTranslations(locale);
    
    if (tabName !== "all") {
      const tagToFilter = getTagForTab(tabName, locale);
      const filteredPackages = updatedPackages.filter(pkg =>
        pkg.Tags.some(tag => tag.toLowerCase() === tagToFilter.toLowerCase())
      );
      setPackagesList(filteredPackages);
    } else {
      setPackagesList(updatedPackages);
    }
  }, [locale, tabName]);

  const handleTabClick = (tab: string) => {
    setTabName(tab);

    const currentPackages = getPackagesTranslations(locale);
    
    if (tab !== "all") {
      const tagToFilter = getTagForTab(tab, locale);
      const filtered = currentPackages.filter(pkg =>
        pkg.Tags.some(tag => tag.toLowerCase() === tagToFilter.toLowerCase())
      );
      setPackagesList(filtered);
    } else {
      setPackagesList(currentPackages);
    }

    if (dropDownRef.current) {
      dropDownRef.current.removeAttribute("open");
    }

    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url);
  };

  const getTabClass = (tab: string) =>
    `tab px-[10px] ${tabName === tab ? "tab-active !text-[#fff] !bg-[#025C7A]" : ""}`;

  return (
    <>
      {/* Tabs für große Bildschirme */}
      <div role="tablist" className="hidden lg:flex lg:flex-wrap lg:justify-center lg:tabs lg:tabs-boxed mx-auto lg:mx-8">
        {Object.entries(currentLabels).map(([key, label]) => (
          <button key={key} role="tab" className={getTabClass(key)} onClick={() => handleTabClick(key)}>
            {label}
          </button>
        ))}
      </div>

      {/* Dropdown für kleine Bildschirme */}
      <div className="flex justify-center lg:hidden">
        <details className="dropdown" ref={dropDownRef}>
          <summary className="btn m-1">{currentLabels[tabName as keyof typeof currentLabels]}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {Object.entries(currentLabels).map(([key, label]) => (
              <li key={key}>
                <button onClick={() => handleTabClick(key)}>{label}</button>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Paket-Raster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 max-w-[1200px] gap-6 mx-8 lg:mx-auto my-8">
        {packagesList.map(pkg => (
          <div key={pkg.Id}>
            <PackageSummaryCard
              tourPackage={pkg}
              locale={locale}
              onEnquire={() => {
                setSelectedPackage(pkg);
                setIsFormOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* Popup-Modal */}
      {isFormOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 sm:px-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative p-0 overflow-auto max-h-[100vh] scrollbar-hide">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-5 text-gray-600 hover:text-black text-2xl font-bold z-50"
            >
              ✕
            </button>
            <div className="max-h-[100vh] overflow-y-auto">
              <PackageForm selectedPackage={selectedPackage.Name} locale={locale} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PackagesList;