import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { sign } from 'jsonwebtoken';

// This API route creates a JWT token for authenticated customers
// and sets it as a cookie, then redirects back to the original URL
export async function GET(request: NextRequest) {
  try {
    console.log('Token API: Request received');
    
    // Get the return URL from the query parameters
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/customer/dashboard';
    console.log('Token API: Return URL:', returnUrl);
    
    // Check if the user is authenticated with NextAuth
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET
    });
    
    console.log('Token API: NextAuth token exists:', !!token);
    
    if (!token || !token.customerId) {
      console.log('Token API: No valid NextAuth token found, redirecting to login');
      return NextResponse.redirect(new URL('/customer/login', request.url));
    }
    
    console.log('Token API: Creating JWT token for user:', token.email);
    
    // Create a custom JWT token
    const customToken = sign(
      {
        email: token.email,
        name: token.name,
        role: 'customer',
        customerId: token.customerId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
    // Create a response that redirects to the return URL
    const response = NextResponse.redirect(new URL(returnUrl, request.url));
    
    // Set the custom JWT token as a cookie
    response.cookies.set({
      name: 'customer-auth-token',
      value: customToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day in seconds
      path: '/',
    });
    
    console.log('Token API: Set customer-auth-token cookie successfully');
    return response;
  } catch (error) {
    console.error('Token API: Error creating token:', error);
    return NextResponse.redirect(new URL('/customer/login', request.url));
  }
}