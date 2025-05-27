'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSellerProductAssignments } from '@/lib/api-client/seller-client';
import { getAllProducts } from '@/lib/services/product-service';
import { getSellers } from '@/lib/api-client/seller-client';

interface SellerWithProducts {
  id: string;
  name: string;
  productIds: string[];
  products: any[];
}

export default function SellerProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [sellersWithProducts, setSellersWithProducts] = useState<SellerWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit] = useState(10);
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get all sellers first
        const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
        const sellersResponse = await getSellers({
          page,
          limit: pageLimit,
        });
        
        const sellers = sellersResponse.data;
        setCurrentPage(sellersResponse.pagination.currentPage);
        setTotalPages(sellersResponse.pagination.totalPages);
        
        // Get all products to have them in memory
        const productsResponse = await getAllProducts({ limit: 1000 });
        const allProducts = productsResponse.products;
        
        // Get product assignments for each seller
        const sellersData = await Promise.all(
          sellers.map(async (seller) => {
            try {
              const productIds = await getSellerProductAssignments(seller.id);
              const sellerProducts = productIds.map(id => 
                allProducts.find(product => product.id === id)
              ).filter(Boolean);
              
              return {
                id: seller.id,
                name: seller.name,
                productIds,
                products: sellerProducts
              };
            } catch (err) {
              console.error(`Error fetching products for seller ${seller.id}:`, err);
              return {
                id: seller.id,
                name: seller.name,
                productIds: [],
                products: []
              };
            }
          })
        );
        
        setSellersWithProducts(sellersData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load sellers and products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [searchParams, pageLimit]);
  
  // Handle pagination
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/dashboard/sellers/products?${params.toString()}`);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Seller Products</h1>
        <Link
          href="/dashboard/sellers"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Back to Sellers
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {sellersWithProducts.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No sellers found.</p>
            </div>
          ) : (
            sellersWithProducts.map((seller) => (
              <div key={seller.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <Link href={`/dashboard/sellers/${seller.id}`} className="text-xl font-medium text-blue-600 hover:underline">
                      {seller.name}
                    </Link>
                    <Link 
                      href={`/dashboard/sellers/${seller.id}/manage-products`}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      Manage Products
                    </Link>
                  </div>
                </div>
                
                <div className="p-4">
                  {seller.products.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No products assigned to this seller.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              SKU
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {seller.products.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {product.mainImage ? (
                                    <img 
                                      src={product.mainImage} 
                                      alt={product.name}
                                      className="h-10 w-10 rounded-md object-cover mr-3"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center mr-3">
                                      <span className="text-xs text-gray-500">No img</span>
                                    </div>
                                  )}
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.sku}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {product.salePrice ? (
                                  <div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {formatCurrency(product.salePrice)}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through ml-2">
                                      {formatCurrency(product.price)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-medium text-gray-900">
                                    {formatCurrency(product.price)}
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                  href={`/dashboard/products/${product.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      page === currentPage
                        ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    } text-sm font-medium`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 