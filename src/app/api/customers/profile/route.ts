import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getCustomerById } from '@/lib/services/customer-service';

// GET /api/customers/profile
// Returns the profile of the currently authenticated customer
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

    // Fetch customer details
    const customerData = await getCustomerById(customerId);
    if (!customerData) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Return customer profile data
    return NextResponse.json({
      id: customerData.customer.id,
      name: customerData.customer.name,
      email: customerData.customer.email,
      phone: customerData.customer.phone,
      profilePicture: customerData.customer.profilePicture,
      status: customerData.customer.status,
      addresses: customerData.addresses,
      documents: customerData.documents
    });
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}