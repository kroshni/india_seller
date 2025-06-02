import { NextRequest, NextResponse } from 'next/server';
import { getAllSellers, createSeller, bulkDeleteSellers, bulkUpdateSellers } from '@/lib/services/seller-service';
import { SellerFilters, SellerBulkUpdateInput } from '@/lib/services/seller-service';
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
    
    // Parse query parameters for filtering, pagination, and sorting
    const searchParams = request.nextUrl.searchParams;
    const filters: SellerFilters = {
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
    };
    
    // Status filter
    if (searchParams.has('status')) {
      const status = searchParams.get('status');
      if (status === 'Active' || status === 'Inactive' || status === 'All') {
        filters.status = status;
      }
    }
    
    // KYC status filter
    if (searchParams.has('kycStatus')) {
      const kycStatus = searchParams.get('kycStatus');
      if (kycStatus === 'Verified' || kycStatus === 'Pending' || kycStatus === 'All') {
        filters.kycStatus = kycStatus;
      }
    }
    
    // Top scorer range filter
    if (searchParams.has('minTopScorer')) {
      filters.minTopScorer = parseInt(searchParams.get('minTopScorer')!);
    }
    
    if (searchParams.has('maxTopScorer')) {
      filters.maxTopScorer = parseInt(searchParams.get('maxTopScorer')!);
    }
    
    const { sellers, total } = await getAllSellers(filters);
    
    // Calculate pagination data
    const totalPages = Math.ceil(total / filters.limit!);
    
    return NextResponse.json({
      sellers,
      pagination: {
        total,
        currentPage: filters.page,
        totalPages,
        limit: filters.limit,
      }
    });
  } catch (error) {
    console.error('Error getting sellers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sellers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }
    
    if (!data.business || !data.business.companyName) {
      return NextResponse.json(
        { error: 'Business company name is required' },
        { status: 400 }
      );
    }
    
    const sellerId = await createSeller(data);
    
    if (!sellerId) {
      return NextResponse.json(
        { error: 'Failed to create seller' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      sellerId,
      message: 'Seller created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating seller:', error);
    return NextResponse.json(
      { error: 'Failed to create seller' },
      { status: 500 }
    );
  }
}

// For bulk operations
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data: SellerBulkUpdateInput = await request.json();
    
    if (!data.sellerIds || !Array.isArray(data.sellerIds) || data.sellerIds.length === 0) {
      return NextResponse.json(
        { error: 'sellerIds array is required and cannot be empty' },
        { status: 400 }
      );
    }
    
    // Make sure at least one update field is provided
    if (data.status === undefined && data.kycStatus === undefined && data.isTopScorer === undefined) {
      return NextResponse.json(
        { error: 'At least one of status, kycStatus, or isTopScorer must be provided' },
        { status: 400 }
      );
    }
    
    const success = await bulkUpdateSellers(data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update sellers' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Sellers updated successfully'
    });
  } catch (error) {
    console.error('Error updating sellers:', error);
    return NextResponse.json(
      { error: 'Failed to update sellers' },
      { status: 500 }
    );
  }
}

// For bulk deletion
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    
    if (!data.sellerIds || !Array.isArray(data.sellerIds) || data.sellerIds.length === 0) {
      return NextResponse.json(
        { error: 'sellerIds array is required and cannot be empty' },
        { status: 400 }
      );
    }
    
    const success = await bulkDeleteSellers(data.sellerIds);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete sellers' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Sellers deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting sellers:', error);
    return NextResponse.json(
      { error: 'Failed to delete sellers' },
      { status: 500 }
    );
  }
}