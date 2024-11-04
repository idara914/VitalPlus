import { NextResponse } from "next/server";

export function middleware(req) {
  // const token = req.cookies.get('token')?.value;

  // if (!token && req.nextUrl.pathname.startsWith('/admin')) {
  //     // Redirect to login page if not authenticated
  //     return NextResponse.redirect(new URL('/auth/login', req.url));
  // }

  // if (token && (req.nextUrl.pathname == '/auth/login' || req.nextUrl.pathname == '/auth/register')) {
  //     // Redirect to login page if not authenticated
  //     return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  // }

  // If token exists, allow access to the page
  return NextResponse.next();
}

// Define which paths should use this middleware
export const config = {
  matcher: ["/:path*"],
};
