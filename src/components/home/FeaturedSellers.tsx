'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Seller {
  id: string;
  name: string;
  logo: string;
  rating: number;
  verified: boolean;
  productCount: number;
  category: string;
  location: string;
}

export default function FeaturedSellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just use mock data
    const fetchSellers = () => {
      setIsLoading(true);
      
      // Mock featured sellers
      const mockSellers: Seller[] = [
        {
          id: 'seller-1',
          name: 'TechGadgets India',
          logo: 'https://picsum.photos/id/3/300/300',
          rating: 4.8,
          verified: true,
          productCount: 127,
          category: 'Electronics',
          location: 'Delhi'
        },
        {
          id: 'seller-2',
          name: 'FashionHub',
          logo: 'https://picsum.photos/id/20/300/300',
          rating: 4.5,
          verified: true,
          productCount: 234,
          category: 'Clothing & Apparel',
          location: 'Mumbai'
        },
        {
          id: 'seller-3',
          name: 'HomeDécor Plus',
          logo: 'https://picsum.photos/id/42/300/300',
          rating: 4.7,
          verified: true,
          productCount: 98,
          category: 'Home & Garden',
          location: 'Bangalore'
        },
        {
          id: 'seller-4',
          name: 'Wellness Store',
          logo: 'https://picsum.photos/id/63/300/300',
          rating: 4.6,
          verified: true,
          productCount: 156,
          category: 'Health & Wellness',
          location: 'Chennai'
        }
      ];
      
      setSellers(mockSellers);
      setIsLoading(false);
    };

    fetchSellers();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    // Add empty stars to make 5 stars total
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sellers.map((seller) => (
        <div key={seller.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img 
                src={seller.logo} 
                alt={seller.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{seller.name}</h3>
                <div className="flex items-center mt-1">
                  {renderStars(seller.rating)}
                  <span className="ml-2 text-sm text-gray-600">{seller.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-1">
                {seller.verified && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex items-center mr-2">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Verified
                  </span>
                )}
                <span className="text-sm text-gray-600">{seller.productCount} Products</span>
              </div>
              <div className="flex flex-wrap text-sm text-gray-600">
                <span className="mr-3">{seller.category}</span>
                <span>{seller.location}</span>
              </div>
            </div>
            
            <Link 
              href={`/seller/${seller.id}`}
              className="block text-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              View Seller
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 