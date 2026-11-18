"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import {
  AppDatabase,
  HeroSlide,
  ChairmanMessage,
  ProgramItem,
  GalleryAlbum,
  GalleryPhoto,
  SiteSettings,
  InquiryItem,
  EventItem,
} from "@/data/types";
import {
  LayoutDashboard,
  Sliders,
  UserCheck,
  Layers,
  FolderOpen,
  Camera,
  Compass,
  Settings,
  Inbox,
  Save,
  CheckCircle2,
  Trash2,
  Plus,
  Upload,
  ExternalLink,
  RefreshCw,
  Eye,
  AlertCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  Sparkles,
  LogOut,
  Loader2,
  Wallet,
  Building2,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  Filter,
  X,
  Sprout,
  Zap,
  Laptop,
  Truck,
  ImageIcon,
  Search,
  Calendar,
  Maximize2,
  Tag,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const { content, updateSection, saveEntireContent, refreshContent } = useContent();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [localData, setLocalData] = useState<AppDatabase>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState<string>("all");

  // Programs CRUD States
  const [programCategoryFilter, setProgramCategoryFilter] = useState<string>("all");
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);
  const [showAddProgramModal, setShowAddProgramModal] = useState<boolean>(false);
  const [newProgram, setNewProgram] = useState<ProgramItem>({
    id: "",
    category: "finance",
    titleNe: "",
    titleEn: "",
    subtitleNe: "",
    subtitleEn: "",
    descriptionNe: "",
    descriptionEn: "",
    pointsNe: [""],
    pointsEn: [""],
    icon: "Wallet",
    badgeNe: "वित्तीय स्तम्भ",
    badgeEn: "Core Pillar",
  });

  // Program Helper: Create
  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.titleNe.trim()) {
      alert("Please provide at least a Nepali Title for the program.");
      return;
    }

    const created: ProgramItem = {
      ...newProgram,
      id: newProgram.id.trim() || `prog_${Date.now()}`,
      pointsNe: newProgram.pointsNe.filter((p) => p.trim() !== ""),
      pointsEn: newProgram.pointsEn.filter((p) => p.trim() !== ""),
    };

    setLocalData((prev) => ({
      ...prev,
      programs: [...(prev.programs || []), created],
    }));

    setShowAddProgramModal(false);
    setNewProgram({
      id: "",
      category: "finance",
      titleNe: "",
      titleEn: "",
      subtitleNe: "",
      subtitleEn: "",
      descriptionNe: "",
      descriptionEn: "",
      pointsNe: [""],
      pointsEn: [""],
      icon: "Wallet",
      badgeNe: "वित्तीय स्तम्भ",
      badgeEn: "Core Pillar",
    });
  };

  // Program Helper: Delete
  const handleDeleteProgram = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setLocalData((prev) => ({
      ...prev,
      programs: (prev.programs || []).filter((p) => p.id !== id),
    }));
  };

  // Program Helper: Add Point to an existing program
  const handleAddProgramPoint = (pIdx: number, langType: "ne" | "en") => {
    const updated = [...(localData.programs || [])];
    const key = langType === "ne" ? "pointsNe" : "pointsEn";
    const currentPoints = updated[pIdx][key] || [];
    updated[pIdx][key] = [...currentPoints, ""];
    setLocalData({ ...localData, programs: updated });
  };

  // Program Helper: Update Point
  const handleUpdateProgramPoint = (
    pIdx: number,
    ptIdx: number,
    value: string,
    langType: "ne" | "en"
  ) => {
    const updated = [...(localData.programs || [])];
    const key = langType === "ne" ? "pointsNe" : "pointsEn";
    const currentPoints = [...(updated[pIdx][key] || [])];
    currentPoints[ptIdx] = value;
    updated[pIdx][key] = currentPoints;
    setLocalData({ ...localData, programs: updated });
  };

  // Program Helper: Remove Point
  const handleRemoveProgramPoint = (
    pIdx: number,
    ptIdx: number,
    langType: "ne" | "en"
  ) => {
    const updated = [...(localData.programs || [])];
    const key = langType === "ne" ? "pointsNe" : "pointsEn";
    const currentPoints = (updated[pIdx][key] || []).filter((_, idx) => idx !== ptIdx);
    updated[pIdx][key] = currentPoints;
    setLocalData({ ...localData, programs: updated });
  };

  // Helper to sync photo counts per album
  const recalculateAlbumCounts = (photos: GalleryPhoto[], albums: GalleryAlbum[]) => {
    return (albums || []).map((a) => ({
      ...a,
      photoCount: (photos || []).filter((p) => p.albumId === a.id).length,
    }));
  };

  // ALBUMS CRUD States & Helpers
  const [showAddAlbumModal, setShowAddAlbumModal] = useState<boolean>(false);
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);
  const [newAlbum, setNewAlbum] = useState<GalleryAlbum>({
    id: "",
    titleNe: "",
    titleEn: "",
    descNe: "",
    descEn: "",
    coverImage: "/images/uploads/banking-expo-2079.webp",
    photoCount: 0,
  });

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbum.titleNe.trim()) {
      alert("Please provide at least an Album Title (Nepali).");
      return;
    }

    const created: GalleryAlbum = {
      ...newAlbum,
      id: newAlbum.id.trim() || `album_${Date.now()}`,
      photoCount: 0,
    };

    setLocalData((prev) => ({
      ...prev,
      galleryAlbums: [...(prev.galleryAlbums || []), created],
    }));

    setShowAddAlbumModal(false);
    setNewAlbum({
      id: "",
      titleNe: "",
      titleEn: "",
      descNe: "",
      descEn: "",
      coverImage: "/images/uploads/banking-expo-2079.webp",
      photoCount: 0,
    });
  };

  const handleDeleteAlbum = (albumId: string, title: string) => {
    const photoCount = (localData.galleryPhotos || []).filter(
      (p) => p.albumId === albumId
    ).length;

    const confirmMsg =
      photoCount > 0
        ? `Warning: Album "${title}" contains ${photoCount} photos. Are you sure you want to delete this album? (Photos will remain in the database under unassigned)`
        : `Are you sure you want to delete album "${title}"?`;

    if (!confirm(confirmMsg)) return;

    setLocalData((prev) => ({
      ...prev,
      galleryAlbums: (prev.galleryAlbums || []).filter((a) => a.id !== albumId),
    }));
  };

  // PHOTOGRAPHS CRUD States & Helpers
  const [showAddPhotoModal, setShowAddPhotoModal] = useState<boolean>(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<GalleryPhoto | null>(null);
  const [searchPhotoQuery, setSearchPhotoQuery] = useState<string>("");
  const [gallerySubTab, setGallerySubTab] = useState<"photos" | "albums">("photos");
  const [newPhoto, setNewPhoto] = useState<GalleryPhoto>({
    id: "",
    url: "/images/uploads/banking-expo-2079.webp",
    imageUrl: "/images/uploads/banking-expo-2079.webp",
    titleNe: "",
    titleEn: "",
    descriptionNe: "",
    descriptionEn: "",
    locationNe: "काठमाडौँ, नेपाल",
    locationEn: "Kathmandu, Nepal",
    year: "२०८१",
    categoryNe: "वित्तीय साक्षरता मेला",
    categoryEn: "Financial Literacy Expo",
    albumId: "",
  });

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.titleNe.trim()) {
      alert("Please provide at least a Photograph Title (Nepali).");
      return;
    }
    const finalAlbumId =
      newPhoto.albumId ||
      (selectedAlbumFilter !== "all" ? selectedAlbumFilter : localData.galleryAlbums?.[0]?.id || "dialogues");

    const img = newPhoto.imageUrl || newPhoto.url || "/images/uploads/banking-expo-2079.webp";
    const created: GalleryPhoto = {
      ...newPhoto,
      id: newPhoto.id.trim() || `photo_${Date.now()}`,
      albumId: finalAlbumId,
      url: img,
      imageUrl: img,
    };

    const updatedPhotos = [created, ...(localData.galleryPhotos || [])];
    const updatedAlbums = recalculateAlbumCounts(updatedPhotos, localData.galleryAlbums || []);

    setLocalData((prev) => ({
      ...prev,
      galleryPhotos: updatedPhotos,
      galleryAlbums: updatedAlbums,
    }));

    setShowAddPhotoModal(false);
    setNewPhoto({
      id: "",
      url: "/images/uploads/banking-expo-2079.webp",
      imageUrl: "/images/uploads/banking-expo-2079.webp",
      titleNe: "",
      titleEn: "",
      descriptionNe: "",
      descriptionEn: "",
      locationNe: "काठमाडौँ, नेपाल",
      locationEn: "Kathmandu, Nepal",
      year: "२०८१",
      categoryNe: "वित्तीय साक्षरता मेला",
      categoryEn: "Financial Literacy Expo",
      albumId: "",
    });
  };

  const handleDeletePhoto = (photoId: string, photoTitle?: string) => {
    if (!confirm(`Are you sure you want to delete photograph "${photoTitle || photoId}"? This cannot be undone.`)) {
      return;
    }

    const updatedPhotos = (localData.galleryPhotos || []).filter((p) => p.id !== photoId);
    const updatedAlbums = recalculateAlbumCounts(updatedPhotos, localData.galleryAlbums || []);

    setLocalData((prev) => ({
      ...prev,
      galleryPhotos: updatedPhotos,
      galleryAlbums: updatedAlbums,
    }));

    if (editingPhotoId === photoId) {
      setEditingPhotoId(null);
    }
  };

  const handleUpdatePhotoField = (photoId: string, field: keyof GalleryPhoto, value: any) => {
    const updatedPhotos = (localData.galleryPhotos || []).map((p) => {
      if (p.id === photoId) {
        const up = { ...p, [field]: value };
        if (field === "imageUrl") up.url = value;
        if (field === "url") up.imageUrl = value;
        return up;
      }
      return p;
    });

    const updatedAlbums =
      field === "albumId"
        ? recalculateAlbumCounts(updatedPhotos, localData.galleryAlbums || [])
        : localData.galleryAlbums;

    setLocalData((prev) => ({
      ...prev,
      galleryPhotos: updatedPhotos,
      galleryAlbums: updatedAlbums,
    }));
  };

  // OPPORTUNITIES CRUD States & Helpers
  const [showAddOpportunityModal, setShowAddOpportunityModal] = useState<boolean>(false);
  const [expandedOpportunityId, setExpandedOpportunityId] = useState<string | null>(null);
  const [newOpportunity, setNewOpportunity] = useState<{
    id: string;
    sectorNe: string;
    sectorEn: string;
    titleNe: string;
    titleEn: string;
    tagNe: string;
    tagEn: string;
    potentialNe: string;
    potentialEn: string;
    descriptionNe: string;
    descriptionEn: string;
    icon: string;
    examplesNe: string[];
    examplesEn: string[];
  }>({
    id: "",
    sectorNe: "",
    sectorEn: "",
    titleNe: "",
    titleEn: "",
    tagNe: "उच्च सम्भावना",
    tagEn: "High Potential",
    potentialNe: "",
    potentialEn: "",
    descriptionNe: "",
    descriptionEn: "",
    icon: "Sprout",
    examplesNe: [""],
    examplesEn: [""],
  });

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpportunity.titleNe.trim() || !newOpportunity.sectorNe.trim()) {
      alert("Please provide at least a Sector Name and Title in Nepali.");
      return;
    }

    const created = {
      ...newOpportunity,
      id: newOpportunity.id.trim() || `sec_${Date.now()}`,
      examplesNe: newOpportunity.examplesNe.filter((ex) => ex.trim() !== ""),
      examplesEn: newOpportunity.examplesEn.filter((ex) => ex.trim() !== ""),
    };

    setLocalData((prev) => ({
      ...prev,
      opportunities: [...(prev.opportunities || []), created],
    }));

    setShowAddOpportunityModal(false);
    setNewOpportunity({
      id: "",
      sectorNe: "",
      sectorEn: "",
      titleNe: "",
      titleEn: "",
      tagNe: "उच्च सम्भावना",
      tagEn: "High Potential",
      potentialNe: "",
      potentialEn: "",
      descriptionNe: "",
      descriptionEn: "",
      icon: "Sprout",
      examplesNe: [""],
      examplesEn: [""],
    });
  };

  const handleDeleteOpportunity = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete sector "${title}"?`)) return;
    setLocalData((prev) => ({
      ...prev,
      opportunities: (prev.opportunities || []).filter((o) => o.id !== id),
    }));
  };

  const handleAddOpportunityExample = (oIdx: number, langType: "ne" | "en") => {
    const updated = [...(localData.opportunities || [])];
    const key = langType === "ne" ? "examplesNe" : "examplesEn";
    const currentExamples = updated[oIdx][key] || [];
    updated[oIdx][key] = [...currentExamples, ""];
    setLocalData({ ...localData, opportunities: updated });
  };

  const handleUpdateOpportunityExample = (
    oIdx: number,
    exIdx: number,
    value: string,
    langType: "ne" | "en"
  ) => {
    const updated = [...(localData.opportunities || [])];
    const key = langType === "ne" ? "examplesNe" : "examplesEn";
    const currentExamples = [...(updated[oIdx][key] || [])];
    currentExamples[exIdx] = value;
    updated[oIdx][key] = currentExamples;
    setLocalData({ ...localData, opportunities: updated });
  };
  const handleRemoveOpportunityExample = (
    oIdx: number,
    exIdx: number,
    langType: "ne" | "en"
  ) => {
    const updated = [...(localData.opportunities || [])];
    const key = langType === "ne" ? "examplesNe" : "examplesEn";
    const currentExamples = (updated[oIdx][key] || []).filter((_, idx) => idx !== exIdx);
    updated[oIdx][key] = currentExamples;
    setLocalData({ ...localData, opportunities: updated });
  };

  // EVENTS CRUD States & Helpers
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventFilterTab, setEventFilterTab] = useState<"all" | "upcoming" | "past">("all");
  const [searchEventQuery, setSearchEventQuery] = useState<string>("");
  const [todayDateStr, setTodayDateStr] = useState<string>("2026-11-18");
  useEffect(() => {
    setTodayDateStr(new Date().toISOString().split("T")[0]);
  }, []);

  const [newEvent, setNewEvent] = useState<EventItem>({
    id: "",
    titleNe: "",
    titleEn: "",
    scheduleDate: "2026-12-15",
    dateNe: "",
    dateEn: "",
    timeNe: "बिहान १०:०० बजे देखि",
    timeEn: "10:00 AM onwards",
    venueNe: "काठमाडौँ, नेपाल",
    venueEn: "Kathmandu, Nepal",
    categoryNe: "राष्ट्रिय वित्तीय मेला",
    categoryEn: "National Financial Expo",
    descriptionNe: "",
    descriptionEn: "",
    imageUrl: "/images/uploads/banking-expo-2079.webp",
    highlightsNe: [""],
    highlightsEn: [""],
    registrationUrl: "/contact",
    contactPhone: "+977-1-4400000",
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.titleNe.trim()) {
      alert("Please provide at least an Event Title in Nepali.");
      return;
    }
    if (!newEvent.scheduleDate) {
      alert("Please select a Schedule Date.");
      return;
    }

    const created: EventItem = {
      ...newEvent,
      id: newEvent.id.trim() || `event_${Date.now()}`,
      highlightsNe: (newEvent.highlightsNe || []).filter((h) => h.trim() !== ""),
      highlightsEn: (newEvent.highlightsEn || []).filter((h) => h.trim() !== ""),
    };

    setLocalData((prev) => ({
      ...prev,
      events: [created, ...(prev.events || [])],
    }));

    setShowAddEventModal(false);
    setNewEvent({
      id: "",
      titleNe: "",
      titleEn: "",
      scheduleDate: todayDateStr,
      dateNe: "",
      dateEn: "",
      timeNe: "बिहान १०:०० बजे देखि",
      timeEn: "10:00 AM onwards",
      venueNe: "काठमाडौँ, नेपाल",
      venueEn: "Kathmandu, Nepal",
      categoryNe: "राष्ट्रिय वित्तीय मेला",
      categoryEn: "National Financial Expo",
      descriptionNe: "",
      descriptionEn: "",
      imageUrl: "/images/uploads/banking-expo-2079.webp",
      highlightsNe: [""],
      highlightsEn: [""],
      registrationUrl: "/contact",
      contactPhone: "+977-1-4400000",
    });
  };

  const handleDeleteEvent = (eventId: string, title?: string) => {
    if (
      !confirm(
        `Are you sure you want to delete event "${title || eventId}"? This cannot be undone.`
      )
    ) {
      return;
    }
    setLocalData((prev) => ({
      ...prev,
      events: (prev.events || []).filter((ev) => ev.id !== eventId),
    }));
    if (editingEventId === eventId) {
      setEditingEventId(null);
    }
  };

  const handleUpdateEventField = (eventId: string, field: keyof EventItem, value: any) => {
    const updated = (localData.events || []).map((ev) => {
      if (ev.id === eventId) {
        return { ...ev, [field]: value };
      }
      return ev;
    });
    setLocalData({ ...localData, events: updated });
  };

  const handleAddEventHighlight = (eIdx: number, langType: "ne" | "en") => {
    const updated = [...(localData.events || [])];
    const key = langType === "ne" ? "highlightsNe" : "highlightsEn";
    const cur = updated[eIdx][key] || [];
    updated[eIdx][key] = [...cur, ""];
    setLocalData({ ...localData, events: updated });
  };

  const handleUpdateEventHighlight = (
    eIdx: number,
    hIdx: number,
    val: string,
    langType: "ne" | "en"
  ) => {
    const updated = [...(localData.events || [])];
    const key = langType === "ne" ? "highlightsNe" : "highlightsEn";
    const cur = [...(updated[eIdx][key] || [])];
    cur[hIdx] = val;
    updated[eIdx][key] = cur;
    setLocalData({ ...localData, events: updated });
  };

  const handleRemoveEventHighlight = (
    eIdx: number,
    hIdx: number,
    langType: "ne" | "en"
  ) => {
    const updated = [...(localData.events || [])];
    const key = langType === "ne" ? "highlightsNe" : "highlightsEn";
    const cur = (updated[eIdx][key] || []).filter((_, idx) => idx !== hIdx);
    updated[eIdx][key] = cur;
    setLocalData({ ...localData, events: updated });
  };

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(data.user);
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // Keep localData in sync with context when loaded
  useEffect(() => {
    setLocalData(content);
  }, [content]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  // Handle Image Upload Helper
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onSuccess(data.url);
      setUploadingImage(false);
    } catch (err: any) {
      alert("Image upload error: " + err.message);
      setUploadingImage(false);
    }
  };

  // Save All Changes to Server
  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    const success = await saveEntireContent(localData);
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  // Inquiry Status Toggler
  const handleMarkInquiryRead = async (id: string, newStatus: "read" | "unread") => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLocalData((prev) => ({
          ...prev,
          inquiries: prev.inquiries.map((inq) =>
            inq.id === id ? { ...inq, status: newStatus } : inq
          ),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLocalData((prev) => ({
          ...prev,
          inquiries: prev.inquiries.filter((inq) => inq.id !== id),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount =
    localData.inquiries?.filter((i) => i.status === "unread").length || 0;

  // Show secure loader while verifying authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-[#D0372F] animate-spin mb-3" />
        <p className="text-xs sm:text-sm font-bold text-slate-300">
          Verifying Admin Authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg">
              <img
                src={localData.siteSettings?.logoUrl || "/images/logo.png"}
                alt="Logo"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Media International</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#D0372F] text-white uppercase tracking-wider">
                  CMS Admin
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Logged in as: <span className="text-slate-200 font-semibold">{adminUser?.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold transition shadow-md cursor-pointer disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 text-xs font-bold transition border border-slate-700 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full flex-grow flex flex-col md:flex-row gap-4 sm:gap-8">
        {/* Sidebar Navigation - Responsive: Horizontal tabs on mobile, Sticky vertical menu on desktop */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-3 shadow-xs md:sticky md:top-24">
            <nav className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "hero", label: "Hero Slider", icon: Sliders },
                { id: "chairman", label: "Chairman Message", icon: UserCheck },
                { id: "programs", label: "Programs (5 Pillars)", icon: Layers },
                { id: "gallery", label: "Photographs & Albums", icon: Camera },
                { id: "opportunities", label: "Opportunities (सम्भावना)", icon: Compass },
                {
                  id: "events",
                  label: "Events & Schedule",
                  icon: Calendar,
                  badge: (localData.events || []).length || null,
                },
                { id: "settings", label: "Site Settings", icon: Settings },
                {
                  id: "inquiries",
                  label: "Inquiries Inbox",
                  icon: Inbox,
                  badge: unreadCount > 0 ? unreadCount : null,
                },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`shrink-0 md:w-full flex items-center justify-between gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#205A98] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[10px] font-extrabold bg-[#D0372F] text-white ml-1">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="hidden md:block mt-6 pt-4 border-t border-slate-100 px-3">
              <div className="text-[11px] text-slate-400 font-medium">
                Changes saved here instantly update the live site via `db.json`.
              </div>
            </div>
          </div>
        </aside>

        {/* Content Body Area */}
        <main className="flex-grow min-w-0">
          {saveSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>All dynamic website changes successfully persisted!</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                  Website Dashboard & CMS Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Manage all content, media, sections, and messages for Media International Nepal.
                </p>

                {/* Counter Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <div className="text-xs font-bold text-[#205A98]">Hero Slides</div>
                    <div className="text-3xl font-black text-slate-900 mt-1">
                      {localData.heroSlides?.length || 0}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                    <div className="text-xs font-bold text-[#D0372F]">Photo Albums</div>
                    <div className="text-3xl font-black text-slate-900 mt-1">
                      {localData.galleryAlbums?.length || 0}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <div className="text-xs font-bold text-amber-700">Total Photos</div>
                    <div className="text-3xl font-black text-slate-900 mt-1">
                      {localData.galleryPhotos?.length || 0}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="text-xs font-bold text-emerald-700">Inquiries</div>
                    <div className="text-3xl font-black text-slate-900 mt-1">
                      {localData.inquiries?.length || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div
                  onClick={() => setActiveTab("hero")}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#205A98] hover:shadow-md transition cursor-pointer"
                >
                  <Sliders className="w-6 h-6 text-[#205A98] mb-3" />
                  <h3 className="font-bold text-slate-900 text-sm">Manage Hero Slider</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add new banners, change titles, or upload high-res images.
                  </p>
                </div>
                <div
                  onClick={() => setActiveTab("gallery")}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#D0372F] hover:shadow-md transition cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-[#D0372F] mb-3" />
                  <h3 className="font-bold text-slate-900 text-sm">Upload Photos & Albums</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload event photographs, create new albums, and edit locations.
                  </p>
                </div>
                <div
                  onClick={() => setActiveTab("settings")}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-800 hover:shadow-md transition cursor-pointer"
                >
                  <Settings className="w-6 h-6 text-slate-700 mb-3" />
                  <h3 className="font-bold text-slate-900 text-sm">Address & Site Settings</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Update phone, email, working hours, and CTC Mall Sundhara address.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SLIDER MANAGER */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hero Slider Manager</h2>
                  <p className="text-xs text-slate-500">
                    Control large image slider banners and Nepali/English titles on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSlide: HeroSlide = {
                      id: `slide_${Date.now()}`,
                      imageUrl: "/images/uploads/banking-expo-2079.webp",
                      titleNe: "नयाँ ब्यानर शीर्षक",
                      titleEn: "New Slide Title",
                      badgeNe: "विशेष अभियान",
                      badgeEn: "Special Campaign",
                    };
                    setLocalData((prev) => ({
                      ...prev,
                      heroSlides: [...prev.heroSlides, newSlide],
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-4">
                {localData.heroSlides?.map((slide, sIdx) => (
                  <div
                    key={slide.id || sIdx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-5 items-start"
                  >
                    {/* Thumbnail & Upload */}
                    <div className="w-full md:w-56 shrink-0 flex flex-col gap-2">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                        <img
                          src={slide.imageUrl}
                          alt="Slide"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-200">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              const updated = [...localData.heroSlides];
                              updated[sIdx].imageUrl = url;
                              setLocalData({ ...localData, heroSlides: updated });
                            })
                          }
                        />
                      </label>
                    </div>

                    {/* Inputs */}
                    <div className="flex-grow space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Badge (नेपाली)
                          </label>
                          <input
                            type="text"
                            value={slide.badgeNe}
                            onChange={(e) => {
                              const updated = [...localData.heroSlides];
                              updated[sIdx].badgeNe = e.target.value;
                              setLocalData({ ...localData, heroSlides: updated });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#205A98]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Badge (English)
                          </label>
                          <input
                            type="text"
                            value={slide.badgeEn}
                            onChange={(e) => {
                              const updated = [...localData.heroSlides];
                              updated[sIdx].badgeEn = e.target.value;
                              setLocalData({ ...localData, heroSlides: updated });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#205A98]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Title (नेपाली)
                        </label>
                        <input
                          type="text"
                          value={slide.titleNe}
                          onChange={(e) => {
                            const updated = [...localData.heroSlides];
                            updated[sIdx].titleNe = e.target.value;
                            setLocalData({ ...localData, heroSlides: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:border-[#205A98]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Title (English)
                        </label>
                        <input
                          type="text"
                          value={slide.titleEn}
                          onChange={(e) => {
                            const updated = [...localData.heroSlides];
                            updated[sIdx].titleEn = e.target.value;
                            setLocalData({ ...localData, heroSlides: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:border-[#205A98]"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (localData.heroSlides.length <= 1) {
                              alert("At least one slide is required.");
                              return;
                            }
                            const updated = localData.heroSlides.filter((_, idx) => idx !== sIdx);
                            setLocalData({ ...localData, heroSlides: updated });
                          }}
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Slide</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHAIRMAN MESSAGE */}
          {activeTab === "chairman" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Chairman's Message Editor</h2>
                <p className="text-xs text-slate-500">
                  Update Chairman photo, designation, quotes, and full speech.
                </p>
              </div>

              {/* Photo & Identity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-6 border-b border-slate-100">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-48 h-60 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                    <img
                      src={localData.chairmanMessage?.photoUrl || "/images/madhav.jpg"}
                      alt="Chairman"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Chairman Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) => {
                          setLocalData({
                            ...localData,
                            chairmanMessage: {
                              ...localData.chairmanMessage,
                              photoUrl: url,
                            },
                          });
                        })
                      }
                    />
                  </label>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Name (नेपाली)
                      </label>
                      <input
                        type="text"
                        value={localData.chairmanMessage?.nameNe || ""}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            chairmanMessage: {
                              ...localData.chairmanMessage,
                              nameNe: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Name (English)
                      </label>
                      <input
                        type="text"
                        value={localData.chairmanMessage?.nameEn || ""}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            chairmanMessage: {
                              ...localData.chairmanMessage,
                              nameEn: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Designation (नेपाली)
                      </label>
                      <input
                        type="text"
                        value={localData.chairmanMessage?.designationNe || ""}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            chairmanMessage: {
                              ...localData.chairmanMessage,
                              designationNe: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Designation (English)
                      </label>
                      <input
                        type="text"
                        value={localData.chairmanMessage?.designationEn || ""}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            chairmanMessage: {
                              ...localData.chairmanMessage,
                              designationEn: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highlight Quote (नेपाली)
                    </label>
                    <textarea
                      rows={2}
                      value={localData.chairmanMessage?.quoteNe || ""}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          chairmanMessage: {
                            ...localData.chairmanMessage,
                            quoteNe: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Message Paragraphs */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Detailed Speech Paragraphs
                </h3>

                {[1, 2, 3, 4].map((num) => {
                  const keyNe = `message${num}Ne` as keyof ChairmanMessage;
                  const keyEn = `message${num}En` as keyof ChairmanMessage;
                  return (
                    <div key={num} className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-slate-700">Paragraph {num}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <textarea
                          rows={3}
                          placeholder={`नेपाली खण्ड ${num}`}
                          value={(localData.chairmanMessage?.[keyNe] as string) || ""}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              chairmanMessage: {
                                ...localData.chairmanMessage,
                                [keyNe]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                        <textarea
                          rows={3}
                          placeholder={`English Section ${num}`}
                          value={(localData.chairmanMessage?.[keyEn] as string) || ""}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              chairmanMessage: {
                                ...localData.chairmanMessage,
                                [keyEn]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PROGRAMS (5 PILLARS) - FULL CRUD */}
          {activeTab === "programs" && (
            <div className="space-y-6">
              {/* Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      Programs & 5 Pillars Management
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#205A98]/10 text-[#205A98]">
                      {localData.programs?.length || 0} Programs
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, update, and manage financial literacy pillars, curricular modules, and learning points.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProgramModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Program</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Bar */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-400 pl-3 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Category:</span>
                </span>
                {[
                  { id: "all", label: "All Programs" },
                  { id: "finance", label: "वित्तीय साक्षरता (Finance)" },
                  { id: "banking", label: "बैंकिङ पहुँच (Banking)" },
                  { id: "insurance", label: "बीमा सुरक्षा (Insurance)" },
                  { id: "capital", label: "पुँजी बजार (Capital)" },
                  { id: "digital", label: "डिजिटल फिनटेक (Digital)" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setProgramCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      programCategoryFilter === cat.id
                        ? "bg-[#205A98] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* ADD NEW PROGRAM MODAL / CARD */}
              {showAddProgramModal && (
                <div className="bg-white rounded-3xl border-2 border-[#205A98] p-6 sm:p-8 shadow-xl animate-fade-in space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-[#205A98]" />
                        <span>Create New Program / Pillar</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Fill in program details, descriptions, and learning points.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddProgramModal(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateProgram} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category *
                        </label>
                        <select
                          value={newProgram.category}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, category: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="finance">finance (वित्तीय साक्षरता)</option>
                          <option value="banking">banking (बैंकिङ पहुँच)</option>
                          <option value="insurance">insurance (बीमा सुरक्षा)</option>
                          <option value="capital">capital (पुँजी बजार)</option>
                          <option value="digital">digital (डिजिटल फिनटेक)</option>
                          <option value="enterprise">enterprise (उद्यमशीलता)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Icon Style
                        </label>
                        <select
                          value={newProgram.icon}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, icon: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="Wallet">Wallet (पर्स / बचत)</option>
                          <option value="Building2">Building2 (बैंक / संस्था)</option>
                          <option value="ShieldCheck">ShieldCheck (बीमा / सुरक्षा)</option>
                          <option value="TrendingUp">TrendingUp (लगानी / सेयर)</option>
                          <option value="Smartphone">Smartphone (डिजिटल / वालेट)</option>
                          <option value="Layers">Layers (स्तम्भ / बहुआयामिक)</option>
                          <option value="Compass">Compass (मार्गदर्शन / उद्यम)</option>
                          <option value="Award">Award (पुरस्कार / उपलब्धि)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Unique ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={newProgram.id}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, id: e.target.value })
                          }
                          placeholder="e.g. prog-fin-lit"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Badge (नेपाली)
                        </label>
                        <input
                          type="text"
                          value={newProgram.badgeNe}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, badgeNe: e.target.value })
                          }
                          placeholder="पहिलो स्तम्भ"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Badge (English)
                        </label>
                        <input
                          type="text"
                          value={newProgram.badgeEn}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, badgeEn: e.target.value })
                          }
                          placeholder="Pillar 1"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Program Title (नेपाली) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProgram.titleNe}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, titleNe: e.target.value })
                          }
                          placeholder="कार्यक्रमको मुख्य शीर्षक"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Program Title (English)
                        </label>
                        <input
                          type="text"
                          value={newProgram.titleEn}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, titleEn: e.target.value })
                          }
                          placeholder="Program Title in English"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Subtitle (नेपाली)
                        </label>
                        <input
                          type="text"
                          value={newProgram.subtitleNe}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, subtitleNe: e.target.value })
                          }
                          placeholder="संक्षिप्त उपशीर्षक"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Subtitle (English)
                        </label>
                        <input
                          type="text"
                          value={newProgram.subtitleEn}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, subtitleEn: e.target.value })
                          }
                          placeholder="Program Subtitle in English"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Description (नेपाली)
                        </label>
                        <textarea
                          rows={3}
                          value={newProgram.descriptionNe}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, descriptionNe: e.target.value })
                          }
                          placeholder="कार्यक्रमको विस्तृत विवरण..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Description (English)
                        </label>
                        <textarea
                          rows={3}
                          value={newProgram.descriptionEn}
                          onChange={(e) =>
                            setNewProgram({ ...newProgram, descriptionEn: e.target.value })
                          }
                          placeholder="Detailed description in English..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    {/* Learning Points in New Program */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="text-xs font-bold text-slate-800">
                        Initial Learning Points (मुख्य सिकाइ बुँदाहरू):
                      </div>
                      <div className="space-y-2">
                        {newProgram.pointsNe.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 w-5">
                              {pIdx + 1}.
                            </span>
                            <input
                              type="text"
                              value={pt}
                              onChange={(e) => {
                                const pts = [...newProgram.pointsNe];
                                pts[pIdx] = e.target.value;
                                setNewProgram({ ...newProgram, pointsNe: pts });
                              }}
                              placeholder="सिकाइ बुँदा (नेपाली)"
                              className="flex-grow px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const pts = newProgram.pointsNe.filter((_, i) => i !== pIdx);
                                setNewProgram({ ...newProgram, pointsNe: pts });
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            setNewProgram({
                              ...newProgram,
                              pointsNe: [...newProgram.pointsNe, ""],
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#205A98] hover:underline cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Another Point</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddProgramModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save New Program
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* PROGRAMS LIST */}
              <div className="space-y-4">
                {(localData.programs || [])
                  .filter(
                    (p) =>
                      programCategoryFilter === "all" ||
                      p.category === programCategoryFilter
                  )
                  .map((prog) => {
                    const originalIndex = (localData.programs || []).findIndex(
                      (x) => x.id === prog.id
                    );
                    const isExpanded = expandedProgramId === prog.id;

                    return (
                      <div
                        key={prog.id}
                        className={`rounded-2xl border transition-all duration-200 ${
                          isExpanded
                            ? "bg-white border-[#205A98] shadow-md ring-2 ring-[#205A98]/10"
                            : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                        }`}
                      >
                        {/* Summary Header Row */}
                        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#205A98]">
                              <Layers className="w-6 h-6" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#205A98]/10 text-[#205A98] uppercase">
                                  {prog.category}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D0372F]/10 text-[#D0372F]">
                                  {prog.badgeNe || prog.badgeEn}
                                </span>
                                <span className="text-xs text-slate-400">
                                  ID: {prog.id}
                                </span>
                              </div>

                              <h3 className="text-base font-bold text-slate-900">
                                {prog.titleNe}
                              </h3>
                              <p className="text-xs text-slate-500 font-medium">
                                {prog.titleEn}
                              </p>
                              <div className="text-[11px] text-slate-400 mt-1">
                                {(prog.pointsNe || []).length} Nepali Points · {(prog.pointsEn || []).length} English Points
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 self-end md:self-center">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedProgramId(isExpanded ? null : prog.id)
                              }
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                isExpanded
                                  ? "bg-[#205A98] text-white"
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isExpanded ? "Close Editor" : "Edit Details"}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteProgram(prog.id, prog.titleNe || prog.titleEn)
                              }
                              className="p-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border border-transparent hover:border-red-200"
                              title="Delete Program"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* EXPANDED IN-DEPTH PROGRAM EDITOR */}
                        {isExpanded && (
                          <div className="p-6 border-t border-slate-100 bg-slate-50/70 space-y-5 animate-fade-in">
                            <div className="text-xs font-bold uppercase tracking-wider text-[#205A98] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Edit Full Program Details & Learning Points</span>
                            </div>

                            {/* Row 1: Category, Icon, Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Category
                                </label>
                                <select
                                  value={prog.category}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].category = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                                >
                                  <option value="finance">finance (वित्तीय साक्षरता)</option>
                                  <option value="banking">banking (बैंकिङ पहुँच)</option>
                                  <option value="insurance">insurance (बीमा सुरक्षा)</option>
                                  <option value="capital">capital (पुँजी बजार)</option>
                                  <option value="digital">digital (डिजिटल फिनटेक)</option>
                                  <option value="enterprise">enterprise (उद्यमशीलता)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Icon Name
                                </label>
                                <select
                                  value={prog.icon}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].icon = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                                >
                                  <option value="Wallet">Wallet (पर्स / बचत)</option>
                                  <option value="Building2">Building2 (बैंक / संस्था)</option>
                                  <option value="ShieldCheck">ShieldCheck (बीमा / सुरक्षा)</option>
                                  <option value="TrendingUp">TrendingUp (लगानी / सेयर)</option>
                                  <option value="Smartphone">Smartphone (डिजिटल / वालेट)</option>
                                  <option value="Layers">Layers (स्तम्भ / बहुआयामिक)</option>
                                  <option value="Compass">Compass (मार्गदर्शन / उद्यम)</option>
                                  <option value="Award">Award (पुरस्कार / उपलब्धि)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Badge (नेपाली)
                                </label>
                                <input
                                  type="text"
                                  value={prog.badgeNe}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].badgeNe = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Badge (English)
                                </label>
                                <input
                                  type="text"
                                  value={prog.badgeEn}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].badgeEn = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                            </div>

                            {/* Row 2: Titles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Title (नेपाली)
                                </label>
                                <input
                                  type="text"
                                  value={prog.titleNe}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].titleNe = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Title (English)
                                </label>
                                <input
                                  type="text"
                                  value={prog.titleEn}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].titleEn = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                            </div>

                            {/* Row 3: Subtitles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Subtitle (नेपाली)
                                </label>
                                <input
                                  type="text"
                                  value={prog.subtitleNe}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].subtitleNe = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Subtitle (English)
                                </label>
                                <input
                                  type="text"
                                  value={prog.subtitleEn}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].subtitleEn = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                            </div>

                            {/* Row 4: Descriptions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Description (नेपाली)
                                </label>
                                <textarea
                                  rows={3}
                                  value={prog.descriptionNe}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].descriptionNe = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  Description (English)
                                </label>
                                <textarea
                                  rows={3}
                                  value={prog.descriptionEn}
                                  onChange={(e) => {
                                    const updated = [...(localData.programs || [])];
                                    updated[originalIndex].descriptionEn = e.target.value;
                                    setLocalData({ ...localData, programs: updated });
                                  }}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                                />
                              </div>
                            </div>

                            {/* Row 5: Dynamic Learning Points CRUD (सिकाइ बुँदाहरू) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                              {/* Nepali Points */}
                              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-900">
                                    मुख्य सिकाइ बुँदाहरू (Nepali Points)
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddProgramPoint(originalIndex, "ne")}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#205A98] text-[11px] font-bold cursor-pointer transition"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add Point</span>
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  {(prog.pointsNe || []).map((point, ptIdx) => (
                                    <div key={ptIdx} className="flex items-center gap-2">
                                      <span className="w-5 text-[11px] font-bold text-slate-400">
                                        {ptIdx + 1}.
                                      </span>
                                      <input
                                        type="text"
                                        value={point}
                                        onChange={(e) =>
                                          handleUpdateProgramPoint(
                                            originalIndex,
                                            ptIdx,
                                            e.target.value,
                                            "ne"
                                          )
                                        }
                                        placeholder="सिकाइ बुँदा"
                                        className="flex-grow px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveProgramPoint(originalIndex, ptIdx, "ne")
                                        }
                                        className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                        title="Remove point"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                  {(prog.pointsNe || []).length === 0 && (
                                    <div className="text-xs text-slate-400 italic">
                                      No Nepali points added yet.
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* English Points */}
                              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-900">
                                    Curricular Modules (English Points)
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddProgramPoint(originalIndex, "en")}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#205A98] text-[11px] font-bold cursor-pointer transition"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add Point</span>
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  {(prog.pointsEn || []).map((point, ptIdx) => (
                                    <div key={ptIdx} className="flex items-center gap-2">
                                      <span className="w-5 text-[11px] font-bold text-slate-400">
                                        {ptIdx + 1}.
                                      </span>
                                      <input
                                        type="text"
                                        value={point}
                                        onChange={(e) =>
                                          handleUpdateProgramPoint(
                                            originalIndex,
                                            ptIdx,
                                            e.target.value,
                                            "en"
                                          )
                                        }
                                        placeholder="Learning module in English"
                                        className="flex-grow px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveProgramPoint(originalIndex, ptIdx, "en")
                                        }
                                        className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                        title="Remove point"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                  {(prog.pointsEn || []).length === 0 && (
                                    <div className="text-xs text-slate-400 italic">
                                      No English points added yet.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Done Editing Button */}
                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => setExpandedProgramId(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                              >
                                Done Editing
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 5: PHOTOGRAPHS & ALBUMS */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              {/* TOP HEADER & SUB-NAV SELECTOR */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">Photographs & Albums Management</h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#205A98]/10 text-[#205A98]">
                        {localData.galleryPhotos?.length || 0} Photographs
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D0372F]/10 text-[#D0372F]">
                        {localData.galleryAlbums?.length || 0} Albums
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload, categorize, edit metadata, and organize photographs across nationwide financial literacy campaigns and expos.
                    </p>
                  </div>

                  {/* Sub-nav switcher & Action buttons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setGallerySubTab("photos")}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          gallerySubTab === "photos"
                            ? "bg-white text-[#205A98] shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Photographs ({localData.galleryPhotos?.length || 0})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setGallerySubTab("albums")}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          gallerySubTab === "albums"
                            ? "bg-white text-[#D0372F] shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Albums ({localData.galleryAlbums?.length || 0})</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddPhotoModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload & Add Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddAlbumModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Album</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* VIEW 1: PHOTOGRAPHS MANAGEMENT (FULL CRUD) */}
              {gallerySubTab === "photos" && (
                <div className="space-y-6">
                  {/* SEARCH & ALBUM FILTER TOOLBAR */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Search Bar */}
                      <div className="relative flex-grow max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={searchPhotoQuery}
                          onChange={(e) => setSearchPhotoQuery(e.target.value)}
                          placeholder="Search by title, location, year, or category..."
                          className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#205A98]/20 transition"
                        />
                        {searchPhotoQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchPhotoQuery("")}
                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Album Dropdown Filter */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Album:</span>
                        <select
                          value={selectedAlbumFilter}
                          onChange={(e) => setSelectedAlbumFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#205A98]/20"
                        >
                          <option value="all">All Albums ({localData.galleryPhotos?.length || 0})</option>
                          {localData.galleryAlbums?.map((a) => {
                            const count = (localData.galleryPhotos || []).filter(
                              (p) => p.albumId === a.id
                            ).length;
                            return (
                              <option key={a.id} value={a.id}>
                                {a.titleNe} ({count})
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Filter Pills row */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSelectedAlbumFilter("all")}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          selectedAlbumFilter === "all"
                            ? "bg-[#205A98] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        All ({localData.galleryPhotos?.length || 0})
                      </button>
                      {localData.galleryAlbums?.map((a) => {
                        const count = (localData.galleryPhotos || []).filter(
                          (p) => p.albumId === a.id
                        ).length;
                        const isSelected = selectedAlbumFilter === a.id;
                        return (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => setSelectedAlbumFilter(a.id)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-[#205A98] text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            <span>{a.titleNe}</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                              isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ADD NEW PHOTOGRAPH MODAL */}
                  {showAddPhotoModal && (
                    <div className="p-6 rounded-3xl border-2 border-[#205A98] bg-white shadow-xl animate-fade-in space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Camera className="w-4 h-4 text-[#205A98]" />
                            <span>Upload & Add New Photograph</span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            Add a photo with bilingual titles, descriptions, location, and album categorization.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAddPhotoModal(false)}
                          className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleCreatePhoto} className="space-y-4">
                        {/* Image Uploader & Live Preview */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                          <div className="w-36 h-24 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-300 relative group">
                            <img
                              src={newPhoto.imageUrl || newPhoto.url || "/images/uploads/banking-expo-2079.webp"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition">
                              Preview
                            </div>
                          </div>

                          <div className="flex-grow space-y-2 w-full">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold cursor-pointer transition shadow-xs">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploadingImage ? "Optimizing WebP..." : "Upload Image File"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  disabled={uploadingImage}
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) => {
                                      setNewPhoto({ ...newPhoto, url, imageUrl: url });
                                    })
                                  }
                                />
                              </label>
                              <span className="text-xs text-slate-400 font-medium">or enter URL directly below</span>
                            </div>

                            <input
                              type="text"
                              value={newPhoto.imageUrl || newPhoto.url}
                              onChange={(e) =>
                                setNewPhoto({ ...newPhoto, url: e.target.value, imageUrl: e.target.value })
                              }
                              placeholder="/images/uploads/... or https://..."
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-mono"
                            />
                          </div>
                        </div>

                        {/* Album & Category & Year */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Assign to Album *
                            </label>
                            <select
                              required
                              value={newPhoto.albumId || (localData.galleryAlbums?.[0]?.id || "")}
                              onChange={(e) => setNewPhoto({ ...newPhoto, albumId: e.target.value })}
                              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                            >
                              {localData.galleryAlbums?.map((a) => (
                                <option key={a.id} value={a.id}>
                                  {a.titleNe} ({a.id})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Year (साल)
                            </label>
                            <input
                              type="text"
                              value={newPhoto.year || "२०८१"}
                              onChange={(e) => setNewPhoto({ ...newPhoto, year: e.target.value })}
                              placeholder="उदा: २०८१ / २०२४"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Category (विधा)
                            </label>
                            <input
                              type="text"
                              value={newPhoto.categoryNe || ""}
                              onChange={(e) => setNewPhoto({ ...newPhoto, categoryNe: e.target.value })}
                              placeholder="उदा: वित्तीय साक्षरता मेला, संवाद"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                            />
                          </div>
                        </div>

                        {/* Titles (Ne & En) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Photograph Title (नेपाली) *
                            </label>
                            <input
                              type="text"
                              required
                              value={newPhoto.titleNe}
                              onChange={(e) => setNewPhoto({ ...newPhoto, titleNe: e.target.value })}
                              placeholder="तस्बिरको शीर्षक..."
                              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Photograph Title (English)
                            </label>
                            <input
                              type="text"
                              value={newPhoto.titleEn || ""}
                              onChange={(e) => setNewPhoto({ ...newPhoto, titleEn: e.target.value })}
                              placeholder="Photograph title in English..."
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                          </div>
                        </div>

                        {/* Location (Ne & En) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Location (स्थान - नेपाली)
                            </label>
                            <input
                              type="text"
                              value={newPhoto.locationNe || ""}
                              onChange={(e) => setNewPhoto({ ...newPhoto, locationNe: e.target.value })}
                              placeholder="उदा: काठमाडौँ, नेपाल / विराटनगर"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Location (English)
                            </label>
                            <input
                              type="text"
                              value={newPhoto.locationEn || ""}
                              onChange={(e) => setNewPhoto({ ...newPhoto, locationEn: e.target.value })}
                              placeholder="e.g. Kathmandu, Nepal / Biratnagar"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                          </div>
                        </div>

                        {/* Descriptions (Ne & En) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Caption / Description (नेपाली)
                            </label>
                            <textarea
                              rows={2}
                              value={newPhoto.descriptionNe || ""}
                              onChange={(e) => setNewPhoto({ ...newPhoto, descriptionNe: e.target.value })}
                              placeholder="कार्यक्रमको संक्षिप्त व्याख्या वा विवरण..."
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Caption / Description (English)
                            </label>
                            <textarea
                              rows={2}
                              value={newPhoto.descriptionEn || ""}
                              onChange={(e) => setNewPhoto({ ...newPhoto, descriptionEn: e.target.value })}
                              placeholder="Short photo description or context..."
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                          </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setShowAddPhotoModal(false)}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold shadow-md cursor-pointer"
                          >
                            Save Photograph
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* PHOTOGRAPHS GRID */}
                  {(() => {
                    const q = searchPhotoQuery.toLowerCase().trim();
                    const filtered = (localData.galleryPhotos || []).filter((p) => {
                      const matchesAlbum =
                        selectedAlbumFilter === "all" || p.albumId === selectedAlbumFilter;
                      if (!matchesAlbum) return false;
                      if (!q) return true;
                      const matchNe = (p.titleNe || "").toLowerCase().includes(q);
                      const matchEn = (p.titleEn || "").toLowerCase().includes(q);
                      const matchLocNe = (p.locationNe || "").toLowerCase().includes(q);
                      const matchLocEn = (p.locationEn || "").toLowerCase().includes(q);
                      const matchCat = (p.categoryNe || "").toLowerCase().includes(q);
                      const matchYear = (p.year || "").toLowerCase().includes(q);
                      const matchDesc = (p.descriptionNe || "").toLowerCase().includes(q);
                      return (
                        matchNe || matchEn || matchLocNe || matchLocEn || matchCat || matchYear || matchDesc
                      );
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                            <Camera className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-800">No Photographs Found</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                              {searchPhotoQuery || selectedAlbumFilter !== "all"
                                ? "No photographs match your current album or search filters."
                                : "No photographs have been uploaded yet. Click below to add the first photograph!"}
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-3 pt-2">
                            {(searchPhotoQuery || selectedAlbumFilter !== "all") && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchPhotoQuery("");
                                  setSelectedAlbumFilter("all");
                                }}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                              >
                                Clear Filters
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setShowAddPhotoModal(true)}
                              className="px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                              Upload & Add Photo
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                          <span>
                            Showing <strong className="text-slate-800">{filtered.length}</strong> of{" "}
                            <strong className="text-slate-800">{localData.galleryPhotos?.length || 0}</strong> photographs
                          </span>
                          {selectedAlbumFilter !== "all" && (
                            <button
                              type="button"
                              onClick={() => setSelectedAlbumFilter("all")}
                              className="text-[#205A98] hover:underline font-bold text-xs"
                            >
                              Show All Albums
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filtered.map((photo) => {
                            const isEditing = editingPhotoId === photo.id;
                            const album = (localData.galleryAlbums || []).find((a) => a.id === photo.albumId);
                            const imgSrc = photo.imageUrl || photo.url || "/images/uploads/banking-expo-2079.webp";

                            return (
                              <div
                                key={photo.id}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                                  isEditing
                                    ? "bg-white border-[#205A98] shadow-xl ring-2 ring-[#205A98]/10"
                                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md"
                                }`}
                              >
                                <div>
                                  {/* PHOTO THUMBNAIL & BADGES */}
                                  <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden group">
                                    <img
                                      src={imgSrc}
                                      alt={photo.titleNe}
                                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                                      onClick={() => setPreviewPhoto(photo)}
                                    />
                                    {/* Album Badge Top Left */}
                                    <div className="absolute top-2.5 left-2.5">
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/85 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1">
                                        <FolderOpen className="w-3 h-3 text-[#e64d45]" />
                                        <span>{album?.titleNe || photo.albumId}</span>
                                      </span>
                                    </div>

                                    {/* Quick Zoom Button Top Right */}
                                    <div className="absolute top-2.5 right-2.5 opacity-90 group-hover:opacity-100 transition">
                                      <button
                                        type="button"
                                        onClick={() => setPreviewPhoto(photo)}
                                        className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20 transition cursor-pointer"
                                        title="View Fullscreen Lightbox"
                                      >
                                        <Maximize2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    {/* Location & Year Bottom Badges */}
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-bold text-white pointer-events-none">
                                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm flex items-center gap-1">
                                        <MapPin className="w-2.5 h-2.5 text-blue-300" />
                                        <span>{photo.locationNe || "नेपाल"}</span>
                                      </span>
                                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm flex items-center gap-1 font-mono">
                                        <Calendar className="w-2.5 h-2.5 text-red-300" />
                                        <span>{photo.year || "२०८१"}</span>
                                      </span>
                                    </div>
                                  </div>

                                  {/* PHOTO DETAILS OR IN-PLACE EDITOR */}
                                  <div className="p-4 space-y-3">
                                    {isEditing ? (
                                      <div className="space-y-3 animate-fade-in">
                                        {/* Replace Image */}
                                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                          <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-600">Replace Image</span>
                                            <label className="px-2.5 py-1 rounded-lg bg-[#205A98] hover:bg-[#164070] text-white text-[10px] font-bold cursor-pointer transition">
                                              <Upload className="w-2.5 h-2.5 inline mr-1" />
                                              <span>Upload File</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                  handleFileUpload(e, (url) => {
                                                    handleUpdatePhotoField(photo.id, "imageUrl", url);
                                                  })
                                                }
                                              />
                                            </label>
                                          </div>
                                          <input
                                            type="text"
                                            value={photo.imageUrl || photo.url}
                                            onChange={(e) =>
                                              handleUpdatePhotoField(photo.id, "imageUrl", e.target.value)
                                            }
                                            placeholder="/images/uploads/..."
                                            className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-white font-mono"
                                          />
                                        </div>

                                        {/* Reassign Album */}
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                            Move to Album
                                          </label>
                                          <select
                                            value={photo.albumId}
                                            onChange={(e) =>
                                              handleUpdatePhotoField(photo.id, "albumId", e.target.value)
                                            }
                                            className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                                          >
                                            {localData.galleryAlbums?.map((a) => (
                                              <option key={a.id} value={a.id}>
                                                {a.titleNe} ({a.id})
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        {/* Title (Ne & En) */}
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                            Title (नेपाली)
                                          </label>
                                          <input
                                            type="text"
                                            value={photo.titleNe}
                                            onChange={(e) =>
                                              handleUpdatePhotoField(photo.id, "titleNe", e.target.value)
                                            }
                                            className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg bg-white"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                            Title (English)
                                          </label>
                                          <input
                                            type="text"
                                            value={photo.titleEn || ""}
                                            onChange={(e) =>
                                              handleUpdatePhotoField(photo.id, "titleEn", e.target.value)
                                            }
                                            className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                          />
                                        </div>

                                        {/* Description / Caption (Ne) */}
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                            Caption / Description (नेपाली)
                                          </label>
                                          <textarea
                                            rows={2}
                                            value={photo.descriptionNe || ""}
                                            onChange={(e) =>
                                              handleUpdatePhotoField(photo.id, "descriptionNe", e.target.value)
                                            }
                                            className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                          />
                                        </div>

                                        {/* Location & Year & Category */}
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                              Location (स्थान)
                                            </label>
                                            <input
                                              type="text"
                                              value={photo.locationNe || ""}
                                              onChange={(e) =>
                                                handleUpdatePhotoField(photo.id, "locationNe", e.target.value)
                                              }
                                              className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                              Year (साल)
                                            </label>
                                            <input
                                              type="text"
                                              value={photo.year || ""}
                                              onChange={(e) =>
                                                handleUpdatePhotoField(photo.id, "year", e.target.value)
                                              }
                                              className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                            Category (विधा)
                                          </label>
                                          <input
                                            type="text"
                                            value={photo.categoryNe || ""}
                                            onChange={(e) =>
                                              handleUpdatePhotoField(photo.id, "categoryNe", e.target.value)
                                            }
                                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="space-y-1.5">
                                        {photo.categoryNe && (
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                                            <Tag className="w-2.5 h-2.5 text-[#205A98]" />
                                            <span>{photo.categoryNe}</span>
                                          </span>
                                        )}
                                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                                          {photo.titleNe}
                                        </h4>
                                        {photo.titleEn && (
                                          <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                                            {photo.titleEn}
                                          </p>
                                        )}
                                        {photo.descriptionNe && (
                                          <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed pt-1">
                                            {photo.descriptionNe}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* CARD BOTTOM CONTROLS */}
                                <div className="p-3 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between">
                                  <button
                                    type="button"
                                    onClick={() => setEditingPhotoId(isEditing ? null : photo.id)}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#205A98] hover:underline cursor-pointer"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>{isEditing ? "Done Editing" : "Edit Details"}</span>
                                  </button>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setPreviewPhoto(photo)}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                                      title="View Full Size"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>Preview</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDeletePhoto(photo.id, photo.titleNe)}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer ml-1"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* VIEW 2: ALBUMS MANAGEMENT (FULL CRUD) */}
              {gallerySubTab === "albums" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">Photo Albums Management</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D0372F]/10 text-[#D0372F]">
                          {localData.galleryAlbums?.length || 0} Albums
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Create, update, and manage photo albums, cover thumbnails, and descriptions.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddAlbumModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Album</span>
                    </button>
                  </div>

                  {/* ADD NEW ALBUM MODAL / FORM */}
                  {showAddAlbumModal && (
                    <div className="p-6 rounded-2xl border-2 border-[#D0372F] bg-white shadow-xl animate-fade-in space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#D0372F]" />
                            <span>Create New Photo Album</span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            Add a new photo album for a campaign, expo, or ceremony.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAddAlbumModal(false)}
                          className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleCreateAlbum} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Album Title (नेपाली) *
                            </label>
                            <input
                              type="text"
                              required
                              value={newAlbum.titleNe}
                              onChange={(e) =>
                                setNewAlbum({ ...newAlbum, titleNe: e.target.value })
                              }
                              placeholder="एल्बमको शीर्षक (उदा: वित्तीय साक्षरता महामेला)"
                              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Album Title (English)
                            </label>
                            <input
                              type="text"
                              value={newAlbum.titleEn}
                              onChange={(e) =>
                                setNewAlbum({ ...newAlbum, titleEn: e.target.value })
                              }
                              placeholder="Album Title in English"
                              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Description (नेपाली)
                            </label>
                            <textarea
                              rows={2}
                              value={newAlbum.descNe}
                              onChange={(e) =>
                                setNewAlbum({ ...newAlbum, descNe: e.target.value })
                              }
                              placeholder="एल्बमको संक्षिप्त विवरण..."
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Description (English)
                            </label>
                            <textarea
                              rows={2}
                              value={newAlbum.descEn}
                              onChange={(e) =>
                                setNewAlbum({ ...newAlbum, descEn: e.target.value })
                              }
                              placeholder="Album description in English..."
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Album ID (Slug)
                            </label>
                            <input
                              type="text"
                              value={newAlbum.id}
                              onChange={(e) =>
                                setNewAlbum({ ...newAlbum, id: e.target.value })
                              }
                              placeholder="e.g. expo-2081 (auto-generated if empty)"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Cover Image
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newAlbum.coverImage}
                                onChange={(e) =>
                                  setNewAlbum({ ...newAlbum, coverImage: e.target.value })
                                }
                                className="flex-grow px-3 py-2 text-xs rounded-xl border border-slate-200"
                              />
                              <label className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0 border border-slate-200">
                                <Upload className="w-3.5 h-3.5 inline mr-1" />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) => {
                                      setNewAlbum({ ...newAlbum, coverImage: url });
                                    })
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => setShowAddAlbumModal(false)}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold shadow-md cursor-pointer"
                          >
                            Save Album
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* ALBUM CARDS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {localData.galleryAlbums?.map((album, aIdx) => {
                      const isEditing = editingAlbumId === album.id;
                      const photoCount = (localData.galleryPhotos || []).filter(
                        (p) => p.albumId === album.id
                      ).length;

                      return (
                        <div
                          key={album.id}
                          className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                            isEditing
                              ? "bg-white border-[#D0372F] shadow-lg ring-2 ring-[#D0372F]/10"
                              : "bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs"
                          }`}
                        >
                          <div>
                            {/* Cover Image & Count Badge */}
                            <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden group">
                              <img
                                src={album.coverImage}
                                alt={album.titleNe}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              />
                              <div className="absolute top-3 right-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedAlbumFilter(album.id);
                                    setGallerySubTab("photos");
                                  }}
                                  className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1 hover:bg-[#205A98] transition cursor-pointer"
                                  title="Click to view photos in this album"
                                >
                                  <Camera className="w-3 h-3 text-[#e64d45]" />
                                  <span>{photoCount} Photos</span>
                                </button>
                              </div>
                              <div className="absolute bottom-2 left-3">
                                <span className="text-[10px] font-mono bg-slate-950/70 text-slate-300 px-2 py-0.5 rounded">
                                  ID: {album.id}
                                </span>
                              </div>
                            </div>

                            {/* Details / In-place Edit Form */}
                            <div className="p-4 space-y-3">
                              {isEditing ? (
                                <div className="space-y-2.5 animate-fade-in">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Title (नेपाली)
                                    </label>
                                    <input
                                      type="text"
                                      value={album.titleNe}
                                      onChange={(e) => {
                                        const updated = [...(localData.galleryAlbums || [])];
                                        updated[aIdx].titleNe = e.target.value;
                                        setLocalData({ ...localData, galleryAlbums: updated });
                                      }}
                                      className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Title (English)
                                    </label>
                                    <input
                                      type="text"
                                      value={album.titleEn}
                                      onChange={(e) => {
                                        const updated = [...(localData.galleryAlbums || [])];
                                        updated[aIdx].titleEn = e.target.value;
                                        setLocalData({ ...localData, galleryAlbums: updated });
                                      }}
                                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Description (नेपाली)
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={album.descNe}
                                      onChange={(e) => {
                                        const updated = [...(localData.galleryAlbums || [])];
                                        updated[aIdx].descNe = e.target.value;
                                        setLocalData({ ...localData, galleryAlbums: updated });
                                      }}
                                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Description (English)
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={album.descEn}
                                      onChange={(e) => {
                                        const updated = [...(localData.galleryAlbums || [])];
                                        updated[aIdx].descEn = e.target.value;
                                        setLocalData({ ...localData, galleryAlbums: updated });
                                      }}
                                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  <div className="pt-1">
                                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer border border-slate-200">
                                      <Upload className="w-3 h-3 text-[#205A98]" />
                                      <span>Upload New Cover</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                          handleFileUpload(e, (url) => {
                                            const updated = [...(localData.galleryAlbums || [])];
                                            updated[aIdx].coverImage = url;
                                            setLocalData({ ...localData, galleryAlbums: updated });
                                          })
                                        }
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                                    {album.titleNe}
                                  </h3>
                                  <p className="text-[11px] text-slate-500 font-medium">
                                    {album.titleEn}
                                  </p>
                                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                    {album.descNe || album.descEn}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Bottom Controls */}
                          <div className="p-3 bg-white border-t border-slate-200/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingAlbumId(isEditing ? null : album.id)
                                }
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#205A98] hover:underline cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>{isEditing ? "Close Editor" : "Edit Album"}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedAlbumFilter(album.id);
                                  setGallerySubTab("photos");
                                }}
                                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                              >
                                <Camera className="w-3 h-3 text-[#205A98]" />
                                <span>View Photos</span>
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteAlbum(album.id, album.titleNe || album.titleEn)
                              }
                              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LIGHTBOX / FULLSCREEN PREVIEW MODAL */}
              {previewPhoto && (
                <div
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
                  onClick={() => setPreviewPhoto(null)}
                >
                  <div
                    className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black">
                      <img
                        src={previewPhoto.imageUrl || previewPhoto.url}
                        alt={previewPhoto.titleNe}
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewPhoto(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-3 bg-slate-950 text-white">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D0372F] text-white">
                            {(localData.galleryAlbums || []).find((a) => a.id === previewPhoto.albumId)?.titleNe || previewPhoto.albumId}
                          </span>
                          {previewPhoto.categoryNe && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-slate-200">
                              {previewPhoto.categoryNe}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-300">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            <span>{previewPhoto.locationNe || "काठमाडौँ, नेपाल"}</span>
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-red-400" />
                            <span>{previewPhoto.year || "२०८१"}</span>
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {previewPhoto.titleNe}
                      </h3>
                      {previewPhoto.titleEn && (
                        <p className="text-sm text-slate-300 font-medium">
                          {previewPhoto.titleEn}
                        </p>
                      )}
                      {(previewPhoto.descriptionNe || previewPhoto.descriptionEn) && (
                        <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-white/10">
                          {previewPhoto.descriptionNe || previewPhoto.descriptionEn}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: OPPORTUNITIES (सम्भावना) - FULL CRUD */}
          {activeTab === "opportunities" && (
            <div className="space-y-6">
              {/* Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      Opportunities (सम्भावना) Sectors Management
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D0372F]/10 text-[#D0372F]">
                      {localData.opportunities?.length || 0} Sectors
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, update, and manage high-potential domestic economic frontiers, viable projects, and growth targets.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddOpportunityModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Sector</span>
                </button>
              </div>

              {/* ADD NEW OPPORTUNITY MODAL / FORM */}
              {showAddOpportunityModal && (
                <div className="bg-white rounded-3xl border-2 border-[#D0372F] p-6 sm:p-8 shadow-xl animate-fade-in space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#D0372F]" />
                        <span>Create New Opportunities Sector</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Define high-impact economic domains, investment potentials, and prototype projects.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddOpportunityModal(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateOpportunity} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sector ID (Slug) *
                        </label>
                        <input
                          type="text"
                          value={newOpportunity.id}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, id: e.target.value })
                          }
                          placeholder="e.g. clean-energy"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Icon Style
                        </label>
                        <select
                          value={newOpportunity.icon}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, icon: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="Sprout">Sprout (कृषि / वनस्पति)</option>
                          <option value="Compass">Compass (पर्यटन / यात्रा)</option>
                          <option value="Zap">Zap (जलविद्युत / हरित ऊर्जा)</option>
                          <option value="Laptop">Laptop (सूचना प्रविधि / डिजिटल)</option>
                          <option value="Sparkles">Sparkles (घरेलु / मौलिक हस्तकला)</option>
                          <option value="Truck">Truck (लजिस्टिक्स / आपूर्ति)</option>
                          <option value="TrendingUp">TrendingUp (लगानी / विकास)</option>
                          <option value="Award">Award (विशिष्ट / ब्रान्ड)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Badge Tag (नेपाली)
                        </label>
                        <input
                          type="text"
                          value={newOpportunity.tagNe}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, tagNe: e.target.value })
                          }
                          placeholder="उच्च सम्भावना"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sector Category Name (नेपाली) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newOpportunity.sectorNe}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, sectorNe: e.target.value })
                          }
                          placeholder="उदा: कृषि–प्रशोधन तथा जडीबुटी"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sector Category Name (English)
                        </label>
                        <input
                          type="text"
                          value={newOpportunity.sectorEn}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, sectorEn: e.target.value })
                          }
                          placeholder="e.g. Agro-Processing & Organic Herbs"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sector Title (नेपाली) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newOpportunity.titleNe}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, titleNe: e.target.value })
                          }
                          placeholder="उदा: व्यावसायिक कृषि, फलफूल तथा कफी खेती"
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sector Title (English)
                        </label>
                        <input
                          type="text"
                          value={newOpportunity.titleEn}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, titleEn: e.target.value })
                          }
                          placeholder="Commercial Agro-Processing & Cash Crops"
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Potential Highlight (नेपाली)
                        </label>
                        <input
                          type="text"
                          value={newOpportunity.potentialNe}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, potentialNe: e.target.value })
                          }
                          placeholder="उदा: वार्षिक १५% भन्दा बढी प्रतिफल सम्भव"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Potential Highlight (English)
                        </label>
                        <input
                          type="text"
                          value={newOpportunity.potentialEn}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, potentialEn: e.target.value })
                          }
                          placeholder="e.g. 15%+ Annual ROI & Export Demand"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Description (नेपाली)
                        </label>
                        <textarea
                          rows={3}
                          value={newOpportunity.descriptionNe}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, descriptionNe: e.target.value })
                          }
                          placeholder="अवसरको विस्तृत विवरण..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Description (English)
                        </label>
                        <textarea
                          rows={3}
                          value={newOpportunity.descriptionEn}
                          onChange={(e) =>
                            setNewOpportunity({ ...newOpportunity, descriptionEn: e.target.value })
                          }
                          placeholder="Sector details in English..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    {/* Prototype Project Examples */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="text-xs font-bold text-slate-800">
                        Viable Prototype Projects (सफल परियोजनाका नमुनाहरू):
                      </div>
                      <div className="space-y-2">
                        {newOpportunity.examplesNe.map((ex, exIdx) => (
                          <div key={exIdx} className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 w-5">
                              {exIdx + 1}.
                            </span>
                            <input
                              type="text"
                              value={ex}
                              onChange={(e) => {
                                const exs = [...newOpportunity.examplesNe];
                                exs[exIdx] = e.target.value;
                                setNewOpportunity({ ...newOpportunity, examplesNe: exs });
                              }}
                              placeholder="नमुना परियोजना (उदा: अर्गानिक चिया/कफी प्याकेजिङ)"
                              className="flex-grow px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const exs = newOpportunity.examplesNe.filter((_, i) => i !== exIdx);
                                setNewOpportunity({ ...newOpportunity, examplesNe: exs });
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            setNewOpportunity({
                              ...newOpportunity,
                              examplesNe: [...newOpportunity.examplesNe, ""],
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#D0372F] hover:underline cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Prototype Example</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddOpportunityModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#D0372F] hover:bg-[#b52b24] text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save Sector
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* OPPORTUNITY SECTORS LIST */}
              <div className="space-y-4">
                {(localData.opportunities || []).map((op, oIdx) => {
                  const isExpanded = expandedOpportunityId === op.id;

                  return (
                    <div
                      key={op.id}
                      className={`rounded-2xl border transition-all duration-200 ${
                        isExpanded
                          ? "bg-white border-[#D0372F] shadow-md ring-2 ring-[#D0372F]/10"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                      }`}
                    >
                      {/* Summary Row */}
                      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-[#D0372F]">
                            <Sparkles className="w-6 h-6" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#D0372F]/10 text-[#D0372F] uppercase">
                                {op.sectorNe}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#205A98]/10 text-[#205A98]">
                                {op.tagNe || op.tagEn}
                              </span>
                              <span className="text-xs text-slate-400">
                                ID: {op.id}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900">
                              {op.titleNe}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">
                              {op.titleEn || op.sectorEn}
                            </p>
                            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span>{op.potentialNe}</span>
                              <span className="text-slate-400 ml-2">
                                ({(op.examplesNe || []).length} Project Examples)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Controls */}
                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedOpportunityId(isExpanded ? null : op.id)
                            }
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                              isExpanded
                                ? "bg-[#D0372F] text-white"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isExpanded ? "Close Editor" : "Edit Sector"}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteOpportunity(op.id, op.titleNe || op.sectorNe)
                            }
                            className="p-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border border-transparent hover:border-red-200"
                            title="Delete Sector"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* EXPANDED IN-DEPTH SECTOR EDITOR */}
                      {isExpanded && (
                        <div className="p-6 border-t border-slate-100 bg-slate-50/70 space-y-5 animate-fade-in">
                          <div className="text-xs font-bold uppercase tracking-wider text-[#D0372F] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Edit Sector Details & Prototype Projects</span>
                          </div>

                          {/* Row 1: Sector Names & Tag */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Sector (नेपाली)
                              </label>
                              <input
                                type="text"
                                value={op.sectorNe}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].sectorNe = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Sector (English)
                              </label>
                              <input
                                type="text"
                                value={op.sectorEn}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].sectorEn = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Tag (नेपाली)
                              </label>
                              <input
                                type="text"
                                value={op.tagNe}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].tagNe = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Tag (English)
                              </label>
                              <input
                                type="text"
                                value={op.tagEn}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].tagEn = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          {/* Row 2: Titles */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Title (नेपाली)
                              </label>
                              <input
                                type="text"
                                value={op.titleNe}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].titleNe = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Title (English)
                              </label>
                              <input
                                type="text"
                                value={op.titleEn}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].titleEn = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          {/* Row 3: Potential Highlights */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Potential Highlight (नेपाली)
                              </label>
                              <input
                                type="text"
                                value={op.potentialNe}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].potentialNe = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Potential Highlight (English)
                              </label>
                              <input
                                type="text"
                                value={op.potentialEn}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].potentialEn = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          {/* Row 4: Descriptions */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Description (नेपाली)
                              </label>
                              <textarea
                                rows={3}
                                value={op.descriptionNe}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].descriptionNe = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Description (English)
                              </label>
                              <textarea
                                rows={3}
                                value={op.descriptionEn}
                                onChange={(e) => {
                                  const updated = [...(localData.opportunities || [])];
                                  updated[oIdx].descriptionEn = e.target.value;
                                  setLocalData({ ...localData, opportunities: updated });
                                }}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          {/* Row 5: Dynamic Prototype Project Examples (सफल परियोजनाका नमुनाहरू) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            {/* Nepali Examples */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  सफल परियोजनाका नमुनाहरू (Nepali Examples)
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddOpportunityExample(oIdx, "ne")}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-[#D0372F] text-[11px] font-bold cursor-pointer transition"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Example</span>
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(op.examplesNe || []).map((example, exIdx) => (
                                  <div key={exIdx} className="flex items-center gap-2">
                                    <span className="w-5 text-[11px] font-bold text-slate-400">
                                      {exIdx + 1}.
                                    </span>
                                    <input
                                      type="text"
                                      value={example}
                                      onChange={(e) =>
                                        handleUpdateOpportunityExample(
                                          oIdx,
                                          exIdx,
                                          e.target.value,
                                          "ne"
                                        )
                                      }
                                      placeholder="नमुना परियोजना"
                                      className="flex-grow px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveOpportunityExample(oIdx, exIdx, "ne")
                                      }
                                      className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                      title="Remove example"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                                {(op.examplesNe || []).length === 0 && (
                                  <div className="text-xs text-slate-400 italic">
                                    No Nepali examples added yet.
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* English Examples */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  Prototype Projects (English Examples)
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddOpportunityExample(oIdx, "en")}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-[#D0372F] text-[11px] font-bold cursor-pointer transition"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Example</span>
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(op.examplesEn || []).map((example, exIdx) => (
                                  <div key={exIdx} className="flex items-center gap-2">
                                    <span className="w-5 text-[11px] font-bold text-slate-400">
                                      {exIdx + 1}.
                                    </span>
                                    <input
                                      type="text"
                                      value={example}
                                      onChange={(e) =>
                                        handleUpdateOpportunityExample(
                                          oIdx,
                                          exIdx,
                                          e.target.value,
                                          "en"
                                        )
                                      }
                                      placeholder="Prototype project in English"
                                      className="flex-grow px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveOpportunityExample(oIdx, exIdx, "en")
                                      }
                                      className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                      title="Remove example"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                                {(op.examplesEn || []).length === 0 && (
                                  <div className="text-xs text-slate-400 italic">
                                    No English examples added yet.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Done Editing Button */}
                          <div className="flex justify-end pt-2">
                            <button
                              type="button"
                              onClick={() => setExpandedOpportunityId(null)}
                              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                            >
                              Done Editing
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: EVENTS & EXPOS MANAGEMENT (FULL CRUD) */}
          {activeTab === "events" && (() => {
            const todayStr = todayDateStr;
            const allEvs = localData.events || [];
            const upcomingEvs = allEvs.filter((ev) => ev.scheduleDate >= todayStr);
            const pastEvs = allEvs.filter((ev) => ev.scheduleDate < todayStr);

            const q = searchEventQuery.toLowerCase().trim();
            const filteredEvs = allEvs.filter((ev) => {
              // Tab filter
              if (eventFilterTab === "upcoming" && ev.scheduleDate < todayStr) return false;
              if (eventFilterTab === "past" && ev.scheduleDate >= todayStr) return false;

              // Search query
              if (!q) return true;
              const mNe = (ev.titleNe || "").toLowerCase().includes(q);
              const mEn = (ev.titleEn || "").toLowerCase().includes(q);
              const mVNe = (ev.venueNe || "").toLowerCase().includes(q);
              const mVEn = (ev.venueEn || "").toLowerCase().includes(q);
              const mCat = (ev.categoryNe || "").toLowerCase().includes(q);
              const mDate = (ev.scheduleDate || "").toLowerCase().includes(q);
              return mNe || mEn || mVNe || mVEn || mCat || mDate;
            });

            return (
              <div className="space-y-6">
                {/* TOP HEADER */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">Events & Expos Management</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#205A98]/10 text-[#205A98]">
                          {allEvs.length} Total
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          {upcomingEvs.length} Upcoming
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          {pastEvs.length} Past
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Schedule upcoming financial literacy expos and manage historic archived completed events.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddEventModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Event</span>
                    </button>
                  </div>
                </div>

                {/* TOOLBAR: SEARCH & TABS */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Status Tabs */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEventFilterTab("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        eventFilterTab === "all"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span>All Events ({allEvs.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventFilterTab("upcoming")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        eventFilterTab === "upcoming"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Upcoming ({upcomingEvs.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventFilterTab("past")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        eventFilterTab === "past"
                          ? "bg-slate-800 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span>Past ({pastEvs.length})</span>
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative flex-grow max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchEventQuery}
                      onChange={(e) => setSearchEventQuery(e.target.value)}
                      placeholder="Search title, venue, or category..."
                      className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#205A98]/20 transition"
                    />
                    {searchEventQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchEventQuery("")}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* CREATE NEW EVENT MODAL */}
                {showAddEventModal && (
                  <div className="p-6 rounded-3xl border-2 border-[#205A98] bg-white shadow-xl animate-fade-in space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#205A98]" />
                          <span>Schedule & Create New Event</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          Add a new event with schedule date, venue, category, and bilingual highlights.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAddEventModal(false)}
                        className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateEvent} className="space-y-4">
                      {/* Image Upload & Preview */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-36 h-20 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-300 relative">
                          <img
                            src={newEvent.imageUrl || "/images/uploads/banking-expo-2079.webp"}
                            alt="Banner Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-grow space-y-2 w-full">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold cursor-pointer transition shadow-xs">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{uploadingImage ? "Optimizing WebP..." : "Upload Banner Image"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploadingImage}
                                onChange={(e) =>
                                  handleFileUpload(e, (url) => {
                                    setNewEvent({ ...newEvent, imageUrl: url });
                                  })
                                }
                              />
                            </label>
                            <span className="text-xs text-slate-400">or enter banner image path:</span>
                          </div>
                          <input
                            type="text"
                            value={newEvent.imageUrl || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
                            placeholder="/images/uploads/... or https://..."
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Schedule Date & Categories */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Schedule Date (YYYY-MM-DD) *
                          </label>
                          <input
                            type="date"
                            required
                            value={newEvent.scheduleDate}
                            onChange={(e) => setNewEvent({ ...newEvent, scheduleDate: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                          />
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Auto-classifies: if &gt;= today &rarr; Upcoming, if &lt; today &rarr; Past.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Date Display (नेपाली)
                          </label>
                          <input
                            type="text"
                            value={newEvent.dateNe || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, dateNe: e.target.value })}
                            placeholder="उदा: २०८३ मङ्सिर ३० गते"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Date Display (English)
                          </label>
                          <input
                            type="text"
                            value={newEvent.dateEn || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, dateEn: e.target.value })}
                            placeholder="e.g. Dec 15, 2026"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Time & Category */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Time (समय)
                          </label>
                          <input
                            type="text"
                            value={newEvent.timeNe || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, timeNe: e.target.value })}
                            placeholder="उदा: बिहान ९:३० देखि साँझ ५:३०"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Category (विधा - नेपाली)
                          </label>
                          <input
                            type="text"
                            value={newEvent.categoryNe || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, categoryNe: e.target.value })}
                            placeholder="उदा: राष्ट्रिय वित्तीय मेला, संवाद"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Category (English)
                          </label>
                          <input
                            type="text"
                            value={newEvent.categoryEn || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, categoryEn: e.target.value })}
                            placeholder="e.g. National Financial Expo"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Titles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Event Title (नेपाली) *
                          </label>
                          <input
                            type="text"
                            required
                            value={newEvent.titleNe}
                            onChange={(e) => setNewEvent({ ...newEvent, titleNe: e.target.value })}
                            placeholder="कार्यक्रमको शीर्षक..."
                            className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Event Title (English)
                          </label>
                          <input
                            type="text"
                            value={newEvent.titleEn}
                            onChange={(e) => setNewEvent({ ...newEvent, titleEn: e.target.value })}
                            placeholder="Event Title in English..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Venue (स्थान - नेपाली) *
                          </label>
                          <input
                            type="text"
                            required
                            value={newEvent.venueNe}
                            onChange={(e) => setNewEvent({ ...newEvent, venueNe: e.target.value })}
                            placeholder="उदा: भृकुटीमण्डप प्रदर्शनी हल, काठमाडौँ"
                            className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Venue (English)
                          </label>
                          <input
                            type="text"
                            value={newEvent.venueEn || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, venueEn: e.target.value })}
                            placeholder="e.g. Bhrikutimandap Exhibition Hall, Kathmandu"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Description (नेपाली)
                          </label>
                          <textarea
                            rows={3}
                            value={newEvent.descriptionNe}
                            onChange={(e) => setNewEvent({ ...newEvent, descriptionNe: e.target.value })}
                            placeholder="कार्यक्रमको विस्तृत विवरण..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Description (English)
                          </label>
                          <textarea
                            rows={3}
                            value={newEvent.descriptionEn || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, descriptionEn: e.target.value })}
                            placeholder="Event overview in English..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Contact & Registration Link */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Contact Phone
                          </label>
                          <input
                            type="text"
                            value={newEvent.contactPhone || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, contactPhone: e.target.value })}
                            placeholder="+977-1-4400000"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Registration Link
                          </label>
                          <input
                            type="text"
                            value={newEvent.registrationUrl || ""}
                            onChange={(e) => setNewEvent({ ...newEvent, registrationUrl: e.target.value })}
                            placeholder="/contact or external registration link"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Modal Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setShowAddEventModal(false)}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-[#205A98] hover:bg-[#164070] text-white text-xs font-bold shadow-md cursor-pointer"
                        >
                          Save Event
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* EVENTS LIST */}
                {filteredEvs.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                    <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-slate-800">No Events Found</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No events match your current filter or search criteria.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddEventModal(true)}
                      className="px-4 py-2 rounded-xl bg-[#205A98] text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Create First Event
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredEvs.map((ev) => {
                      const isUpcoming = ev.scheduleDate >= todayStr;
                      const isEditing = editingEventId === ev.id;
                      const evIdx = allEvs.findIndex((x) => x.id === ev.id);

                      return (
                        <div
                          key={ev.id}
                          className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                            isEditing
                              ? "bg-white border-[#205A98] shadow-xl ring-2 ring-[#205A98]/10"
                              : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                          }`}
                        >
                          <div>
                            {/* Card Header & Status Banner */}
                            <div className="relative aspect-[16/8] bg-slate-900 overflow-hidden">
                              <img
                                src={ev.imageUrl || "/images/uploads/banking-expo-2079.webp"}
                                alt={ev.titleNe}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

                              {/* Status Pill Top Left */}
                              <div className="absolute top-3 left-3">
                                {isUpcoming ? (
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                    <span>Upcoming Event</span>
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-slate-300 backdrop-blur-md flex items-center gap-1 shadow-sm">
                                    <CheckCircle2 className="w-3 h-3 text-slate-400" />
                                    <span>Past Event</span>
                                  </span>
                                )}
                              </div>

                              {/* Category Pill Top Right */}
                              <div className="absolute top-3 right-3">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#205A98]/90 text-white backdrop-blur-md shadow-sm">
                                  {ev.categoryNe}
                                </span>
                              </div>

                              {/* Schedule Date & Venue Bottom */}
                              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white">
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                                  <Calendar className="w-3 h-3 text-red-300" />
                                  <span>{ev.dateNe || ev.scheduleDate}</span>
                                </span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm truncate max-w-[55%]">
                                  <MapPin className="w-3 h-3 text-blue-300" />
                                  <span className="truncate">{ev.venueNe}</span>
                                </span>
                              </div>
                            </div>

                            {/* Card Body / In-place Edit Form */}
                            <div className="p-4 space-y-3">
                              {isEditing ? (
                                <div className="space-y-3 animate-fade-in">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                        Schedule Date (YYYY-MM-DD)
                                      </label>
                                      <input
                                        type="date"
                                        value={ev.scheduleDate}
                                        onChange={(e) =>
                                          handleUpdateEventField(ev.id, "scheduleDate", e.target.value)
                                        }
                                        className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg bg-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                        Time (समय)
                                      </label>
                                      <input
                                        type="text"
                                        value={ev.timeNe || ""}
                                        onChange={(e) =>
                                          handleUpdateEventField(ev.id, "timeNe", e.target.value)
                                        }
                                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Title (नेपाली)
                                    </label>
                                    <input
                                      type="text"
                                      value={ev.titleNe}
                                      onChange={(e) =>
                                        handleUpdateEventField(ev.id, "titleNe", e.target.value)
                                      }
                                      className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Title (English)
                                    </label>
                                    <input
                                      type="text"
                                      value={ev.titleEn || ""}
                                      onChange={(e) =>
                                        handleUpdateEventField(ev.id, "titleEn", e.target.value)
                                      }
                                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                        Venue (स्थान)
                                      </label>
                                      <input
                                        type="text"
                                        value={ev.venueNe}
                                        onChange={(e) =>
                                          handleUpdateEventField(ev.id, "venueNe", e.target.value)
                                        }
                                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                        Category (विधा)
                                      </label>
                                      <input
                                        type="text"
                                        value={ev.categoryNe}
                                        onChange={(e) =>
                                          handleUpdateEventField(ev.id, "categoryNe", e.target.value)
                                        }
                                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                      Description (नेपाली)
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={ev.descriptionNe}
                                      onChange={(e) =>
                                        handleUpdateEventField(ev.id, "descriptionNe", e.target.value)
                                      }
                                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>

                                  {/* Replace Banner File Upload */}
                                  <div className="pt-1 flex items-center justify-between">
                                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer border border-slate-200">
                                      <Upload className="w-3 h-3 text-[#205A98]" />
                                      <span>Upload New Banner</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                          handleFileUpload(e, (url) => {
                                            handleUpdateEventField(ev.id, "imageUrl", url);
                                          })
                                        }
                                      />
                                    </label>
                                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                                      {ev.imageUrl}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                    {ev.titleNe}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 font-medium">
                                    {ev.titleEn}
                                  </p>
                                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                    {ev.descriptionNe}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Footer Controls */}
                          <div className="p-3 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setEditingEventId(isEditing ? null : ev.id)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#205A98] hover:underline cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{isEditing ? "Close Editor" : "Edit Event"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteEvent(ev.id, ev.titleNe)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* TAB 7: SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Site Settings & Contact Info</h2>
                <p className="text-xs text-slate-500">
                  Update official address, telephone numbers, emails, and brand configurations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Address (नेपाली)
                  </label>
                  <input
                    type="text"
                    value={localData.siteSettings?.addressNe || ""}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        siteSettings: {
                          ...localData.siteSettings,
                          addressNe: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Address (English)
                  </label>
                  <input
                    type="text"
                    value={localData.siteSettings?.addressEn || ""}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        siteSettings: {
                          ...localData.siteSettings,
                          addressEn: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Tel
                  </label>
                  <input
                    type="text"
                    value={localData.siteSettings?.phone || ""}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        siteSettings: {
                          ...localData.siteSettings,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Hotline
                  </label>
                  <input
                    type="text"
                    value={localData.siteSettings?.mobile || ""}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        siteSettings: {
                          ...localData.siteSettings,
                          mobile: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={localData.siteSettings?.email || ""}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        siteSettings: {
                          ...localData.siteSettings,
                          email: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Working Hours (नेपाली)
                  </label>
                  <input
                    type="text"
                    value={localData.siteSettings?.workingHoursNe || ""}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        siteSettings: {
                          ...localData.siteSettings,
                          workingHoursNe: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES INBOX */}
          {activeTab === "inquiries" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Inquiries Inbox</h2>
                  <p className="text-xs text-slate-500">
                    Messages submitted from the website Contact & Collaboration form.
                  </p>
                </div>
                <button
                  onClick={refreshContent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {localData.inquiries?.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {localData.inquiries?.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        inq.status === "unread"
                          ? "bg-blue-50/40 border-blue-200"
                          : "bg-slate-50/70 border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              inq.status === "unread"
                                ? "bg-[#D0372F] text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="font-bold text-sm text-slate-900">
                            {inq.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({inq.email || "No email"})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(inq.date).toLocaleString()}
                        </div>
                      </div>

                      <div className="text-xs font-bold text-[#205A98] mb-1">
                        Topic: {inq.subject}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80 mb-3">
                        {inq.message}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-2">
                        <div className="text-slate-500">
                          Phone: <span className="font-semibold text-slate-800">{inq.phone || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleMarkInquiryRead(
                                inq.id,
                                inq.status === "unread" ? "read" : "unread"
                              )
                            }
                            className="font-bold text-[#205A98] hover:underline cursor-pointer"
                          >
                            Mark as {inq.status === "unread" ? "Read" : "Unread"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="font-bold text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
