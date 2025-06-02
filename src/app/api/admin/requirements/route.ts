import { NextRequest, NextResponse } from 'next/server';
import { authenticateSellerRequest } from '@/lib/auth';
import { getAllRequirements, RequirementFilters } from '@/lib/services/requirement-service';

// GET /api/admin/requirements
// Retrieves all customer requirements for admin view
export async function GET(request: NextRequest) {
  try {
    // Check seller authentication (admin)
    const user = await authenticateSellerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    const search = searchParams.get('search') || undefined;
    const customerId = searchParams.get('customerId') || undefined;

    // Set up filters
    const filters: RequirementFilters = {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      customerId
    };

    // Get all requirements (no customer filter for admin view)
    const { requirements, total } = await getAllRequirements(filters);

    // Return requirements with pagination info
    return NextResponse.json({
      requirements,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error retrieving customer requirements for admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}