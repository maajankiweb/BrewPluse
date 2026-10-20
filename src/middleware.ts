import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('brewpluse_session')?.value;
  const authHeader = request.headers.get('authorization');

  // Protect dashboard routes: require active session cookie
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect sensitive setup & extension routes
  if (pathname.startsWith('/api/setup') || pathname.startsWith('/api/extension')) {
    if (!sessionCookie && (!authHeader || !authHeader.startsWith('Bearer '))) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid authentication session required.' },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.next();

  // Harden HTTP Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/setup',
    '/api/extension/:path*',
  ],
};
