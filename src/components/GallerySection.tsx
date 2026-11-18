"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { GalleryAlbum, GalleryPhoto } from "@/data/types";
import {
  Camera,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface GallerySectionProps {
  lang: Language;
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const { content } = useContent();
  const albums: GalleryAlbum[] = content.galleryAlbums || [];
  const photos: any[] = content.galleryPhotos || [];

  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Active album object if an album is selected
  const activeAlbum = albums.find((a) => a.id === selectedAlbumId);

  // Filter photos to only those belonging to the currently selected album
  const currentAlbumPhotos = selectedAlbumId
    ? photos.filter((p) => p.albumId === selectedAlbumId)
    : [];

  const handleSelectAlbum = (albumId: string) => {
    setSelectedAlbumId(albumId);
    setActivePhotoIndex(null);
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
    setActivePhotoIndex(null);
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const showNextPhoto = useCallback(() => {
    if (activePhotoIndex === null || currentAlbumPhotos.length === 0) return;
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev + 1) % currentAlbumPhotos.length : 0
    );
  }, [activePhotoIndex, currentAlbumPhotos.length]);

  const showPrevPhoto = useCallback(() => {
    if (activePhotoIndex === null || currentAlbumPhotos.length === 0) return;
    setActivePhotoIndex((prev) =>
      prev !== null
        ? (prev - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length
        : 0
    );
  }, [activePhotoIndex, currentAlbumPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNextPhoto();
      if (e.key === "ArrowLeft") showPrevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, showNextPhoto, showPrevPhoto]);

  // Touch swipe support for mobile lightbox
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      showNextPhoto();
    } else if (distance < -45) {
      showPrevPhoto();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePhotoIndex]);

  const currentPhoto =
    activePhotoIndex !== null ? currentAlbumPhotos[activePhotoIndex] : null;

  return (
    <section
      id="gallery"
      className="py-12 sm:py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#205A98]/20 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VIEW 1: ALBUM DIRECTORY / LIST VIEW */}
        {!selectedAlbumId ? (
          <div>
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#205A98]/20 border border-[#205A98]/40 text-[#e64d45] text-xs font-bold uppercase tracking-wider mb-4">
                <FolderOpen className="w-3.5 h-3.5 text-[#e64d45]" />
                <span>{lang === "ne" ? "फोटो एल्बमहरू" : "Photo Albums"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {lang === "ne"
                  ? "१५ वर्षका अभियानहरू: फोटो एल्बम सूची"
                  : "Visual Archives: Select an Album to View Photos"}
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-300 leading-relaxed">
                {lang === "ne"
                  ? "तलका एल्बमहरूबाट कुनै एक छान्नुहोस् र सोही कार्यक्रमका तस्बिरहरू मात्र हेर्नुहोस्।"
                  : "Browse our curated photo albums below. Click any album to view its exclusive photo collection."}
              </p>
            </div>

            {/* Album Grid with Thumbnails, Titles & Photo Counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {albums.map((album) => {
                const count = photos.filter((p) => p.albumId === album.id).length;

                return (
                  <div
                    key={album.id}
                    onClick={() => handleSelectAlbum(album.id)}
                    className="group rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#D0372F] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#D0372F]/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Album Thumbnail Cover */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                        <img
                          src={album.coverImage}
                          alt={lang === "ne" ? album.titleNe : album.titleEn}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                        {/* Photo Count Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-white border border-slate-700 shadow-md">
                            <Camera className="w-3.5 h-3.5 text-[#e64d45]" />
                            <span>
                              {lang === "ne"
                                ? `${count} तस्बिरहरू`
                                : `${count} Photos`}
                            </span>
                          </span>
                        </div>

                        {/* Category Tag */}
                        <div className="absolute bottom-3 left-4">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#e64d45] flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{lang === "ne" ? "एल्बम संकलन" : "Album Collection"}</span>
                          </span>
                        </div>
                      </div>

                      {/* Album Details */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#e64d45] transition leading-snug mb-2.5">
                          {lang === "ne" ? album.titleNe : album.titleEn}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                          {lang === "ne" ? album.descNe : album.descEn}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#e64d45]">
                      <span>
                        {lang === "ne"
                          ? "यो एल्बमका तस्बिरहरू हेर्नुहोस्"
                          : "View Album Photos"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-[#D0372F] group-hover:text-white flex items-center justify-center transition">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Photos Summary */}
            <div className="mt-16 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-[#e64d45]" />
              <span>
                {lang === "ne"
                  ? `कुल ${albums.length} वटा विशेष एल्बम र ${photos.length} तस्बिरहरू संकलित`
                  : `${albums.length} Featured Albums and ${photos.length} Photographs`}
              </span>
            </div>
          </div>
        ) : (
          /* VIEW 2: ALBUM DETAIL VIEW (Shows ONLY this album's photos!) */
          <div className="animate-fade-in">
            {/* Top Navigation & Breadcrumb */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
              <button
                onClick={handleBackToAlbums}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs sm:text-sm font-bold transition cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>
                  {lang === "ne"
                    ? "← सबै एल्बम सूचीमा फर्कनुहोस्"
                    : "← Back to All Albums"}
                </span>
              </button>

              {/* Quick Switch to Other Albums */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 hidden sm:inline">
                  {lang === "ne" ? "अर्को एल्बम छान्नुहोस्:" : "Switch Album:"}
                </span>
                <select
                  value={selectedAlbumId}
                  onChange={(e) => handleSelectAlbum(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D0372F] transition"
                >
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>
                      {lang === "ne" ? a.titleNe : a.titleEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Album Banner Card */}
            {activeAlbum && (
              <div className="mb-8 sm:mb-12 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-[#164070] to-slate-900 border border-[#205A98]/40 shadow-xl flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-700 shadow-md">
                  <img
                    src={activeAlbum.coverImage}
                    alt={lang === "ne" ? activeAlbum.titleNe : activeAlbum.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0372F]/10 text-[#e64d45] border border-[#D0372F]/30 text-xs font-bold uppercase tracking-wider mb-2">
                    <Camera className="w-3.5 h-3.5" />
                    <span>
                      {lang === "ne"
                        ? `एल्बम: ${currentAlbumPhotos.length} तस्बिरहरू`
                        : `Album: ${currentAlbumPhotos.length} Photos`}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1.5 sm:mb-2">
                    {lang === "ne" ? activeAlbum.titleNe : activeAlbum.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {lang === "ne" ? activeAlbum.descNe : activeAlbum.descEn}
                  </p>
                </div>
              </div>
            )}

            {/* ONLY This Album's Photos Grid - 2 columns on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {currentAlbumPhotos.map((photo, idx) => {
                const photoSrc = photo.url || photo.imageUrl;
                return (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(idx)}
                    className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-md hover:border-[#D0372F] transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Photo Thumbnail */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                      <img
                        src={photoSrc}
                        alt={lang === "ne" ? photo.titleNe : photo.titleEn}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                      {/* Zoom Icon Button on Hover */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e64d45]" />
                      </div>

                      {/* Bottom Meta on Image */}
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#e64d45] shrink-0" />
                          <span className="truncate max-w-[80px] sm:max-w-[150px]">
                            {lang === "ne" ? photo.locationNe : photo.locationEn}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-400 shrink-0">
                          <Calendar className="w-3 h-3" />
                          <span>{photo.year}</span>
                        </span>
                      </div>
                    </div>

                    {/* Photo Title */}
                    <div className="p-2.5 sm:p-4 flex-grow flex flex-col justify-between bg-slate-800/95">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-[#e64d45] transition">
                          {lang === "ne" ? photo.titleNe : photo.titleEn}
                        </h4>
                      </div>

                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[10px] sm:text-[11px] text-[#e64d45] font-semibold">
                        <span>
                          {lang === "ne" ? "हेर्नुहोस्" : "Click to view"}
                        </span>
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions to Browse Other Albums */}
            <div className="mt-14 pt-8 border-t border-slate-800 text-center">
              <button
                onClick={handleBackToAlbums}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D0372F] hover:bg-[#ab2720] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>
                  {lang === "ne"
                    ? "सबै फोटो एल्बम सूचीमा फर्कनुहोस्"
                    : "Back to All Photo Albums"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400">
                  {lang === "ne"
                    ? `तस्बिर ${activePhotoIndex! + 1} / ${currentAlbumPhotos.length}`
                    : `Photo ${activePhotoIndex! + 1} of ${currentAlbumPhotos.length}`}
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  {lang === "ne" ? "(बायाँ/दायाँ स्वाइप वा एरो प्रयोग गर्नुहोस्)" : "(Swipe or use arrows to navigate)"}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport with Next/Prev Arrows & Touch Swipe */}
            <div
              className="relative flex-grow flex items-center justify-center bg-black/85 overflow-hidden min-h-[260px] sm:min-h-[460px] select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={currentPhoto.url || currentPhoto.imageUrl}
                alt={lang === "ne" ? currentPhoto.titleNe : currentPhoto.titleEn}
                className="max-h-[55vh] sm:max-h-[65vh] w-auto max-w-full object-contain mx-auto pointer-events-none"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevPhoto();
                }}
                className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-[#D0372F] text-white flex items-center justify-center border border-slate-700 transition cursor-pointer shadow-lg z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextPhoto();
                }}
                className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-[#D0372F] text-white flex items-center justify-center border border-slate-700 transition cursor-pointer shadow-lg z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Caption Footer */}
            <div className="p-4 sm:p-5 sm:p-6 bg-slate-900 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
                  {lang === "ne" ? currentPhoto.titleNe : currentPhoto.titleEn}
                </h3>
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400 shrink-0">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#e64d45]" />
                    <span>
                      {lang === "ne" ? currentPhoto.locationNe : currentPhoto.locationEn}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2c75c4]" />
                    <span>{currentPhoto.year}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
