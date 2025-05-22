import { NextRequest, NextResponse } from 'next/server';
import { getAllSellers, createSeller } from '@/lib/services/seller-service';
import { verify } from 'jsonwebtoken';

// Middleware to check if user is authenticated
const authenticateRequest = async (request: NextRequest) => {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const sellers = await getAllSellers();
    
    return NextResponse.json({ sellers }, { status: 200 });
  } catch (error) {
    console.error('Get sellers error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { message: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }
    
    if (!body.business || !body.business.companyName) {
      return NextResponse.json(
        { message: 'Business details are required' },
        { status: 400 }
      );
    }
    
    const sellerId = await createSeller(body);
    
    if (!sellerId) {
      return NextResponse.json(
        { message: 'Failed to create seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Seller created successfully', sellerId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create seller error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 