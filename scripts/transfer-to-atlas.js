const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// MongoDB Atlas URI provided by user
const ATLAS_URI = "mongodb+srv://sapanakafle2016_db_user:MXtxRC5doNY3dRXT@cluster0.pnair48.mongodb.net/mediainternational?retryWrites=true&w=majority";
const LOCAL_URI = "mongodb://localhost:27017/mediainternational";
const DB_PATH = path.join(__dirname, "..", "src", "data", "db.json");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

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
    events: { type: [mongoose.Schema.Types.Mixed], default: [] },
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

const AdminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "System Administrator" },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

async function runTransfer() {
  console.log("=== Media International Database Transfer ===");
  console.log("Target MongoDB Atlas:", ATLAS_URI.replace(/:([^:@]+)@/, ":****@"));

  // 1. Determine Source Data: Try local MongoDB first, fallback to db.json
  let sourceData = null;
  let sourceInquiries = [];

  try {
    console.log("\n[1/4] Checking local MongoDB for existing data...");
    const localConn = await mongoose.createConnection(LOCAL_URI, { serverSelectionTimeoutMS: 2000 }).asPromise();
    const LocalContent = localConn.model("Content", ContentSchema);
    const LocalInquiry = localConn.model("Inquiry", InquirySchema);

    const doc = await LocalContent.findOne().sort({ updatedAt: -1 }).lean();
    if (doc) {
      console.log("Found existing Content document in local MongoDB!");
      sourceData = doc;
    }
    const inqs = await LocalInquiry.find().lean();
    if (inqs && inqs.length > 0) {
      console.log(`Found ${inqs.length} inquiries in local MongoDB!`);
      sourceInquiries = inqs;
    }
    await localConn.close();
  } catch (err) {
    console.log("Local MongoDB not available or empty, reading directly from src/data/db.json");
  }

  if (!sourceData) {
    console.log("Reading fallback source data from src/data/db.json...");
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    sourceData = JSON.parse(raw);
    sourceInquiries = sourceData.inquiries || [];
  }

  // 2. Connect to MongoDB Atlas
  console.log("\n[2/4] Connecting to MongoDB Atlas cluster...");
  const atlasConn = await mongoose.createConnection(ATLAS_URI, {
    serverSelectionTimeoutMS: 15000,
  }).asPromise();
  console.log("Connected successfully to MongoDB Atlas (database: mediainternational)!");

  const AtlasContent = atlasConn.model("Content", ContentSchema);
  const AtlasInquiry = atlasConn.model("Inquiry", InquirySchema);
  const AtlasAdminUser = atlasConn.model("AdminUser", AdminUserSchema);

  // 3. Transfer Content
  console.log("\n[3/4] Transferring all site content into Atlas...");
  await AtlasContent.deleteMany({});
  const insertedContent = await AtlasContent.create({
    siteSettings: sourceData.siteSettings || {},
    heroSlides: sourceData.heroSlides || [],
    stats: sourceData.stats || [],
    milestones: sourceData.milestones || [],
    chairmanMessage: sourceData.chairmanMessage || {},
    programs: sourceData.programs || [],
    opportunities: sourceData.opportunities || [],
    achievements: sourceData.achievements || [],
    galleryAlbums: sourceData.galleryAlbums || [],
    galleryPhotos: sourceData.galleryPhotos || [],
    futurePlans: sourceData.futurePlans || [],
    faqs: sourceData.faqs || [],
    events: sourceData.events || [],
  });
  console.log("Successfully inserted main Content document in Atlas (id:", insertedContent._id, ")");
  console.log(`- Hero Slides: ${(sourceData.heroSlides || []).length}`);
  console.log(`- Programs (5 Pillars): ${(sourceData.programs || []).length}`);
  console.log(`- Opportunities (सम्भावना): ${(sourceData.opportunities || []).length}`);
  console.log(`- Photo Albums: ${(sourceData.galleryAlbums || []).length}`);
  console.log(`- Photographs: ${(sourceData.galleryPhotos || []).length}`);
  console.log(`- Events & Schedule: ${(sourceData.events || []).length}`);

  // Inquiries
  if (sourceInquiries.length > 0) {
    await AtlasInquiry.deleteMany({});
    for (const inq of sourceInquiries) {
      await AtlasInquiry.create({
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
    console.log(`- Inquiries: ${sourceInquiries.length} inserted into Atlas.`);
  }

  // 4. Seed / Update Admin User in Atlas
  console.log("\n[4/4] Setting up Admin User in MongoDB Atlas...");
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@mediainternational.com.np").toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD || "admin123@sajaN-sir";
  const passHash = hashPassword(adminPass);

  await AtlasAdminUser.deleteMany({ email: adminEmail });
  const adminDoc = await AtlasAdminUser.create({
    email: adminEmail,
    username: "admin",
    passwordHash: passHash,
    name: "System Administrator",
    role: "admin",
  });
  console.log("Admin user created in Atlas (email:", adminDoc.email, ")");

  // Verify Collections in Atlas
  const collections = await atlasConn.db.listCollections().toArray();
  console.log("\n=== Atlas Collections Verified ===");
  for (const c of collections) {
    const count = await atlasConn.db.collection(c.name).countDocuments();
    console.log(`- Collection "${c.name}": ${count} document(s)`);
  }

  await atlasConn.close();
  console.log("\n Transfer to MongoDB Atlas completed successfully!");
}

runTransfer().catch((err) => {
  console.error("\n Transfer Error:", err);
  process.exit(1);
});
