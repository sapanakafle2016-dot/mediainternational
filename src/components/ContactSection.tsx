"use client";

import React, { useState } from "react";
import { Language } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  CheckCircle,
  MessageSquare,
  Loader2,
} from "lucide-react";

interface ContactProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactProps) {
  const { content, submitInquiry } = useContent();
  const { siteSettings, faqs } = content;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "literacy",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const topicLabel =
      formData.topic === "literacy"
        ? "वित्तीय साक्षरता कार्यक्रम (Financial Literacy)"
        : formData.topic === "entrepreneurship"
        ? "‘काम गरौँ आफ्नै देशमा’ उद्यमशीलता"
        : formData.topic === "sambhawana"
        ? "‘सम्भावना’ लगानी तथा परियोजना"
        : formData.topic === "expo"
        ? "राष्ट्रिय मेला तथा प्रदर्शनी साझेदारी"
        : "सामान्य सोधपुछ (General Inquiry)";

    const res = await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: topicLabel,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setFormSubmitted(true);
    } else {
      setSubmitError(res.message || "Failed to submit message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] border border-[#205A98]/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#205A98]" />
            <span>{lang === "ne" ? "सम्पर्क तथा सहकार्य" : "Contact & Collaboration"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "ne"
              ? "आर्थिक जागरण महाअभियानमा हातेमालो गरौँ"
              : "Let's Collaborate for a Financially Empowered Nepal"}
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-600 leading-relaxed">
            {lang === "ne"
              ? "वित्तीय साक्षरता कार्यक्रम, ‘काम गरौँ आफ्नै देशमा’ अभियान, वा संस्थागत साझेदारीका लागि हामीलाई सम्पर्क गर्नुहोस्।"
              : "Reach out to partner with us on nationwide expos, entrepreneurship bootcamps, or institutional financial literacy workshops."}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mb-14 sm:mb-20">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
              <span className="text-[#e64d45] font-extrabold text-xs uppercase tracking-wider block mb-2">
                {lang === "ne" ? "कार्यालय सम्पर्क" : "Official Headquarters"}
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-6">
                {lang === "ne"
                  ? siteSettings?.siteNameNe || "मिडिया इन्टरनेशनल नेपाल"
                  : siteSettings?.siteNameEn || "MEDIA INTERNATIONAL NEPAL"}
              </h3>

              <div className="space-y-5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-[#e64d45]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === "ne" ? "ठेगाना:" : "Address:"}
                    </div>
                    <div className="text-slate-300 leading-snug">
                      {lang === "ne"
                        ? siteSettings?.addressNe || "सीटीसी मल, सुन्धारा, काठमाडौँ, नेपाल"
                        : siteSettings?.addressEn || "CTC Mall, Sundhara, Kathmandu, Nepal"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-[#e64d45]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === "ne" ? "ईमेल:" : "Official Email:"}
                    </div>
                    <a
                      href={`mailto:${siteSettings?.email || "info@mediainternational.com.np"}`}
                      className="text-[#e64d45] hover:underline"
                    >
                      {siteSettings?.email || "info@mediainternational.com.np"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-[#e64d45]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === "ne" ? "फोन / हटलाइन:" : "Phone / Helpline:"}
                    </div>
                    <div className="text-slate-400">
                      {siteSettings?.phone} / {siteSettings?.mobile}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-[#e64d45]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === "ne" ? "कार्यालय समय:" : "Working Hours:"}
                    </div>
                    <div className="text-slate-400">
                      {lang === "ne" ? siteSettings?.workingHoursNe : siteSettings?.workingHoursEn}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D0372F]"></span>
                <span>
                  {lang === "ne"
                    ? "नेपालका ७ वटै प्रदेशमा कार्यक्रम सञ्चालनका लागि खुला"
                    : "Open for initiatives across all 7 provinces of Nepal"}
                </span>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="p-6 rounded-2xl bg-[#205A98]/5 border border-[#205A98]/20 flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-[#205A98] shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-[#205A98] mb-1">
                  {lang === "ne"
                    ? "स्थानीय तह तथा क्याम्पसहरूका लागि"
                    : "For Municipalities & Educational Campuses"}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {lang === "ne"
                    ? "तपाईंको क्षेत्रमा वित्तीय साक्षरता प्रदर्शनी, हाजिरीजवाफ वा उद्यम कार्यशाला गर्न चाहेमा अग्रिम मिति तय गर्न अनुरोध छ।"
                    : "Schedule advance dates for community financial expos, youth quizzes, or MSME business clinics in your locality."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {lang === "ne" ? "सहकार्य तथा सोधपुछ फारम" : "Collaboration & Inquiry Form"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                {lang === "ne"
                  ? "तपाईंको विवरण पठाउनुहोस्, हाम्रो टोलीले यथाशीघ्र सम्पर्क गर्नेछ।"
                  : "Submit your inquiry and our team will get in touch promptly."}
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-emerald-950 mb-1">
                    {lang === "ne"
                      ? "धन्यवाद! तपाईंको सन्देश प्राप्त भयो।"
                      : "Thank you! Your message has been received."}
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed mb-4">
                    {lang === "ne"
                      ? "हाम्रो टोलीले छिट्टै तपाईंलाई ईमेल वा फोनमार्फत सम्पर्क गर्नेछ।"
                      : "Our team will reach out to you via email or phone shortly."}
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        topic: "literacy",
                        message: "",
                      });
                    }}
                    className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                  >
                    {lang === "ne" ? "अर्को सन्देश पठाउनुहोस्" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === "ne" ? "पूरा नाम *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "ne" ? "तपाईंको नाम" : "Your full name"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#205A98] focus:ring-1 focus:ring-[#205A98]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === "ne" ? "सम्पर्क फोन / मोबाइल" : "Phone / Mobile"}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="98xxxxxxxx"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#205A98] focus:ring-1 focus:ring-[#205A98]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === "ne" ? "ईमेल ठेगाना" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#205A98] focus:ring-1 focus:ring-[#205A98]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === "ne" ? "सोधपुछको मुख्य विषय" : "Inquiry Category"}
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#205A98]"
                      >
                        <option value="literacy">
                          {lang === "ne" ? "वित्तीय साक्षरता कार्यक्रम" : "Financial Literacy Training"}
                        </option>
                        <option value="entrepreneurship">
                          {lang === "ne" ? "‘काम गरौँ आफ्नै देशमा’ उद्यम" : "Entrepreneurship Movement"}
                        </option>
                        <option value="sambhawana">
                          {lang === "ne" ? "‘सम्भावना’ लगानी र परामर्श" : "'Sambhawana' Sectors"}
                        </option>
                        <option value="expo">
                          {lang === "ne" ? "मेला तथा प्रदर्शनी साझेदारी" : "Expo & Conclave Alliance"}
                        </option>
                        <option value="other">
                          {lang === "ne" ? "अन्य विषय / सोधपुछ" : "Other General Query"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === "ne" ? "सन्देश तथा विवरण *" : "Message Details *"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        lang === "ne"
                          ? "तपाईंको कार्यक्रम वा सोधपुछ सम्बन्धी संक्षिप्त विवरण..."
                          : "Describe your inquiry or requested collaboration..."
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#205A98] focus:ring-1 focus:ring-[#205A98]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{lang === "ne" ? "पठाउँदै..." : "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>{lang === "ne" ? "सन्देश पठाउनुहोस्" : "Submit Message"}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        {faqs && faqs.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205A98]/10 text-[#205A98] text-xs font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{lang === "ne" ? "प्रायः सोधिने प्रश्नहरू" : "Frequently Asked Questions"}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {lang === "ne" ? "जिज्ञासा र स्पष्टता" : "Common Clarifications"}
              </h3>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100 transition"
                    >
                      <span>{lang === "ne" ? faq.qNe : faq.qEn}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#205A98]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                        {lang === "ne" ? faq.aNe : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
