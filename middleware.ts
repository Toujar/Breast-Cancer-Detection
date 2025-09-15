import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeTokenPayload(token: string | undefined): any | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
    return payload;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths that don't require auth
  const publicPaths = [
    '/',
    '/auth',
    '/about',
    '/api/auth/login',
    '/api/auth/signup',
  ];

  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const token = req.cookies.get('token')?.value;
  const decoded = decodeTokenPayload(token);

  // If not authenticated and accessing protected routes, redirect to /auth
  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/predict') ||
    pathname.startsWith('/history') ||
    pathname.startsWith('/results');
  if (!decoded && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // If authenticated admin visiting /dashboard, redirect to /admin
  if (decoded?.role === 'admin' && pathname.startsWith('/dashboard')) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // If authenticated non-admin visiting /admin, redirect to /dashboard
  if (decoded && decoded.role !== 'admin' && pathname.startsWith('/admin')) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // If authenticated and trying to visit /auth, send to proper landing
  if (decoded && pathname.startsWith('/auth')) {
    const url = req.nextUrl.clone();
    url.pathname = decoded.role === 'admin' ? '/admin' : '/dashboard';
    return NextResponse.redirect(url);
  }

  // Otherwise continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/predict/:path*',
    '/history',
    '/results/:path*',
    '/auth',
    '/about',
    '/',
  ],
};


