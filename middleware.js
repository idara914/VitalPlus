import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthPage = ["/auth/login", "/auth/register"].includes(req.nextUrl.pathname);
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  let isValid = false;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      isValid = true;
    } catch (err) {
      console.warn("Invalid or expired token in middleware:", err.message);
    }
  }

  if (!isValid && isAdminRoute && !isApiRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isValid && isAuthPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/api/:path*"],
};
