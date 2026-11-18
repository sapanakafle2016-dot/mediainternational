"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AchievementsSection from "@/components/AchievementsSection";
import Link from "next/link";
import { ChevronRight, Home, Award } from "lucide-react";

export default function AchievementsPage() {
  const [lang, setLang] = useState<Language>("ne");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar lang={lang} setLang={setLang} />

      {/* Page Header Banner */}
      <div className="bg-[#205A98] text-white py-12 sm:py-16 border-b-4 border-[#D0372F] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>{lang === "ne" ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[#e64d45] font-bold">
              {lang === "ne" ? "उपलब्धिहरू" : "Achievements"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === "ne"
              ? "१५ वर्षे उपलब्धि र संस्थागत साझेदारी"
              : "15-Year Achievements & Institutional Alliances"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {lang === "ne"
              ? "३५०+ राष्ट्रिय मेला, ५ लाख+ नागरिकहरूमाझ प्रभाव, र सातै प्रदेशमा सक्रिय उपस्थिति।"
              : "Explore our verified track record of expos, municipal collaborations, and apex regulator partnerships."}
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <AchievementsSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
