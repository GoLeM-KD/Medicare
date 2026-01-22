import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const dashboard = {
    A: '/Admin',
    D: '/Doctor',
    P: '/User',
  }[role];

  // Logged-in user visiting auth pages
  if (pathname.startsWith('/auth') && token && role) {
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // Allow auth pages for non-logged users
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // No auth
  if (!token && !role) {
    return NextResponse.redirect(new URL('/auth/Login', request.url));
  }

  // Invalid role
  if (!dashboard) {
    const res = NextResponse.redirect(new URL('/auth/Login', request.url));
    res.cookies.delete('token');
    res.cookies.delete('role');
    return res;
  }

  // Role-based protection
  if (
    (role === 'A' && !pathname.startsWith('/Admin')) ||
    (role === 'D' && !pathname.startsWith('/Doctor')) ||
    (role === 'P' && !pathname.startsWith('/User'))
  ) {
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Admin/:path*',
    '/Doctor/:path*',
    '/User/:path*',
    '/auth/:path*'
  ],
};
