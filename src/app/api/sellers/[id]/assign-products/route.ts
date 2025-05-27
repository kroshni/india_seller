import { NextRequest, NextResponse } from 'next/server';
import { updateSellerProductAssignments } from '@/lib/services/seller-service';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Make sure we have a seller ID
    const resolvedParams = await params;
    const sellerId = resolvedParams.id;
    
    if (!sellerId) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }
    
    // Get product IDs from request body
    const { productIds } = await request.json();
    
    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'Product IDs must be provided as an array' },
        { status: 400 }
      );
    }
    
    console.log(`Assigning ${productIds.length} products to seller ${sellerId}`);
    
    // Update product assignments for this seller
    const success = await updateSellerProductAssignments(sellerId, productIds);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to assign products to seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully assigned ${productIds.length} products to seller`,
      sellerId,
      assignedProductIds: productIds
    });
  } catch (error) {
    console.error('Error assigning products:', error);
    return NextResponse.json(
      { error: 'Failed to assign products to seller' },
      { status: 500 }
    );
  }
} 