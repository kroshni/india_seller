import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { updateCustomer, getCustomerById } from '@/lib/services/customer-service';

// PUT /api/customers/profile/update
// Updates the profile of the currently authenticated customer
export async function PUT(request: NextRequest) {
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

    // Get update data from request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required fields' },
        { status: 400 }
      );
    }

    // Update customer profile
    const success = await updateCustomer(customerId, {
      name: data.name,
      phone: data.phone,
      // Email is not updated as it's used for authentication
      // We're not handling profile picture updates in this basic implementation
      addresses: [], // Keep existing addresses
      documents: []  // Keep existing documents
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update customer profile' },
        { status: 500 }
      );
    }

    // Fetch updated customer data
    const updatedCustomer = await getCustomerById(customerId);
    if (!updatedCustomer) {
      return NextResponse.json(
        { error: 'Failed to retrieve updated customer data' },
        { status: 500 }
      );
    }

    // Return updated customer profile data
    return NextResponse.json({
      id: updatedCustomer.customer.id,
      name: updatedCustomer.customer.name,
      email: updatedCustomer.customer.email,
      phone: updatedCustomer.customer.phone,
      profilePicture: updatedCustomer.customer.profilePicture,
      status: updatedCustomer.customer.status,
      addresses: updatedCustomer.addresses,
      documents: updatedCustomer.documents
    });
  } catch (error) {
    console.error('Error updating customer profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}