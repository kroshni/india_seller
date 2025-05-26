'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/cassandra';
import { getAllProducts } from '@/lib/services/product-service';

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get all products with sorting by createdAt in descending order
        const response = await getAllProducts({
          limit: 8, // Show just 8 products
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        
        setProducts(response.products);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
          <Link href={`/product/${product.id}`}>
            <div className="h-48 bg-gray-200 relative">
              {product.mainImage ? (
                <img 
                  src={product.mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
              
              {product.salePrice && product.salePrice < product.price && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  SALE
                </div>
              )}
            </div>
          </Link>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <Link href={`/product/${product.id}`} className="text-sm text-gray-600 hover:text-gray-800">
                  {/* This would be dynamic based on category - using mock for now */}
                  {product.categoryIds && product.categoryIds.length > 0 ? 'Electronics' : 'Uncategorized'}
                </Link>
                <h3 className="text-base font-medium mt-1 mb-1 text-gray-900 line-clamp-2 hover:text-indigo-600">
                  <Link href={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div>
                {product.salePrice && product.salePrice < product.price ? (
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-indigo-600">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              <Link 
                href={`/product/${product.id}`}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 