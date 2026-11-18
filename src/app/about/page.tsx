"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import Link from "next/link";
import { ChevronRight, Home, BookOpen } from "lucide-react";

export default function AboutPage() {
  const [lang, setLang] = useState<Language>("ne");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar lang={lang} setLang={setLang} />

      {/* Page Header Banner */}
      <div className="bg-[#205A98] text-white py-12 sm:py-16 border-b-4 border-[#D0372F] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>{lang === "ne" ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[#e64d45] font-bold">
              {lang === "ne" ? "हाम्रो बारेमा" : "About Us"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === "ne"
              ? "संस्थागत परिचय र १५ वर्षे ऐतिहासिक यात्रा"
              : "About Media International: 15-Year Journey"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {lang === "ne"
              ? "२०१० देखि नेपालका सातै प्रदेशमा वित्तीय साक्षरता, बैंकिङ पहुँच र उद्यमशीलता प्रवर्द्धनमा समर्पित अग्रणी संस्था।"
              : "A premier economic advocacy and media organization advancing financial literacy, capital market awareness, and youth enterprise across Nepal."}
          </p>
        </div>
      </div>

      <main className="flex-grow">
        {/* Full About Details & 15-Year Milestones Timeline */}
        <AboutSection lang={lang} />

        {/* Supporting Achievements Section */}
        <AchievementsSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
