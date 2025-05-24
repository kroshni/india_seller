import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Clear all authentication cookies
    cookieStore.delete('token');
    cookieStore.delete('refresh_token');
    cookieStore.delete('session_id');
    cookieStore.delete('user_id');
    cookieStore.delete('auth-token');
    
    // Clear with different paths to ensure all cookies are removed
    cookieStore.delete({
      name: 'token',
      path: '/',
    });
    
    cookieStore.delete({
      name: 'auth-token',
      path: '/',
    });
    
    cookieStore.delete({
      name: 'session_id',
      path: '/',
    });
    
    // Create response with proper cache headers
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    
    // Set cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Failed to logout' },
      { status: 500 }
    );
  }
} 