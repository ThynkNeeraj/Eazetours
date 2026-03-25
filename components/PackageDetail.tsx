"use client";

import React from "react";
import { getPackagesTranslations } from "../lib/translationHelper";
import VerticalTimeline from "./VerticalTimeline";
import { IPackageDetailDataType } from "../types/Common";

interface IPackageDetailProp {
  packageUri?: string;
  locale: string; // Add locale prop
}

export default function PackageDetail({ packageUri, locale }: IPackageDetailProp) {
  // Get translated packages based on locale
  const packages = getPackagesTranslations(locale);
  
  // Find the specific package by URI
  const tourPackage = packages.find(pkg => pkg.Uri === packageUri);

  // Handle case when package is not found
  if (!tourPackage) {
    return (
      <div className="mt-[78px] sm:mt-[135px] mx-auto mb-12 max-w-[1200px] w-full px-4">
        <div className="py-6 text-center">
          <p className="text-xl text-gray-600">Package not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <VerticalTimeline tourPackage={tourPackage} locale={locale} />
      </div>
    </>
  );
}