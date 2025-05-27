'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/cassandra';
import { getSellerProductAssignments } from '@/lib/api-client/seller-client';
import { getProductById } from '@/lib/services/product-service';

interface AssignedProductsListProps {
  sellerId: string;
}

export default function AssignedProductsList({ sellerId }: AssignedProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAssignedProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get assigned product IDs
        const productIds = await getSellerProductAssignments(sellerId);
        
        // Fetch detailed product information for each ID
        const productDetails = await Promise.all(
          productIds.map(async (id) => {
            const product = await getProductById(id);
            return product;
          })
        );
        
        // Filter out any null results and set the products
        setProducts(productDetails.filter(p => p !== null) as Product[]);
      } catch (error) {
        console.error('Error fetching assigned products:', error);
        setError('Failed to load assigned products');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssignedProducts();
  }, [sellerId]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3">Loading assigned products...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700">
        {error}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products assigned to this seller yet.
      </div>
    );
  }
  
  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
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
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.shortDescription}
                    </div>
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
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.status === 'Enabled' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
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
  );
} 