import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/services/product-service';
import { isDbConnected } from '@/lib/db/cassandra';
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
    
    // Get all products with a higher limit to check what's available
    const productsResponse = await getAllProducts({ limit: 100 });
    
    // Get the database connection status
    const dbConnected = isDbConnected();
    
    // Return debugging information
    return NextResponse.json({
      dbConnected,
      totalProducts: productsResponse.total,
      productCount: productsResponse.products.length,
      // Add product IDs for inspection
      productIds: productsResponse.products.map(p => p.id),
      // Include a sample of products for inspection
      sampleProducts: productsResponse.products.slice(0, 5),
      // Check if any products have non-UUID formatted IDs
      nonUuidProducts: productsResponse.products
        .filter(p => {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return !uuidRegex.test(p.id);
        })
        .map(p => ({ id: p.id, name: p.name }))
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to get debug information' },
      { status: 500 }
    );
  }
}