"use client";

import React, { useRef, useState, useEffect } from "react";

interface Testimonial {
  name: string;
  location: string;
  content: string;
  img: string;
  rating: number;
}

interface VideoData {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

interface TestimonialVideoSectionProps {
  heading: string;
  testimonials: Testimonial[];
  ctaText: string;
  currentLocale: string;
}

const localeBasedVideoData: Record<string, VideoData[]> = {
  en: [
    {
      id: 1,
      title: "Great experience with Eaze Tours!",
      videoUrl: "/video/en/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Excellent Service and Support",
      videoUrl: "/video/en/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Highly Recommend Their Packages",
      videoUrl: "/video/en/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
    {
      id: 4,
      title: "Amazing Journey with Eaze Tours",
      videoUrl: "/video/en/Eazetour_review_4.mp4",
      thumbnail: "/images/thumbnail_4.png",
    },
  ],
  es: [
    {
      id: 1,
      title: "¡Gran experiencia con Eaze Tours!",
      videoUrl: "/video/es/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Excelente servicio y apoyo",
      videoUrl: "/video/es/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Recomiendo mucho sus paquetes",
      videoUrl: "/video/es/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
    {
      id: 4,
      title: "Viaje increíble con Eaze Tours",
      videoUrl: "/video/es/Eazetour_review_4.mp4",
      thumbnail: "/images/thumbnail_4.png",
    },
  ],
  fr: [
    {
      id: 1,
      title: "Super expérience avec Eaze Tours !",
      videoUrl: "/video/fr/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Excellent service et soutien",
      videoUrl: "/video/fr/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Je recommande vivement leurs forfaits",
      videoUrl: "/video/fr/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
    {
      id: 4,
      title: "Voyage incroyable avec Eaze Tours",
      videoUrl: "/video/fr/Eazetour_review_4.mp4",
      thumbnail: "/images/thumbnail_4.png",
    },
  ],
  de: [
    {
      id: 1,
      title: "Tolle Erfahrung mit Eaze Tours!",
      videoUrl: "/video/de/Eazetour_review_1.mp4",
      thumbnail: "/images/thumbnail_1.png",
    },
    {
      id: 2,
      title: "Ausgezeichneter Service und Support",
      videoUrl: "/video/de/Eazetour_review_2.mp4",
      thumbnail: "/images/thumbnail_2.png",
    },
    {
      id: 3,
      title: "Sehr zu empfehlen!",
      videoUrl: "/video/de/Eazetour_review_3.mp4",
      thumbnail: "/images/thumbnail_3.png",
    },
    {
      id: 4,
      title: "Unglaubliche Reise mit Eaze Tours",
      videoUrl: "/video/de/Eazetour_review_4.mp4",
      thumbnail: "/images/thumbnail_4.png",
    },
  ],
};

export default function TestimonialVideoSection({
  heading,
  testimonials,
  ctaText,
  currentLocale,
}: TestimonialVideoSectionProps) {
  // Testimonial slider refs & state
  const testimonialSliderRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3); // default desktop

  // Video refs & state
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideos, setPlayingVideos] = useState<boolean[]>([]);
  const [fullscreenStates, setFullscreenStates] = useState<boolean[]>([]);

  const videoData = localeBasedVideoData[currentLocale] || localeBasedVideoData["en"];

  // Determine number of slides to show based on viewport width
  const getSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 768) return 1;       // mobile
    if (width >= 768 && width < 1024) return 2; // tablet
    return 3;                         // desktop
  };

  // Update slidesPerView on resize
  useEffect(() => {
    const updateSlidesPerView = () => {
      const newSlides = getSlidesPerView();
      setSlidesPerView(newSlides);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Initialize video states when locale changes
  useEffect(() => {
    setPlayingVideos(Array(videoData.length).fill(false));
    setFullscreenStates(Array(videoData.length).fill(false));
  }, [currentLocale, videoData.length]);

  // Slide testimonials when index or slidesPerView changes
  useEffect(() => {
    const slider = testimonialSliderRef.current;
    if (!slider) return;

    const slideWidthPercent = 100 / slidesPerView;
    slider.style.transition = "transform 0.4s ease-in-out";
    slider.style.transform = `translateX(-${testimonialIndex * slideWidthPercent}%)`;
  }, [testimonialIndex, slidesPerView]);

  // Clamp testimonialIndex when slidesPerView changes or number of testimonials changes
  useEffect(() => {
    const maxIndex = Math.max(0, testimonials.length - slidesPerView);
    if (testimonialIndex > maxIndex) {
      setTestimonialIndex(maxIndex);
    }
  }, [slidesPerView, testimonials.length, testimonialIndex]);

  // Testimonial navigation
  const handleNextTestimonial = () => {
    const maxIndex = Math.max(0, testimonials.length - slidesPerView);
    setTestimonialIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Video play handler
  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
        video.removeAttribute("controls");
      }
    });

    const selectedVideo = videoRefs.current[index];
    if (selectedVideo) {
      selectedVideo.play();
      selectedVideo.setAttribute("controls", "true");
      setPlayingVideos(videoRefs.current.map((_, i) => i === index));
    }
  };

  // Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      const newStates = videoRefs.current.map((video) => {
        const elem = document.fullscreenElement;
        return elem === video || elem === video?.parentElement;
      });
      setFullscreenStates(newStates);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Calculate width for each testimonial box based on slidesPerView
  const getTestimonialWidth = () => {
    const slideWidthPercent = 100 / slidesPerView;
    // margin on each side is 0.75rem (12px) from Tailwind's m-3, total horizontal margin = 24px
    return `calc(${slideWidthPercent}% - 24px)`;
  };

  return (
    <>
      {/* Header with title and navigation buttons */}
      <div className="flex text-center sm:text-left mb-4 flex-wrap justify-center gap-4 mx-12 sm:justify-between sm:gap-0">
        <h2 className="text-2xl font-semibold text-black" style={{ fontSize: "32px" }}>
          {heading}
        </h2>
        <div className="flex gap-4 z-[10]">
          <button
            onClick={handlePrevTestimonial}
            disabled={testimonialIndex === 0}
            className="bg-[#E4F8FF] text-2xl text-[#025C7A] py-[10px] px-5 rounded-full hover:bg-gray-700 hover:text-[#fff] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextTestimonial}
            disabled={testimonialIndex >= testimonials.length - slidesPerView}
            className="bg-[#E4F8FF] text-2xl text-[#025C7A] py-[10px] px-5 rounded-full hover:bg-gray-700 hover:text-[#fff] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="testimonial-slider-container mb-2 relative">
        <div className="testimonial-slider relative overflow-hidden mx-auto sm:mx-4">
          <div
            className="testimonial-slider-wrapper flex transition-transform duration-300 ease-in-out"
            ref={testimonialSliderRef}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-box flex flex-col justify-between relative flex-shrink-0 m-3 bg-white rounded-[30px] shadow-[0px_0px_21.9px_0px_#00000029] overflow-visible group p-10"
                style={{ width: getTestimonialWidth() }}
              >
                <div className="flex justify-start gap-3 items-center mb-4">
                  <div className="w-[60px] h-[60px] p-2 bg-[#025C7A] rounded-full overflow-hidden">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-[#000] font-500">{testimonial.location}</p>
                  </div>
                </div>

                <p className="text-[#777777] mb-4 text-justify">{testimonial.content}</p>

                <div className="flex justify-start items-center">
                  <p className="text-gray-700 text-[18px] mr-2">5.0</p>
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-[#FE7831] font-500 text-[22px]">
                      &#9733;
                    </span>
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }, (_, i) => (
                    <span key={i + testimonial.rating} className="text-gray-300 text-[18px]">
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section – unchanged */}
      <div className="flex justify-center mt-8 mb-8 px-4">
        <div className="w-full max-w-screen-xl px-6 lg:px-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoData.map((video, index) => (
              <div
                key={video.id}
                className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform transform hover:scale-105"
              >
                <div
                  className="relative w-full bg-black cursor-pointer"
                  style={{ aspectRatio: "3 / 4" }}
                  onClick={() => handlePlay(index)}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className={`absolute top-0 left-0 w-full h-full rounded-t-2xl z-10 ${
                      fullscreenStates[index] ? "object-contain" : "object-cover"
                    }`}
                    poster={video.thumbnail}
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>

                  {!playingVideos[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
                      <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-[#025C7A]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center my-12">
        <a href="/testimonials">
          <button className="px-8 py-4 mt-4 mb-12 border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            {ctaText}
          </button>
        </a>
      </div>
    </>
  );
}
