import { NextRequest, NextResponse } from 'next/server';
import { getSellerById, updateSellerProductAssignments, getSellerProductAssignments } from '@/lib/services/seller-service';
import { authenticateRequest } from '@/lib/auth';

// GET /api/sellers/[id]/products
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use await on params to ensure it's fully resolved
    const resolvedParams = await params;
    const sellerId = resolvedParams.id;
    
    console.log(`Getting product assignments for seller: ${sellerId}`);
    
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the seller to verify it exists
    const seller = await getSellerById(sellerId);
    if (!seller) {
      console.log(`Seller not found: ${sellerId}`);
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    // Get product assignments from database
    const productIds = await getSellerProductAssignments(sellerId);
    console.log(`Found ${productIds.length} product assignments for seller ${sellerId}:`, productIds);
    
    return NextResponse.json({ productIds });
  } catch (error) {
    console.error('Error getting seller product assignments:', error);
    return NextResponse.json(
      { error: 'Failed to get seller product assignments' },
      { status: 500 }
    );
  }
}

// POST /api/sellers/[id]/products
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use await on params to ensure it's fully resolved
    const resolvedParams = await params;
    const sellerId = resolvedParams.id;
    
    console.log('Processing product assignment update for seller:', sellerId);
    
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the request body
    const body = await request.json();
    const { productIds, operation, allowNonUUID, originalCount, debug } = body;
    
    console.log(`Received request with operation: ${operation || 'update'}, allowNonUUID: ${allowNonUUID || false}`);
    console.log(`Received ${productIds?.length || 0} product IDs${originalCount ? ` (filtered from ${originalCount} original IDs)` : ''}`);
    
    if (debug) {
      console.log('Product IDs received:', productIds);
    }
    
    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'productIds must be an array' },
        { status: 400 }
      );
    }
    
    // Validate that all product IDs are valid UUIDs
    const invalidProductIds = [];
    const validProductIds = [];
    const dummyProductIds = [];
    
    for (const id of productIds) {
      // Check for DUMMY format products first
      if (id.startsWith('DUMMY-')) {
        dummyProductIds.push(id);
        continue;
      }
      
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(id)) {
        validProductIds.push(id);
      } else {
        invalidProductIds.push(id);
      }
    }
    
    if (invalidProductIds.length > 0) {
      console.warn(`Found ${invalidProductIds.length} invalid product IDs:`, invalidProductIds);
    }
    
    if (dummyProductIds.length > 0) {
      console.log(`Found ${dummyProductIds.length} DUMMY format product IDs:`, dummyProductIds);
    }
    
    // If we have zero valid IDs, but original count shows we tried to send some,
    // this is likely a data issue that should be investigated
    if (validProductIds.length === 0 && (originalCount && originalCount > 0)) {
      console.error(`No valid product IDs found, but ${originalCount} products were selected`);
      return NextResponse.json(
        { 
          error: 'No valid product IDs found. This may be due to using mock data or products with invalid UUIDs.',
          validationIssue: true,
          requestedCount: originalCount,
          invalidCount: invalidProductIds.length,
          dummyCount: dummyProductIds.length,
          sampleInvalid: invalidProductIds.slice(0, 3)
        },
        { status: 400 }
      );
    }
    
    // Get the seller to verify it exists
    const seller = await getSellerById(sellerId);
    if (!seller) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    // Handle different operations
    try {
      let success = false;
      let finalProductIds = [...validProductIds];
      
      if (operation === 'assign') {
        // This is a new assignment operation from the admin UI
        console.log('Processing product assignment operation (add to existing)');
        
        // Get current assignments
        const currentAssignments = await getSellerProductAssignments(sellerId);
        console.log(`Current assignments for seller ${sellerId}: ${currentAssignments.length} products`);
        
        // Combine current assignments with new products
        finalProductIds = [...new Set([...currentAssignments, ...validProductIds])];
        console.log(`Updated assignments for seller ${sellerId}: ${finalProductIds.length} products`);
      } else if (operation === 'unassign') {
        // Remove products from seller's assignments
        console.log('Processing product unassign operation (remove from existing)');
        
        // Get current assignments
        const currentAssignments = await getSellerProductAssignments(sellerId);
        
        // Remove the specified products
        finalProductIds = currentAssignments.filter(id => !validProductIds.includes(id));
        console.log(`After unassign: ${finalProductIds.length} products remain assigned`);
      } else {
        // This is a standard update/replace operation from the original UI
        console.log('Processing product update operation (replace all)');
        // Use the validProductIds as-is (replace all)
      }
      
      // Update the assignments with the final product IDs list
      success = await updateSellerProductAssignments(sellerId, finalProductIds);
      
      if (success) {
        // Return special response if there were dummy products
        if (dummyProductIds.length > 0 || invalidProductIds.length > 0) {
          return NextResponse.json({ 
            success: true,
            message: 'Product assignments updated successfully (some products were ignored)',
            assignedCount: finalProductIds.length,
            ignoredCount: dummyProductIds.length + invalidProductIds.length,
            ignoredDummyIds: dummyProductIds.length > 0 ? dummyProductIds : undefined,
            ignoredInvalidIds: invalidProductIds.length > 0 ? invalidProductIds : undefined
          });
        }
        
        return NextResponse.json({ 
          success: true,
          message: 'Product assignments updated successfully',
          assignedCount: finalProductIds.length
        });
      } else {
        return NextResponse.json(
          { error: 'Failed to update product assignments' },
          { status: 500 }
        );
      }
    } catch (updateError) {
      console.error('Error in updateSellerProductAssignments:', updateError);
      return NextResponse.json(
        { error: `Failed to update product assignments: ${updateError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating seller product assignments:', error);
    return NextResponse.json(
      { error: `Failed to update seller product assignments: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}