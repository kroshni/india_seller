import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// GET /api/customers/auth - Check if customer is authenticated
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('customer-auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Return user info without sensitive data
      return NextResponse.json({
        user: {
          email: (decoded as any).email,
          name: (decoded as any).name,
          role: 'customer'
        },
        message: 'Authenticated'
      }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}