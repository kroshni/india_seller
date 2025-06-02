import { NextRequest, NextResponse } from 'next/server';
import { registerCustomer } from '@/lib/services/customer-auth-service';
import { sign } from 'jsonwebtoken';

// POST /api/customers/register
// Register a new customer and create a user account
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.password) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (data.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Register customer (creates both customer record and user account)
    const customerUser = await registerCustomer({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      profilePicture: data.profilePicture,
      addresses: data.addresses || [],
      documents: data.documents || []
    });

    if (!customerUser) {
      return NextResponse.json(
        { error: 'Failed to register customer' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = sign(
      {
        email: customerUser.email,
        name: customerUser.name,
        role: customerUser.role,
        customerId: customerUser.customerId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set cookie with the token
    const response = NextResponse.json(
      { success: true, message: 'Registration successful', customerId: customerUser.customerId },
      { status: 201 }
    );

    response.cookies.set({
      name: 'customer-auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle duplicate user error
    if (error.message === 'User already exists') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}