"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import gallery_1 from "../public/images/gallery/1.jpg";
import gallery_2 from "../public/images/gallery/2.jpg";
import gallery_3 from "../public/images/gallery/3.jpg";
import gallery_4 from "../public/images/gallery/4.jpg";
import gallery_5 from "../public/images/gallery/5.jpg";
import gallery_6 from "../public/images/gallery/6.jpg";
import gallery_7 from "../public/images/gallery/7.jpg";
import gallery_8 from "../public/images/gallery/8.jpg";
import gallery_10 from "../public/images/gallery/10.jpg";
import gallery_11 from "../public/images/gallery/11.jpg";
import gallery_12 from "../public/images/gallery/12.jpg";
import gallery_13 from "../public/images/gallery/13.jpg";
import gallery_14 from "../public/images/gallery/14.jpg";
import gallery_15 from "../public/images/gallery/15.jpg";
import gallery_16 from "../public/images/gallery/16.jpg";
import gallery_17 from "../public/images/gallery/17.jpg";
import gallery_18 from "../public/images/gallery/18.jpg";
import gallery_19 from "../public/images/gallery/19.jpg";
import gallery_20 from "../public/images/gallery/20.jpg";
import gallery_21 from "../public/images/gallery/21.jpg";
import gallery_22 from "../public/images/gallery/22.jpg";
import gallery_23 from "../public/images/gallery/23.jpg";
import gallery_24 from "../public/images/gallery/24.jpg";
import gallery_25 from "../public/images/gallery/25.jpg";
import gallery_26 from "../public/images/gallery/26.jpg";
import gallery_27 from "../public/images/gallery/27.jpg";
import gallery_28 from "../public/images/gallery/28.jpg";
import gallery_29 from "../public/images/gallery/29.jpg";
import gallery_30 from "../public/images/gallery/30.jpg";
import gallery_31 from "../public/images/gallery/31.jpg";
import gallery_32 from "../public/images/gallery/32.jpg";
import gallery_33 from "../public/images/gallery/33.jpg";
import gallery_34 from "../public/images/gallery/34.jpg";
import gallery_35 from "../public/images/gallery/35.jpg";
import gallery_36 from "../public/images/gallery/36.jpg";
import gallery_37 from "../public/images/gallery/37.jpg";
import gallery_38 from "../public/images/gallery/38.jpg";
import gallery_39 from "../public/images/gallery/39.jpg";
import gallery_40 from "../public/images/gallery/40.jpg";
import gallery_41 from "../public/images/gallery/41.jpg";
import gallery_42 from "../public/images/gallery/42.jpg";
import gallery_43 from "../public/images/gallery/43.jpg";
import gallery_44 from "../public/images/gallery/44.jpg";
import gallery_45 from "../public/images/gallery/45.jpg";
import gallery_46 from "../public/images/gallery/46.jpg";
import gallery_47 from "../public/images/gallery/47.jpg";
import gallery_48 from "../public/images/gallery/48.jpg";
import gallery_49 from "../public/images/gallery/49.jpg";
import gallery_50 from "../public/images/gallery/50.jpg";
import gallery_51 from "../public/images/gallery/51.jpg";
import gallery_52 from "../public/images/gallery/52.jpg";
import gallery_53 from "../public/images/gallery/53.jpeg";
import gallery_54 from "../public/images/gallery/54.jpeg";
import gallery_55 from "../public/images/gallery/55.jpeg";
import gallery_56 from "../public/images/gallery/56.jpeg";
import gallery_57 from "../public/images/gallery/57.jpeg";
import gallery_58 from "../public/images/gallery/58.jpeg";
import gallery_59 from "../public/images/gallery/59.jpeg";
import gallery_60 from "../public/images/gallery/60.jpeg";
import gallery_61 from "../public/images/gallery/61.jpeg";
import gallery_62 from "../public/images/gallery/62.jpeg";
import gallery_64 from "../public/images/gallery/64.jpeg";
import gallery_65 from "../public/images/gallery/65.jpeg";
import gallery_66 from "../public/images/gallery/66.jpeg";
import gallery_67 from "../public/images/gallery/67.jpeg";
import gallery_68 from "../public/images/gallery/68.jpeg";
import gallery_69 from "../public/images/gallery/69.jpeg";
import gallery_70 from "../public/images/gallery/70.jpeg";
import gallery_71 from "../public/images/gallery/71.jpeg";
import gallery_72 from "../public/images/gallery/72.jpeg";
import gallery_73 from "../public/images/gallery/73.jpeg";
import gallery_74 from "../public/images/gallery/74.jpeg";
import gallery_75 from "../public/images/gallery/75.jpeg";
import gallery_76 from "../public/images/gallery/76.jpeg";
import gallery_77 from "../public/images/gallery/77.jpeg";
import gallery_78 from "../public/images/gallery/78.jpeg";
import gallery_79 from "../public/images/gallery/79.jpeg";
import gallery_80 from "../public/images/gallery/80.jpeg";
import gallery_81 from "../public/images/gallery/81.jpeg";
import gallery_82 from "../public/images/gallery/82.jpeg";
import gallery_83 from "../public/images/gallery/83.jpeg";
import gallery_84 from "../public/images/gallery/84.jpeg";
import gallery_85 from "../public/images/gallery/85.jpeg";
import gallery_86 from "../public/images/gallery/86.jpeg";
import gallery_87 from "../public/images/gallery/87.jpeg";
import gallery_88 from "../public/images/gallery/88.jpeg";
import gallery_89 from "../public/images/gallery/89.jpeg";
import gallery_90 from "../public/images/gallery/90.jpeg";
import gallery_91 from "../public/images/gallery/91.jpeg";
import gallery_92 from "../public/images/gallery/92.jpeg";
import gallery_93 from "../public/images/gallery/93.jpeg";
import gallery_94 from "../public/images/gallery/94.jpeg";
import gallery_95 from "../public/images/gallery/95.jpeg";
import gallery_96 from "../public/images/gallery/96.jpeg";
import gallery_97 from "../public/images/gallery/97.jpeg";

// Use StaticImageData type for images
const gallery_images: StaticImageData[] = [
  gallery_53,
  gallery_54,
  gallery_55,
  gallery_56,
  gallery_57,
  gallery_58,
  gallery_41,
  gallery_42,
  gallery_43,
  gallery_1,
  gallery_2,
  gallery_3,
  gallery_4,
  gallery_5,
  gallery_6,
  gallery_7,
  gallery_8,
  gallery_10,
  gallery_11,
  gallery_12,
  gallery_13,
  gallery_59,
  gallery_60,
  gallery_61,
  gallery_79,
  gallery_80,
  gallery_81,
  gallery_82,
  gallery_83,
  gallery_84,
  gallery_85,
  gallery_86,
  gallery_87,
  gallery_88,
  gallery_89,
  gallery_90,
  gallery_91,
  gallery_92,
  gallery_93,
  gallery_94,
  gallery_95,
  gallery_96,
  gallery_97,
  gallery_45,
  gallery_46,
  gallery_47,
  gallery_48,
  gallery_49,
  gallery_50,
  gallery_51,
  gallery_52,
  gallery_44,
  gallery_31,
  gallery_32,
  gallery_33,
  gallery_34,
  gallery_35,
  gallery_36,
  gallery_37,
  gallery_38,
  gallery_62,
  gallery_64,
  gallery_65,
  gallery_66,
  gallery_67,
  gallery_68,
  gallery_69,
  gallery_70,
  gallery_71,
  gallery_72,
  gallery_73,
  gallery_74,
  gallery_75,
  gallery_76,
  gallery_77,
  gallery_78,
  gallery_14,
  gallery_15,
  gallery_16,
  gallery_17,
  gallery_39,
  gallery_40,
  gallery_18,
  gallery_19,
  gallery_20,
  gallery_21,
  gallery_22,
  gallery_23,
  gallery_24,
  gallery_25,
  gallery_26,
  gallery_27,
  gallery_28,
  gallery_29,
  gallery_30,
];

export default function GalleryComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<StaticImageData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (image: StaticImageData, index: number) => {
    setCurrentImage(image);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentImage(null);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % gallery_images.length;
    setCurrentImage(gallery_images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + gallery_images.length) % gallery_images.length;
    setCurrentImage(gallery_images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div>
      <div className="mt-[135px] sm:mt-[165px] mx-8 mb-12">
        <p className="text-[14px] text-gray-700 mt-4">
          <span className="text-[#ccc] hover:text-[#035C7A]">
            <Link href="/" passHref>
              Home
            </Link>
          </span>{" "}
          / Gallery
        </p>
        <h2 className="text-[42px] font-semibold text-black text-left">Gallery</h2>
      </div>

      <div className="mt-[10px] mx-8 mb-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {gallery_images.map((gallery_image, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative overflow-hidden rounded-[3px] shadow-xl cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(gallery_image, index)}
            >
              <Image
                src={gallery_image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto rounded-[3px] transition-transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>


        {/* Lightbox Modal */}
        {isOpen && currentImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-0 right-0 text-white text-4xl px-3 pt-0 pb-2 bg-transparent hover:bg-gray-700 rounded-full"
              >
                &times;
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-transparent hover:bg-gray-700 rounded-full px-2 pt-0 pb-1"
              >
                &larr;
              </button>
              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-transparent hover:bg-gray-700 rounded-full px-2 pt-0 pb-1"
              >
                &rarr;
              </button>

              <Image
                className="object-contain max-h-screen max-w-screen"
                src={currentImage}
                alt="Lightbox Image"
                width={1200}
                height={800}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
