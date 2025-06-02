'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  shippingAddressId: string;
  billingAddressId: string;
  items: OrderItem[];
}

interface Address {
  id: string;
  customerId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  addressType: string;
}

export default function OrderDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchOrderDetails(params.id);
    }
  }, [params.id]);

  const fetchOrderDetails = async (orderId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch order details
      const orderResponse = await fetch(`/api/customers/orders/${orderId}`);
      
      if (!orderResponse.ok) {
        if (orderResponse.status === 401) {
          router.push('/customer/login');
          return;
        }
        throw new Error('Failed to fetch order details');
      }
      
      const orderData = await orderResponse.json();
      setOrder(orderData);

      // Fetch addresses
      const addressesResponse = await fetch('/api/customers/addresses');
      if (addressesResponse.ok) {
        const addresses = await addressesResponse.json();
        
        // Find shipping and billing addresses
        const shipping = addresses.find((addr: Address) => addr.id === orderData.shippingAddressId);
        const billing = addresses.find((addr: Address) => addr.id === orderData.billingAddressId);
        
        setShippingAddress(shipping || null);
        setBillingAddress(billing || null);
      }
    } catch (err) {
      setError('Error loading order details. Please try again.');
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const response = await fetch(`/api/customers/orders/${order.id}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      
      // Update order status locally
      setOrder(prev => prev ? { ...prev, status: 'Cancelled' } : null);
      
      alert('Order cancelled successfully');
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAddress = (address: Address | null) => {
    if (!address) return <p className="text-gray-500 italic">Address not available</p>;
    
    return (
      <div>
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>{address.city}, {address.state} {address.postalCode}</p>
        <p>{address.country}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-2">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link href="/customer/dashboard/orders" className="text-blue-600 hover:underline">
          &larr; Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Order not found
        </div>
        <Link href="/customer/dashboard/orders" className="text-blue-600 hover:underline">
          &larr; Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/customer/dashboard/orders" className="text-blue-600 hover:underline">
          &larr; Back to Orders
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
              <p className="text-gray-600">Placed on {formatDate(order.orderDate)}</p>
            </div>
            
            <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className={`px-3 py-1 rounded ${getPaymentStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
            {renderAddress(shippingAddress)}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Billing Address</h2>
            {renderAddress(billingAddress)}
          </div>
        </div>
        
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{formatCurrency(item.price)}</td>
                    <td className="px-4 py-2">{formatCurrency(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-right font-medium">Total:</td>
                  <td className="px-4 py-2 font-medium">{formatCurrency(order.totalAmount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {order.status.toLowerCase() === 'pending' && (
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button 
              onClick={handleCancelOrder}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}