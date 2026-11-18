import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContent extends Document {
  siteSettings: Record<string, any>;
  heroSlides: Array<Record<string, any>>;
  stats: Array<Record<string, any>>;
  milestones: Array<Record<string, any>>;
  chairmanMessage: Record<string, any>;
  programs: Array<Record<string, any>>;
  opportunities: Array<Record<string, any>>;
  achievements: Array<Record<string, any>>;
  galleryAlbums: Array<Record<string, any>>;
  galleryPhotos: Array<Record<string, any>>;
  futurePlans: Array<Record<string, any>>;
  faqs: Array<Record<string, any>>;
  events: Array<Record<string, any>>;
  updatedAt: Date;
}

const ContentSchema = new Schema(
  {
    siteSettings: { type: Schema.Types.Mixed, default: {} },
    heroSlides: [{ type: Schema.Types.Mixed }],
    stats: [{ type: Schema.Types.Mixed }],
    milestones: [{ type: Schema.Types.Mixed }],
    chairmanMessage: { type: Schema.Types.Mixed, default: {} },
    programs: [{ type: Schema.Types.Mixed }],
    opportunities: [{ type: Schema.Types.Mixed }],
    achievements: [{ type: Schema.Types.Mixed }],
    galleryAlbums: [{ type: Schema.Types.Mixed }],
    galleryPhotos: [{ type: Schema.Types.Mixed }],
    futurePlans: [{ type: Schema.Types.Mixed }],
    faqs: [{ type: Schema.Types.Mixed }],
    events: [{ type: Schema.Types.Mixed }],
  },
  { timestamps: true }
);

export const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);
