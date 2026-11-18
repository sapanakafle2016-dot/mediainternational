import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const baseName = path.parse(originalName).name || "upload";
    const filename = `img_${Date.now()}_${baseName}.webp`;
    const outputPath = path.join(uploadsDir, filename);

    // Optimize image using sharp: resize max width 1920, convert to high-efficiency WebP
    await sharp(buffer)
      .resize({ width: 1920, height: 1080, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const publicUrl = `/images/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Image processing or upload failed" },
      { status: 500 }
    );
  }
}
