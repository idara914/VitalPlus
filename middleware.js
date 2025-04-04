import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isAuthPage = ['/auth/login', '/auth/register'].includes(req.nextUrl.pathname);

  // Redirect unauthenticated users trying to access protected routes
  if (!token && isAdminRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Redirect authenticated users trying to access login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
