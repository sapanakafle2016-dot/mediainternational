"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import {
  Sprout,
  Compass,
  Zap,
  Laptop,
  Sparkles,
  Truck,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

interface OpportunitiesProps {
  lang: Language;
}

export default function OpportunitiesSection({ lang }: OpportunitiesProps) {
  const { content } = useContent();
  const opportunities = content.opportunities || [];
  const [activeSector, setActiveSector] = useState<string>("all");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-blue-600" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-500" />;
      case "Laptop":
        return <Laptop className="w-5 h-5 text-indigo-600" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-pink-600" />;
      case "Truck":
        return <Truck className="w-5 h-5 text-orange-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
    }
  };

  const sectors = [
    { id: "all", labelNe: "सबै क्षेत्रहरू", labelEn: "All Sectors" },
    { id: "agro-processing", labelNe: "कृषि–प्रशोधन", labelEn: "Agro-Processing" },
    { id: "tourism-hospitality", labelNe: "पर्यटन तथा होमस्टे", labelEn: "Tourism" },
    { id: "clean-energy", labelNe: "हरित ऊर्जा", labelEn: "Clean Energy" },
    { id: "it-digital", labelNe: "सूचना प्रविधि", labelEn: "IT & Digital" },
    { id: "cottage-industry", labelNe: "हस्तकला तथा घरेलु", labelEn: "Cottage Industries" },
    { id: "supply-chain", labelNe: "लजिस्टिक्स", labelEn: "Logistics" },
  ];

  const filteredOpportunities =
    activeSector === "all"
      ? opportunities
      : opportunities.filter((op) => op.id === activeSector);

  return (
    <section id="opportunities" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0372F]/10 text-[#D0372F] border border-[#D0372F]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D0372F]" />
            <span>{lang === "ne" ? "राष्ट्रिय सम्भावना" : "National Economic Frontiers"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "‘सम्भावना’ — नेपालभित्रका अथाह आर्थिक अवसरहरू"
              : "'Sambhawana' — High-Impact Economic Frontiers in Nepal"}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {lang === "ne"
              ? "हाम्रा प्राकृतिक स्रोत, जनसांख्यिक लाभ र बढ्दो आन्तरिक तथा बाह्य बजारलाई जोडेर नेपालमै उद्यम र रोजगारी सिर्जना गर्ने प्रमुख क्षेत्रहरू।"
              : "Discover the untapped domestic growth sectors where innovative enterprise, youth leadership, and institutional investment converge."}
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {sectors.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSector(sec.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeSector === sec.id
                  ? "bg-[#D0372F] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {lang === "ne" ? sec.labelNe : sec.labelEn}
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((op) => (
            <div
              key={op.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(op.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20">
                    {lang === "ne" ? op.tagNe : op.tagEn}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#D0372F] mb-1">
                  {lang === "ne" ? op.sectorNe : op.sectorEn}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#205A98] transition">
                  {lang === "ne" ? op.titleNe : op.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {lang === "ne" ? op.descriptionNe : op.descriptionEn}
                </p>

                {/* Practical Projects */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {lang === "ne" ? "सफल परियोजनाका नमुनाहरू:" : "Viable Project Prototypes:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === "ne" ? op.examplesNe : op.examplesEn)?.map((ex, eIdx) => (
                      <span
                        key={eIdx}
                        className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Potential Highlight */}
              <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === "ne" ? op.potentialNe : op.potentialEn}</span>
                </div>
                <div className="text-slate-400 group-hover:text-[#205A98] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
