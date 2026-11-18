"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EntrepreneurshipSection from "@/components/EntrepreneurshipSection";
import Link from "next/link";
import { ChevronRight, Home, Compass } from "lucide-react";

export default function CampaignsPage() {
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
              {lang === "ne" ? "अभियान" : "Campaigns"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === "ne"
              ? "‘काम गरौँ आफ्नै देशमा’ राष्ट्रिय महाअभियान"
              : "'Kam Garau Aaphnai Deshma' — National Movement"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {lang === "ne"
              ? "व्यावसायिक साक्षरता, स्वदेशी स्रोतको सदुपयोग र युवाहरूलाई स्वदेशमै स्वरोजगार बनाउने राष्ट्रव्यापी अभियान।"
              : "Inspiring youth to turn domestic raw materials and vocational skills into sustainable local enterprises."}
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <EntrepreneurshipSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
