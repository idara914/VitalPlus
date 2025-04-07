// /middleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // ✅ Don't apply to static files or Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api") // let API routes through without checks
  ) {
    return NextResponse.next();
  }

  const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);
  const isProtectedPage = pathname.startsWith("/admin");

  let isValid = false;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      isValid = true;
    } catch (err) {
      console.warn("Invalid token in middleware:", err.message);
    }
  }

  // ✅ If user is trying to access protected page without token
  if (!isValid && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ✅ If logged in but tries to access login/register page, redirect to dashboard
  if (isValid && isAuthPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"], // Not API anymore
};
