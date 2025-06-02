import { NextRequest, NextResponse } from 'next/server';
import { getAllAssignedProductIds } from '@/lib/services/seller-service';
import { getAllProducts } from '@/lib/services/product-service';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get all assigned product IDs
    const assignedProductIds = await getAllAssignedProductIds();
    
    // Get all products
    const productsResponse = await getAllProducts({ limit: 100 });
    const allProducts = productsResponse.products;
    
    // Get products that are assigned
    const assignedProducts = allProducts.filter(p => 
      assignedProductIds.includes(p.id)
    );
    
    // Get products that are not assigned
    const unassignedProducts = allProducts.filter(p => 
      !assignedProductIds.includes(p.id)
    );
    
    return NextResponse.json({
      totalAssignedIds: assignedProductIds.length,
      assignedIds: assignedProductIds,
      totalProducts: allProducts.length,
      assignedProducts: assignedProducts.map(p => ({ id: p.id, name: p.name })),
      assignedCount: assignedProducts.length,
      unassignedProducts: unassignedProducts.map(p => ({ id: p.id, name: p.name })),
      unassignedCount: unassignedProducts.length,
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to get debug information' },
      { status: 500 }
    );
  }
}