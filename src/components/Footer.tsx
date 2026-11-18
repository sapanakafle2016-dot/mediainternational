"use client";

import React from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const { content } = useContent();
  const { siteSettings } = content;
  const [currentYear, setCurrentYear] = React.useState("2026");

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-[#D0372F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-xl border border-slate-700 shadow-sm">
                <img
                  src={siteSettings?.logoUrl || "/images/logo.png"}
                  alt="Media International"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed max-w-sm">
              {lang === "ne"
                ? "मिडिया इन्टरनेशनल आम नागरिकलाई वित्तीय साक्षरता, बैंकिङ, बीमा, पुँजी बजार र उद्यमशीलतामार्फत आर्थिक रूपमा सक्षम बनाउँदै नेपालभित्रै सम्भावना उजागर गर्न क्रियाशील अग्रणी संस्था हो।"
                : "Media International Nepal is dedicated to advancing financial literacy, banking, insurance, capital market savvy, and grassroots entrepreneurship across all provinces of Nepal."}
            </p>

            <div className="pt-2 text-sm sm:text-base text-slate-200 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D0372F] shrink-0" />
                <span className="font-medium">
                  {lang === "ne"
                    ? siteSettings?.addressNe || "सीटीसी मल, सुन्धारा, काठमाडौँ, नेपाल"
                    : siteSettings?.addressEn || "CTC Mall, Sundhara, Kathmandu, Nepal"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#205A98] shrink-0" />
                <a
                  href={`mailto:${siteSettings?.email || "info@mediainternational.com.np"}`}
                  className="hover:text-white transition font-medium"
                >
                  {siteSettings?.email || "info@mediainternational.com.np"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D0372F] shrink-0" />
                <span className="font-medium">{siteSettings?.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#D0372F]">
              {lang === "ne" ? "मुख्य पृष्ठहरू" : "Quick Links"}
            </div>
            <ul className="space-y-2.5 text-sm sm:text-[15px] font-medium">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "गृहपृष्ठ (Home)" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "हाम्रो १५ वर्षे यात्रा (About Us)" : "About Our 15-Year Journey"}
                </Link>
              </li>
              <li>
                <Link href="/chairman-message" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "अध्यक्षको सन्देश (Chairman's Message)" : "Message from Chairman"}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "हाम्रा कार्यक्रमहरू (Programs)" : "Our Programs"}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "कार्यक्रम तथा मेला तालिका (Events & Schedule)" : "Events & Schedule"}
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "काम गरौँ आफ्नै देशमा" : "Work in Nepal Campaign"}
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "सम्भावना (Opportunities)" : "Opportunities in Nepal"}
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "उपलब्धिहरू (Achievements)" : "Key Achievements"}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "तस्बिर ग्यालरी (Gallery)" : "Photo Gallery"}
                </Link>
              </li>
              <li>
                <Link href="/future-plans" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "आगामी योजना (Future Plans)" : "Future Roadmaps"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition">
                  {lang === "ne" ? "सम्पर्क (Contact)" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Campaigns & Programs */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#D0372F]">
              {lang === "ne" ? "प्रमुख अभियानहरू" : "Flagship Campaigns"}
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] font-medium text-slate-300">
              <li>
                <Link href="/campaigns" className="hover:text-white transition">
                  {lang === "ne" ? "• ‘काम गरौँ आफ्नै देशमा’ महाअभियान" : "• 'Kam Garau Aaphnai Deshma'"}
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition">
                  {lang === "ne" ? "• ‘सम्भावना’ आर्थिक स्तम्भ" : "• 'Sambhawana' Economic Initiative"}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition">
                  {lang === "ne" ? "• राष्ट्रिय वित्तीय साक्षरता प्रदर्शनी" : "• National Financial Literacy Expo"}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition">
                  {lang === "ne" ? "• डिजिटल बैंकिङ तथा साइबर सुरक्षा" : "• Digital Banking & Cyber Hygiene"}
                </Link>
              </li>
              <li>
                <Link href="/future-plans" className="hover:text-white transition">
                  {lang === "ne" ? "• युवा स्वरोजगार इन्क्युबेशन" : "• Youth Self-Employment Incubation"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Back to top & Mission Pill */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start md:items-end">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm sm:text-[15px] text-slate-300 w-full text-left md:text-right shadow-sm">
              <span className="text-[#D0372F] font-extrabold block text-sm sm:text-base mb-1.5">
                {lang === "ne" ? "हाम्रो मूल ध्येय" : "Core Mission"}
              </span>
              <span className="leading-relaxed">
                {lang === "ne"
                  ? "वित्तीय साक्षरता, सुझबुझपूर्ण लगानी, र नेपालमै समृद्ध उद्यम।"
                  : "Financial wisdom, informed investment, and vibrant enterprises in Nepal."}
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#205A98] hover:bg-[#D0372F] text-white text-sm font-extrabold transition cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>{lang === "ne" ? "माथि जानुहोस्" : "Back to top"}</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-[14px] text-slate-400">
          <div>
            © {currentYear} Media International Nepal (मिडिया इन्टरनेशनल). All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>ज्ञान · अवसर · समृद्धि (Knowledge · Opportunity · Prosperity)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
