import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: Date;
  status: "unread" | "read" | "replied";
}

const InquirySchema = new Schema<IInquiry>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["unread", "read", "replied"], default: "unread" },
  },
  { timestamps: true }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
