import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/services/product-service';
import { getAllAssignedProductIds } from '@/lib/services/seller-service';
import { authenticateRequest } from '@/lib/auth';

// Mock product IDs for testing
const mockProductIds = [
  '550e8400-e29b-41d4-a716-446655440100',
  '550e8400-e29b-41d4-a716-446655440102',
  '550e8400-e29b-41d4-a716-446655440104'
];

// GET /api/products/unassigned - Returns products that are not assigned to any seller
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
    
    console.log('Fetching unassigned products (products not assigned to any seller)');
    
    // 1. Get all assigned product IDs (products that are already assigned to any seller)
    const assignedProductIds = await getAllAssignedProductIds();
    console.log(`Found ${assignedProductIds.length} products already assigned to sellers (each product can only be assigned to one seller)`);
    
    // 2. Get all products
    const allProductsResponse = await getAllProducts({ limit: 1000 });
    const allProducts = allProductsResponse.products;
    console.log(`Found ${allProducts.length} total products`);
    
    // 3. Filter to find unassigned products
    const unassignedProductIds = allProducts
      .filter(product => !assignedProductIds.includes(product.id))
      .map(product => product.id);
    
    console.log(`Found ${unassignedProductIds.length} products available for assignment (not assigned to any seller)`);
    
    return NextResponse.json({
      productIds: unassignedProductIds
    });
  } catch (error) {
    console.error('Error fetching unassigned products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unassigned products' },
      { status: 500 }
    );
  }
}