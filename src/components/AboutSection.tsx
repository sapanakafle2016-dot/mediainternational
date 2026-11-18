"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { CheckCircle2, Award, Calendar, ChevronRight, Compass } from "lucide-react";

interface AboutProps {
  lang: Language;
}

export default function AboutSection({ lang }: AboutProps) {
  const { content } = useContent();
  const milestones = content.milestones || [];
  const [activePhase, setActivePhase] = useState<number>(0);

  const coreValues = [
    {
      titleNe: "व्यावहारिक ज्ञान (Practical Literacy)",
      titleEn: "Applied Practical Knowledge",
      descNe: "सिद्धान्तमा मात्र होइन, आम नागरिकको दैनिक जीवनमा काम लाग्ने सरल र स्पष्ट वित्तीय शिक्षा।",
      descEn: "Actionable financial understanding geared towards everyday households and entrepreneurs.",
    },
    {
      titleNe: "समावेशी पहुँच (Inclusive Reach)",
      titleEn: "Grassroots & Inclusive Access",
      descNe: "सहरी केन्द्रदेखि दुर्गम हिमाली तथा पहाडी गाउँपालिकासम्म सबै वर्ग र समुदायमा चेतना विस्तार।",
      descEn: "Reaching remote rural communities, youth, women, and marginalized segments across all provinces.",
    },
    {
      titleNe: "उद्यमशीलता जागरण (Enterprise Mindset)",
      titleEn: "Cultivating Domestic Enterprise",
      descNe: "नेपालमै काम गर्ने, स्थानीय स्रोतको सदुपयोग गर्ने र युवालाई स्वरोजगार बन्न प्रेरित गर्ने दृष्टिकोण।",
      descEn: "Inspiring youth and returnee migrants to harness local resources and build domestic ventures.",
    },
    {
      titleNe: "संस्थागत सहकार्य (Strategic Collaboration)",
      titleEn: "Multi-Stakeholder Collaboration",
      descNe: "नियामक निकाय, बैंक, वित्तीय संस्था, स्थानीय सरकार र शैक्षिक संस्थाहरूबीचको बलियो समन्वय।",
      descEn: "Forging synergistic partnerships with financial regulators, banks, insurers, and local bodies.",
    },
  ];

  const currentMilestone = milestones[activePhase] || milestones[0];

  return (
    <section id="about" className="py-12 sm:py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#205A98]" />
            <span>{lang === "ne" ? "हाम्रो बारेमा" : "About Us"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "आर्थिक जागरण र समृद्धिका १५ गौरवमय वर्ष"
              : "15 Years Pioneering Financial Literacy & Prosperity"}
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-600 leading-relaxed">
            {lang === "ne"
              ? "मिडिया इन्टरनेशनल नेपालको आर्थिक विकास, वित्तीय पहुँच र उद्यमशीलता प्रवर्द्धनका लागि निरन्तर क्रियाशील एक अग्रणी सञ्चकार तथा विकास पैरवी संस्था हो।"
              : "Media International Nepal is a premier development and financial communication powerhouse dedicated to uplifting citizens' economic lives and building a self-reliant Nepal."}
          </p>
        </div>

        {/* Profile Card & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base">
              <p>
                {lang === "ne"
                  ? "विगत १५ वर्षअघि स्थापना हुँदा नेपालमा वित्तीय साक्षरता र आर्थिक पत्रकारिताको दायरा निकै सीमित थियो। आम नागरिकमा बैंक खाता खोल्ने, बचत गर्ने र औपचारिक ऋण लिने बानीको विकास भइसकेको थिएन। यही आवश्यकतालाई महसुस गरी मिडिया इन्टरनेशनलले वित्तीय साक्षरता अभियानलाई आफ्नो प्रमुख कार्यभार बनायो।"
                  : "When Media International was founded 15 years ago, awareness surrounding personal finance, formal banking, insurance, and entrepreneurship was acutely limited in Nepal. Recognizing that true national prosperity begins with financially literate citizens, Media International championed nationwide financial education as its core mission."}
              </p>
              <p>
                {lang === "ne"
                  ? "नेपाल राष्ट्र बैंक, बीमा प्राधिकरण, नेपाल धितोपत्र बोर्ड (SEBON), बैंक तथा वित्तीय संस्थाहरू, र स्थानीय पालिकाहरूसँगको सहकार्यमा हामीले काठमाडौँ उपत्यकादेखि हिमाल, पहाड र तराईका कुना–काप्चासम्म वित्तीय साक्षरता मेला, प्रदर्शनी, युवा संवाद, र कार्यशालाहरू सफलतापूर्वक सम्पन्न गरेका छौँ।"
                  : "Working hand-in-hand with regulatory institutions including Nepal Rastra Bank, the Nepal Insurance Authority, and SEBON, alongside commercial banks and municipal governments, we have carried financial literacy expos and business workshops into the heart of rural wards and major urban hubs alike."}
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                {lang === "ne" ? "हाम्रा मुख्य मार्गदर्शन सिद्धान्तहरू:" : "Our Guiding Strategic Pillars:"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-sm transition"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {lang === "ne" ? val.titleNe : val.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {lang === "ne" ? val.descNe : val.descEn}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Showcase Panel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#164070] via-[#205A98] to-[#164070] text-white p-8 shadow-xl overflow-hidden">
              <div className="absolute -right-6 -bottom-8 text-white/5 font-black text-9xl select-none pointer-events-none">
                15
              </div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-md bg-[#D0372F] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                  {lang === "ne" ? "१५ वर्षे प्रतिबद्धता" : "15-Year Commitment"}
                </span>

                <h3 className="text-2xl font-bold leading-tight mb-4 text-white">
                  {lang === "ne"
                    ? "“नागरिकको आर्थिक ज्ञान नै देशको समृद्धिको मूल आधार हो।”"
                    : "“Financial capability of the citizen is the true bedrock of national prosperity.”"}
                </h3>

                <p className="text-xs text-slate-200 leading-relaxed mb-6">
                  {lang === "ne"
                    ? "हामी केवल सूचना प्रवाहमा सीमित नभई नागरिकलाई आफ्नो पैसाको सही सदुपयोग गर्न, जोखिम न्यूनीकरण गर्न र नेपालभित्रै सम्भावनाको खोजी गर्न निरन्तर उत्प्रेरित गर्दछौँ।"
                    : "We go beyond conventional media by providing actionable, life-changing financial education, fostering enterprise incubation, and unlocking opportunities within Nepal."}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/15 text-xs">
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{lang === "ne" ? "संस्थागत विधा:" : "Category:"}</span>
                    <span className="font-semibold text-white">
                      {lang === "ne" ? "आर्थिक सञ्चार तथा विकास" : "Economic Media & Development"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{lang === "ne" ? "प्रमुख कार्यक्षेत्र:" : "Key Domains:"}</span>
                    <span className="font-semibold text-[#e64d45]">
                      {lang === "ne" ? "साक्षरता, उद्यम, सम्भावना" : "Literacy, Enterprise, Opportunities"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{lang === "ne" ? "भौगोलिक पहुँच:" : "Geographic Reach:"}</span>
                    <span className="font-semibold text-white">
                      {lang === "ne" ? "नेपालका ७ वटै प्रदेश" : "All 7 Provinces of Nepal"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 15-Year Journey Interactive Timeline */}
        {milestones.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#205A98]">
                  {lang === "ne" ? "ऐतिहासिक यात्रा" : "Historical Milestones"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {lang === "ne" ? "१५ वर्षको चरणबद्ध विकास" : "Chronological 15-Year Journey"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                {lang === "ne"
                  ? "२०१० देखि वर्तमानसम्मका मुख्य चरणहरू र हासिल भएका उपलब्धिहरू"
                  : "Explore the four defining eras of our nationwide economic outreach."}
              </p>
            </div>

            {/* Phase Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
              {milestones.map((milestone, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhase(idx)}
                  className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                    activePhase === idx
                      ? "bg-[#205A98] text-white border-[#205A98] shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar
                      className={`w-3.5 h-3.5 ${
                        activePhase === idx ? "text-[#e64d45]" : "text-[#205A98]"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold ${
                        activePhase === idx ? "text-white" : "text-[#205A98]"
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold truncate">
                    {lang === "ne" ? milestone.phaseNe : milestone.phaseEn}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Phase Card */}
            {currentMilestone && (
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 transition-all">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] text-xs font-bold mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#205A98]"></span>
                    <span>
                      {lang === "ne"
                        ? `${currentMilestone.year} | ${currentMilestone.phaseNe}`
                        : `${currentMilestone.year} | ${currentMilestone.phaseEn}`}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {lang === "ne" ? currentMilestone.titleNe : currentMilestone.titleEn}
                  </h4>

                  <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                    {lang === "ne"
                      ? currentMilestone.descriptionNe
                      : currentMilestone.descriptionEn}
                  </p>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        {lang === "ne" ? "मुख्य प्रभाव र उपलब्धि:" : "Key Realized Impact:"}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-700 mt-0.5">
                        {lang === "ne" ? currentMilestone.impactNe : currentMilestone.impactEn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
