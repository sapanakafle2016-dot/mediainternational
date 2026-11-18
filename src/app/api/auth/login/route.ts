import { NextResponse } from "next/server";
import { authenticateAdmin, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { identifier, password, rememberMe } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/Email and password are required" },
        { status: 400 }
      );
    }

    const authResult = await authenticateAdmin(identifier, password);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email/password." },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      email: authResult.user.email,
      role: "admin",
    });

    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: authResult.user,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error: any) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
