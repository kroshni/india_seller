import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import {
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '@/lib/services/customer-service';

// GET /api/customers/[id] - Get a customer by ID
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = context.params;
    
    // Get customer by ID
    const customer = await getCustomerById(id);
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(customer);
  } catch (error: any) {
    console.error(`Error in GET /api/customers/${context.params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/customers/[id] - Update a customer
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = context.params;
    const data = await request.json();
    
    // Check if customer exists
    const existingCustomer = await getCustomerById(id);
    
    if (!existingCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    // Update customer
    const success = await updateCustomer(id, data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update customer' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Customer updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error in PUT /api/customers/${context.params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/customers/[id] - Delete a customer
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = context.params;
    
    // Check if customer exists
    const existingCustomer = await getCustomerById(id);
    
    if (!existingCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    // Delete customer
    const success = await deleteCustomer(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete customer' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Customer deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error in DELETE /api/customers/${context.params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}