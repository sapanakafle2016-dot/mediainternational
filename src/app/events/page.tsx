"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { EventItem } from "@/data/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  Home,
  CheckCircle2,
  Phone,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  X,
  Tag,
  Building,
  AlertCircle,
  Share2,
} from "lucide-react";

function EventsContent() {
  const [lang, setLang] = useState<Language>("ne");
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";

  const { content } = useContent();
  const events: EventItem[] = content.events || [];

  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">(
    initialTab === "upcoming" || initialTab === "past" ? initialTab : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  // Today in YYYY-MM-DD
  const [today, setToday] = useState<string>("2026-11-18");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  // Separate upcoming vs past events
  const { upcomingList, pastList } = useMemo(() => {
    const upcoming: EventItem[] = [];
    const past: EventItem[] = [];

    events.forEach((ev) => {
      if (ev.scheduleDate >= today) {
        upcoming.push(ev);
      } else {
        past.push(ev);
      }
    });

    // Upcoming sorted ascending (closest upcoming first)
    upcoming.sort((a, b) => a.scheduleDate.localeCompare(b.scheduleDate));
    // Past sorted descending (most recent past first)
    past.sort((a, b) => b.scheduleDate.localeCompare(a.scheduleDate));

    return { upcomingList: upcoming, pastList: past };
  }, [events, today]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    events.forEach((ev) => {
      const cat = lang === "ne" ? ev.categoryNe : ev.categoryEn || ev.categoryNe;
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [events, lang]);

  // Filter based on active tab, category, and search query
  const filteredEvents = useMemo(() => {
    let pool: EventItem[] = [];
    if (activeTab === "upcoming") {
      pool = upcomingList;
    } else if (activeTab === "past") {
      pool = pastList;
    } else {
      pool = [...upcomingList, ...pastList];
    }

    const q = searchQuery.toLowerCase().trim();

    return pool.filter((ev) => {
      // Category filter
      if (selectedCategory !== "all") {
        const cat = lang === "ne" ? ev.categoryNe : ev.categoryEn || ev.categoryNe;
        if (cat !== selectedCategory) return false;
      }

      // Search query
      if (!q) return true;
      const matchNe = (ev.titleNe || "").toLowerCase().includes(q);
      const matchEn = (ev.titleEn || "").toLowerCase().includes(q);
      const matchVenueNe = (ev.venueNe || "").toLowerCase().includes(q);
      const matchVenueEn = (ev.venueEn || "").toLowerCase().includes(q);
      const matchCatNe = (ev.categoryNe || "").toLowerCase().includes(q);
      const matchCatEn = (ev.categoryEn || "").toLowerCase().includes(q);
      const matchDesc = (ev.descriptionNe || "").toLowerCase().includes(q);
      const matchDate = (ev.dateNe || ev.dateEn || ev.scheduleDate || "").toLowerCase().includes(q);

      return (
        matchNe ||
        matchEn ||
        matchVenueNe ||
        matchVenueEn ||
        matchCatNe ||
        matchCatEn ||
        matchDesc ||
        matchDate
      );
    });
  }, [activeTab, upcomingList, pastList, selectedCategory, searchQuery, lang]);

  // Helper: Days remaining calculation
  const getDaysRemaining = (scheduleDate: string) => {
    try {
      const now = new Date(today);
      const target = new Date(scheduleDate);
      const diffTime = target.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return 0;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans selection:bg-[#D0372F] selection:text-white">
      <Navbar lang={lang} setLang={setLang} />

      {/* Page Header Banner */}
      <div className="bg-[#164070] text-white py-12 sm:py-16 border-b-4 border-[#D0372F] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 top-0 w-80 h-80 bg-[#D0372F]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1 transition">
              <Home className="w-3.5 h-3.5" />
              <span>{lang === "ne" ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[#e64d45] font-bold">
              {lang === "ne" ? "कार्यक्रम तथा मेलाहरू" : "Events & Schedule"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#D0372F] text-white uppercase tracking-wider mb-3 shadow-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === "ne" ? "राष्ट्रिय कार्यक्रम तालिका" : "National Event Timeline"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {lang === "ne"
                  ? "कार्यक्रम, वित्तीय मेला तथा अन्तरक्रिया"
                  : "Events, Financial Expos & Conclaves"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
                {lang === "ne"
                  ? "हुन लागेका आगामी राष्ट्रिय वित्तीय मेला, प्रादेशिक उद्यमशीलता सम्मेलन तथा सम्पन्न भएका ऐतिहासिक जागरण कार्यक्रमहरू।"
                  : "Explore upcoming financial literacy expos, youth entrepreneurship conclaves, and our historic archive of concluded national events."}
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full md:w-auto shrink-0">
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-lg sm:text-2xl font-black text-emerald-400">
                  {upcomingList.length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-bold uppercase tracking-wider truncate">
                  {lang === "ne" ? "आगामी" : "Upcoming"}
                </div>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-lg sm:text-2xl font-black text-slate-200">
                  {pastList.length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-bold uppercase tracking-wider truncate">
                  {lang === "ne" ? "सम्पन्न" : "Past"}
                </div>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-lg sm:text-2xl font-black text-[#e64d45]">
                  {events.length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-bold uppercase tracking-wider truncate">
                  {lang === "ne" ? "कुल मेला" : "Total"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-6 sm:space-y-8">
        {/* INTERACTIVE CONTROLS: TABS & SEARCH */}
        <div className="bg-slate-800/80 rounded-3xl p-4 sm:p-6 border border-slate-700/80 backdrop-blur-sm shadow-xl space-y-4 sm:space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
            {/* Primary Tab Switcher */}
            <div className="bg-slate-900/90 p-1 sm:p-1.5 rounded-2xl flex items-center gap-1 border border-slate-700/80 overflow-x-auto no-scrollbar w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  activeTab === "all"
                    ? "bg-[#205A98] text-white shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === "ne" ? "सबै कार्यक्रमहरू" : "All Events"}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/15 text-white">
                  {events.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upcoming")}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  activeTab === "upcoming"
                    ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{lang === "ne" ? "आगामी कार्यक्रम" : "Upcoming"}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-800/60 text-emerald-200">
                  {upcomingList.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("past")}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  activeTab === "past"
                    ? "bg-[#D0372F] text-white shadow-md ring-2 ring-[#D0372F]/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-slate-300" />
                <span>{lang === "ne" ? "सम्पन्न" : "Past"}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/15 text-white">
                  {pastList.length}
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "ne"
                    ? "कार्यक्रम, स्थान वा विधा खोज्नुहोस्..."
                    : "Search title, venue, or category..."
                }
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#205A98] transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/60">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5 mr-1">
                <Tag className="w-3.5 h-3.5 text-[#205A98]" />
                <span>{lang === "ne" ? "विधा अनुसार:" : "Category:"}</span>
              </span>

              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {lang === "ne" ? "सबै विधा" : "All Categories"}
              </button>

              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-[#205A98] text-white shadow-sm"
                        : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* EVENTS LISTING */}
        {filteredEvents.length === 0 ? (
          <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-700/50 text-slate-400 mx-auto flex items-center justify-center">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === "ne" ? "कुनै कार्यक्रम फेला परेन" : "No Events Found"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                {lang === "ne"
                  ? "तपाईँले खोज्नुभएको मापदण्ड अनुसारको कुनै कार्यक्रम फेला परेन। कृपया फिल्टर हटाउनुहोस्।"
                  : "No events match your current filter or search criteria. Try clearing your search."}
              </p>
            </div>
            {(searchQuery || selectedCategory !== "all" || activeTab !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setActiveTab("all");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold transition shadow-md cursor-pointer"
              >
                <span>{lang === "ne" ? "सबै फिल्टर हटाउनुहोस्" : "Clear All Filters"}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                {lang === "ne" ? "जम्मा" : "Showing"}{" "}
                <strong className="text-white font-bold">{filteredEvents.length}</strong>{" "}
                {lang === "ne" ? "कार्यक्रमहरू देखाइएको छ" : "events"}
              </span>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-emerald-400 hover:underline font-bold"
                >
                  {lang === "ne" ? "फिल्टर रिसेट" : "Reset Filters"}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.map((ev) => {
                const isUpcoming = ev.scheduleDate >= today;
                const daysRemaining = isUpcoming ? getDaysRemaining(ev.scheduleDate) : null;
                const imgSrc = ev.imageUrl || "/images/uploads/banking-expo-2079.webp";

                return (
                  <div
                    key={ev.id}
                    className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group ${
                      isUpcoming
                        ? "bg-slate-800/90 border-emerald-500/40 hover:border-emerald-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30"
                        : "bg-slate-800/60 border-slate-700/80 hover:border-slate-600 shadow-lg"
                    }`}
                  >
                    <div>
                      {/* Image Banner & Status Header */}
                      <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={lang === "ne" ? ev.titleNe : ev.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40"></div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          {/* Category Tag */}
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#205A98]/90 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-blue-200" />
                            <span>{lang === "ne" ? ev.categoryNe : ev.categoryEn || ev.categoryNe}</span>
                          </span>

                          {/* Dynamic Status Pill */}
                          {isUpcoming ? (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/95 backdrop-blur-md text-white border border-emerald-400/40 shadow-sm flex items-center gap-1.5 animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-white"></span>
                              <span>
                                {daysRemaining !== null && daysRemaining > 0
                                  ? lang === "ne"
                                    ? `आगामी (${daysRemaining} दिन बाँकी)`
                                    : `Upcoming (${daysRemaining}d)`
                                  : lang === "ne"
                                  ? "आज (Today!)"
                                  : "Today!"}
                              </span>
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 backdrop-blur-md text-slate-300 border border-white/10 shadow-sm flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-slate-400" />
                              <span>{lang === "ne" ? "सम्पन्न कार्यक्रम" : "Past Completed"}</span>
                            </span>
                          )}
                        </div>

                        {/* Bottom Venue & Date Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-white">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10">
                            <Calendar className="w-3.5 h-3.5 text-[#e64d45]" />
                            <span>{lang === "ne" ? ev.dateNe || ev.scheduleDate : ev.dateEn || ev.scheduleDate}</span>
                          </span>

                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            <span className="line-clamp-1">{lang === "ne" ? ev.venueNe : ev.venueEn}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition leading-snug">
                            {lang === "ne" ? ev.titleNe : ev.titleEn}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                            {lang === "ne" ? ev.titleEn : ev.titleNe}
                          </p>
                        </div>

                        {/* Time & Venue Block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700/60 text-xs">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">
                              {lang === "ne" ? ev.timeNe || "समय तालिका" : ev.timeEn || "Schedule Time"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="truncate">
                              {lang === "ne" ? ev.venueNe : ev.venueEn}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                          {lang === "ne" ? ev.descriptionNe : ev.descriptionEn}
                        </p>

                        {/* Highlights Bullets */}
                        {((lang === "ne" ? ev.highlightsNe : ev.highlightsEn) || []).length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              {lang === "ne" ? "मुख्य आकर्षण / झलक:" : "Key Highlights:"}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {((lang === "ne" ? ev.highlightsNe : ev.highlightsEn) || []).map(
                                (hl, hIdx) => (
                                  <span
                                    key={hIdx}
                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/90 text-slate-200 border border-slate-700/70 flex items-center gap-1.5"
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span>{hl}</span>
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-4 sm:p-5 bg-slate-900/80 border-t border-slate-700/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedEventModal(ev)}
                        className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer py-1.5"
                      >
                        <span>{lang === "ne" ? "विस्तृत विवरण हेर्नुहोस्" : "View Full Details"}</span>
                        <ChevronRight className="w-4 h-4 text-[#e64d45]" />
                      </button>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {isUpcoming ? (
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition shadow-md cursor-pointer w-full sm:w-auto"
                          >
                            <span>{lang === "ne" ? "सहभागिता / सोधपुछ" : "Inquire / Register"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <Link
                            href="/gallery"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs sm:text-sm font-bold transition border border-slate-600 cursor-pointer w-full sm:w-auto"
                          >
                            <span>{lang === "ne" ? "तस्बिर ग्यालरी" : "Photo Gallery"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* DETAILED EVENT MODAL */}
      {selectedEventModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-fade-in"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700/90 rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] sm:aspect-[16/7] bg-slate-950 overflow-hidden">
              <img
                src={selectedEventModal.imageUrl || "/images/uploads/banking-expo-2079.webp"}
                alt={selectedEventModal.titleNe}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/50"></div>

              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition cursor-pointer flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#205A98] text-white border border-white/20">
                  {lang === "ne"
                    ? selectedEventModal.categoryNe
                    : selectedEventModal.categoryEn || selectedEventModal.categoryNe}
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-white mt-1.5 sm:mt-2 leading-tight">
                  {lang === "ne" ? selectedEventModal.titleNe : selectedEventModal.titleEn}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {/* Status and Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {lang === "ne" ? "स्थिति (Status)" : "Status"}
                  </span>
                  <span className="font-bold text-white mt-0.5 inline-block">
                    {selectedEventModal.scheduleDate >= today ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        {lang === "ne" ? "आगामी कार्यक्रम" : "Upcoming Event"}
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        {lang === "ne" ? "सम्पन्न कार्यक्रम" : "Completed / Concluded"}
                      </span>
                    )}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {lang === "ne" ? "मिति र समय" : "Date & Time"}
                  </span>
                  <span className="font-bold text-white mt-0.5 inline-block">
                    {lang === "ne"
                      ? selectedEventModal.dateNe || selectedEventModal.scheduleDate
                      : selectedEventModal.dateEn || selectedEventModal.scheduleDate}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {lang === "ne" ? "स्थान (Venue)" : "Venue"}
                  </span>
                  <span className="font-bold text-white mt-0.5 inline-block truncate">
                    {lang === "ne" ? selectedEventModal.venueNe : selectedEventModal.venueEn}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === "ne" ? "कार्यक्रमको विवरण" : "Event Overview"}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {lang === "ne"
                    ? selectedEventModal.descriptionNe
                    : selectedEventModal.descriptionEn}
                </p>
              </div>

              {/* Highlights */}
              {((lang === "ne"
                ? selectedEventModal.highlightsNe
                : selectedEventModal.highlightsEn) || []).length > 0 && (
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "ne" ? "मुख्य आकर्षण तथा उद्देश्यहरू" : "Key Highlights & Scope"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {((lang === "ne"
                      ? selectedEventModal.highlightsNe
                      : selectedEventModal.highlightsEn) || []).map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Bottom Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  <span>{lang === "ne" ? "थप जानकारीको लागि:" : "For Inquiries:"} </span>
                  <strong className="text-white">+977-1-4400000</strong>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedEventModal(null)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 cursor-pointer text-center"
                  >
                    {lang === "ne" ? "बन्द गर्नुहोस्" : "Close"}
                  </button>

                  <Link
                    href="/contact"
                    className="flex-1 sm:flex-initial px-5 py-2.5 sm:py-2 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold transition shadow-md cursor-pointer text-center"
                  >
                    {lang === "ne" ? "सम्पर्क तथा दर्ता" : "Contact & Register"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
          Loading events...
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
