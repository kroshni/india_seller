import { NextRequest, NextResponse } from 'next/server';
import { authenticateSellerRequest } from '../auth/middleware';
import { getSellerProducts, createProduct, updateProduct } from '@/lib/services/product-service';
import { getSellerById } from '@/lib/services/seller-service';

// GET /api/seller/products - Get products for the authenticated seller
export async function GET(request: NextRequest) {
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
    
    // Parse query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';
    const category = url.searchParams.get('category') || '';
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    
    // Get products for the seller
    const result = await getSellerProducts(sellerId, {
      page,
      limit,
      search,
      status,
      category,
      sortBy,
      sortOrder
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/seller/products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seller products' },
      { status: 500 }
    );
  }
}

// POST /api/seller/products - Create a new product for the authenticated seller
export async function POST(request: NextRequest) {
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
    
    // Verify seller exists and is active
    const seller = await getSellerById(sellerId);
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }
    
    if (seller.status !== 'Active') {
      return NextResponse.json(
        { error: 'Seller account is not active. Please contact support.' },
        { status: 403 }
      );
    }
    
    if (seller.kycStatus !== 'Verified') {
      return NextResponse.json(
        { error: 'KYC verification is pending. Please complete verification to add products.' },
        { status: 403 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'category', 'stock'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Add seller ID to the product data
    const productData = {
      ...body,
      sellerId,
      status: 'Pending', // New products start with Pending status for admin approval
    };
    
    // Create the product
    const result = await createProduct(productData);
    
    return NextResponse.json(
      { message: 'Product created successfully', productId: result.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/seller/products:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PATCH /api/seller/products - Update a product for the authenticated seller
export async function PATCH(request: NextRequest) {
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
    
    // Parse request body
    const body = await request.json();
    
    // Validate product ID
    if (!body.id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Ensure the product belongs to this seller
    const productId = body.id;
    const product = await getSellerProducts(sellerId, { productId });
    
    if (!product || product.products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found or does not belong to this seller' },
        { status: 404 }
      );
    }
    
    // Remove id from update data
    const { id, ...updateData } = body;
    
    // Update the product
    await updateProduct(productId, updateData);
    
    return NextResponse.json(
      { message: 'Product updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PATCH /api/seller/products:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}