import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('brewpluse_session')?.value;
  const authHeader = request.headers.get('authorization');

  // 301 Permanent Redirect for alias/typo domains (e.g. brewpluseh.com or www.brewpluse.com)
  if (host.includes('brewpluseh.com') || host === 'www.brewpluse.com') {
    const canonicalUrl = new URL(pathname, 'https://brewpluse.com');
    canonicalUrl.search = request.nextUrl.search;
    return NextResponse.redirect(canonicalUrl, 301);
  }


  // Subdomain routing for status.brewpluse.com
  if (host.startsWith('status.') || host.includes('status.brewpluse.com')) {
    if (pathname === '/' || pathname === '') {
      return NextResponse.rewrite(new URL('/status', request.url));
    }
  }

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
    '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|storefront.png|site.webmanifest).*)',
  ],
};
