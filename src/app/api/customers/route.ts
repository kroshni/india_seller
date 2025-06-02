import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import {
  getAllCustomers,
  createCustomer,
  bulkUpdateCustomers,
  deleteCustomer,
  CustomerFilters,
  CustomerBulkUpdateInput
} from '@/lib/services/customer-service';

// GET /api/customers - Get all customers with optional filtering
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
    
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const filters: CustomerFilters = {};
    
    // Extract filter parameters
    if (searchParams.has('search')) filters.search = searchParams.get('search') || undefined;
    if (searchParams.has('status')) filters.status = searchParams.get('status') as any || undefined;
    if (searchParams.has('page')) filters.page = parseInt(searchParams.get('page') || '1');
    if (searchParams.has('limit')) filters.limit = parseInt(searchParams.get('limit') || '10');
    if (searchParams.has('sortBy')) filters.sortBy = searchParams.get('sortBy') || undefined;
    if (searchParams.has('sortOrder')) filters.sortOrder = searchParams.get('sortOrder') as any || undefined;
    
    // Get customers with filters
    const result = await getAllCustomers(filters);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in GET /api/customers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/customers - Create a new customer
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
    
    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required fields' },
        { status: 400 }
      );
    }
    
    // Create customer
    const customerId = await createCustomer(data);
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { id: customerId, message: 'Customer created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/customers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/customers - Bulk update customers
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
    
    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.customerIds || !Array.isArray(data.customerIds) || data.customerIds.length === 0) {
      return NextResponse.json(
        { error: 'customerIds array is required and must not be empty' },
        { status: 400 }
      );
    }
    
    // Validate that at least one update field is provided
    if (!data.status) {
      return NextResponse.json(
        { error: 'At least one update field (status) must be provided' },
        { status: 400 }
      );
    }
    
    // Prepare bulk update input
    const bulkUpdateInput: CustomerBulkUpdateInput = {
      customerIds: data.customerIds,
      status: data.status
    };
    
    // Perform bulk update
    const success = await bulkUpdateCustomers(bulkUpdateInput);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update customers' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Customers updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in PATCH /api/customers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/customers - Bulk delete customers
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
    
    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.customerIds || !Array.isArray(data.customerIds) || data.customerIds.length === 0) {
      return NextResponse.json(
        { error: 'customerIds array is required and must not be empty' },
        { status: 400 }
      );
    }
    
    // Delete each customer
    const results = await Promise.all(
      data.customerIds.map(async (id: string) => {
        const success = await deleteCustomer(id);
        return { id, success };
      })
    );
    
    const allSuccessful = results.every(result => result.success);
    
    if (!allSuccessful) {
      const failedIds = results.filter(result => !result.success).map(result => result.id);
      return NextResponse.json(
        { 
          message: 'Some customers could not be deleted',
          failedIds 
        },
        { status: 207 } // Multi-Status
      );
    }
    
    return NextResponse.json(
      { message: 'Customers deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in DELETE /api/customers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}