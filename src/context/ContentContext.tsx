"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import initialData from "@/data/db.json";
import { AppDatabase, InquiryItem } from "@/data/types";

interface ContentContextType {
  content: AppDatabase;
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
  updateSection: <K extends keyof AppDatabase>(
    sectionKey: K,
    data: AppDatabase[K]
  ) => Promise<boolean>;
  saveEntireContent: (newContent: AppDatabase) => Promise<boolean>;
  submitInquiry: (
    data: { name: string; email: string; phone: string; subject: string; message: string }
  ) => Promise<{ success: boolean; message?: string }>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<AppDatabase>(initialData as unknown as AppDatabase);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load dynamic content");
      const data = await res.json();
      setContent(data);
      setError(null);
    } catch (err: any) {
      console.warn("Using offline / initial bundled content:", err.message);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const refreshContent = async () => {
    setLoading(true);
    await fetchContent();
    setLoading(false);
  };

  const updateSection = async <K extends keyof AppDatabase>(
    sectionKey: K,
    data: AppDatabase[K]
  ): Promise<boolean> => {
    try {
      const updated = {
        ...content,
        [sectionKey]: data,
      };
      setContent(updated);

      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [sectionKey]: data }),
      });

      if (!res.ok) throw new Error("Failed to persist changes");
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to update section");
      console.error("updateSection error:", err);
      return false;
    }
  };

  const saveEntireContent = async (newContent: AppDatabase): Promise<boolean> => {
    try {
      setContent(newContent);
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to save entire content");
      console.error("saveEntireContent error:", err);
      return false;
    }
  };

  const submitInquiry = async (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      
      // Update local inquiries list
      if (result.inquiry) {
        setContent((prev) => ({
          ...prev,
          inquiries: [result.inquiry, ...(prev.inquiries || [])],
        }));
      }

      return { success: true, message: result.message };
    } catch (err: any) {
      return { success: false, message: err.message || "Error submitting inquiry" };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
        refreshContent,
        updateSection,
        saveEntireContent,
        submitInquiry,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
};
