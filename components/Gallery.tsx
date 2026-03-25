"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";

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

// Add translations for heading and breadcrumb
const pageTranslations = {
  en: {
    home: "Home",
    gallery: "Gallery",
    pageTitle: "Gallery",
  },
  de: {
    home: "Startseite",
    gallery: "Galerie",
    pageTitle: "Galerie",
  },
  es: {
    home: "Inicio",
    gallery: "Galería",
    pageTitle: "Galería",
  },
  fr: {
    home: "Accueil",
    gallery: "Galerie",
    pageTitle: "Galerie",
  },
};

// Define interfaces
interface ImageItem {
  type: 'image';
  src: StaticImageData;
  id: string;
}

interface VideoItem {
  type: 'video';
  src: string;
  id: string;
  aspectRatio: string;   // e.g., "3 / 4" or "3 / 2"
  thumbnail?: string;     // Optional custom thumbnail path
}

type GalleryItem = ImageItem | VideoItem;

// imageItems array
const imageItems: ImageItem[] = [
  { type: 'image', src: gallery_53, id: 'img-53' },
  { type: 'image', src: gallery_54, id: 'img-54' },
  { type: 'image', src: gallery_55, id: 'img-55' },
  { type: 'image', src: gallery_56, id: 'img-56' },
  { type: 'image', src: gallery_57, id: 'img-57' },
  { type: 'image', src: gallery_58, id: 'img-58' },
  { type: 'image', src: gallery_41, id: 'img-41' },
  { type: 'image', src: gallery_42, id: 'img-42' },
  { type: 'image', src: gallery_43, id: 'img-43' },
  { type: 'image', src: gallery_1, id: 'img-1' },
  { type: 'image', src: gallery_2, id: 'img-2' },
  { type: 'image', src: gallery_3, id: 'img-3' },
  { type: 'image', src: gallery_4, id: 'img-4' },
  { type: 'image', src: gallery_5, id: 'img-5' },
  { type: 'image', src: gallery_6, id: 'img-6' },
  { type: 'image', src: gallery_7, id: 'img-7' },
  { type: 'image', src: gallery_8, id: 'img-8' },
  { type: 'image', src: gallery_10, id: 'img-10' },
  { type: 'image', src: gallery_11, id: 'img-11' },
  { type: 'image', src: gallery_12, id: 'img-12' },
  { type: 'image', src: gallery_13, id: 'img-13' },
  { type: 'image', src: gallery_59, id: 'img-59' },
  { type: 'image', src: gallery_60, id: 'img-60' },
  { type: 'image', src: gallery_61, id: 'img-61' },
  { type: 'image', src: gallery_79, id: 'img-79' },
  { type: 'image', src: gallery_80, id: 'img-80' },
  { type: 'image', src: gallery_81, id: 'img-81' },
  { type: 'image', src: gallery_82, id: 'img-82' },
  { type: 'image', src: gallery_83, id: 'img-83' },
  { type: 'image', src: gallery_84, id: 'img-84' },
  { type: 'image', src: gallery_85, id: 'img-85' },
  { type: 'image', src: gallery_86, id: 'img-86' },
  { type: 'image', src: gallery_87, id: 'img-87' },
  { type: 'image', src: gallery_88, id: 'img-88' },
  { type: 'image', src: gallery_89, id: 'img-89' },
  { type: 'image', src: gallery_90, id: 'img-90' },
  { type: 'image', src: gallery_91, id: 'img-91' },
  { type: 'image', src: gallery_92, id: 'img-92' },
  { type: 'image', src: gallery_93, id: 'img-93' },
  { type: 'image', src: gallery_45, id: 'img-45' },
  { type: 'image', src: gallery_46, id: 'img-46' },
  { type: 'image', src: gallery_47, id: 'img-47' },
  { type: 'image', src: gallery_48, id: 'img-48' },
  { type: 'image', src: gallery_49, id: 'img-49' },
  { type: 'image', src: gallery_51, id: 'img-51' },
  { type: 'image', src: gallery_52, id: 'img-52' },
  { type: 'image', src: gallery_44, id: 'img-44' },
  { type: 'image', src: gallery_31, id: 'img-31' },
  { type: 'image', src: gallery_32, id: 'img-32' },
  { type: 'image', src: gallery_33, id: 'img-33' },
  { type: 'image', src: gallery_34, id: 'img-34' },
  { type: 'image', src: gallery_35, id: 'img-35' },
  { type: 'image', src: gallery_36, id: 'img-36' },
  { type: 'image', src: gallery_37, id: 'img-37' },
  { type: 'image', src: gallery_38, id: 'img-38' },
  { type: 'image', src: gallery_62, id: 'img-62' },
  { type: 'image', src: gallery_64, id: 'img-64' },
  { type: 'image', src: gallery_65, id: 'img-65' },
  { type: 'image', src: gallery_66, id: 'img-66' },
  { type: 'image', src: gallery_68, id: 'img-68' },
  { type: 'image', src: gallery_69, id: 'img-69' },
  { type: 'image', src: gallery_70, id: 'img-70' },
  { type: 'image', src: gallery_71, id: 'img-71' },
  { type: 'image', src: gallery_72, id: 'img-72' },
  { type: 'image', src: gallery_73, id: 'img-73' },
  { type: 'image', src: gallery_74, id: 'img-74' },
  { type: 'image', src: gallery_75, id: 'img-75' },
  { type: 'image', src: gallery_76, id: 'img-76' },
  { type: 'image', src: gallery_77, id: 'img-77' },
  { type: 'image', src: gallery_78, id: 'img-78' },
  { type: 'image', src: gallery_14, id: 'img-14' },
  { type: 'image', src: gallery_15, id: 'img-15' },
  { type: 'image', src: gallery_16, id: 'img-16' },
  { type: 'image', src: gallery_17, id: 'img-17' },
  { type: 'image', src: gallery_39, id: 'img-39' },
  { type: 'image', src: gallery_40, id: 'img-40' },
  { type: 'image', src: gallery_18, id: 'img-18' },
  { type: 'image', src: gallery_19, id: 'img-19' },
  { type: 'image', src: gallery_20, id: 'img-20' },
  { type: 'image', src: gallery_21, id: 'img-21' },
  { type: 'image', src: gallery_22, id: 'img-22' },
  { type: 'image', src: gallery_23, id: 'img-23' },
  { type: 'image', src: gallery_24, id: 'img-24' },
  { type: 'image', src: gallery_25, id: 'img-25' },
  { type: 'image', src: gallery_26, id: 'img-26' },
  { type: 'image', src: gallery_27, id: 'img-27' },
  { type: 'image', src: gallery_28, id: 'img-28' },
  { type: 'image', src: gallery_29, id: 'img-29' },
  { type: 'image', src: gallery_30, id: 'img-30' },
];

// videoItems array with custom thumbnail for video 1
const videoItems: VideoItem[] = [
  { 
    type: 'video', 
    src: '/video/Tours/1.mp4', 
    id: 'video-1', 
    aspectRatio: "3 / 4",
    thumbnail: '/video/Tours/1-thumbnail.webp' // Custom thumbnail for video 1
  },
  { type: 'video', src: '/video/Tours/2.mp4', id: 'video-2', aspectRatio: "3 / 4" },
];

// ----- MANUAL ORDERING SETUP -----
// Build a map for quick lookup by id
const itemsMap = new Map<string, GalleryItem>();
[...videoItems, ...imageItems].forEach(item => itemsMap.set(item.id, item));

// Define the exact order you want.
const orderedIds = [
  'video-1',
  'img-93',
  'img-92',
  'img-91',
  'img-90',
  'img-89',
  'img-88',
  'img-87',
  'img-86',
  'img-85',
  'img-84',
  'img-83',
  'img-82',
  'img-81',
  'img-77',
  'img-52',
  'img-51',
  'img-50',
  'img-17',
  'img-16',
  'img-15',
  'img-14',
  'img-13',
  'img-12',
  'img-11',
  'img-10',
  'img-9',
  'img-8',
  'img-7',
  'img-6',
  'img-5',
  'img-4',
  'img-3',
  'img-2',
  'img-1',
  'img-76',
  'video-2',
  'img-75',
  'img-74',
  'img-73',
  'img-72',
  'img-71',
  'img-70',
  'img-69',
  'img-68',
  'img-67',
  'img-66',
  'img-65',
  'img-62',
  'img-64',
  'img-34',
  'img-33',
  'img-32',
  'img-31',
  'img-30',
  'img-29',
  'img-28',
  'img-27',
  'img-26',
  'img-25',
  'img-24',
  'img-23',
  'img-22',
  'img-21',
  'img-20',
  'img-19',
  'img-18',
  'img-61',
  'img-60',
  'img-59',
  'img-58',
  'img-57',
  'img-56',
  'img-55',
  'img-54',
  'img-53',
  'img-79',
  'img-78',
  'img-80',
  'img-49',
  'img-48',
  'img-47',
  'img-46',
  'img-45',
  'img-44',
  'img-43',
  'img-42',
  'img-41',
  'img-40',
  'img-39',
  'img-38',
  'img-37',
  'img-36',
];

// Generate galleryItems in the exact order specified above
const galleryItems: GalleryItem[] = orderedIds
  .map(id => itemsMap.get(id))
  .filter((item): item is GalleryItem => item !== undefined);
// ----- END MANUAL ORDERING -----

export default function GalleryComponent() {
  const params = useParams();
  const lang = params?.lang as string || 'en';
  
  // Get translations based on current language
  const translations = pageTranslations[lang as keyof typeof pageTranslations] || pageTranslations.en;

  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Pause video when closing lightbox or navigating
  useEffect(() => {
    if (!isOpen && currentItem?.type === 'video') {
      const videoElement = videoRefs.current[currentItem.id];
      if (videoElement) {
        videoElement.pause();
      }
    }
  }, [isOpen, currentItem]);

  const openLightbox = (item: GalleryItem, index: number) => {
    setCurrentItem(item);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentItem(null);
    setCurrentIndex(0);
  };

  const nextItem = () => {
    if (currentItem?.type === 'video' && videoRefs.current[currentItem.id]) {
      videoRefs.current[currentItem.id]?.pause();
    }
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentItem(galleryItems[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevItem = () => {
    if (currentItem?.type === 'video' && videoRefs.current[currentItem.id]) {
      videoRefs.current[currentItem.id]?.pause();
    }
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentItem(galleryItems[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextItem();
      else if (e.key === 'ArrowLeft') prevItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div>
      <div className="mt-[165px] sm:mt-[165px] mx-8 mb-12">
        <p className="text-[14px] text-gray-700 mt-4">
          <span className="text-[#ccc] hover:text-[#035C7A]">
            <Link href={`/${lang === 'en' ? '' : lang}`}>{translations.home}</Link>
          </span>{" "}
          / {translations.gallery}
        </p>
        <h2 className="text-[42px] font-semibold text-black text-left">{translations.pageTitle}</h2>
      </div>

      {/* Unified masonry grid for both images and videos */}
      <div className="mx-8 mb-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative overflow-hidden rounded-[3px] shadow-xl cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(item, index)}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-auto rounded-[3px] transition-transform group-hover:scale-105"
                  quality={90}
                />
              ) : (
                // Video container with fixed aspect ratio
                <div className="relative bg-black" style={{ aspectRatio: item.aspectRatio }}>
                  <video
                    className="absolute top-0 left-0 w-full h-full rounded-[3px] object-cover"
                    preload="metadata"
                    playsInline
                    muted
                    loop
                    poster={item.thumbnail} // Custom thumbnail for video
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  {/* Play button overlay – purely visual, click opens lightbox */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
                    <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                      <svg
                        className="w-8 h-8 text-[#025C7A]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && currentItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
          <div className="relative w-full h-full flex justify-center items-center">
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white text-5xl hover:text-gray-300 z-50 w-12 h-12 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
            >
              &times;
            </button>
            <button
              onClick={prevItem}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-50 w-12 h-12 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
            >
              &larr;
            </button>
            <button
              onClick={nextItem}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-50 w-12 h-12 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
            >
              &rarr;
            </button>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded-full">
              {currentIndex + 1} / {galleryItems.length}
            </div>
            <div className="max-w-7xl max-h-[90vh] mx-auto px-12">
              {currentItem.type === 'image' ? (
                <Image
                  className="object-contain max-h-[90vh] max-w-full"
                  src={currentItem.src}
                  alt={`Gallery Image ${currentIndex + 1}`}
                  width={1200}
                  height={800}
                  priority
                />
              ) : (
                <video
                  ref={el => {
                    videoRefs.current[currentItem.id] = el;
                  }}
                  src={currentItem.src}
                  className="max-h-[90vh] max-w-full"
                  controls
                  autoPlay
                  playsInline
                  poster={currentItem.thumbnail} // Also show thumbnail in lightbox before play
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}