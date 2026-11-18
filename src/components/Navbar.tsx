"use client";

import React, { useState, useEffect, useRef } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BookOpen,
  UserCheck,
  Award,
  Wallet,
  Building2,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Compass,
  Settings,
  Calendar,
  Clock,
} from "lucide-react";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

interface SubmenuItem {
  href: string;
  labelNe: string;
  labelEn: string;
  descNe: string;
  descEn: string;
  icon: React.ReactNode;
}

interface NavItem {
  id: string;
  href?: string;
  labelNe: string;
  labelEn: string;
  submenu?: SubmenuItem[];
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const { content } = useContent();
  const { siteSettings } = content;
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      id: "home",
      href: "/",
      labelNe: "गृहपृष्ठ",
      labelEn: "Home",
    },
    {
      id: "about-us",
      labelNe: "हाम्रो बारेमा",
      labelEn: "About Us",
      submenu: [
        {
          href: "/about",
          labelNe: "संस्थागत परिचय र १५ वर्षे यात्रा",
          labelEn: "Organization Profile & 15-Year Journey",
          descNe: "२०१० देखि वर्तमानसम्मको ऐतिहासिक चरण र मार्गदर्शन",
          descEn: "Our 15-year historical milestones and guiding principles",
          icon: <BookOpen className="w-4 h-4 text-[#205A98]" />,
        },
        {
          href: "/chairman-message",
          labelNe: "अध्यक्षको मन्तव्य (Chairman's Message)",
          labelEn: "Message from the Chairman",
          descNe: "अध्यक्ष माधव निरौलाको विशेष विचार तथा दृष्टिकोण",
          descEn: "Chairman Madhav Niraula's vision for prosperity",
          icon: <UserCheck className="w-4 h-4 text-[#D0372F]" />,
        },
        {
          href: "/achievements",
          labelNe: "ऐतिहासिक उपलब्धि तथा साझेदारी",
          labelEn: "Milestones & Institutional Alliances",
          descNe: "५०+ राष्ट्रिय मेला, नियामक निकाय तथा बैंकहरूसँग सहकार्य",
          descEn: "50+ Expos and partnerships with NRB, SEBON & NIA",
          icon: <Award className="w-4 h-4 text-[#205A98]" />,
        },
      ],
    },
    {
      id: "programs",
      href: "/programs",
      labelNe: "हाम्रा कार्यक्रमहरू",
      labelEn: "Our Programs",
    },
    {
      id: "campaigns",
      labelNe: "अभियान",
      labelEn: "Campaigns ",
      submenu: [
        {
          href: "/campaigns",
          labelNe: "‘काम गरौँ आफ्नै देशमा’ महाअभियान",
          labelEn: "'Kam Garau Aaphnai Deshma' Movement",
          descNe: "व्यावसायिक साक्षरता, सीप सदुपयोग र स्वदेशमै उद्यम",
          descEn: "Business literacy, skills application & self-employment in Nepal",
          icon: <Compass className="w-4 h-4 text-[#205A98]" />,
        },
        {
          href: "/opportunities",
          labelNe: "‘सम्भावना’ — आर्थिक सम्भावनाका क्षेत्रहरू",
          labelEn: "'Sambhawana' — High Potential Sectors",
          descNe: "कृषि, पर्यटन, सूचना प्रविधि, ऊर्जा र उत्पादन क्षेत्र",
          descEn: "Agriculture, tourism, IT exports, clean energy & crafts",
          icon: <Sparkles className="w-4 h-4 text-[#D0372F]" />,
        },
      ],
    },
    {
      id: "events",
      labelNe: "इभेन्ट्स तथा मेला",
      labelEn: "Events ",
      submenu: [
        {
          href: "/events?tab=upcoming",
          labelNe: "आगामी कार्यक्रमहरू (Upcoming Events)",
          labelEn: "Upcoming Events & Expos",
          descNe: "हुन लागेका राष्ट्रिय वित्तीय मेला, कार्यशाला तथा सम्मेलन",
          descEn: "Scheduled national financial expos, conclaves & workshops",
          icon: <Calendar className="w-4 h-4 text-[#205A98]" />,
        },
        {
          href: "/events?tab=past",
          labelNe: "सम्पन्न कार्यक्रमहरू (Past Events)",
          labelEn: "Past Completed Events",
          descNe: "विभिन्न जिल्ला र प्रदेशमा सम्पन्न ऐतिहासिक कार्यक्रमहरू",
          descEn: "Archived national expos & completed campaigns",
          icon: <Clock className="w-4 h-4 text-[#D0372F]" />,
        },
        {
          href: "/events",
          labelNe: "सबै कार्यक्रमहरूको तालिका (All Events)",
          labelEn: "All Events & Full Schedule",
          descNe: "मिति अनुसार आगामी र सम्पन्न कार्यक्रमहरूको पूर्ण सूची",
          descEn: "Complete timeline of all scheduled and concluded events",
          icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        },
      ],
    },
    
    {
      id: "gallery",
      href: "/gallery",
      labelNe: "ग्यालरी",
      labelEn: "Gallery",
    },
    
  ];

  return (
    <div className="w-full">
      {/* Top Bar with Language Selector & Dynamic Contact Details */}
      <div className="bg-[#205A98] text-white py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 text-[11px] sm:text-xs border-b border-white/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Organization Tagline */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#D0372F] animate-pulse shrink-0"></span>
            <span className="font-semibold tracking-wide truncate text-[11px] sm:text-xs">
              {lang === "ne"
                ? "१५ वर्षे अनवरत यात्रा: वित्तीय साक्षरता महाअभियान"
                : "15 Years Pioneering Financial Literacy & Enterprise"}
            </span>
          </div>

          {/* Right: Contact & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`mailto:${siteSettings?.email || "info@mediainternational.com.np"}`}
              className="hidden md:flex items-center gap-1.5 hover:text-white transition"
            >
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>{siteSettings?.email || "info@mediainternational.com.np"}</span>
            </a>
            <span className="hidden md:inline text-white/40">|</span>
            <a
              href={`tel:${siteSettings?.phone || "+977014400000"}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>{siteSettings?.phone || "+977-1-4400000"}</span>
            </a>
            <span className="hidden sm:inline text-white/40">|</span>

            {/* Language Switcher in Top Section */}
            <div className="inline-flex items-center gap-0.5 bg-black/25 p-0.5 rounded-full border border-white/20 text-[11px] sm:text-xs font-bold">
              <span className="pl-1.5 pr-0.5 text-white/80 hidden xs:inline">
                <Globe className="w-3 h-3 text-white" />
              </span>
              <button
                type="button"
                onClick={() => setLang("ne")}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer text-[10.5px] sm:text-xs ${
                  lang === "ne"
                    ? "bg-[#D0372F] text-white shadow-xs font-extrabold"
                    : "text-white/85 hover:text-white"
                }`}
                title="नेपाली भाषामा हेर्नुहोस्"
              >
                नेपाली
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer text-[10.5px] sm:text-xs ${
                  lang === "en"
                    ? "bg-[#D0372F] text-white shadow-xs font-extrabold"
                    : "text-white/85 hover:text-white"
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>

            {/* Admin CMS Portal Quick Link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-bold bg-white/10 hover:bg-white/25 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-white transition border border-white/20"
              title="Admin CMS Dashboard"
            >
              <Settings className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with Big Typography & Clean Submenus */}
      <header
        ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg py-2.5 border-b border-slate-200"
            : "bg-white py-3.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with 15-Year Badge */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={siteSettings?.logoUrl || "/images/logo.png"}
              alt="Media International Logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>

          {/* Desktop Nav Links with Big Font Size & Click-Only Submenu Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isDropdownOpen = activeDropdown === item.id;
              const isCurrent =
                item.href === "/"
                  ? pathname === "/"
                  : item.href
                  ? pathname.startsWith(item.href)
                  : false;

              if (!hasSubmenu && item.href) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-xl text-base xl:text-[16px] font-semibold transition-colors ${
                      isCurrent
                        ? "text-[#205A98] bg-blue-50/80"
                        : "text-slate-800 hover:text-[#205A98] hover:bg-slate-100/80"
                    }`}
                  >
                    {lang === "ne" ? item.labelNe : item.labelEn}
                  </Link>
                );
              }

              return (
                <div key={item.id} className="relative">
                  {/* Click to open/close dropdown (No hover) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(isDropdownOpen ? null : item.id);
                    }}
                    aria-expanded={isDropdownOpen}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-base xl:text-[16px] font-semibold transition-all cursor-pointer ${
                      isDropdownOpen
                        ? "text-[#205A98] bg-blue-50 shadow-xs"
                        : "text-slate-800 hover:text-[#205A98] hover:bg-slate-100/80"
                    }`}
                  >
                    <span>{lang === "ne" ? item.labelNe : item.labelEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${
                        isDropdownOpen ? "rotate-180 text-[#205A98]" : ""
                      }`}
                    />
                  </button>

                  {/* Desktop Dropdown Submenu Menu (Shown strictly on click) */}
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white/98 backdrop-blur-md border border-slate-200/90 shadow-2xl p-2.5 animate-fade-in z-50 ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#D0372F] px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                        <span>{lang === "ne" ? item.labelNe : item.labelEn}</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#D0372F]" />
                      </div>

                      <div className="space-y-1">
                        {item.submenu?.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group/sub flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover/sub:bg-white group-hover/sub:shadow-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/80">
                              {sub.icon}
                            </div>
                            <div className="flex-grow">
                              <div className="text-sm font-bold text-slate-900 group-hover/sub:text-[#205A98] transition-colors leading-snug">
                                {lang === "ne" ? sub.labelNe : sub.labelEn}
                              </div>
                              <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                {lang === "ne" ? sub.descNe : sub.descEn}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Contact CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-[#D0372F] hover:bg-[#b42b24] text-white transition shadow-md"
            >
              <span>{lang === "ne" ? "सम्पर्क" : "Contact"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button - 48x48px Touch Target */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition flex items-center justify-center cursor-pointer border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#D0372F]" /> : <Menu className="w-6 h-6 text-[#205A98]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Backdrop & Drawer */}
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide Down Mobile Drawer */}
            <div className="lg:hidden fixed top-[56px] sm:top-[68px] left-0 right-0 z-50 bg-white border-b-4 border-[#D0372F] shadow-2xl max-h-[calc(100vh-68px)] overflow-y-auto animate-fade-in flex flex-col justify-between">
              <div className="p-4 sm:p-5 space-y-3">
                {/* Language Switcher in Drawer */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-100 border border-slate-200 mb-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#205A98]" />
                    <span>{lang === "ne" ? "भाषा छान्नुहोस्:" : "Language:"}</span>
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setLang("ne")}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                        lang === "ne"
                          ? "bg-[#D0372F] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      नेपाली
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang("en")}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                        lang === "en"
                          ? "bg-[#205A98] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => {
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isExpanded = mobileExpanded === item.id;
                    const isCurrent = item.href === "/" ? pathname === "/" : item.href ? pathname.startsWith(item.href) : false;

                    if (!hasSubmenu && item.href) {
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3 rounded-2xl text-base font-bold transition flex items-center justify-between ${
                            isCurrent
                              ? "bg-[#205A98] text-white shadow-xs"
                              : "text-slate-800 hover:bg-slate-100"
                          }`}
                        >
                          <span>{lang === "ne" ? item.labelNe : item.labelEn}</span>
                          <ChevronRight className={`w-4 h-4 ${isCurrent ? "text-white" : "text-slate-400"}`} />
                        </Link>
                      );
                    }

                    return (
                      <div key={item.id} className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/60">
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(isExpanded ? null : item.id)}
                          className="w-full px-4 py-3 text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                        >
                          <span className={isExpanded ? "text-[#205A98]" : "text-slate-800"}>
                            {lang === "ne" ? item.labelNe : item.labelEn}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#205A98]" : "text-slate-400"
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="p-2 space-y-1.5 bg-white border-t border-slate-100 animate-fade-in">
                            {item.submenu?.map((sub, sIdx) => {
                              const isSubCurrent = pathname === sub.href || pathname.startsWith(sub.href.split("?")[0]);
                              return (
                                <Link
                                  key={sIdx}
                                  href={sub.href}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileExpanded(null);
                                  }}
                                  className={`flex items-start gap-3 p-3 rounded-xl transition ${
                                    isSubCurrent ? "bg-blue-50 text-[#205A98]" : "hover:bg-slate-50 text-slate-700"
                                  }`}
                                >
                                  <span className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                                    {sub.icon}
                                  </span>
                                  <div>
                                    <div className="text-sm font-bold leading-tight">
                                      {lang === "ne" ? sub.labelNe : sub.labelEn}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                      {lang === "ne" ? sub.descNe : sub.descEn}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Quick Action Contacts in Drawer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${siteSettings?.phone || "+977-1-4400000"}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-100"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D0372F]" />
                    <span>{lang === "ne" ? "फोन सम्पर्क" : "Call Helpline"}</span>
                  </a>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D0372F] text-white text-xs font-bold shadow-md hover:bg-[#b42b24]"
                  >
                    <Mail className="w-3.5 h-3.5 text-white" />
                    <span>{lang === "ne" ? "सम्पर्क फारम" : "Contact Form"}</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>{lang === "ne" ? siteSettings?.addressNe : siteSettings?.addressEn}</span>
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-[#205A98] font-bold hover:underline"
                  >
                    Admin Login &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
