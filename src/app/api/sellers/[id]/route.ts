import { NextRequest, NextResponse } from 'next/server';
import { getSellerById, updateSeller, deleteSeller } from '@/lib/services/seller-service';
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const sellerData = await getSellerById(id);
    
    if (!sellerData) {
      return NextResponse.json(
        { message: 'Seller not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(sellerData, { status: 200 });
  } catch (error) {
    console.error('Get seller error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const body = await request.json();
    
    const success = await updateSeller(id, body);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to update seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Seller updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update seller error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const success = await deleteSeller(id);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to delete seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Seller deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete seller error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 