import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getCustomerById } from '@/lib/services/customer-service';
import {
  getAllRequirements,
  createRequirement,
  RequirementFilters
} from '@/lib/services/requirement-service';

// GET /api/customers/requirements
// Retrieves all requirements for the authenticated customer
export async function GET(request: NextRequest) {
  try {
    // Check customer authentication
    const user = await authenticateCustomerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get customer ID from the authenticated user
    const customerId = (user as any).customerId;
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID not found in token' },
        { status: 400 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    const search = searchParams.get('search') || undefined;

    // Set up filters
    const filters: RequirementFilters = {
      customerId,
      page,
      limit,
      sortBy,
      sortOrder,
      search
    };

    // Get requirements for the customer
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
    console.error('Error retrieving customer requirements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/customers/requirements
// Creates a new requirement for the authenticated customer
export async function POST(request: NextRequest) {
  try {
    // Check customer authentication
    const user = await authenticateCustomerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get customer ID from the authenticated user
    const customerId = (user as any).customerId;
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID not found in token' },
        { status: 400 }
      );
    }

    // Get requirement data from request body
    const requirementData = await request.json();
    
    // Validate required fields
    if (!requirementData.productName || !requirementData.details || !requirementData.email) {
      return NextResponse.json(
        { error: 'Product name, details, and email are required' },
        { status: 400 }
      );
    }

    // Get customer data to include name
    const customerData = await getCustomerById(customerId);
    if (!customerData) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Create new requirement
    const newRequirement = await createRequirement({
      customerId,
      customerName: customerData.customer.name,
      productName: requirementData.productName,
      details: requirementData.details,
      email: requirementData.email
    });

    if (!newRequirement) {
      return NextResponse.json(
        { error: 'Failed to create requirement' },
        { status: 500 }
      );
    }

    // Return the newly created requirement
    return NextResponse.json(newRequirement, { status: 201 });
  } catch (error) {
    console.error('Error creating customer requirement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}