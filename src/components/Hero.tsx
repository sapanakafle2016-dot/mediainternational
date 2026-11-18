"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const { content } = useContent();
  const slides = content.heroSlides || [];
  const stats = content.stats || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = slides.length || 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Touch swipe handlers for mobile
  const minSwipeDistance = 45;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Autoplay slider every 5 seconds
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, totalSlides]);

  if (slides.length === 0) return null;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Large Image Slider Container */}
      <div className="relative w-full h-[430px] sm:h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Large Background Image with Zoom Pan Effect */}
              <img
                src={slide.imageUrl}
                alt={lang === "ne" ? slide.titleNe : slide.titleEn}
                className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Gradient Scrim Overlay for Crystal Clear Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent"></div>

              {/* Title Only Overlay Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-10 text-center">
                  {/* Red Accent Top Tag */}
                  {(slide.badgeNe || slide.badgeEn) && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#D0372F] text-white text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-5 shadow-lg shadow-[#D0372F]/30 animate-fade-in">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-ping"></span>
                      <span>{lang === "ne" ? slide.badgeNe : slide.badgeEn}</span>
                    </div>
                  )}

                  {/* Bold Title Responsive */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-snug sm:leading-[1.15] drop-shadow-2xl">
                    {lang === "ne" ? slide.titleNe : slide.titleEn}
                  </h1>

                  {/* Brand Color Line Accent */}
                  <div className="w-20 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-[#205A98] via-[#D0372F] to-white rounded-full mx-auto mt-4 sm:mt-6 shadow-md"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous Arrow Button - Scaled for Mobile */}
        {totalSlides > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-[#D0372F] text-white border border-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105 shadow-xl"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Next Arrow Button - Scaled for Mobile */}
        {totalSlides > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-[#D0372F] text-white border border-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105 shadow-xl"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Slide Counter & Dots Indicators */}
        {totalSlides > 1 && (
          <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-2">
            {/* Dots */}
            <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              {slides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setCurrentSlide(dotIndex)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    dotIndex === currentSlide
                      ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#D0372F]"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Counter Bar Beneath Slider (Styled in Blue & Red Brand Colors) */}
      {stats.length > 0 && (
        <div className="bg-[#205A98] border-t-4 border-[#D0372F] text-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-2xl bg-white/5 lg:bg-transparent border border-white/10 lg:border-none text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white/95 mt-1 leading-tight">
                    {lang === "ne" ? stat.labelNe : stat.labelEn}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/75 mt-0.5 leading-snug line-clamp-2">
                    {lang === "ne" ? stat.descNe : stat.descEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
