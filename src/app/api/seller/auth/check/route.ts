import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      
      // Check if the user is a seller or admin
      if (decoded.role !== 'seller' && decoded.role !== 'admin') {
        return NextResponse.json(
          { authenticated: false, message: 'Not authorized as seller' },
          { status: 403 }
        );
      }
      
      return NextResponse.json({
        authenticated: true,
        user: {
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
          sellerId: decoded.sellerId
        }
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { authenticated: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Server error' },
      { status: 500 }
    );
  }
}