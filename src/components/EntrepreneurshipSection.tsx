"use client";

import React from "react";
import { Language } from "@/data/content";
import {
  Briefcase,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

interface EntrepreneurshipProps {
  lang: Language;
}

export default function EntrepreneurshipSection({ lang }: EntrepreneurshipProps) {
  const businessLiteracyModules = [
    {
      titleNe: "व्यावसायिक विचार छनोट र सम्भाव्यता अध्ययन",
      titleEn: "Idea Selection & Feasibility Study",
      descNe: "बजारको माग, ग्राहकको आवश्यकता र स्थानीय स्रोत–साधनको आधारमा सफल हुन सक्ने व्यापार पहिचान।",
      descEn: "Identifying viable business ideas based on authentic market demand, customer pains, and local raw materials.",
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    },
    {
      titleNe: "बजेटिङ, नगद प्रवाह (Cash Flow) र लागत व्यवस्थापन",
      titleEn: "Cash Flow & Unit Economics",
      descNe: "नाफा मात्र होइन, दैनिक खर्च, पुँजीको चक्र र ऋणको किस्ता समयमै व्यवस्थापन गर्ने अनुशासन।",
      descEn: "Mastering working capital cycles, gross margins, overhead discipline, and timely loan amortizations.",
      icon: <FileSpreadsheet className="w-5 h-5 text-blue-500" />,
    },
    {
      titleNe: "दर्ता, कर प्रणाली तथा कानुनी अनुपालन",
      titleEn: "Registration, Taxes & Legal Compliance",
      descNe: "कम्पनी/घरेलु दर्ता, प्यान/भ्याट (PAN/VAT), स्थानीय पालिका अनुमति र कानुनी प्रक्रियाको सहजीकरण।",
      descEn: "Navigating company/cottage industry registration, PAN/VAT compliance, and local municipal permits.",
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
    },
    {
      titleNe: "सहुलियतपूर्ण कर्जा र लगानीका स्रोतहरू",
      titleEn: "Concessional Lending & Capital Sources",
      descNe: "नेपाल सरकार र बैंकहरूबाट युवा, महिला तथा कृषि उद्यमीलाई उपलब्ध हुने सहुलियत कर्जा प्रक्रिया।",
      descEn: "Securing subsidized credit, youth and women enterprise grants, and angel seed financing.",
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
    },
  ];

  const campaignPillars = [
    {
      num: "०१",
      titleNe: "स्वदेशी स्रोत र सीपको अधिकतम उपयोग",
      titleEn: "Maximizing Local Resources & Skills",
      descNe: "नेपालका स्थानीय जडीबुटी, कृषि, पर्यटन, जलस्रोत र युवा जनशक्तिको सदुपयोग गरी आयात प्रतिस्थापन गर्ने।",
      descEn: "Utilizing indigenous herbs, agriculture, tourism, and young talent to replace costly imports.",
    },
    {
      num: "०२",
      titleNe: "वैदेशिक रोजगारीबाट फर्केकाहरूको पुनर्स्थापना",
      titleEn: "Reintegration of Returnee Migrants",
      descNe: "विदेशमा सिकेको श्रम, प्रविधि र पुँजीलाई स्वदेशमै व्यवसाय र उद्योग स्थापनामा रूपान्तरण गर्न सहयोग।",
      descEn: "Converting international technical skills and hard-earned savings into sustainable domestic enterprises.",
    },
    {
      num: "०३",
      titleNe: "स्थानीय तहहरूसँग प्रत्यक्ष सहकार्य",
      titleEn: "Partnership with Local Municipalities",
      descNe: "गाउँ–गाउँमा उद्यमशीलता परामर्श केन्द्र, सहुलियत कर्जा सहजीकरण र उत्पादन मेलाहरूको सञ्चालन।",
      descEn: "Establishing grassroots incubation desks and localized trade exhibitions across municipalities.",
    },
    {
      num: "०४",
      titleNe: "सफल उद्यमीहरूको प्रेरणा र मेन्टरसिप",
      titleEn: "Inspirational Mentorship & Networks",
      descNe: "नेपालमै संघर्ष गरेर सफल भएका अग्रज उद्यमीहरूमार्फत नयाँ पुस्तालाई व्यावसायिक मार्गदर्शन र हौसला।",
      descEn: "Connecting veteran industry leaders with aspiring youth through dialogues and mentorship clinics.",
    },
  ];

  return (
    <section id="entrepreneurship" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0372F]/10 text-[#D0372F] border border-[#D0372F]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D0372F]" />
            <span>{lang === "ne" ? "उद्यमशीलता महाअभियान" : "Entrepreneurship Movement"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "व्यावसायिक साक्षरता र ‘काम गरौँ आफ्नै देशमा’"
              : "Business Literacy & the 'Kam Garau Aaphnai Deshma' Movement"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {lang === "ne"
              ? "रोजगारी खोज्ने मात्र होइन, रोजगारी सिर्जना गर्ने नागरिक बनाउनु नै हाम्रो अभियानको मुख्य ध्येय हो। स्वदेशमै पसिना बगाऔँ, नेपालमै सम्भावना खोजौँ।"
              : "Inspiring youth to transition from job-seekers to job-creators. Nurturing viable domestic ventures through practical business literacy and nationwide enterprise advocacy."}
          </p>
        </div>

        {/* Campaign Hero Feature Box */}
        <div className="rounded-3xl bg-gradient-to-br from-[#164070] via-[#205A98] to-[#164070] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-20 border border-[#2c75c4]/30">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D0372F]/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-block px-3 py-1 rounded-md bg-[#D0372F] text-white font-extrabold text-xs tracking-wider uppercase mb-4 shadow-xs">
                {lang === "ne" ? "राष्ट्रिय महाअभियान" : "National Campaign"}
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                {lang === "ne"
                  ? "“काम गरौँ आफ्नै देशमा — स्वदेशमै छ भविष्य”"
                  : "“Work in Our Own Country — Our Future Lies Within Nepal”"}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                {lang === "ne"
                  ? "दैनिक हजारौँ युवा विदेशिन बाध्य भइरहेको वर्तमान परिप्रेक्ष्यमा, मिडिया इन्टरनेशनलले ‘काम गरौँ आफ्नै देशमा’ राष्ट्रिय जागरण अभियान सञ्चालन गर्दै आएको छ। हामी युवाहरूलाई नेपालभित्रै सम्भावना देखाउँछौँ, सीप सिकाउँछौँ, पुँजी जोड्छौँ र सफल उद्यमी बन्ने बाटो खोल्छौँ।"
                  : "Amid large-scale youth migration abroad, Media International launched the national movement 'Kam Garau Aaphnai Deshma'. We demonstrate practical opportunities within Nepal, impart business literacy, link founders to concessional capital, and celebrate domestic achievements."}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#opportunities"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D0372F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#ab2720] transition shadow-md"
                >
                  <span>{lang === "ne" ? "नेपालभित्रका सम्भावनाहरू हेर्नुहोस्" : "Explore Opportunities in Nepal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition"
                >
                  <span>{lang === "ne" ? "अभियानमा सहभागी हुनुहोस्" : "Join the Movement"}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-[#e64d45] font-extrabold text-lg mb-2">
                {lang === "ne" ? "अभियानको मुख्य संकल्प:" : "Campaign Pledge:"}
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === "ne"
                      ? "नेपाली उत्पादनलाई पहिलो प्राथमिकता"
                      : "Prioritizing Nepali domestic goods & services"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === "ne"
                      ? "सहुलियतपूर्ण कर्जाको सही सदुपयोग"
                      : "Productive utilization of concessional youth credit"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === "ne"
                      ? "विदेशबाट फर्किएकाहरूको सीपको सदुपयोग"
                      : "Leveraging migrant skills for local manufacturing"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === "ne"
                      ? "स्थानीय तहमा रोजगारी सिर्जना"
                      : "Sustainable job creation in rural municipalities"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Business Literacy Framework Grid */}
        <div className="mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#205A98]">
              {lang === "ne" ? "व्यावसायिक साक्षरता" : "Business Literacy"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {lang === "ne" ? "उद्यम सफल बनाउने चार आधारशिला" : "Four Pillars for Entrepreneurial Success"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessLiteracyModules.map((module, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#205A98]/30 hover:shadow-md transition duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#205A98]/10 border border-[#205A98]/20 flex items-center justify-center mb-4 shadow-2xs">
                  {module.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {lang === "ne" ? module.titleNe : module.titleEn}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "ne" ? module.descNe : module.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Four Strategic Approaches */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D0372F]">
              {lang === "ne" ? "अभियानको रणनीति" : "Strategic Methodology"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {lang === "ne"
                ? "‘काम गरौँ आफ्नै देशमा’ कसरी अगाडि बढ्छ?"
                : "How the Campaign Delivers Real Ground Impact"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs relative overflow-hidden hover:border-[#205A98]/30 transition"
              >
                <div className="text-3xl font-black text-[#205A98]/20 mb-2">
                  {pillar.num}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {lang === "ne" ? pillar.titleNe : pillar.titleEn}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "ne" ? pillar.descNe : pillar.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
