import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'sv'];

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
