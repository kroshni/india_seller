'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SellerUser {
  email: string;
  name: string;
  role: string;
  sellerId: string;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  productImage?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function SellerOrders() {
  const router = useRouter();
  const [user, setUser] = useState<SellerUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await fetch('/api/seller/auth/check', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          // Not authenticated, redirect to login
          router.replace('/seller/login');
          return;
        }
        
        const data = await response.json();
        setUser(data.user);
        
        // Fetch seller orders
        if (data.user && data.user.sellerId) {
          await fetchSellerOrders(data.user.sellerId, 1);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setError('Failed to authenticate');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuthentication();
  }, [router]);
  
  const fetchSellerOrders = async (sellerId: string, page: number, search: string = searchTerm, status: string = statusFilter) => {
    setIsLoading(true);
    try {
      let url = `/api/sellers/${sellerId}/orders?page=${page}&limit=10`;
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      if (status && status !== 'all') {
        url += `&status=${encodeURIComponent(status)}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data.orders || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    if (!user?.sellerId) return;
    fetchSellerOrders(user.sellerId, 1, searchTerm, statusFilter);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    if (!user?.sellerId) return;
    fetchSellerOrders(user.sellerId, 1, searchTerm, status);
  };
  
  const handlePageChange = (page: number) => {
    if (!user?.sellerId) return;
    fetchSellerOrders(user.sellerId, page, searchTerm, statusFilter);
  };
  
  const handleLogout = async () => {
    try {
      await fetch('/api/seller/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      router.push('/seller/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!user?.sellerId) return;
    
    setIsUpdatingStatus(true);
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      // Refresh order list
      fetchSellerOrders(user.sellerId, currentPage, searchTerm, statusFilter);
      
      // Update selected order if it's the one being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus as any
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (isLoading && !orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (error && !orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => router.push('/seller/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Seller Orders</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Navigation</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Link href="/seller/dashboard" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/profile" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/products" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/orders" className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/documents" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      KYC Documents
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            {selectedOrder ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Order #{selectedOrder.orderNumber}</h2>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                    >
                      Back to Orders
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Order Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="text-sm font-medium">{formatDate(selectedOrder.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Order Status</p>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedOrder.status)}`}>
                              {selectedOrder.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="text-sm font-medium">{selectedOrder.paymentMethod}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Status</p>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeClass(selectedOrder.paymentStatus)}`}>
                              {selectedOrder.paymentStatus}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-sm font-medium">₹{selectedOrder.totalAmount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm font-medium">{selectedOrder.customerName}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.customerEmail}</p>
                        
                        <h4 className="text-sm font-medium mt-4 mb-1">Shipping Address</h4>
                        <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.addressLine1}</p>
                        {selectedOrder.shippingAddress.addressLine2 && (
                          <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.addressLine2}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                        </p>
                        <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Order Items</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={item.productImage || '/placeholder-product.png'} 
                                    alt={item.productName} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                                  <div className="text-xs text-gray-500">ID: {item.productId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">₹{item.price.toFixed(2)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.quantity}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">₹{item.total.toFixed(2)}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Update Order Status</h3>
                    <div className="flex items-center space-x-4">
                      <select
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={selectedOrder.status}
                        disabled={isUpdatingStatus || selectedOrder.status === 'Delivered' || selectedOrder.status === 'Cancelled'}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={(e) => {
                          const select = e.currentTarget.previousElementSibling as HTMLSelectElement;
                          updateOrderStatus(selectedOrder.id, select.value);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isUpdatingStatus || selectedOrder.status === 'Delivered' || selectedOrder.status === 'Cancelled'}
                      >
                        {isUpdatingStatus ? 'Updating...' : 'Update Status'}
                      </button>
                    </div>
                    {(selectedOrder.status === 'Delivered' || selectedOrder.status === 'Cancelled') && (
                      <p className="mt-2 text-sm text-gray-500">
                        This order is {selectedOrder.status.toLowerCase()} and cannot be updated further.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Your Orders</h2>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Search orders..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
                        />
                        <button
                          onClick={handleSearch}
                          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Search
                        </button>
                      </div>
                      <select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No orders found.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order #
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{order.customerName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">₹{order.totalAmount.toFixed(2)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}