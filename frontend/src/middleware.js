import { NextResponse } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/generate-blog',
];

// Routes that are for non-authenticated users
const authRoutes = [
  '/signin',
  '/signup',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get authentication status from cookies
  const hasAuthTokens = request.cookies.has('auth_tokens');
  
  // If user is accessing a protected route and not authenticated, redirect to signin
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !hasAuthTokens) {
    const url = new URL('/signin', request.url);
    // Add the original route as a parameter to redirect back after login
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If user is authenticated and tries to access auth routes, redirect to dashboard
  if (authRoutes.some(route => pathname === route) && hasAuthTokens) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
