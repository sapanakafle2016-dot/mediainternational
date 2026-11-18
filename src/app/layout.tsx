import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";

export const metadata: Metadata = {
  title: "Media International Nepal | मिडिया इन्टरनेशनल - Empowering Nepal Through Financial Literacy & Entrepreneurship",
  description:
    "Promoting Financial Literacy, Banking, Insurance, Capital Markets, Business Literacy, and the 'काम गरौँ आफ्नै देशमा' & 'सम्भावना' campaigns across Nepal for 15+ years.",
  keywords: [
    "Media International Nepal",
    "मिडिया इन्टरनेशनल",
    "Financial Literacy Nepal",
    "वित्तीय साक्षरता",
    "काम गरौँ आफ्नै देशमा",
    "सम्भावना",
    "Entrepreneurship Nepal",
    "Banking",
    "Insurance",
    "Capital Markets SEBON",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans selection:bg-amber-400 selection:text-slate-900">
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
