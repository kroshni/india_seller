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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  category: string;
  images: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  updatedAt: string;
}

export default function SellerProducts() {
  const router = useRouter();
  const [user, setUser] = useState<SellerUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
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
        
        // Fetch seller products
        if (data.user && data.user.sellerId) {
          await fetchSellerProducts(data.user.sellerId, 1);
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
  
  const fetchSellerProducts = async (sellerId: string, page: number, search: string = searchTerm, status: string = statusFilter) => {
    setIsLoading(true);
    try {
      let url = `/api/sellers/${sellerId}/products?page=${page}&limit=10`;
      
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
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    if (!user?.sellerId) return;
    fetchSellerProducts(user.sellerId, 1, searchTerm, statusFilter);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    if (!user?.sellerId) return;
    fetchSellerProducts(user.sellerId, 1, searchTerm, status);
  };
  
  const handlePageChange = (page: number) => {
    if (!user?.sellerId) return;
    fetchSellerProducts(user.sellerId, page, searchTerm, statusFilter);
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
  
  const updateProductStatus = async (productId: string, newStatus: 'Active' | 'Inactive') => {
    if (!user?.sellerId) return;
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product status');
      }
      
      // Refresh product list
      fetchSellerProducts(user.sellerId, currentPage, searchTerm, statusFilter);
    } catch (error) {
      console.error('Error updating product status:', error);
      setError('Failed to update product status');
    }
  };
  
  if (isLoading && !products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (error && !products.length) {
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
          <h1 className="text-2xl font-bold text-gray-900">Seller Products</h1>
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
                    <Link href="/seller/products" className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/orders" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
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
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Your Products</h2>
                  <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Search products..."
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <Link 
                      href="/seller/products/add"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                    >
                      Add Product
                    </Link>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products found. Add your first product to get started.</p>
                    <Link 
                      href="/seller/products/add"
                      className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add Your First Product
                    </Link>
                  </div>
                ) : (
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
                            Stock
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
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={product.images[0] || '/placeholder-product.png'} 
                                    alt={product.name} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">{product.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ₹{product.discountedPrice || product.price}
                              </div>
                              {product.discountedPrice && (
                                <div className="text-sm text-gray-500 line-through">₹{product.price}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.stock}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                product.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link 
                                  href={`/seller/products/edit/${product.id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </Link>
                                {product.status === 'Active' ? (
                                  <button
                                    onClick={() => updateProductStatus(product.id, 'Inactive')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => updateProductStatus(product.id, 'Active')}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    Activate
                                  </button>
                                )}
                              </div>
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
          </div>
        </div>
      </main>
    </div>
  );
}