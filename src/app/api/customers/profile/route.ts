import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getCustomerById } from '@/lib/services/customer-service';

// GET /api/customers/profile
// Returns the profile of the currently authenticated customer
export async function GET(request: NextRequest) {
  try {
    console.log('Profile API: Request received');
    
    // Check customer authentication
    const user = await authenticateCustomerRequest(request);
    console.log('Profile API: Authentication result:', user ? 'Authenticated' : 'Not authenticated');
    
    if (!user) {
      console.log('Profile API: Unauthorized access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get customer ID from the authenticated user
    const customerId = (user as any).customerId;
    console.log('Profile API: Customer ID from token:', customerId || 'Not found');
    
    if (!customerId) {
      console.log('Profile API: No customer ID in token');
      return NextResponse.json(
        { error: 'Customer ID not found in token' },
        { status: 400 }
      );
    }

    // Fetch customer details
    console.log('Profile API: Fetching customer data for ID:', customerId);
    const customerData = await getCustomerById(customerId);
    console.log('Profile API: Customer data fetch result:', customerData ? 'Data found' : 'No data found');
    
    if (!customerData) {
      console.log('Profile API: Customer not found in database');
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