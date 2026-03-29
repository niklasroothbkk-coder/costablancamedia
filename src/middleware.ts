import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'sv'];

// Old WordPress spam paths — return 410 Gone so Google drops them
const gonePatterns = [
  /^\/products(\/|$)/,
  /^\/shop(\/|$)/,
  /^\/toyu(\/|$)/,
  /^\/pw$/,
  /^\/wp-admin(\/|$)/,
  /^\/wp-content(\/|$)/,
  /^\/wp-includes(\/|$)/,
  /^\/wp-login\.php$/,
  /^\/xmlrpc\.php$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip files, api, _next
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Return 410 Gone for old WordPress spam URLs
  if (gonePatterns.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  // Redirect explicit /en/... URLs to /... (canonical form)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const cleanPath = pathname.replace(/^\/en/, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    return NextResponse.redirect(url, 301);
  }

  const hasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (hasLocale) return;

  // Rewrite English to /en/... internally
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon|.*\\..*).*)'],
};
