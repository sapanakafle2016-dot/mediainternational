"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  UserCheck,
  Layers,
  Compass,
  Award,
  Camera,
  Mail,
  ChevronRight,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const [lang, setLang] = useState<Language>("ne");
  const { content } = useContent();
  const chairman = content.chairmanMessage || {};
  const programs = content.programs || [];
  const albums = content.galleryAlbums || [];
  const events = content.events || [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar lang={lang} setLang={setLang} />

      <main className="flex-grow">
        {/* 1. Large Slider Hero with Title Only and Stats Counter Bar */}
        <Hero lang={lang} />

        {/* 2. Welcome & About Us Highlight Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-[#205A98]" />
                  <span>{lang === "ne" ? "हाम्रो बारेमा" : "About Media International"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  {lang === "ne"
                    ? "आर्थिक जागरण, वित्तीय साक्षरता र समृद्धिका १५ गौरवमय वर्ष"
                    : "15 Years Pioneering Financial Literacy & Enterprise Nationwide"}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "ne"
                    ? "विगत १५ वर्षदेखि मिडिया इन्टरनेशनलले नेपालका सातै प्रदेशमा वित्तीय साक्षरता महाअभियान, बैंकिङ तथा बीमा पहुँच, पुँजी बजार सचेतना र ‘काम गरौँ आफ्नै देशमा’ मार्फत नागरिक तथा युवा उद्यमीहरूलाई सशक्त बनाउँदै आएको छ।"
                    : "For over 15 years, Media International has spearheaded nationwide financial literacy conclaves, banking access, insurance awareness, and domestic youth enterprise advocacy across all 7 provinces of Nepal."}
                </p>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs sm:text-sm font-bold transition shadow-md group"
                  >
                    <span>{lang === "ne" ? "संस्थागत विवरण र १५ वर्षे यात्रा थप हेर्नुहोस्" : "Explore Our Full 15-Year Story"}</span>
                    <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Quick Feature Cards */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 sm:p-6 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="text-2xl sm:text-3xl font-black text-[#205A98]">१५+</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 leading-tight">
                    {lang === "ne" ? "वर्षको अनवरत यात्रा" : "Years of Journey"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    {lang === "ne" ? "आर्थिक जागरणमा समर्पित" : "Dedicated to Literacy"}
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-red-50 border border-red-100">
                  <div className="text-2xl sm:text-3xl font-black text-[#D0372F]">७</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 leading-tight">
                    {lang === "ne" ? "वटै प्रदेशमा पहुँच" : "All 7 Provinces"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    {lang === "ne" ? "मेचीदेखि महाकालीसम्म" : "East to West Nepal"}
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700">३५०+</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 leading-tight">
                    {lang === "ne" ? "राष्ट्रिय मेला तथा कार्यक्रम" : "Expos & Conclaves"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    {lang === "ne" ? "स्थानीय तहसम्म सञ्चालन" : "Local Municipal Level"}
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="text-2xl sm:text-3xl font-black text-amber-700">५ लाख+</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 leading-tight">
                    {lang === "ne" ? "नागरिकहरू लाभान्वित" : "Citizens Reached"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    {lang === "ne" ? "प्रत्यक्ष तथा अप्रत्यक्ष" : "Direct & Indirect"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Chairman Snippet Highlight */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-56 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white shadow-xl shrink-0">
                <img
                  src={chairman.photoUrl || "/images/madhav.jpg"}
                  alt="Madhav Niraula"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 text-center md:text-left flex-grow">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0372F]/10 text-[#D0372F] text-xs font-bold uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{lang === "ne" ? chairman.badgeNe : chairman.badgeEn}</span>
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 italic leading-snug">
                  {lang === "ne" ? chairman.quoteNe : chairman.quoteEn}
                </blockquote>

                <div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    {lang === "ne" ? chairman.nameNe : chairman.nameEn}
                  </div>
                  <div className="text-xs text-[#205A98] font-bold">
                    {lang === "ne" ? chairman.designationNe : chairman.designationEn}
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href="/chairman-message"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D0372F] hover:underline"
                  >
                    <span>{lang === "ne" ? "अध्यक्षको पूरा मन्तव्य पढ्नुहोस्" : "Read Chairman's Full Speech"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Programs Pillars Preview */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] text-xs font-bold uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{lang === "ne" ? "हाम्रा कार्यक्रमहरू" : "Core Programs"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {lang === "ne" ? "वित्तीय साक्षरताका मुख्य स्तम्भहरू" : "Core Literacy Pillars"}
                </h2>
              </div>
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#205A98] hover:underline"
              >
                <span>{lang === "ne" ? "सबै कार्यक्रमहरू हेर्नुहोस्" : "View All Programs"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {programs.slice(0, 3).map((prog) => (
                <div
                  key={prog.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-bold bg-[#D0372F]/10 text-[#D0372F]">
                      {lang === "ne" ? prog.badgeNe : prog.badgeEn}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2.5">
                      {lang === "ne" ? prog.titleNe : prog.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {lang === "ne" ? prog.descriptionNe : prog.descriptionEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <Link
                      href="/programs"
                      className="text-xs font-bold text-[#205A98] hover:underline flex items-center gap-1"
                    >
                      <span>{lang === "ne" ? "विस्तृत विवरण" : "Learn More"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Events & Expos Highlight Section */}
        {events.length > 0 && (
          <section className="py-12 sm:py-16 md:py-20 bg-slate-900 text-white border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0372F] text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === "ne" ? "कार्यक्रम तथा मेला" : "Events & Expos"}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {lang === "ne" ? "राष्ट्रिय कार्यक्रम तथा मेला तालिका" : "National Event Timeline"}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/events?tab=upcoming"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:underline"
                  >
                    <span>{lang === "ne" ? "आगामी कार्यक्रमहरू" : "Upcoming Events"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <span className="text-white/30">|</span>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white"
                  >
                    <span>{lang === "ne" ? "सबै हेर्नुहोस्" : "View All"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, 3).map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/80 hover:border-slate-500 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                        <img
                          src={ev.imageUrl || "/images/uploads/banking-expo-2079.webp"}
                          alt={ev.titleNe}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#205A98] text-white">
                            {ev.categoryNe}
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-bold text-white">
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm">
                            <Calendar className="w-3 h-3 text-[#e64d45]" />
                            <span>{lang === "ne" ? ev.dateNe || ev.scheduleDate : ev.dateEn || ev.scheduleDate}</span>
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm truncate max-w-[50%]">
                            <MapPin className="w-3 h-3 text-blue-300" />
                            <span className="truncate">{ev.venueNe}</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                          {lang === "ne" ? ev.titleNe : ev.titleEn}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {lang === "ne" ? ev.descriptionNe : ev.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/60 border-t border-slate-700/70 flex items-center justify-between">
                      <Link
                        href={`/events`}
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>{lang === "ne" ? "विस्तृत विवरण" : "Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="px-3 py-1 rounded-lg bg-[#D0372F] hover:bg-[#b52b24] text-white text-[11px] font-bold shadow-xs"
                      >
                        {lang === "ne" ? "सोधपुछ" : "Inquire"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Campaigns & Opportunities Callout */}
        <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Campaign Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#164070] to-[#205A98] text-white shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0372F] text-white text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{lang === "ne" ? "उद्यमशीलता अभियान" : "Entrepreneurship"}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2.5">
                    ‘काम गरौँ आफ्नै देशमा’
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5 sm:mb-6">
                    {lang === "ne"
                      ? "नेपालभित्रै सम्भावना खोज्ने, सीप र पुँजीको सही सदुपयोग गर्ने र युवालाई स्वदेशमै उद्यमी बनाउने राष्ट्रव्यापी जागरण।"
                      : "A national initiative mobilizing youth skills, concessional loans, and domestic resources to build thriving ventures in Nepal."}
                  </p>
                </div>
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#205A98] text-xs font-bold hover:bg-slate-100 transition shadow-sm w-fit"
                >
                  <span>{lang === "ne" ? "अभियानको कार्यदिशा हेर्नुहोस्" : "Explore Campaign"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Opportunities Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#8a1c17] to-[#D0372F] text-white shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === "ne" ? "राष्ट्रिय सम्भावना" : "Domestic Potential"}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2.5">
                    ‘सम्भावना’ — आर्थिक अवसरहरू
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mb-5 sm:mb-6">
                    {lang === "ne"
                      ? "कृषि–प्रशोधन, पर्यटन, हरित ऊर्जा, सूचना प्रविधि र घरेलु उत्पादनमा नेपालभित्रका अथाह आर्थिक सम्भावनाहरू।"
                      : "Unlocking opportunities across high-potential sectors like agro-processing, tourism, clean tech, and digital freelancing."}
                  </p>
                </div>
                <Link
                  href="/opportunities"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#D0372F] text-xs font-bold hover:bg-slate-100 transition shadow-sm w-fit"
                >
                  <span>{lang === "ne" ? "सम्भावनाका क्षेत्रहरू हेर्नुहोस्" : "Explore Sectors"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Gallery Albums Preview */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-950 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/20 border border-[#205A98]/40 text-[#e64d45] text-xs font-bold uppercase tracking-wider mb-2">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{lang === "ne" ? "तस्बिर ग्यालरी" : "Photo Archives"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {lang === "ne" ? "१५ वर्षका ऐतिहासिक तस्बिरहरू" : "Featured Photo Albums"}
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#e64d45] hover:underline"
              >
                <span>{lang === "ne" ? "सबै एल्बमहरू हेर्नुहोस्" : "Browse All Albums"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {albums.slice(0, 4).map((album) => (
                <Link
                  key={album.id}
                  href="/gallery"
                  className="group rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#D0372F] transition duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={album.coverImage}
                      alt={album.titleNe}
                      className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#e64d45] transition truncate">
                      {lang === "ne" ? album.titleNe : album.titleEn}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {lang === "ne" ? "एल्बम हेर्न क्लिक गर्नुहोस्" : "Click to view photos"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Bottom Call to Action for Contact */}
        <section className="py-12 sm:py-16 bg-[#205A98] text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
              {lang === "ne"
                ? "तपाईंको क्षेत्रमा वित्तीय साक्षरता तथा उद्यम कार्यक्रम आयोजना गर्न चाहनुहुन्छ?"
                : "Looking to host a Financial Literacy Conclave in your region?"}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto">
              {lang === "ne"
                ? "स्थानीय तह, बैंक, शैक्षिक संस्था तथा व्यावसायिक संगठनहरूसँग सहकार्य गर्न हामी सधैँ तत्पर छौँ।"
                : "Partner with Media International Nepal for expos, youth training, and grassroots financial awareness."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <Link
                href="/contact"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#D0372F] hover:bg-[#b52b24] text-white font-bold text-xs sm:text-sm shadow-md transition"
              >
                {lang === "ne" ? "हामीलाई सम्पर्क गर्नुहोस्" : "Contact Our Team"}
              </Link>
              <Link
                href="/about"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition"
              >
                {lang === "ne" ? "हाम्रो बारेमा थप पढ्नुहोस्" : "About Our Mission"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
