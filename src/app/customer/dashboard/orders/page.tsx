'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  items?: OrderItem[];
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export default function CustomerOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/customers/orders');
      
      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push('/customer/login');
          return;
        }
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError('Error loading orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-100 p-8 text-center rounded">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link href="/products" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow-md rounded overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 flex flex-col md:flex-row md:justify-between md:items-center"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="mb-2 md:mb-0">
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                  <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
              
              {expandedOrder === order.id && order.items && (
                <div className="border-t border-gray-200 p-4">
                  <h4 className="font-medium mb-2">Order Items</h4>
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
                            <td className="px-4 py-2 whitespace-nowrap">{item.productName}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.price)}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.subtotal)}</td>
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
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <Link 
                      href={`/customer/dashboard/orders/${order.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      View Details
                    </Link>
                    {order.status.toLowerCase() === 'pending' && (
                      <button 
                        className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle cancel order logic here
                          if (confirm('Are you sure you want to cancel this order?')) {
                            // Call API to cancel order
                            console.log('Cancel order:', order.id);
                          }
                        }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}