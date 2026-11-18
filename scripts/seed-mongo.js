const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mediainternational";
const DB_PATH = path.join(__dirname, "..", "src", "data", "db.json");

const ContentSchema = new mongoose.Schema(
  {
    siteSettings: { type: mongoose.Schema.Types.Mixed, default: {} },
    heroSlides: { type: [mongoose.Schema.Types.Mixed], default: [] },
    stats: { type: [mongoose.Schema.Types.Mixed], default: [] },
    milestones: { type: [mongoose.Schema.Types.Mixed], default: [] },
    chairmanMessage: { type: mongoose.Schema.Types.Mixed, default: {} },
    programs: { type: [mongoose.Schema.Types.Mixed], default: [] },
    opportunities: { type: [mongoose.Schema.Types.Mixed], default: [] },
    achievements: { type: [mongoose.Schema.Types.Mixed], default: [] },
    galleryAlbums: { type: [mongoose.Schema.Types.Mixed], default: [] },
    galleryPhotos: { type: [mongoose.Schema.Types.Mixed], default: [] },
    futurePlans: { type: [mongoose.Schema.Types.Mixed], default: [] },
    faqs: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

const InquirySchema = new mongoose.Schema(
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

const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);
const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

async function seed() {
  console.log("Connecting to MongoDB:", MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB successfully!");

  const raw = fs.readFileSync(DB_PATH, "utf-8");
  const data = JSON.parse(raw);

  // Seed or replace Content
  await Content.deleteMany({});
  const contentDoc = await Content.create({
    siteSettings: data.siteSettings,
    heroSlides: data.heroSlides,
    stats: data.stats,
    milestones: data.milestones,
    chairmanMessage: data.chairmanMessage,
    programs: data.programs,
    opportunities: data.opportunities,
    achievements: data.achievements,
    galleryAlbums: data.galleryAlbums,
    galleryPhotos: data.galleryPhotos,
    futurePlans: data.futurePlans,
    faqs: data.faqs,
  });
  console.log("Successfully inserted main Content document into MongoDB (id:", contentDoc._id, ")");

  // Seed inquiries if any
  if (Array.isArray(data.inquiries) && data.inquiries.length > 0) {
    await Inquiry.deleteMany({});
    for (const inq of data.inquiries) {
      await Inquiry.create({
        id: inq.id || `inq_${Date.now()}`,
        name: inq.name,
        email: inq.email || "",
        phone: inq.phone || "",
        subject: inq.subject || inq.topic || "General Inquiry",
        message: inq.message,
        date: inq.date ? new Date(inq.date) : new Date(),
        status: inq.status || "unread",
      });
    }
    console.log(`Inserted ${data.inquiries.length} inquiries into MongoDB!`);
  }

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("MongoDB Collections:", collections.map((c) => c.name));

  await mongoose.disconnect();
  console.log("Seed completed and MongoDB disconnected.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
