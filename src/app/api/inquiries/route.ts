import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Inquiry } from "@/lib/models/Inquiry";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

async function syncLocalDbJson(action: (db: any) => void) {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    const db = JSON.parse(raw);
    action(db);
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not sync db.json inquiries:", err);
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.warn("MongoDB warning in /api/inquiries GET, reading fallback:", error);
    try {
      const raw = await fs.readFile(DB_PATH, "utf-8");
      const db = JSON.parse(raw);
      return NextResponse.json({ inquiries: db.inquiries || [] });
    } catch {
      return NextResponse.json({ inquiries: [] });
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const newInquiryData = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: email ? String(email).trim() : "",
      phone: phone ? String(phone).trim() : "",
      subject: subject ? String(subject).trim() : "General Inquiry",
      message: String(message).trim(),
      date: new Date(),
      status: "unread" as const,
    };

    try {
      await connectToDatabase();
      const created = await Inquiry.create(newInquiryData);
      newInquiryData.id = created.id;
    } catch (mongoErr) {
      console.warn("MongoDB create inquiry warning:", mongoErr);
    }

    await syncLocalDbJson((db) => {
      if (!Array.isArray(db.inquiries)) db.inquiries = [];
      db.inquiries.unshift(newInquiryData);
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry saved to MongoDB successfully",
      inquiry: newInquiryData,
    });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return NextResponse.json(
      { error: "Failed to save inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    try {
      await connectToDatabase();
      await Inquiry.findOneAndUpdate({ id }, { status });
    } catch (dbErr) {
      console.warn("MongoDB update inquiry warning:", dbErr);
    }

    await syncLocalDbJson((db) => {
      if (Array.isArray(db.inquiries)) {
        const item = db.inquiries.find((x: any) => x.id === id);
        if (item) item.status = status;
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    try {
      await connectToDatabase();
      await Inquiry.findOneAndDelete({ id });
    } catch (dbErr) {
      console.warn("MongoDB delete warning:", dbErr);
    }

    await syncLocalDbJson((db) => {
      if (Array.isArray(db.inquiries)) {
        db.inquiries = db.inquiries.filter((x: any) => x.id !== id);
      }
    });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
