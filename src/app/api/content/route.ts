import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Content } from "@/lib/models/Content";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

// Helper to fallback to db.json if needed
async function readFallback() {
  try {
    const rawData = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch {
    return {};
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    let contentDoc = await Content.findOne().lean();

    if (!contentDoc) {
      // Auto seed from db.json if collection is empty
      const fallbackData = await readFallback();
      contentDoc = await Content.create(fallbackData);
    }

    return NextResponse.json(contentDoc);
  } catch (error) {
    console.warn("MongoDB connection warning in /api/content GET, falling back to local store:", error);
    const fallback = await readFallback();
    return NextResponse.json(fallback);
  }
}

export async function PUT(request: Request) {
  try {
    const updatedData = await request.json();

    if (!updatedData || typeof updatedData !== "object") {
      return NextResponse.json(
        { error: "Invalid content payload" },
        { status: 400 }
      );
    }

    let mongoUpdatedDoc = null;
    try {
      await connectToDatabase();
      const existing = await Content.findOne();
      if (existing) {
        Object.assign(existing, updatedData);
        mongoUpdatedDoc = await existing.save();
      } else {
        mongoUpdatedDoc = await Content.create(updatedData);
      }
    } catch (dbErr) {
      console.warn("MongoDB update warning:", dbErr);
    }

    // Keep db.json in sync as secondary replica
    try {
      const current = await readFallback();
      const merged = { ...current, ...updatedData };
      await fs.writeFile(DB_PATH, JSON.stringify(merged, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("db.json sync warning:", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Content successfully updated in MongoDB",
      data: mongoUpdatedDoc || updatedData,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
