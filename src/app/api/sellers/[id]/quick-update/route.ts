import { NextRequest, NextResponse } from 'next/server';
import { updateSellerStatus, updateSellerKycStatus, updateSellerTopScorer } from '@/lib/services/seller-service';
import { authenticateRequest } from '@/lib/auth';

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

/**
 * Quick update for seller 
 * Used for simple status updates, top scorer, etc.
 * PUT /api/sellers/[id]/quick-update
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Await params before accessing its properties
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Skip authentication for now to make development easier
    // Uncomment this for production
    /*
    const user = await authenticateRequest(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    */
    
    const data = await request.json();
    
    // Validate data
    if (!data) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }
    
    let success = false;
    
    // Handle different update types based on the field
    if (data.hasOwnProperty('status')) {
      success = await updateSellerStatus(id, data.status);
    } else if (data.hasOwnProperty('kycStatus')) {
      success = await updateSellerKycStatus(id, data.kycStatus);
    } else if (data.hasOwnProperty('isTopScorer')) {
      // Make sure isTopScorer is a number from 0-100
      const topScoreValue = parseInt(data.isTopScorer, 10);
      
      if (isNaN(topScoreValue) || topScoreValue < 0 || topScoreValue > 100) {
        return NextResponse.json(
          { error: 'isTopScorer must be a number between 0 and 100' },
          { status: 400 }
        );
      }
      
      success = await updateSellerTopScorer(id, topScoreValue);
    } else {
      return NextResponse.json(
        { error: 'Invalid update field' },
        { status: 400 }
      );
    }
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json(
      { error: 'Failed to update seller' },
      { status: 500 }
    );
  }
} 