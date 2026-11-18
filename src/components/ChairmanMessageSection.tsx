"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import {
  Quote,
  Award,
  Mail,
  UserCheck,
} from "lucide-react";

interface ChairmanMessageProps {
  lang: Language;
}

export default function ChairmanMessageSection({ lang }: ChairmanMessageProps) {
  const { content } = useContent();
  const chairman = content.chairmanMessage || {};
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="chairman"
      className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-b border-slate-200 relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#205A98]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D0372F]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading Tag */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#205A98]" />
            <span>{lang === "ne" ? "नेतृत्वको सन्देश" : "Leadership Message"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "अध्यक्षको मन्तव्य (Message from Chairman)"
              : "Message from the Chairman"}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {lang === "ne"
              ? "मिडिया इन्टरनेशनलको १५ वर्षे यात्रा, हाम्रो ध्येय र समृद्ध नेपाल निर्माणको अठोट"
              : "Reflections on 15 years of financial literacy, enterprise advocacy, and our vision for Nepal"}
          </p>
        </div>

        {/* Chairman Feature Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Portrait and Identity */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Glowing border ring in brand colors */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D0372F] via-[#205A98] to-[#D0372F] rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>

                {/* Portrait Frame */}
                <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white shadow-2xl flex items-center justify-center">
                  {!imgError && chairman.photoUrl ? (
                    <img
                      src={chairman.photoUrl}
                      alt={lang === "ne" ? chairman.nameNe : chairman.nameEn}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#164070] to-[#0f2847] text-white p-6">
                      <div className="w-20 h-20 rounded-full bg-[#D0372F]/20 border-2 border-[#D0372F] flex items-center justify-center text-[#e64d45] font-extrabold text-3xl mb-3">
                        MN
                      </div>
                      <span className="font-bold text-lg text-white">
                        {lang === "ne" ? chairman.nameNe : chairman.nameEn}
                      </span>
                      <span className="text-xs text-[#e64d45] mt-1">
                        {lang === "ne" ? chairman.designationNe : chairman.designationEn}
                      </span>
                    </div>
                  )}

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#e64d45]">
                      {lang === "ne" ? chairman.badgeNe : chairman.badgeEn}
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      {lang === "ne" ? chairman.nameNe : chairman.nameEn}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      MEDIA INTERNATIONAL NEPAL
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Credentials */}
              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === "ne" ? chairman.nameNe : chairman.nameEn}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#205A98] mt-0.5">
                  {lang === "ne" ? chairman.designationNe : chairman.designationEn}
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#D0372F]/10 text-[#D0372F] border border-[#D0372F]/20 text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-[#D0372F]" />
                  <span>{lang === "ne" ? "वित्तीय साक्षरता अभियन्ता" : "Financial Literacy Pioneer"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Message Prose */}
            <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
              {/* Decorative Quote Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#205A98]/10 border border-[#205A98]/20 flex items-center justify-center text-[#205A98] mb-2">
                <Quote className="w-6 h-6" />
              </div>

              {/* Highlight Quote */}
              <blockquote className="text-lg sm:text-xl font-bold text-slate-900 border-l-4 border-[#D0372F] pl-4 py-1 italic leading-snug">
                {lang === "ne" ? chairman.quoteNe : chairman.quoteEn}
              </blockquote>

              {/* Message Body */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                {chairman.message1Ne && (
                  <p>{lang === "ne" ? chairman.message1Ne : chairman.message1En}</p>
                )}
                {chairman.message2Ne && (
                  <p>{lang === "ne" ? chairman.message2Ne : chairman.message2En}</p>
                )}
                {chairman.message3Ne && (
                  <p>{lang === "ne" ? chairman.message3Ne : chairman.message3En}</p>
                )}
                {chairman.message4Ne && (
                  <p className="font-semibold text-slate-800">
                    {lang === "ne" ? chairman.message4Ne : chairman.message4En}
                  </p>
                )}
              </div>

              {/* Signature and Closing */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-extrabold text-slate-900">
                    {lang === "ne" ? chairman.nameNe : chairman.nameEn}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {lang === "ne" ? chairman.designationNe : chairman.designationEn}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${content.siteSettings?.email || "info@mediainternational.com.np"}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#205A98] text-white text-xs font-bold hover:bg-[#164070] transition shadow-sm hover:shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5 text-white" />
                    <span>{lang === "ne" ? "अध्यक्षलाई सिधै सम्पर्क" : "Contact Chairman"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
