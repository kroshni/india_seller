import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getCustomerById, updateCustomer } from '@/lib/services/customer-service';

// PUT /api/customers/addresses/[id]
// Updates an existing address for the authenticated customer
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const addressId = params.id;
    if (!addressId) {
      return NextResponse.json(
        { error: 'Address ID is required' },
        { status: 400 }
      );
    }

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

    // Find the address to update
    const existingAddresses = customerData.addresses || [];
    const addressIndex = existingAddresses.findIndex(addr => addr.id === addressId);
    
    if (addressIndex === -1) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    // Update address
    const updatedAddress = {
      ...existingAddresses[addressIndex],
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2 || '',
      city: addressData.city,
      state: addressData.state,
      postalCode: addressData.postalCode,
      country: addressData.country || 'India',
      isDefault: addressData.isDefault || false,
      addressType: addressData.addressType || existingAddresses[addressIndex].addressType
    };

    // If marked as default, update other addresses of the same type
    if (updatedAddress.isDefault) {
      existingAddresses.forEach(addr => {
        if (addr.id !== addressId && addr.addressType === updatedAddress.addressType) {
          addr.isDefault = false;
        }
      });
    }

    // Replace the old address with the updated one
    existingAddresses[addressIndex] = updatedAddress;

    // Update customer with modified addresses
    const success = await updateCustomer(customerId, {
      name: customerData.customer.name,
      phone: customerData.customer.phone,
      addresses: existingAddresses,
      documents: customerData.documents || []
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update address' },
        { status: 500 }
      );
    }

    // Return the updated address
    return NextResponse.json(updatedAddress);
  } catch (error) {
    console.error('Error updating customer address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/addresses/[id]
// Deletes an address for the authenticated customer
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const addressId = params.id;
    if (!addressId) {
      return NextResponse.json(
        { error: 'Address ID is required' },
        { status: 400 }
      );
    }

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

    // Get current customer data
    const customerData = await getCustomerById(customerId);
    if (!customerData) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Find the address to delete
    const existingAddresses = customerData.addresses || [];
    const addressIndex = existingAddresses.findIndex(addr => addr.id === addressId);
    
    if (addressIndex === -1) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    // Remove the address
    const updatedAddresses = existingAddresses.filter(addr => addr.id !== addressId);

    // Update customer with modified addresses
    const success = await updateCustomer(customerId, {
      name: customerData.customer.name,
      phone: customerData.customer.phone,
      addresses: updatedAddresses,
      documents: customerData.documents || []
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      );
    }

    // Return success message
    return NextResponse.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}