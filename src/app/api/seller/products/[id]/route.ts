import { NextRequest, NextResponse } from 'next/server';
import { authenticateSellerRequest } from '../../auth/middleware';
import { getProductById, updateProduct, deleteProduct } from '@/lib/services/product-service';
import { getSellerProducts } from '@/lib/services/product-service';

// GET /api/seller/products/[id] - Get a specific product for the authenticated seller
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the seller request
    const authResult = await authenticateSellerRequest(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    
    // Get the seller ID from the authenticated user
    const sellerId = authResult.user.sellerId;
    if (!sellerId) {
      return NextResponse.json({ error: 'Seller ID not found' }, { status: 400 });
    }
    
    const productId = params.id;
    
    // Get the product
    const product = await getProductById(productId);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Verify the product belongs to this seller
    if (product.sellerId !== sellerId) {
      return NextResponse.json(
        { error: 'You do not have permission to access this product' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error(`Error in GET /api/seller/products/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}

// PATCH /api/seller/products/[id] - Update a specific product for the authenticated seller
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the seller request
    const authResult = await authenticateSellerRequest(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    
    // Get the seller ID from the authenticated user
    const sellerId = authResult.user.sellerId;
    if (!sellerId) {
      return NextResponse.json({ error: 'Seller ID not found' }, { status: 400 });
    }
    
    const productId = params.id;
    
    // Ensure the product belongs to this seller
    const productResult = await getSellerProducts(sellerId, { productId });
    
    if (!productResult || productResult.products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found or does not belong to this seller' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const updateData = await request.json();
    
    // Update the product
    await updateProduct(productId, updateData);
    
    return NextResponse.json(
      { message: 'Product updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in PATCH /api/seller/products/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/seller/products/[id] - Delete a specific product for the authenticated seller
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the seller request
    const authResult = await authenticateSellerRequest(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    
    // Get the seller ID from the authenticated user
    const sellerId = authResult.user.sellerId;
    if (!sellerId) {
      return NextResponse.json({ error: 'Seller ID not found' }, { status: 400 });
    }
    
    const productId = params.id;
    
    // Ensure the product belongs to this seller
    const productResult = await getSellerProducts(sellerId, { productId });
    
    if (!productResult || productResult.products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found or does not belong to this seller' },
        { status: 404 }
      );
    }
    
    // Delete the product (soft delete)
    await deleteProduct(productId);
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in DELETE /api/seller/products/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}