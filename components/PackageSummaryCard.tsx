// components/PackageSummaryCard.tsx

import React from "react";
import Link from "next/link";
import { PackageImage } from "./PackageImage";
import { IPackageDetailDataType } from "../types/Common";

interface IPackageSummaryCardProp {
  tourPackage: IPackageDetailDataType;
  locale: string; // Add locale prop
  onSale?: boolean;
  onEnquire?: (packageName: string) => void;
}

function PackageSummaryCard({ tourPackage, locale, onEnquire }: IPackageSummaryCardProp) {
  // Translation for button texts
  const translations: Record<string, { moreDetails: string; submitQuery: string }> = {
    en: {
      moreDetails: "More Details",
      submitQuery: "Submit Query",
    },
    de: {
      moreDetails: "Mehr Details",
      submitQuery: "Anfrage senden",
    },
    es: {
      moreDetails: "Más detalles",
      submitQuery: "Enviar consulta",
    },
    fr: {
      moreDetails: "Plus de détails",
      submitQuery: "Envoyer la demande",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Build the package URL: include locale only for non-English
  const getPackageHref = (Uri: string) => {
    if (locale === 'en') {
      return `/packages/${Uri}`;
    }
    return `/${locale}/packages/${Uri}`;
  };

  return (
    <div className="card bg-base-100 shadow-xl m-1 h-full shadow-[0px_0px_2px_1px_#00000040]">
      <div className="h-[200px] rounded-tl-[23px] rounded-tr-[23px] overflow-hidden">
        <figure className="h-[200px] transform scale-110 transition-transform duration-300 ease-in-out hover:scale-110">
          <PackageImage source={tourPackage.Id}></PackageImage>
        </figure>
      </div>
      <div className="card-body flex flex-col items-start p-[13px]">
        <p className="text-sm text-[#4F5E71] flex grow-0 items-start space-x-2">
          <i className="fa fa-map-marker-alt text-lg text-[#4F5E71] -mt-1" />
          <span className="line-clamp-1">{tourPackage.Name}</span>
        </p>
        <h2 className="text-black-700 font-urbanist text-[16px] line-clamp-2 hover:text-[#6E9753] line-clamp-2">
          <Link href={getPackageHref(tourPackage.Uri)} passHref>
            {tourPackage.Title}
          </Link>
        </h2>
        <div className="flex gap-2 pt-2 mb-3">
          {tourPackage.Tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 capitalize rounded-sm text-sm text-white ${
                index % 2 === 0 ? "bg-[#025C7A]" : "bg-[#6E9753]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <hr className="w-full" />
        <div className="card-actions justify-start gap-1 mt-2 flex flex-wrap w-full">
          <Link href={getPackageHref(tourPackage.Uri)} passHref>
            <button className="mt-3 w-26 px-3 py-1.5 border-2 border-[#025C7A] hover:bg-white text-[14px] hover:text-[#025C7A] rounded-full bg-[#025C7A] text-white transition-all duration-300">
              {t.moreDetails}
            </button>
          </Link>
          {onEnquire && (
            <button
              onClick={() => onEnquire(tourPackage.Name)}
              className="mt-3 w-26 px-3 py-1.5 border-2 border-[#EA2330] bg-[#EA2330] hover:bg-transparent text-[14px] hover:text-[#D60F0F] rounded-full bg-[#D60F0F] text-white transition-all duration-300"
            >
              {t.submitQuery}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PackageSummaryCard;