import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getCustomerById, updateCustomer } from '@/lib/services/customer-service';
import { v4 as uuidv4 } from 'uuid';

// GET /api/customers/addresses
// Retrieves all addresses for the authenticated customer
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

    // Get customer data including addresses
    const customerData = await getCustomerById(customerId);
    if (!customerData) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Return addresses
    return NextResponse.json(customerData.addresses);
  } catch (error) {
    console.error('Error retrieving customer addresses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/customers/addresses
// Adds a new address for the authenticated customer
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

    // Get address data from request body
    const addressData = await request.json();
    
    // Validate required fields
    if (!addressData.addressLine1 || !addressData.city || !addressData.state || !addressData.postalCode) {
      return NextResponse.json(
        { error: 'Address line 1, city, state, and postal code are required' },
        { status: 400 }
      );
    }

    // Get current customer data
    const customerData = await getCustomerById(customerId);
    if (!customerData) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Create new address with UUID
    const newAddress = {
      id: uuidv4(),
      customerId,
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2 || '',
      city: addressData.city,
      state: addressData.state,
      postalCode: addressData.postalCode,
      country: addressData.country || 'India',
      isDefault: addressData.isDefault || false,
      addressType: addressData.addressType || 'Shipping'
    };

    // If this is the first address or marked as default, update other addresses
    const existingAddresses = customerData.addresses || [];
    if (newAddress.isDefault && existingAddresses.length > 0) {
      existingAddresses.forEach(addr => {
        if (addr.addressType === newAddress.addressType) {
          addr.isDefault = false;
        }
      });
    }

    // Add new address to existing addresses
    const updatedAddresses = [...existingAddresses, newAddress];

    // Update customer with new address
    const success = await updateCustomer(customerId, {
      name: customerData.customer.name,
      phone: customerData.customer.phone,
      addresses: updatedAddresses,
      documents: customerData.documents || []
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to add address' },
        { status: 500 }
      );
    }

    // Return the newly created address
    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    console.error('Error adding customer address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}