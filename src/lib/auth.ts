import crypto from "crypto";
import { cookies } from "next/headers";
import { connectToDatabase } from "./mongodb";
import { AdminUser } from "./models/AdminUser";

const SECRET = process.env.ADMIN_SESSION_SECRET || "default_super_secret_mi_2026";
const COOKIE_NAME = "mi_admin_session";

// Hash password using PBKDF2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
}

// Generate signed session token: base64(payload).signature
export function createSessionToken(payload: { email: string; role: string }): string {
  const data = JSON.stringify({
    ...payload,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const encoded = Buffer.from(data).toString("base64url");
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(encoded);
  const signature = hmac.digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string): { email: string; role: string } | null {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;

    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(encoded);
    const expectedSignature = hmac.digest("base64url");

    if (signature !== expectedSignature) return null;

    const json = Buffer.from(encoded, "base64url").toString("utf-8");
    const payload = JSON.parse(json);

    if (Date.now() > payload.exp) return null;

    return { email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

// Authenticate Admin credentials
export async function authenticateAdmin(
  identifier: string,
  plainPassword: string
): Promise<{ success: boolean; user?: { email: string; name: string } }> {
  const cleanId = identifier.trim().toLowerCase();
  const envEmail = (process.env.ADMIN_EMAIL || "admin@mediainternational.com.np").toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD || "admin123";

  // Check against env fallback
  if (
    (cleanId === envEmail || cleanId === "admin") &&
    plainPassword === envPassword
  ) {
    return {
      success: true,
      user: { email: envEmail, name: "System Administrator" },
    };
  }

  // Check MongoDB
  try {
    await connectToDatabase();
    const user = await AdminUser.findOne({
      $or: [{ email: cleanId }, { username: cleanId }],
    });

    if (user && verifyPassword(plainPassword, user.passwordHash)) {
      return {
        success: true,
        user: { email: user.email, name: user.name },
      };
    }
  } catch (err) {
    console.warn("MongoDB auth check warning:", err);
  }

  return { success: false };
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
