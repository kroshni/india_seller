import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getClient } from '@/lib/db/cassandra';

export async function GET(request: NextRequest) {
  try {
    // Get the JWT token from cookies
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    
    // Query the database for the user
    const client = await getClient();
    const result = await client.execute(
      'SELECT id, name, email, role FROM users WHERE id = ? ALLOW FILTERING',
      [decoded.id],
      { prepare: true }
    );
    
    if (result.rowLength === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    const user = result.rows[0];
    
    // Return the user object without sensitive data
    return NextResponse.json(
      { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'Admin',
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
} 