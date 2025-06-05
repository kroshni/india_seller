import { NextRequest, NextResponse } from 'next/server';
import { authenticateSeller } from '@/lib/auth';
import { sign } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const user = await authenticateSeller(email, password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = sign(
      {
        email: user.email,
        name: user.name,
        role: user.role,
        sellerId: user.sellerId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
    // Set HTTP-only cookie
    const response = NextResponse.json(
      { user, message: 'Login successful' },
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day in seconds
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Seller login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}