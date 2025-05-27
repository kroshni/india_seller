import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/services/product-service';
import { getAllAssignedProductIds } from '@/lib/services/seller-service';
import { isDbConnected } from '@/lib/db/cassandra';

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    const dbConnected = isDbConnected();
    
    // Get all products
    const productsResponse = await getAllProducts({ limit: 100 });
    const allProducts = productsResponse.products;
    
    // Get assigned product IDs
    const assignedProductIds = await getAllAssignedProductIds();
    
    // Get product IDs
    const productIds = allProducts.map(p => p.id);
    
    // Check UUID validity
    const validUuidProducts = [];
    const invalidUuidProducts = [];
    
    for (const product of allProducts) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(product.id)) {
        validUuidProducts.push({
          id: product.id,
          name: product.name,
          sku: product.sku
        });
      } else {
        invalidUuidProducts.push({
          id: product.id,
          name: product.name,
          sku: product.sku
        });
      }
    }
    
    // Get unassigned product IDs (valid UUID format)
    const unassignedProducts = validUuidProducts.filter(p => 
      !assignedProductIds.includes(p.id)
    );
    
    return NextResponse.json({
      dbConnected,
      totalProducts: allProducts.length,
      validUuidCount: validUuidProducts.length,
      invalidUuidCount: invalidUuidProducts.length,
      assignedCount: assignedProductIds.length,
      unassignedCount: unassignedProducts.length,
      invalidUuidSamples: invalidUuidProducts.slice(0, 10),
      validUuidSamples: validUuidProducts.slice(0, 10),
      assignedIds: assignedProductIds,
      unassignedProducts: unassignedProducts
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get debug information',
        message: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
} 