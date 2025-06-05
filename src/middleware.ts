import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Remove jsonwebtoken import as it's not compatible with Edge runtime

// This middleware runs on all requests

// Configure the middleware to run in the Edge Runtime
export const config = {
  matcher: [
    // Customer and API routes that need authentication
    '/customer/:path*',
    '/api/customers/:path*',
    
    // Exclude static files and authentication routes
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
  runtime: 'edge',
};
export async function middleware(request: NextRequest) {
  // Only run this middleware for customer routes
  if (!request.nextUrl.pathname.startsWith('/customer') && 
      !request.nextUrl.pathname.startsWith('/api/customers')) {
    return NextResponse.next();
  }

  console.log('Middleware: Processing request for path:', request.nextUrl.pathname);
  console.log('Middleware: Checking for existing customer-auth-token:', request.cookies.has('customer-auth-token'));

  // Check if the user is authenticated with NextAuth
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET
  });

  console.log('Middleware: NextAuth token exists:', !!token);
  console.log('Middleware: NextAuth token contains customerId:', token?.customerId ? 'Yes' : 'No');

  // If the user is authenticated with NextAuth but doesn't have the custom JWT token cookie
  if (token && token.customerId && !request.cookies.has('customer-auth-token')) {
    console.log('Middleware: Detected authenticated user without customer-auth-token:', token.email);
    console.log('Middleware: Customer ID from NextAuth token:', token.customerId);
    
    // Instead of creating the JWT token here (which requires crypto), redirect to an API route
    // that will handle the token creation on the server side
    if (request.nextUrl.pathname.startsWith('/customer') && 
        !request.nextUrl.pathname.startsWith('/customer/login')) {
      
      // Store the original URL to redirect back after token creation
      const originalUrl = request.nextUrl.pathname + request.nextUrl.search;
      
      // Create a URL for the token creation API with the return URL as a query parameter
      const tokenUrl = new URL('/api/customers/auth/token', request.url);
      tokenUrl.searchParams.set('returnUrl', originalUrl);
      
      console.log('Middleware: Redirecting to token creation API:', tokenUrl.toString());
      return NextResponse.redirect(tokenUrl);
    }
    
    // For API routes, we can't redirect, so we'll just continue and let the API handle the auth check
    console.log('Middleware: API route without token, continuing to let API handle auth check');
    return NextResponse.next();
  } else if (token && token.customerId) {
    console.log('Middleware: Customer already has auth token, no action needed');
  } else if (token) {
    console.log('Middleware: NextAuth token exists but missing customerId');
  } else {
    console.log('Middleware: No NextAuth token found');
  }

  return NextResponse.next();
}

// Config is already defined at the top of the file