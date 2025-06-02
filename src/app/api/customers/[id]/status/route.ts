import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { getCustomerById, updateCustomerStatus } from '@/lib/services/customer-service';

// PATCH /api/customers/[id]/status - Update a customer's status
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const data = await request.json();
    
    // Validate status
    if (!data.status || !['Active', 'Inactive'].includes(data.status)) {
      return NextResponse.json(
        { error: 'Valid status (Active or Inactive) is required' },
        { status: 400 }
      );
    }
    
    // Check if customer exists
    const existingCustomer = await getCustomerById(id);
    
    if (!existingCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    // Update customer status
    const success = await updateCustomerStatus(id, data.status);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update customer status' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Customer status updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error in PATCH /api/customers/${params.id}/status:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}