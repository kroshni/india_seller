'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/cassandra';
import { getAllProducts } from '@/lib/services/product-service';

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, you would have a specific API for trending products
        // For now, we'll just use the product service
        const response = await getAllProducts({
          limit: 6, // Show just 6 trending products
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        
        setProducts(response.products);
      } catch (err) {
        console.error('Error loading trending products:', err);
        setError('Failed to load trending products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto advance slides
  useEffect(() => {
    if (products.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(timer);
  }, [products.length]);

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
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-600">No trending products found.</div>;
  }

  // Calculate visible products based on current slide
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const startIndex = currentSlide * itemsPerSlide;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div>
      {/* Products carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {visibleProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden">
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
                
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Trending
                </div>
                
                {product.salePrice && product.salePrice < product.price && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    SALE
                  </div>
                )}
              </div>
            </Link>
            
            <div className="p-4">
              <h3 className="text-base font-medium mb-1 text-gray-900 hover:text-indigo-600">
                <Link href={`/product/${product.id}`}>
                  {product.name}
                </Link>
              </h3>
              
              <div className="flex justify-between items-center mt-2">
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
      
      {/* Slide indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center space-x-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 