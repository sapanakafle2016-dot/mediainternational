"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import {
  Wallet,
  Building2,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Check,
  Layers,
  ArrowRight,
} from "lucide-react";

interface ProgramsProps {
  lang: Language;
}

export default function ProgramsSection({ lang }: ProgramsProps) {
  const { content } = useContent();
  const programs = content.programs || [];
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Wallet":
        return <Wallet className="w-6 h-6 text-[#205A98]" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-[#205A98]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#205A98]" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-[#205A98]" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-[#205A98]" />;
      default:
        return <Layers className="w-6 h-6 text-[#205A98]" />;
    }
  };

  const categories = [
    { id: "all", labelNe: "सबै कार्यक्रमहरू", labelEn: "All Programs" },
    { id: "finance", labelNe: "वित्तीय साक्षरता", labelEn: "Financial Literacy" },
    { id: "banking", labelNe: "बैंकिङ पहुँच", labelEn: "Banking Services" },
    { id: "insurance", labelNe: "बीमा सुरक्षा", labelEn: "Insurance" },
    { id: "capital", labelNe: "पुँजी बजार", labelEn: "Capital Markets" },
    { id: "digital", labelNe: "डिजिटल फिनटेक", labelEn: "Digital Finance" },
  ];

  const filteredPrograms =
    selectedCategory === "all"
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  return (
    <section id="programs" className="py-12 sm:py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#205A98]" />
            <span>{lang === "ne" ? "हाम्रा कार्यक्रमहरू" : "Our Core Programs"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "वित्तीय साक्षरताका पाँच आधार स्तम्भहरू"
              : "Five Pillars of Nationwide Financial Literacy"}
          </h2>
          <p className="mt-3 text-xs sm:text-base md:text-lg text-slate-600">
            {lang === "ne"
              ? "नेपालका नागरिक, युवा, महिला तथा साना व्यवसायीहरूलाई व्यावहारिक वित्तीय ज्ञान प्रदान गर्ने लक्षित तालिम तथा अन्तरक्रिया अभियान।"
              : "Structured training modules, expos, and community outreach designed to build generational wealth and financial security."}
          </p>
        </div>

        {/* Category Tabs - Mobile Scrollable */}
        <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-[#205A98] text-white shadow-sm font-bold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {lang === "ne" ? cat.labelNe : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                    {getIcon(program.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#D0372F]/10 text-[#D0372F] border border-[#D0372F]/20">
                    {lang === "ne" ? program.badgeNe : program.badgeEn}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#205A98] transition">
                  {lang === "ne" ? program.titleNe : program.titleEn}
                </h3>
                <p className="text-xs font-semibold text-[#205A98] mt-1">
                  {lang === "ne" ? program.subtitleNe : program.subtitleEn}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {lang === "ne" ? program.descriptionNe : program.descriptionEn}
                </p>

                {/* Key Takeaways */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    {lang === "ne" ? "मुख्य सिकाइ तथा अभ्यास:" : "Key Curricular Modules:"}
                  </div>
                  <ul className="space-y-2">
                    {(lang === "ne" ? program.pointsNe : program.pointsEn)?.map(
                      (point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#205A98] group-hover:underline flex items-center gap-1 cursor-pointer">
                  <span>{lang === "ne" ? "कार्यक्रम सहभागिता" : "Participate"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-1" />
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {lang === "ne" ? "७ वटै प्रदेशमा उपलब्ध" : "All 7 Provinces"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
