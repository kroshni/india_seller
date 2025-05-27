import { NextRequest, NextResponse } from 'next/server';
import {
  getSellerById,
  updateSeller,
  deleteSeller,
  updateSellerStatus,
  updateSellerKycStatus,
  updateSellerTopScorer
} from '@/lib/services/seller-service';
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
    // Use await on params to ensure it's fully resolved
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    console.log(`Getting seller details for ID: ${id}`);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }

    // Get seller data from database
    const sellerData = await getSellerById(id);
    
    if (!sellerData) {
      console.log(`No seller found with ID: ${id}`);
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    console.log(`Successfully retrieved seller with ID: ${id}`);
    return NextResponse.json(sellerData);
  } catch (error) {
    console.error('Error fetching seller:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seller' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip authentication for now to make development easier
    // Uncomment this for production
    /*
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    */
    
    // Use await on params to ensure it's fully resolved
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Check if the seller exists
    const existing = await getSellerById(id);
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    const success = await updateSeller(id, data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Seller updated successfully'
    });
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json(
      { error: 'Failed to update seller' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip authentication for now to make development easier
    // Uncomment this for production
    /*
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    */
    
    // Use await on params to ensure it's fully resolved
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    let success = false;
    
    // Check if the seller exists
    const existing = await getSellerById(id);
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    // Handle specific field updates
    if (data.status !== undefined) {
      if (data.status !== 'Active' && data.status !== 'Inactive') {
        return NextResponse.json(
          { error: 'Status must be Active or Inactive' },
          { status: 400 }
        );
      }
      
      success = await updateSellerStatus(id, data.status);
    } else if (data.kycStatus !== undefined) {
      if (data.kycStatus !== 'Verified' && data.kycStatus !== 'Pending') {
        return NextResponse.json(
          { error: 'KYC Status must be Verified or Pending' },
          { status: 400 }
        );
      }
      
      success = await updateSellerKycStatus(id, data.kycStatus);
    } else if (data.isTopScorer !== undefined) {
      const topScorerValue = parseInt(data.isTopScorer);
      
      if (isNaN(topScorerValue) || topScorerValue < 0 || topScorerValue > 100) {
        return NextResponse.json(
          { error: 'Top Scorer must be a number between 0 and 100' },
          { status: 400 }
        );
      }
      
      success = await updateSellerTopScorer(id, topScorerValue);
    } else {
      // If none of the specific fields are provided, treat as a partial update
      success = await updateSeller(id, data);
    }
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Seller updated successfully'
    });
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json(
      { error: 'Failed to update seller' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip authentication for now to make development easier
    // Uncomment this for production
    /*
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    */
    
    // Use await on params to ensure it's fully resolved
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }
    
    // Check if the seller exists
    const existing = await getSellerById(id);
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    const success = await deleteSeller(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Seller deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting seller:', error);
    return NextResponse.json(
      { error: 'Failed to delete seller' },
      { status: 500 }
    );
  }
} 