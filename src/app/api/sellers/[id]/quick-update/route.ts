import { NextRequest, NextResponse } from 'next/server';
import { updateSellerStatus, updateSellerKycStatus, updateSellerTopScorer } from '@/lib/services/seller-service';
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

export async function PATCH(
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
    
    // Access the id directly without optional chaining
    const id = params.id;
    const body = await request.json();
    
    let success = false;
    
    // Handle different update types based on the field
    if (body.hasOwnProperty('status')) {
      success = await updateSellerStatus(id, body.status);
    } else if (body.hasOwnProperty('kycStatus')) {
      success = await updateSellerKycStatus(id, body.kycStatus);
    } else if (body.hasOwnProperty('isTopScorer')) {
      // Make sure isTopScorer is a number from 0-100
      const topScoreValue = parseInt(body.isTopScorer, 10);
      
      if (isNaN(topScoreValue) || topScoreValue < 0 || topScoreValue > 100) {
        return NextResponse.json(
          { message: 'isTopScorer must be a number between 0 and 100' },
          { status: 400 }
        );
      }
      
      success = await updateSellerTopScorer(id, topScoreValue);
    } else {
      return NextResponse.json(
        { message: 'Invalid update field' },
        { status: 400 }
      );
    }
    
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
    console.error('Quick update seller error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 