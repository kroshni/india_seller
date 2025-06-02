import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getOrdersByCustomerId } from '@/lib/services/order-service';

// GET /api/customers/orders
// Retrieves all orders for the authenticated customer
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

    // Get orders for the customer
    const orders = await getOrdersByCustomerId(customerId);
    
    // Return orders
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error retrieving customer orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}