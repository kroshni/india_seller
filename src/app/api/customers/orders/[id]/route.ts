import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import { getOrderById, cancelOrder } from '@/lib/services/order-service';

// GET /api/customers/orders/[id]
// Retrieves a specific order for the authenticated customer
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
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

    // Get the order
    const order = await getOrderById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify that the order belongs to the authenticated customer
    if (order.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Unauthorized to access this order' },
        { status: 403 }
      );
    }
    
    // Return the order
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/customers/orders/[id]/cancel
// Cancels a specific order for the authenticated customer
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
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

    // Get the order to verify ownership
    const order = await getOrderById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify that the order belongs to the authenticated customer
    if (order.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Unauthorized to access this order' },
        { status: 403 }
      );
    }

    // Check if the order can be cancelled (only pending orders can be cancelled)
    if (order.status.toLowerCase() !== 'pending') {
      return NextResponse.json(
        { error: 'Only pending orders can be cancelled' },
        { status: 400 }
      );
    }

    // Cancel the order
    const success = await cancelOrder(orderId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to cancel order' },
        { status: 500 }
      );
    }
    
    // Return success message
    return NextResponse.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}