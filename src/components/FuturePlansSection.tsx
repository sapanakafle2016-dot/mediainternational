"use client";

import React from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import {
  Lightbulb,
  Target,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  Calendar,
  Sparkles,
  Rocket,
} from "lucide-react";

interface FuturePlansProps {
  lang: Language;
}

export default function FuturePlansSection({ lang }: FuturePlansProps) {
  const { content } = useContent();
  const futurePlans = content.futurePlans || [];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb className="w-6 h-6 text-[#D0372F]" />;
      case "Target":
        return <Target className="w-6 h-6 text-[#205A98]" />;
      case "ArrowUpRight":
        return <ArrowUpRight className="w-6 h-6 text-[#205A98]" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-[#D0372F]" />;
      default:
        return <Rocket className="w-6 h-6 text-[#205A98]" />;
    }
  };

  return (
    <section id="future-plans" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5 text-[#205A98]" />
            <span>{lang === "ne" ? "आगामी योजना तथा मार्गचित्र" : "Future Roadmaps & Vision"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "सीप, रोजगारी र स्वरोजगार: आगामी दशकको कार्यदिशा"
              : "Skills, Employment & Self-Reliance: The Roadmap Ahead"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {lang === "ne"
              ? "वित्तीय साक्षरतालाई अब प्रत्यक्ष उत्पादन, प्राविधिक सीप, स्वरोजगार र विप्रेषणको सही सदुपयोगसँग जोड्ने हाम्रो आगामी रणनीतिक योजना।"
              : "Bridging financial literacy directly with hands-on vocational incubation, self-employment financing, remittance mobilization, and artificial intelligence."}
          </p>
        </div>

        {/* 4 Strategic Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {futurePlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(plan.icon)}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] text-xs font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === "ne" ? plan.timeframeNe : plan.timeframeEn}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#205A98] transition">
                  {lang === "ne" ? plan.titleNe : plan.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {lang === "ne" ? plan.descriptionNe : plan.descriptionEn}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {lang === "ne" ? "कार्ययोजनाका प्रमुख लक्ष्यहरू:" : "Strategic Milestones:"}
                  </div>
                  <ul className="space-y-2.5">
                    {(lang === "ne" ? plan.objectivesNe : plan.objectivesEn)?.map((obj, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="leading-snug">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
