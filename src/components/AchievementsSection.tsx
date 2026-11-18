"use client";

import React from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { Award, Building, Users2, Landmark, Check, Globe2, Radio } from "lucide-react";

interface AchievementsProps {
  lang: Language;
}

export default function AchievementsSection({ lang }: AchievementsProps) {
  const { content } = useContent();
  const achievements = content.achievements || [];

  const provinces = [
    { nameNe: "कोशी प्रदेश", nameEn: "Koshi Province", hubsNe: "विराटनगर, इटहरी, धरान, झापा" },
    { nameNe: "मधेश प्रदेश", nameEn: "Madhesh Province", hubsNe: "जनकपुरधाम, वीरगन्ज, बर्दिबास" },
    { nameNe: "बागमती प्रदेश", nameEn: "Bagmati Province", hubsNe: "काठमाडौँ, हेटौँडा, चितवन, भक्तपुर" },
    { nameNe: "गण्डकी प्रदेश", nameEn: "Gandaki Province", hubsNe: "पोखरा, दमौली, बाग्लुङ, नवलपुर" },
    { nameNe: "लुम्बिनी प्रदेश", nameEn: "Lumbini Province", hubsNe: "बुटवल, भैरहवा, दाङ, नेपालगन्ज" },
    { nameNe: "कर्णाली प्रदेश", nameEn: "Karnali Province", hubsNe: "वीरेन्द्रनगर (सुर्खेत), जुम्ला" },
    { nameNe: "सुदूरपश्चिम प्रदेश", nameEn: "Sudurpashchim Province", hubsNe: "धनगढी, महेन्द्रनगर, डडेल्धुरा" },
  ];

  const institutionalPartners = [
    { nameNe: "नेपाल राष्ट्र बैंक (NRB)", nameEn: "Nepal Rastra Bank (Central Bank)" },
    { nameNe: "नेपाल बीमा प्राधिकरण", nameEn: "Nepal Insurance Authority" },
    { nameNe: "नेपाल धितोपत्र बोर्ड (SEBON)", nameEn: "Securities Board of Nepal (SEBON)" },
    { nameNe: "नेपाल बैंकर्स संघ (NBA)", nameEn: "Nepal Bankers' Association" },
    { nameNe: "डेभलपमेन्ट बैंकर्स एसोसिएसन", nameEn: "Development Bankers Association" },
    { nameNe: "नेपाल उद्योग वाणिज्य महासंघ (FNCCI)", nameEn: "FNCCI / Local Chambers" },
    { nameNe: "स्थानीय सरकार तथा पालिकाहरू", nameEn: "Municipalities & Local Bodies" },
    { nameNe: "विश्वविद्यालय तथा शैक्षिक संस्थाहरू", nameEn: "Universities & Colleges" },
  ];

  return (
    <section id="achievements" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#205A98]" />
            <span>{lang === "ne" ? "हाम्रा उपलब्धिहरू" : "Achievements & Track Record"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "१५ वर्षमा हासिल भएका ऐतिहासिक उपलब्धि र साझेदारी"
              : "15 Years of Tangible Milestones, Expos & Strategic Partnerships"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {lang === "ne"
              ? "राष्ट्रिय स्तरका भव्य वित्तीय मेलादेखि गाउँ–गाउँसम्मको चेतना यात्रा—नियामक निकाय, बैंक तथा वित्तीय संस्थाहरूसँगको सहकार्यमा हासिल भएका परिणामहरू।"
              : "From multi-day flagship expos in metropolitan centers to grassroots workshops in remote mountain wards—our verified track record in numbers and partnerships."}
          </p>
        </div>

        {/* 3 Main Achievement Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-7 hover:bg-white hover:border-[#205A98]/30 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black text-[#205A98] tracking-tight">
                    {item.metric}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D0372F]/10 text-[#D0372F] border border-[#D0372F]/20">
                    {lang === "ne" ? item.categoryNe : item.categoryEn}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {lang === "ne" ? item.titleNe : item.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {lang === "ne" ? item.descriptionNe : item.descriptionEn}
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-200">
                  {(lang === "ne" ? item.highlightsNe : item.highlightsEn)?.map(
                    (high, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{high}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nationwide Presence: 7 Provinces */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#e64d45]">
                {lang === "ne" ? "राष्ट्रिय सञ्जाल" : "Nationwide Reach"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {lang === "ne"
                  ? "नेपालका सातै प्रदेशमा सक्रिय उपस्थिति"
                  : "Active Reach Across All 7 Provinces"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                {lang === "ne"
                  ? "हामीले राजधानी काठमाडौँमा मात्र सीमित नभई सातै प्रदेशका मुख्य आर्थिक केन्द्रहरू तथा दुर्गम स्थानीय तहहरूसम्म पुगेर कार्यक्रम सञ्चालन गरेका छौँ।"
                  : "Expanding beyond Kathmandu to conduct impactful financial literacy conclaves across regional economic hubs and remote municipal wards."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {provinces.map((prov, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Globe2 className="w-4 h-4 text-[#e64d45]" />
                    <span className="font-bold text-sm text-white">
                      {lang === "ne" ? prov.nameNe : prov.nameEn}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-400">
                      {lang === "ne" ? "मुख्य केन्द्रहरू: " : "Hubs: "}
                    </span>
                    {prov.hubsNe}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Institutional Partnerships */}
        <div className="border-t border-slate-200 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {lang === "ne"
                ? "हाम्रा प्रमुख संस्थागत साझेदारहरू"
                : "Regulatory & Strategic Institutional Partners"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === "ne"
                ? "नेपालका प्रमुख वित्तीय नियामक निकाय, बैंक, बीमा र व्यावसायिक संगठनहरूसँगको निरन्तर सहकार्य"
                : "Collaborating seamlessly with apex financial regulators, banking federations, and civic leaders."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {institutionalPartners.map((partner, pIdx) => (
              <div
                key={pIdx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#205A98]/40 hover:shadow-xs transition text-center flex flex-col items-center justify-center min-h-[72px]"
              >
                <div className="text-xs sm:text-[13px] font-bold text-slate-800">
                  {lang === "ne" ? partner.nameNe : partner.nameEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
