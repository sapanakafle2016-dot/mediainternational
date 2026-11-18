import { Language } from "./content";

export interface SiteSettings {
  siteNameNe: string;
  siteNameEn: string;
  logoUrl: string;
  addressNe: string;
  addressEn: string;
  phone: string;
  mobile: string;
  email: string;
  workingHoursNe: string;
  workingHoursEn: string;
  primaryColor: string;
  accentColor: string;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  titleNe: string;
  titleEn: string;
  badgeNe: string;
  badgeEn: string;
}

export interface StatItem {
  number: string;
  labelNe: string;
  labelEn: string;
  descNe: string;
  descEn: string;
}

export interface MilestoneItem {
  year: string;
  phaseNe: string;
  phaseEn: string;
  titleNe: string;
  titleEn: string;
  descriptionNe: string;
  descriptionEn: string;
  impactNe: string;
  impactEn: string;
}

export interface ChairmanMessage {
  photoUrl: string;
  nameNe: string;
  nameEn: string;
  designationNe: string;
  designationEn: string;
  badgeNe: string;
  badgeEn: string;
  quoteNe: string;
  quoteEn: string;
  message1Ne: string;
  message1En: string;
  message2Ne: string;
  message2En: string;
  message3Ne: string;
  message3En: string;
  message4Ne: string;
  message4En: string;
}

export interface ProgramItem {
  id: string;
  category: string;
  titleNe: string;
  titleEn: string;
  subtitleNe: string;
  subtitleEn: string;
  descriptionNe: string;
  descriptionEn: string;
  pointsNe: string[];
  pointsEn: string[];
  icon: string;
  badgeNe: string;
  badgeEn: string;
}

export interface OpportunityItem {
  id: string;
  titleNe: string;
  titleEn: string;
  sectorNe: string;
  sectorEn: string;
  descriptionNe: string;
  descriptionEn: string;
  potentialNe: string;
  potentialEn: string;
  examplesNe: string[];
  examplesEn: string[];
  icon: string;
  tagNe: string;
  tagEn: string;
}

export interface AchievementItem {
  titleNe: string;
  titleEn: string;
  metric: string;
  categoryNe: string;
  categoryEn: string;
  descriptionNe: string;
  descriptionEn: string;
  highlightsNe: string[];
  highlightsEn: string[];
}

export interface GalleryAlbum {
  id: string;
  titleNe: string;
  titleEn: string;
  descNe: string;
  descEn: string;
  coverImage: string;
  photoCount: number;
}

export interface GalleryPhoto {
  id: string;
  url?: string;
  imageUrl?: string;
  titleNe: string;
  titleEn?: string;
  descriptionNe?: string;
  descriptionEn?: string;
  locationNe?: string;
  locationEn?: string;
  year?: string;
  categoryNe?: string;
  categoryEn?: string;
  albumId: string;
}

export interface EventItem {
  id: string;
  titleNe: string;
  titleEn: string;
  scheduleDate: string; // ISO date 'YYYY-MM-DD'
  dateNe?: string;
  dateEn?: string;
  timeNe?: string;
  timeEn?: string;
  venueNe: string;
  venueEn: string;
  categoryNe: string;
  categoryEn: string;
  descriptionNe: string;
  descriptionEn: string;
  imageUrl?: string;
  highlightsNe?: string[];
  highlightsEn?: string[];
  registrationUrl?: string;
  contactPhone?: string;
}

export interface FuturePlanItem {
  id: string;
  titleNe: string;
  titleEn: string;
  timeframeNe: string;
  timeframeEn: string;
  descriptionNe: string;
  descriptionEn: string;
  objectivesNe: string[];
  objectivesEn: string[];
  icon: string;
}

export interface FaqItem {
  qNe: string;
  qEn: string;
  aNe: string;
  aEn: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
}

export interface AppDatabase {
  siteSettings: SiteSettings;
  heroSlides: HeroSlide[];
  stats: StatItem[];
  milestones: MilestoneItem[];
  chairmanMessage: ChairmanMessage;
  programs: ProgramItem[];
  opportunities: OpportunityItem[];
  achievements: AchievementItem[];
  galleryAlbums: GalleryAlbum[];
  galleryPhotos: GalleryPhoto[];
  futurePlans: FuturePlanItem[];
  faqs: FaqItem[];
  events?: EventItem[];
  inquiries: InquiryItem[];
}
