"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ClientHeroSliderProps {
  locale: string;
}

const ClientHeroSlider: React.FC<ClientHeroSliderProps> = ({ locale }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [containerHeight, setContainerHeight] = useState("750px sm:h-[100vh]");

  // ✅ Ref to always have the latest videoSrc for comparison
  const videoSrcRef = useRef(videoSrc);
  useEffect(() => {
    videoSrcRef.current = videoSrc;
  }, [videoSrc]);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted) {
        videoRef.current.play().catch(err => console.error("Autoplay blocked:", err));
      }
    }
  };

  const getVideoPath = () => {
    const isMobile = window.innerWidth <= 768;
    switch (locale) {
      case "es":
        return isMobile ? "/video/spanish_mobile.mp4" : "/video/spanish.mp4";
      case "fr":
        return isMobile ? "/video/french_mobile.mp4" : "/video/french.mp4";
      case "de":
        return isMobile ? "/video/german_mobile.mp4" : "/video/german.mp4";
      case "en":
      default:
        return isMobile ? "/video/Eazetour_Mobile_Format.mp4" : "/video/Eaze_mp4.mp4";
    }
  };

  // Update video source and container height on resize or locale change
  useEffect(() => {
    const updateVideoSrcAndHeight = () => {
      const newSrc = getVideoPath();
      // ✅ Compare with the ref's current value (always up‑to‑date)
      if (videoSrcRef.current !== newSrc) {
        setVideoSrc(newSrc);
        setVideoKey(prevKey => prevKey + 1);
        setReloadCount(prev => prev + 1);
      }

      // Set container height based on screen size
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        setContainerHeight("70vh");
      } else if (window.innerWidth > 1024) {
        setContainerHeight("100vh");
      } else {
        setContainerHeight("100vh");
      }
    };

    // Run once on mount
    updateVideoSrcAndHeight();

    // Debounce resize handler (optional but recommended)
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVideoSrcAndHeight, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [locale]); // only locale changes should re‑create the handler

  // Auto‑mute after 5 reloads
  useEffect(() => {
    if (reloadCount >= 5) {
      setIsMuted(true);
    }
  }, [reloadCount]);

  // Auto‑mute when video goes out of view
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure video loops correctly
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const handleEnded = () => {
        video.currentTime = 0;
        video.play();
      };
      video.addEventListener("ended", handleEnded);
      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      key={videoKey}           // still useful if you need to force Swiper re‑init on actual src change
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
    >
      <SwiperSlide>
        <div className={`relative w-full`} style={{ height: containerHeight }}>
          <div className="absolute inset-0 bg-black opacity-0 z-10"></div>

          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              loop
              muted={isMuted}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Audio Toggle Button */}
          <button
            onClick={toggleAudio}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-lg text-black text-sm z-[100]"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ClientHeroSlider;